'use strict';

/* Controllers */

var runningHeroesControllers = angular.module('runningHeroesControllers', []);

/* Controller for the repository search */
runningHeroesControllers.controller('RepositoriesListCtrl', ['$scope', 'SearchRepositories', 'Repositories',
    function ($scope, SearchRepositories, Repositories) {
        // Initialise the repositories
        $scope.repositories = Repositories.getRepositories();
        $scope.query = "";

        // Function executed when the user clicks on 'Search' button
        // Call the Search service
        $scope.getRepositories = function () {
            if (($scope.query) || ($scope.query.length !== 0)) {
                SearchRepositories.get({query: $scope.query}, function (data) {
                    console.dir(data);
                    // Save the repositories
                    Repositories.setRepositories(data.items);
                    // Update the repositories to display to user
                    $scope.repositories = Repositories.getRepositories();
                });
            }
        };
    }]);

/* Controller for the repository detail */
runningHeroesControllers.controller('RepositoryDetailCtrl', ['$scope', 'Repositories', '$routeParams',
    function ($scope, Repositories, $routeParams) {
        $scope.repository = getRepositoryById(parseInt($routeParams.repositoryId));

        function getRepositoryById(repositoryId) {
            var repository = null;
            var repositories = Repositories.getRepositories();

            // Loop through all repositories to get the one with the specified id
            if (repositories !== null) {
                for (var i = 0; i < repositories.length; i++) {
                    if (repositories[i].id === repositoryId) {
                        repository = repositories[i];
                        break;
                    }
                }
            }
            return repository;
        }
    }]);



