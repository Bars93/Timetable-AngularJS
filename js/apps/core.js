angular.module("timetable", ['timetableFilters'])
function timetableCtrl($scope) {
    $scope.curPage = 0;
    $scope.pageSize = 1;
    $scope.data = [];
    for(i=0;i<50;i++)
    $scope.data.push("item " + i);
    $scope.days = [
        {id: 1, 'name': 'Понедельник', daysubjects: [
            {'id': 1, 'name': 'Низкоуровневое программирование', selected: false, position: 2},
            {'id': 2, 'name': 'Человеко-машинное взаимодействие', selected: false, position: 4}
        ]},
        {id: 2, 'name': 'Вторник', daysubjects: [
            {'id': 2, 'name': 'Человеко-машинное взаимодействие', selected: false, position: 4}
        ]},
        {id: 3, 'name': 'Среда', daysubjects: []},
        {id: 4, 'name': 'Четверг', daysubjects: []},
        {id: 5, 'name': 'Пятница', daysubjects: []},
        {id: 6, 'name': 'Суббота', daysubjects: []},
        {id: 7, 'name': 'Воскресенье', daysubjects: []}
    ];
    $scope.subjects = [
        {'id': 1, 'name': 'Низкоуровневое программирование', selected: false, position: 0},
        {'id': 2, 'name': 'Человеко-машинное взаимодействие', selected: false, position: 0}
    ];
    $scope.NumberOfPages = function () {
        return  Math.ceil($scope.subjects.length / $scope.pageSize);
    };
    $scope.subjectedit = function () {
        var elem = $("#day_editor");
        elem.removeClass("hide");
        elem.addClass("show");
    };
}