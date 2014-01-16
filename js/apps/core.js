var app = angular.module("timetable", ['timetableFilters']);
app.controller('timetableCtrl', ['$scope', function ($scope) {
    $scope.editProcessing = false;
    $scope.curPage = 0;
    $scope.pageSize = 5;
    $scope.pagingValues = [1, 5, 7, 10, 15, 25];
    $scope.addingActive = true;
    $scope.timePairs = ["8:30 - 9:55", "10:10 - 11:35", "11:50 - 13:15", "13:45 - 15:10",
        "15:25 - 16:50", "17:05 - 18:30", "18:40 - 20:00"];
    $scope.dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    $scope.editDay = {};
    $scope.bindDay = {};
    $scope.nullLine = {id: -1, name: '', position: 0};
    $scope.defDay = {'name': 'Понедельник', daysubjects: [
        {id: -1, name: '', position: 1},
        {id: -1, name: '', position: 2},
        {id: -1, name: '', position: 3},
        {id: -1, name: '', position: 4},
        {id: -1, name: '', position: 5},
        {id: -1, name: '', position: 6},
        {id: -1, name: '', position: 7}
    ]
    };
    $scope.days = [
        {'name': 'Понедельник', daysubjects: []},
        {'name': 'Вторник', daysubjects: []},
        {'name': 'Среда', daysubjects: []},
        {'name': 'Четверг', daysubjects: []},
        {'name': 'Пятница', daysubjects: []},
        {'name': 'Суббота', daysubjects: []},
        { 'name': 'Воскресенье', daysubjects: []}
    ];
    $scope.subjects = [
        {'id': 1, 'name': 'Низкоуровневое программирование', selected: false, position: 0},
        {'id': 2, 'name': 'Человеко-машинное взаимодействие', selected: false, position: 0},
        {'id': 3, 'name': 'Математическая статистика', selected: false, position: 0},
        {'id': 4, 'name': 'Основы теории информации и криптографии', selected: false, position: 0}
    ];
    $scope.addSubject = function (subj) {
        if (angular.equals($scope.editDay, {})) {
            angular.copy($scope.defDay, $scope.editDay);
            $scope.editProcessing = true;
        }
        if (angular.equals($scope.bindDay, {}))
            $scope.bindingDay();

        if ($scope.addingActive) {
            var tmp = {};
            angular.copy(subj, tmp);
            $scope.editDay.daysubjects.push(tmp);
        }
        else {
            window.alert("В расписание одного дня можно добавить не более 7 предметов!");
        }
        $scope.addingActive = $scope.editDay.daysubjects.length < 7;
    };
    $scope.showeditor = function (day) {
        $scope.bindDay = day;
        angular.copy(day, $scope.editDay);
        $scope.editProcessing = true;
    };
    $scope.bindingDay = function () {
        var days = $scope.days;
        for (var day in days) {
            if (angular.equals(days[day].name, $scope.editDay.name)) {
                $scope.bindDay = days[day];
                break;
            }
        }

    };
    $scope.addSelected = function () {
    };
    $scope.initTTable = function () {
        var days = $scope.days;
        for (var i = 0; i < days.length; i++) {
            days[i].daysubjects = $scope.defDay.daysubjects.slice(0);
        }
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
            })
            for (var i = 0; i < 7; i++) {
                var fPos = positions.indexOf(i + 1);
                if (fPos == -1) {
                    var tmp = {};
                    angular.copy($scope.nullLine, tmp);
                    tmp.position = i + 1;
                    table.push(tmp);
                }
                else
                    table.push(choosen[fPos]);
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
                if (choose[i].position == choose[j].position) {
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
        if(angular.equals($scope.bindDay,null) || angular.equals($scope.bindDay,{}))
            $scope.bindingDay();
        if (angular.equals($scope.bindDay, null) || angular.equals($scope.bindDay,{})) {
            window.alert('День не найден, критическая ошибка системы!!!');
            console.log('Day not found error! day - ' + angular.toJson($scope.editDay));
            return;
        }
        ;
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
            angular.copy(daytable, $scope.bindDay.daysubjects);
            $scope.bindDay = null;
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
            tt_day.daysubjects = [];
    };
    $scope.changePaging = function () {
        if ($scope.curPage > 0)
            $scope.curPage = 0;
    };
}]);