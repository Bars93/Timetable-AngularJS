angular.module('timetableFilters', []).filter('startFrom', function () {
    return function (input, start) {
        start = parseInt(start); //parse to int
        return input.slice(start);
    }
});