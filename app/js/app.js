'use strict';

/* App Module */

var runningHeroesApp = angular.module('runningHeroesApp', ['ngRoute', 'runningHeroesControllers', 'runningHeroesServices']);

/* Routing */
runningHeroesApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                .when('/repositories', {
                    templateUrl: 'partials/repositories-list.html',
                    controller: 'RepositoriesListCtrl'
                })
                .when('/repositories/:repositoryId', {
                    templateUrl: 'partials/repository-detail.html',
                    controller: 'RepositoryDetailCtrl'
                })
                .otherwise({
                    redirectTo: '/repositories'
                });
    }]);