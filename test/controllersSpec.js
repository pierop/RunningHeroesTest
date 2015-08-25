'use strict';

describe('RunningHeroes controllers', function () {

    beforeEach(module('runningHeroesApp'));
    beforeEach(module('runningHeroesServices'));

    /* Tests for 'RepositoriesListCtrl' */
    describe('RepositoriesListCtrl', function () {
        var scope, ctrl, $httpBackend, Repositories;
        var repo = [{
                "id": 12014401,
                "name": "Tetris",
                "full_name": "dtrupenn/Tetris",
                "owner": {
                    "login": "dtrupenn",
                    "id": 872147
                },
                forks_count: 24,
                stargazers_count: 8,
                watchers_count: 8
            },
            {
                "id": 4011224,
                "name": "tetris",
                "full_name": "mafintosh/Tetris",
                "owner": {
                    "login": "mafintosh",
                    "id": 789562
                },
                forks_count: 12,
                stargazers_count: 86,
                watchers_count: 86
            }];

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, _Repositories_) {
            // Define the 'Repositories' service            
            Repositories = _Repositories_;

            $httpBackend = _$httpBackend_;
            // Define the response when reaching the given url
            $httpBackend.when('GET', 'https://api.github.com/search/repositories?q=tetris').respond(
                    {
                        "total_count": 40,
                        "incomplete_results": false,
                        "items": repo
                    });

            // Create an empty scope
            scope = $rootScope.$new();
            // Declare the controller and inject the empty scope
            ctrl = $controller('RepositoriesListCtrl', {$scope: scope});
        }));

        /** Test of 'SearchRepositories' service **/

        it('should retrieve a list of 2 repositories', function () {
            scope.query = 'tetris';
            // At initialization, the 'repositories' object is null
            expect(scope.repositories).toBe(null);
            // This function will call the 'SearchRepositories' service and update the 'repositories' object
            scope.getRepositories();
            $httpBackend.flush();
            expect(scope.repositories.length).toBe(2);
            expect(scope.repositories[0].id).toBe(12014401);
        });

        /** Tests of 'Repositories' service **/

        it('should set a list of repositories', function () {
            Repositories.setRepositories(repo);
            expect(Repositories.getRepositories()).toBeDefined();
        });

        it('should get a list of two repositories', function () {
            Repositories.setRepositories(repo);
            expect(Repositories.getRepositories().length).toBe(2);
        });
    });
    

    /* Tests for 'RepositoryDetailCtrl' */
    describe('RepositoryDetailCtrl', function () {
        var scope, ctrl, MockService;

        beforeEach(inject(function ($routeParams, $rootScope, $controller) {
            $routeParams.repositoryId = "12014401";

            // Define the service
            MockService = {
                getRepositories: function () {
                    return [{
                            "id": 12014401,
                            "name": "Tetris",
                            "full_name": "dtrupenn/Tetris",
                            "owner": {
                                "login": "dtrupenn",
                                "id": 872147
                            },
                            forks_count: 24,
                            stargazers_count: 8,
                            watchers_count: 8
                        },
                        {
                            "id": 4011224,
                            "name": "tetris",
                            "full_name": "mafintosh/Tetris",
                            "owner": {
                                "login": "mafintosh",
                                "id": 789562
                            },
                            forks_count: 12,
                            stargazers_count: 86,
                            watchers_count: 86
                        }];
                }};
            // Keep track of the calls the getRepositories() function
            spyOn(MockService, 'getRepositories').and.callThrough();

            // Create an empty scope
            scope = $rootScope.$new();
            // Declare the controller and inject the empty scope and the service
            ctrl = $controller('RepositoryDetailCtrl', {$scope: scope, 'Repositories': MockService});
        }));

        /* Test the initialization if the 'repository' object */

        it('should retrieve the first repository of the list', function () {
            expect(MockService.getRepositories).toHaveBeenCalled();
            // Verify the informations of the retrieved repository
            expect(scope.repository.full_name).toBe('dtrupenn/Tetris');
            expect(scope.repository.forks_count).toBe(24);
            expect(scope.repository.stargazers_count).toBe(8);
            expect(scope.repository.watchers_count).toBe(8);
        });
    });
});
