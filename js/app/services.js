'use strict';
var serv = angular.module('timetableServices',['ngResource']);
serv.factory('DaysServ', ['$resource',function($resource) {
   return $resource('./data/days/day_:dayid'+'.json',{},{});
}]);