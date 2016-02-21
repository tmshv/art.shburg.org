/**
 * Created by tmshv on 04/11/14.
 **/

import Document from './components/Document';
import Award from './components/Award';
import GalleryItem from './components/GalleryItem';
import TeamMemberProfile from './components/TeamMemberProfile';
import AppController from './controllers/AppController';
import api from './api/api';

let deps = [
    require('./modules/schedule')
].map(m => m.name);

let app = angular.module('hudozka', deps.concat([
    'hudozhka.data',
    'ngRoute',
    'angulartics',
    'angulartics.google.analytics',
    'angularSpinner'
]));

app.config(($locationProvider, $routeProvider) => {
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(true);

    let routes = [
        {
            name: '/',
            templateUrl: '/views/home.html',
            controller: 'HomePageController',
            title: 'ДХШ Шлиссельбурга'
        },
        {
            name: '/schedule/:period?/:semester?',
            templateUrl: '/views/schedule.html',
            controller: 'SchedulePageController',
            title: 'Расписание'
        },
        {
            name: '/team',
            templateUrl: '/views/team.html',
            controller: 'TeamPageController',
            title: 'Преподаватели'
        },
        {
            name: '/gallery',
            templateUrl: '/views/gallery.html',
            controller: 'GalleryPageController',
            title: 'Работы учащихся'
        },
        {
            name: '/gallery/:year/:course/:album',
            templateUrl: '/views/gallery-album.html',
            controller: 'AlbumPageController'
        },
        {
            name: '/docs',
            templateUrl: '/views/docs.html',
            controller: 'DocsPageController',
            title: 'Документы'
        }
    ];

    routes.forEach(route => {
        if (typeof route === 'function') route = route();
        $routeProvider.when(route.name, route);
    });

    $routeProvider.otherwise({
        templateUrl: '/404.html'
    });
});

app.run(($location, $rootScope, $http) => {
    $rootScope.$on('$routeChangeSuccess', (event, current) => {
        let title = current['$$route'].title;
        if (title) $rootScope.title = title;
    });

    $http.defaults.headers.common['Accept'] = 'application/json';
});

[
    api,
    require('./services/io'),
    require('./directives/mainMenu'),
    require('./directives/backgroundPicture'),
    require('./ui/menu'),
    require('./ui/breadcrumbs'),
    require('./ui/timeline'),
    require('./filters/strip'),
    require('./filters/remove-hashtags'),
    require('./filters/removeNewline'),
    require('./filters/uppercase-first'),
    require('./pages/home'),
    require('./pages/schedule'),
    require('./pages/team'),
    require('./pages/gallery'),
    require('./pages/docs'),
    require('./controllers/ContactsController'),
    require('./controllers/CopyrightController'),
    Document,
    Award,
    GalleryItem,
    TeamMemberProfile,
    AppController,
    function (app) {
        app.controller('SchedulePageController', ($scope) => {
            $scope.pageClass = 'page-schedule';
        });

        app.controller('DocsPageController', ($scope) => {
            $scope.pageClass = 'page-docs';
        });
    }
].map(i => i(app));