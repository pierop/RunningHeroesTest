'use strict';

/* Services */

var runningHeroesServices = angular.module('runningHeroesServices', ['ngResource']);

/* Service to retrieve the repositories matching the given keywords */
/* Call to Github API */
runningHeroesServices.factory('SearchRepositories', ['$resource',
    function ($resource) {
        return $resource('https://api.github.com/search/repositories?q=:query', {});
    }]);

/* Service to store the repositories and access it through different pages */
runningHeroesServices.factory('Repositories', [
    function () {
        var repositories = null;
        
        return {
            getRepositories: function () {
                return repositories;
            },
            setRepositories: function (repo) {
                repositories = repo;
            }
        };
    }]);