/*
 * Module of filters for timetable AngularJS application
 * Depended by timetable (core.js),
 * no dependences
 * created by Irbis (Daniel)
 * */
'use strict';
// creating module and filter
angular.module('timetableFilters', []).filter('startFrom', function () {
    return function (input, start) {
        start = parseInt(start); //parse to int
        return input.slice(start);
    }
});