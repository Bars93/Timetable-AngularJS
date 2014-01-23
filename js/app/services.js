/*
* Module of services for timetable AngularJS application
* Depended by timetable (core.js),
* depends of ngResource (angular-resources.js)
* created by Irbis (Daniel)
* */
'use strict';
var serv = angular.module('timetableServices',['ngResource']);
// creating/provide factory
serv.factory('ServData',['$http',function($http){ // using $http low-level service
    return {
      "loadData": function(filename) { // method to load data from filename
            return $http({
                method: "GET",
                url: 'storedata.php?file='+encodeURI(filename),
                cache: false,
                isArray: true,
                headers: {
                    "Accept": "application/json"
                }
            });
      },
        "saveData": function(export_data) { // method to save JSON object export_data
            /*
            * export_data format:
            * {
            * "data": JSON encoded string data,
            * "file": filename to save data
            * }*/
            return $http({
                method: "POST",
                url: "storedata.php",
                data: export_data,
                cache: false,
                isArray: false,
                headers: {
                    "Accept": "text/plain"
                }
            });
        }
    };
}]);