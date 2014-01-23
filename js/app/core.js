/*
 * Main module of AngularJS application
 * Depends of timetableFilters (filters.js) and timetableServices (services.js) modules
 * created by Irbis (Daniel)
 * */
'use strict';
var app = angular.module("timetable", ['timetableFilters', 'timetableServices']);
app.controller('timetableCtrl', ['$scope', 'ServData', function ($scope, ServData) {
    $scope.editProcessing = false; // flags means is edit in process
    $scope.curPage = 0; // @Pagination - current page variable
    $scope.pageSize = 5; // @Pagination - subjects count per page
    $scope.dayRef = null; // editing day back reference
    $scope.limit = 7; // limit subjects count per day
    $scope.pagingValues = [1, 5, 7, 10, 15, 25]; // @Pagination values for pageSize
    $scope.timePairs = ["08:30 - 09:55", "10:10 - 11:35", "11:50 - 13:15", "13:45 - 15:10",
        "15:25 - 16:50", "17:05 - 18:30", "18:40 - 20:00"]; // Time ranges strings list for column in days listing table
    $scope.dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']; // values for day names
    /* default (clear) daysubject array
     * Format
     * {
     * "id": -1 by default, or subject id (integer)
     * "name": '' by default or subject name (string)
     * "position": ordered by, incremental (integer)
     * "selected": binded with special checkbox (boolean)
     * }*/
    $scope.daysubjects = [
        {"id": -1, "name": '', "position": 1, "selected": false},
        {"id": -1, "name": '', "position": 2, "selected": false},
        {"id": -1, "name": '', "position": 3, "selected": false},
        {"id": -1, "name": '', "position": 4, "selected": false},
        {"id": -1, "name": '', "position": 5, "selected": false},
        {"id": -1, "name": '', "position": 6, "selected": false},
        {"id": -1, "name": '', "position": 7, "selected": false}
    ];
    $scope.editDay = {}; // editDay, when editProcessing = true;
    $scope.bindDay = {}; // bindDay, object referenced by day[now] (now - index of editing day)
    $scope.nullLine = {"id": -1, "name": '', "position": 0}; // nullLine or clear string in timetable
    /*
     * Array of objects days
     * Format of object
     * {
     * "id" - identifical number of day (integer number)
     * "name" - writable name, binded with special select tag (string)
     * "daysubjects" - subject of current day (array of object)(=subjects format)
     * }*/
     $scope.days = [
        {
            "id": 1,
            "name": "Понедельник",
            "daysubjects": [
                {"id": -1, "name": '', "position": 1, "selected": false},
                {"id": -1, "name": '', "position": 2, "selected": false},
                {"id": -1, "name": '', "position": 3, "selected": false},
                {"id": -1, "name": '', "position": 4, "selected": false},
                {"id": -1, "name": '', "position": 5, "selected": false},
                {"id": -1, "name": '', "position": 6, "selected": false},
                {"id": -1, "name": '', "position": 7, "selected": false}
            ]
        },
        {
            "id": 2,
            "name": "Вторник",
            "daysubjects": [
                {"id": -1, "name": '', "position": 1, "selected": false},
                {"id": -1, "name": '', "position": 2, "selected": false},
                {"id": -1, "name": '', "position": 3, "selected": false},
                {"id": -1, "name": '', "position": 4, "selected": false},
                {"id": -1, "name": '', "position": 5, "selected": false},
                {"id": -1, "name": '', "position": 6, "selected": false},
                {"id": -1, "name": '', "position": 7, "selected": false}
            ]
        },
        {
            "id": 3,
            "name": "Среда",
            "daysubjects": [
                {"id": -1, "name": '', "position": 1, "selected": false},
                {"id": -1, "name": '', "position": 2, "selected": false},
                {"id": -1, "name": '', "position": 3, "selected": false},
                {"id": -1, "name": '', "position": 4, "selected": false},
                {"id": -1, "name": '', "position": 5, "selected": false},
                {"id": -1, "name": '', "position": 6, "selected": false},
                {"id": -1, "name": '', "position": 7, "selected": false}
            ]
        },
        {
            "id": 4,
            "name": "Четверг",
            "daysubjects": [
                {"id": -1, "name": '', "position": 1, "selected": false},
                {"id": -1, "name": '', "position": 2, "selected": false},
                {"id": -1, "name": '', "position": 3, "selected": false},
                {"id": -1, "name": '', "position": 4, "selected": false},
                {"id": -1, "name": '', "position": 5, "selected": false},
                {"id": -1, "name": '', "position": 6, "selected": false},
                {"id": -1, "name": '', "position": 7, "selected": false}
            ]
        },
        {
            "id": 5,
            "name": "Пятница",
            "daysubjects": [
                {"id": -1, "name": '', "position": 1, "selected": false},
                {"id": -1, "name": '', "position": 2, "selected": false},
                {"id": -1, "name": '', "position": 3, "selected": false},
                {"id": -1, "name": '', "position": 4, "selected": false},
                {"id": -1, "name": '', "position": 5, "selected": false},
                {"id": -1, "name": '', "position": 6, "selected": false},
                {"id": -1, "name": '', "position": 7, "selected": false}
            ]
        },
        {
            "id": 6,
            "name": "Суббота",
            "daysubjects": [
                {"id": -1, "name": '', "position": 1, "selected": false},
                {"id": -1, "name": '', "position": 2, "selected": false},
                {"id": -1, "name": '', "position": 3, "selected": false},
                {"id": -1, "name": '', "position": 4, "selected": false},
                {"id": -1, "name": '', "position": 5, "selected": false},
                {"id": -1, "name": '', "position": 6, "selected": false},
                {"id": -1, "name": '', "position": 7, "selected": false}
            ]
        },
        {
            "id": 7,
            "name": "Воскресенье",
            "daysubjects": [
                {"id": -1, "name": '', "position": 1, "selected": false},
                {"id": -1, "name": '', "position": 2, "selected": false},
                {"id": -1, "name": '', "position": 3, "selected": false},
                {"id": -1, "name": '', "position": 4, "selected": false},
                {"id": -1, "name": '', "position": 5, "selected": false},
                {"id": -1, "name": '', "position": 6, "selected": false},
                {"id": -1, "name": '', "position": 7, "selected": false}
            ]
        }
    ];
    /*
     * loadDaysData - function load JSON data from server, in successful way store it in $scope.days variable,
     * in failure way alerting about error
     * Note: no optimized, sometimes delays are around 1-2 seconds, maybe cause perfomance of notebook so smaller
     * @param - no params
     * @returns - no returns
     * */
    $scope.loadDaysData = function () {
        ServData.loadData("days.json").success(function (data, status) {
            if (status == 200) {
                try {
                    $scope.days = angular.fromJson(data);
                }
                catch (e) {
                    console.error("Parsing error! ", e);
                }
            }
        }).error(function (data, status) {
                window.alert("Ошибка на стороне сервера! Ошибка: " + status + " (" + data + ")");
            });
    };
    /*
     * saveDaysData - function send JSON data from variable $scope.days to server, in successful way alerting about success,
     * in failure way alerting about error
     * Note: no optimized, sometimes delays are around 1-2 seconds, maybe cause perfomance of notebook so smaller
     * @param - no params
     * @returns - no returns
     * */
    $scope.saveDaysData = function () {
        var exp = {
            "data": angular.toJson($scope.days),
            "file": "days.json"
        };
        ServData.saveData(exp).success(function (data, status) {
            if (status == 200) {
                window.alert("Данные успешно сохранены!");
            }
        }).error(function (data,status) {
                window.alert("Ошибка на стороне сервера! Ошибка: " + status + " (" + data + ")");
            });
    };
    /*
     * loadSubjects - function load JSON data from server, in successful way store it in $scope.subjects variable,
     * in failure way alerting about error
     * Note: no optimized, sometimes delays are around 1-2 seconds, maybe cause perfomance of notebook so smaller
     * @param - no params
     * @returns - no returns
     * */
    $scope.loadSubjects = function () {
        ServData.loadData("subjects.json").success(function (data, status) {
            if (status == 200) {
                try {
                    $scope.subjects = angular.fromJson(data);
                }
                catch (e) {
                    console.error("Parsing error! ", e);
                }
            }
        }).error(function (data, status) {
                window.alert("Ошибка на стороне сервера! Ошибка: " + status + " (" + data + ")");
            });
    };
    /*
     * loadFAMI_5semester - function load JSON data from server, in successful way store it in $scope.subjects variable,
     * in failure way alerting about error
     * Note: no optimized, sometimes delays are around 1-2 seconds, maybe cause perfomance of notebook so smaller
     * Note: loading default FAMI 5th semester subjects from file fami_5sem.json
     * @param - no params
     * @returns - no returns
     * */
    $scope.loadFAMI_5semester = function () {
        ServData.loadData("fami_5sem.json").success(function (data, status) {
            if (status == 200) {
                try {
                    $scope.subjects = angular.fromJson(data);
                }
                catch (e) {
                    console.error("Parsing error! ", e);
                }
            }
        }).error(function (data, status) {
                window.alert("Ошибка на стороне сервера! Ошибка: " + status + " (" + data + ")");
            });
    };
    /*
     * saveSubjects - function send JSON data from variable $scope.subjects to server, in successful way alerting about success,
     * in failure way alerting about error
     * Note: no optimized, sometimes delays are around 1-2 seconds, maybe cause perfomance of notebook so smaller
     * @param - no params
     * @returns - no returns
     * */
    $scope.saveSubjects = function () {
        var exp = {
            "data": angular.toJson($scope.subjects),
            "file": "subjects.json"
        };
        ServData.saveData(exp).success(function (data, status) {
            if (status == 200) {
                window.alert("Данные успешно сохранены!");
            }
        }).error(function (data,status) {
                window.alert("Ошибка на стороне сервера! Ошибка: " + status + " (" + data + ")");
            });
    };
    /*
     * subjects - array of objects (subjects)
     * Format
     * {
     * "id": incremental, ordered by (integer)
     * "name": writable name of subject (string)
     * "selected": binded with special checkbox (boolean)
     * "position": current position in timetable (integer)
     * }*/
    $scope.subjects = [
        {"id": 1, "name": "Низкоуровневое программирование", "selected": false, "position": 0},
        {"id": 2, "name": "Человеко-машинное взаимодействие", "selected": false, "position": 0},
        {"id": 3, "name": "Математическая статистика", "selected": false, "position": 0},
        {"id": 4, "name": "Основы теории информации и криптографии", "selected": false, "position": 0}
    ];
    /*
     * addSubject - function, add subject to a editDay (currently editable day)
     * @param - subj {=object} - currently subject to add
     * @return - no returns
     * */
    $scope.addSubject = function (subj) {
        if ($scope.editProcessing) {
            var tmp = {};
            angular.copy(subj, tmp);
            var fPos = $scope.editDay.daysubjects.map(function (e) {
                return e.id;
            }).indexOf(-1); // maping daysubjects for getting only ids of subjects and get first occurence of "id"=-1
            if (fPos != -1) { // if found nullLine
                tmp.position = fPos + 1;
                $scope.editDay.daysubjects[fPos] = tmp;
            }
            else if ($scope.editDay.daysubjects.length < 7) { // if nullLine not found but daysubjects nut full
                tmp.position = $scope.editDay.daysubjects.length + 1;
                $scope.editDay.daysubjects.push(tmp);
            }
            else { // any other way
                window.alert('Расписание заполнено!');
            }

        }
        else {
            window.alert('Выберете день для создания/редактирования расписания!');
        }

    };
    /*
     * getPositions - global function to getting array of positions, use mapping
     * Note: only for internal using
     * @param subj_array {=object}, predictionally featured for mapping array of objects (=subjects format)
     * @returns - array of positions of subjects*/
    var getPositions = function (subj_array) {
        return subj_array.map(function (e) {
            return e.position;
        });
    };
    /*
     * showeditor - function, start edit processing
     * @param day{=object} - reference on day object ot edit
     * @returns - no returns
     * */
    $scope.showeditor = function (day) {
        var check = false;
        if ($scope.editProcessing) {
            check = window.confirm("Вы хотите редактировать этот день не сохранив текущее расписание?");
            // confirm on editing day without saving old edit data
        }
        else {
            check = true;
        }
        if (check) {
            angular.copy(day, $scope.bindDay); // copy (clone) object day to bindDay
            $scope.dayRef = day; // make reference from dayRef to day
            day = $scope.bindDay; // make reference from day to bindDay (do not touch, it's magic)
            angular.copy(day, $scope.editDay); // copy day object (aka reference (?)) to editDay (without it won't save)
            $scope.editProcessing = true; // flag for edit in process
        }
    };
    /*
     * bindingDay - function, bind day if it changed by select tag
     * @param - no params
     * @returns - no returns
     * */
    $scope.bindingDay = function () {
        if (window.confirm("Вы хотите поменять день?")) { // confirm on changing day
            var days = $scope.days; // short reference to days array
            for (var i = 0; i < days.length; i++) { // iteration of all array
                if (angular.equals(days[i].name, $scope.editDay.name)) { // get equals strings name
                    if (!angular.equals($scope.bindDay, $scope.dayRef))
                        angular.copy($scope.bindDay, $scope.dayRef); // copy bindDay object to variable by dayRef reference (save not editable data back)
                    $scope.dayRef = days[i]; //  make reference to a new day
                    console.log("binding! Bingo! Days ds = " + angular.toJson(days[i].daysubjects) + "; binded ds = " +
                        angular.toJson($scope.bindDay.daysubjects)); // loging to console (debug info)
                    break;
                }
            }
        }
    };
    /*
     * getRealSubjectCount - global function, gets real subjects count without nullLines
     * Note: only for internal using
     * @param - subjs{=object}, object of arrays (=subjects format)
     * @returns - count of real count of subjects
     * */
    var getRealSubjectCount = function (subjs) {
        var ids = subjs.map(function (e) {
            return e.id
        });
        var count = 0;
        for (var i = 0; i < ids.length; i++) {
            if (ids[i] != -1) count++;
        }
        return count;
    };
    /*
     * checkSubject - function for checking subjects in timetable on overflow,
     * uncheck binded checkbox if overflow is
     * @param subj{=object} - currently checked subject
     * @returns - no returns
     * */
    $scope.checkSubject = function (subj) {
        if (($scope.limit - $scope.getFreeSlotsSubjectsCount() + 1) == 0) {
            subj.selected = false;
        }
    };
    /*
     * getFreeSlotsSubjectsCount - function, get free slots to add subject
     * @param - no params
     * @returns - no returns
     * */
    $scope.getFreeSlotsSubjectsCount = function () {
        var sel = $scope.subjects.map(function (e) {
            return e.selected;
        }); // maping subjects to get array of selected properties
        var count = 0; // counter
        for (var i = 0; i < sel.length; i++)
            if (sel[i] == true)
                count++;
        if (!($scope.editDay === {})) // only if editDay
            count += getRealSubjectCount($scope.editDay.daysubjects);
        return count;
    };
    /*
     * addSelectedSubjects - function, get selected subjects and add it to timetable if there is a possibility
     * @param - no params
     * @returns - no returns
     * */
    $scope.addSelectedSubjects = function () {
        if ($scope.editProcessing) {
            var selSubjs = $.grep($scope.subjects, function (value, index) {
                console.log("subj index: " + index + " selected: " + value.selected);
                return (value.selected == true);
            }); // getting selected object
            $.each($scope.subjects, function (index, value) {
                value.selected = false;
            }); // unselect for any other selections
            $.each(selSubjs, function (index, value) {
                $scope.addSubject(value);
            }); // each object in selSubjs add to timetable
        }
        else {
            window.alert("Выберете день для создания/редактирования расписания!");
        }
    };
    /*
     * removeSubjTTable - function, remove one element from index @ind in array @subjs
     * @param - subjs{=object} - array of object (=subjects format)
     * @param - ind{=integer} - index of element to easily remove
     * @returns - no returns
     * */
    $scope.removeSubjTTable = function (subjs, ind) {
        subjs.splice(ind, 1);
        $scope.updateTTable(); // update TTable (see declaration)
    };
    /*
     * deleteSubjects - function for delete selected subjects
     * @param - no params
     * @returns - no returns
     * */
    $scope.deleteSubjects = function () {
        if (window.confirm("Вы хотите удалить эти предметы?")) { // confirm on delete subjects
            console.log("Subjects count: " + $scope.subjects.length);
            $scope.subjects = $.grep($scope.subjects, function (value, index) {
                console.log("subj: " + value + " selected: " + value.selected);
                return (value.selected == false);
            }); // grepping subjects which are not selected and save it back again.
        }
    };
     /*
     * createTable - function for specially creating timetable
     * @param - choosen{=object} - choosen subjects to a timetable (=subjects format)
     * @returns - returns table array of objects, contains subjects and newlines ordered by position (=subjects format)
     * */
    $scope.createTable = function (choosen) {
        var table = []; // clear array
        var tmp = {}; // cleary temporary object
        var i; // iterator variable
        if (choosen.length == 0) { // if array is empty
            for (i = 0; i < 7; i++) { // copy newlines to all array
                angular.copy($scope.nullLine, tmp);
                tmp.position = i + 1;
                table.push(tmp);
            }
        }
        else { // in another way
            var positions = getPositions(choosen); // getting positions array
            for (i = 0; i < 7; i++) {
                var fPos = positions.indexOf(i + 1); // find position i + 1
                if (fPos == -1) { // if not found, insert nullLine with current position number
                    angular.copy($scope.nullLine, tmp);
                    tmp.position = i + 1;
                    table.push(tmp);
                }
                else if (fPos != -1 && choosen[fPos].id != -1) {
                    // if position found and element's id not equals -1, push it to table
                    table.push(choosen[fPos]);
                }
                else { // in another way (id == -1) or position not found
                    var nPos; // getting newPos, starts from fPos (no error, if fPos = -1, incremental argument pushed
                    // to indexOf
                    if ((nPos = positions.indexOf(i + 1, fPos + 1)) != -1 && choosen[nPos].id != -1) {
                        // if new position found
                        table.push(choosen[nPos])
                    }
                    else {
                        // in another way
                        table.push(choosen[fPos]);
                    }
                }
            }
        }
        return table;
    };
    /*
    * updateTTable - function, update editable day's subjects
    * @param - no params
    * @returns - no returns
    * */
    $scope.updateTTable = function () {
        var subjs = $scope.editDay.daysubjects;
        var check = $scope.verifyChoose(subjs); // verify user choices
        if (check) {
            var daytable = $scope.createTable(subjs); // creating table
            angular.copy(daytable, subjs); // copy it to editDay table
        }
    };
    /*
    * verifyChoose - function, verify user choices
    * @param - choose{=object}, editable day's subjects (=subjects format)
    * @returns - returns boolean value, true if verify ended successfully, false - any other way*/
    $scope.verifyChoose = function (choose) {
        var check = true, i, j;
        for (i = 0; i < choose.length && check; i++) {
            for (j = i + 1; j < choose.length && check; j++) {
                if (choose[i].position == choose[j].position && (choose[i].id != -1 && choose[j].id != -1)) {
                    // verify on equals positions and id's not equals -1
                    window.alert("Предмет '" + choose[i].name + "' (" + (i + 1) + ") " +
                        "и предмет '" + choose[j].name + "' (" + (j + 1) +
                        ") имеют одинаковый приоритет, исправьте перед сохранением!");
                    check = false;
                }
            }
        }
        return check;
    };
    /*
    * saveDay - function, save editable day's data to binded day
    * @param - no params
    * @returns - no returns
    * */
    $scope.saveDay = function () {
        if (angular.equals($scope.bindDay, {})) { // too small possibility to this way, but ...
            window.alert('День не найден, критическая ошибка системы!!!');
            console.log('Day not found error! day - ' + angular.toJson($scope.editDay));
            return;
        }
        var subjs = $scope.editDay.daysubjects;
        /*if (getPositions(subjs).indexOf(0) != -1) { // if some positions
            window.alert("Некоторые позиции предметов заданы как 0, исправьте " +
                "позиции или нажмите кнопку 'Сортировать позиции' чтобы сортировать их по порядку от 1!");
            return;
        }*/ // old verify, at now positions number 0 are not
        if ($scope.verifyChoose(subjs)) { // verify user choices
            angular.copy($scope.editDay, $scope.bindDay); // copying editDay object to bindDay
            $scope.bindDay.daysubjects = $scope.createTable(subjs); // copy updated table
            angular.copy($scope.bindDay, $scope.dayRef); // copy bindDay object to binded day by reference
            $scope.dayRef = null; // breaks reference with day
            $scope.bindDay = {}; // clear object
            $scope.editDay = {};// --||--
            $scope.editProcessing = false; // edit in no process

        }
    };
    /*
    * NumberOfPages - @Pagination function, gets total number of pages
    * @param - no params
    * @returns - integer ceiled value
    * */
    $scope.NumberOfPages = function () {
        return  Math.ceil(parseInt($scope.subjects.length) / parseInt($scope.pageSize));
    };
    /*
    * clear_confirm - confirm on clearing day's timetable
    * @param - no params
    * @returns - no returns*/
    $scope.clear_confirm = function (tt_day) {
        if (window.confirm("Вы хотите очистить расписание дня '" + tt_day.name + "'?"))
            angular.copy($scope.daysubjects, tt_day.daysubjects);
    };
    /*
    * changePaging - function, turn back 1st page when pageSize changed by user
    * @param - no params
    * @returns - no returns
    * */
    $scope.changePaging = function () {
        if ($scope.curPage > 0)
            $scope.curPage = 0;
    };
    $scope.new_name = ""; // new inputed subjects name
    /*
    * newSubject - function, crete object for new subject, hide modal dialog
    * @param - no params
    * @returns - no returns
    * */
    $scope.newSubject = function () {
        var subj = {
            "id": $scope.subjects.length + 1,
            "name": $scope.new_name.replace(/[^a-zA-Z\u0430-\u044f\u0410-\u042f\u0451\u0401\u0439\u0419Z0-9\-_+\s]/g,''),
            "selected": false,
            "position": 0
        };
        $scope.subjects.push(subj);
        $scope.new_name = '';
        $("#addSubjModal").modal('hide');
    };
    /* closeEditor - function, close editor without saving
    * @param - no params
    * @returns - no returns
    * */
    $scope.closeEditor = function() {
        if(window.confirm("Вы хотите закрыть редактор без сохранения?")) {
            angular.copy($scope.bindDay, $scope.dayRef); // copy bindDay object to binded day by reference
            $scope.dayRef = null; // breaks reference with day
            $scope.bindDay = {}; // clear object
            $scope.editDay = {};// --||--
            $scope.editProcessing = false;
        }
    };
 }])
;