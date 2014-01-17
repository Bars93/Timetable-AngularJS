'use strict';
var app = angular.module("timetable", ['timetableFilters', 'timetableServices']);
app.controller('timetableCtrl', ['$scope', '$http', 'DaysServ', function ($scope, $http, DaysServ) {
    $scope.editProcessing = false;
    $scope.curPage = 0;
    $scope.pageSize = 5;
    $scope.dayRef = null;
    $scope.limit = 7;
    $scope.pagingValues = [1, 5, 7, 10, 15, 25];
    $scope.addingActive = true;
    $scope.timePairs = ["08:30 - 09:55", "10:10 - 11:35", "11:50 - 13:15", "13:45 - 15:10",
        "15:25 - 16:50", "17:05 - 18:30", "18:40 - 20:00"];
    $scope.dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    $scope.defDay = {id: -1, 'name': 'Понедельник', daysubjects: [
        {id: -1, name: '', position: 1},
        {id: -1, name: '', position: 2},
        {id: -1, name: '', position: 3},
        {id: -1, name: '', position: 4},
        {id: -1, name: '', position: 5},
        {id: -1, name: '', position: 6},
        {id: -1, name: '', position: 7}
    ]
    };
    $scope.editDay = {};
    $scope.bindDay = {};
    $scope.nullLine = {id: -1, name: '', position: 0};

    $scope.days = [
        {
            "id": 1,
            "name": "Понедельник",
            "daysubjects": []
        },
        {
            "id": 2,
            "name": "Вторник",
            "daysubjects": []
        },
        {
            "id": 3,
            "name": "Среда",
            "daysubjects": []
        },
        {
            "id": 4,
            "name": "Четверг",
            "daysubjects": []
        },
        {
            "id": 5,
            "name": "Пятница",
            "daysubjects": []
        },
        {
            "id": 6,
            "name": "Суббота",
            "daysubjects": []
        },
        {
            "id": 7,
            "name": "Воскресенье",
            "daysubjects": []
        }
    ];
    $scope.loadDaysData = function () {
        $http.get('data/days.json',{caching: false}).success(function (data) {
            $scope.days = data;
        });
    };
    $scope.saveDaysData = function () {
        $.when($.ajax({
                type: "text",
                method: "POST",
                caching: false,
                url: "storedata.php",
                data: {
                    data: angular.toJson($scope.days),
                    file: 'days.json'
                }
            })).then(function (resp) {
                console.log("Response: " + resp);
            });
        /*      $http({
         method: 'POST',
         url: 'storedata.php',
         data: {data: angular}
         }).success(function(data) {
         alert('Success - ' + data.toString());
         });*/
    };
    $scope.subjects = [
        {'id': 1, 'name': 'Низкоуровневое программирование', selected: false, position: 0},
        {'id': 2, 'name': 'Человеко-машинное взаимодействие', selected: false, position: 0},
        {'id': 3, 'name': 'Математическая статистика', selected: false, position: 0},
        {'id': 4, 'name': 'Основы теории информации и криптографии', selected: false, position: 0}
    ];
    $scope.addSubject = function (subj) {
        if ($scope.editProcessing) {
            if ($scope.addingActive) {
                var tmp = {};
                angular.copy(subj, tmp);
                var fPos = $scope.editDay.daysubjects.map(function (e) {
                    return e.id;
                }).indexOf(-1);
                if (fPos != -1) {
                    tmp.position = fPos + 1;
                    $scope.editDay.daysubjects[fPos] = tmp;
                }
                else if ($scope.editDay.daysubjects.length < 7) {
                    tmp.position = $scope.editDay.daysubjects.length + 1;
                    $scope.editDay.daysubjects.push(tmp);
                }
                else {
                    window.alert('Расписание заполнено!');
                    $scope.addingActive = false;
                }
            }
            else {
                window.alert("В расписание одного дня можно добавить не более 7 предметов! Расписание заполнено!");
            }
        }
        else {
            window.alert('Выберете день для создания/редактирования расписания!');
        }

    };
    var getPositions = function (subj_array) {
        return subj_array.map(function (e) {
            return e.position;
        });
    }
    $scope.showeditor = function (day) {
        angular.copy(day, $scope.bindDay);
        $scope.dayRef = day;
        day = $scope.bindDay;
        angular.copy(day, $scope.editDay);
        $scope.editProcessing = true;

    };
    $scope.bindingDay = function () {
        var days = $scope.days;
        for (var i = 0; i < days.length; i++) {
            if (angular.equals(days[i].name, $scope.editDay.name)) {
                $scope.dayRef = days[i];
                days[i] = $scope.bindDay;
                console.log("binding! Bingo! Days ds = " + angular.toJson(days[i].daysubjects) + "; binded ds = " +
                    angular.toJson($scope.bindDay.daysubjects));

                break;
            }
        }
    };
    $scope.getSelectedSubjectsCount = function () {
        var sel = $scope.subjects.map(function (e) {
            return e.selected;
        });

        var count = 0;
        for (var i = 0; i < sel.length; i++)
            if (sel[i] == true)
                count++;
        if (!($scope.editDay == {}))
            count += $scope.editDay.daysubjects.length;
        return count;
    }
    $scope.addSelected = function () {
    };
    $scope.createTable = function (choosen) {
        var table = [];
        if (choosen.length == 0) {
            for (var i = 0; i < 7; i++) {
                var tmp = {};
                angular.copy($scope.nullLine, tmp);
                tmp.position = i + 1;
                table.push(tmp);
            }
        }
        else {
            var positions = choosen.map(function (e) {
                return e.position;
            });
            for (var i = 0; i < 7; i++) {
                var fPos = positions.indexOf(i + 1);
                if (fPos == -1) {
                    var tmp = {};
                    angular.copy($scope.nullLine, tmp);
                    tmp.position = i + 1;
                    table.push(tmp);
                }
                else if (fPos != -1 && choosen[fPos].id != -1) {
                    table.push(choosen[fPos]);
                }
                else {
                    var nPos
                    if ((nPos = positions.indexOf(i + 1, fPos + 1)) != -1 && choosen[nPos].id != -1) {
                        table.push(choosen[nPos])
                    }
                    else {
                        table.push(choosen[fPos]);
                    }
                }
            }
        }
        return table;
    };
    $scope.createTTable = function () {
        var subjs = $scope.editDay.daysubjects;
        if (subjs.map(function (e) {
            return e.position;
        }).indexOf(0) != -1) {
            window.alert("Некоторые позиции предметов заданы как 0, исправьте " +
                "позиции или нажмите кнопку 'Сортировать позиции' чтобы сортировать их по порядку от 1!");
            return;
        }
        var check = $scope.verifyChoose(subjs);
        if (check) {
            var daytable = $scope.createTable(subjs);
            angular.copy(daytable, subjs);
        }
    }
    $scope.verifyChoose = function (choose) {
        var check = true, i, j;
        for (i = 0; i < choose.length && check; i++) {
            for (j = i + 1; j < choose.length && check; j++) {
                if (choose[i].position == choose[j].position && (choose[i].id != -1 && choose[j].id != -1)) {
                    window.alert("Предмет '" + choose[i].name + "' (" + (i + 1) + ") " +
                        "и предмет '" + choose[j].name + "' (" + (j + 1) +
                        ") имеют одинаковый приоритет, исправьте перед сохранением!");
                    check = false;
                }
            }
        }
        return check;
    };
    $scope.saveDay = function () {
        if (angular.equals($scope.bindDay, {})) {
            window.alert('День не найден, критическая ошибка системы!!!');
            console.log('Day not found error! day - ' + angular.toJson($scope.editDay));
            return;
        }

        var subjs = $scope.editDay.daysubjects;
        if (getPositions(subjs).indexOf(0) != -1) {
            window.alert("Некоторые позиции предметов заданы как 0, исправьте " +
                "позиции или нажмите кнопку 'Сортировать позиции' чтобы сортировать их по порядку от 1!");
            return;
        }
        var check = $scope.verifyChoose(subjs);
        if (check) {
            angular.copy($scope.editDay, $scope.bindDay);
            $scope.bindDay.daysubjects = $scope.createTable(subjs);
            angular.copy($scope.bindDay, $scope.dayRef);
            $scope.dayRef = null;
            $scope.bindDay = {};
            $scope.editDay = {};
            $scope.editProcessing = false;

        }
    };
    $scope.endEditing = function () {
    };
    $scope.showday = function () {
        window.alert("Day object info: " + angular.toJson($scope.editDay));
    };
    $scope.NumberOfPages = function () {
        return  Math.ceil(parseInt($scope.subjects.length) / parseInt($scope.pageSize));
    };
    $scope.clear_confirm = function (tt_day) {
        if (window.confirm("Вы хотите очистить расписание дня '" + tt_day.name + "'?"))
            angular.copy($scope.defDay.daysubjects, tt_day.daysubjects);
    };
    $scope.changePaging = function () {
        if ($scope.curPage > 0)
            $scope.curPage = 0;
    };
//    $scope.$watch(getPositions($scope.editDay.daysubjects),$scope.createTTable,true);
}]);