import MainMenu from './components/MainMenu';
import Breadcrumbs from './components/Breadcrumbs';
import Document from './components/Document';
import Award from './components/Award';
import GalleryItem from './components/GalleryItem';
import AlbumCollection from './components/AlbumCollection';
import TeacherProfile from './components/TeacherProfile';
import Timeline from './components/Timeline';
import TimelineRecord from './components/TimelineRecord';
import TimelineRecordPost from './components/TimelineRecordPost';
import TimelineRecordInstagram from './components/TimelineRecordInstagram';
import Schedule from './components/Schedule';
import ScheduleTable from './components/ScheduleTable';
import ScheduleSlider from './components/ScheduleSlider';
import ScheduleSlide from './components/ScheduleSlide';
import ScheduleRecord from './components/ScheduleRecord';
import FooterLinks from './components/FooterLinks';

import PageSchool from './components/PageSchool';
import PageSchedule from './components/PageSchedule';

import AppController from './controllers/AppController';
import CollectiveController from './controllers/CollectiveController';
import GalleryController from './controllers/GalleryController';
import AlbumController from './controllers/AlbumController';
import DocumentsController from './controllers/DocumentsController';
import CopyrightController from './controllers/CopyrightController';
import ContactsController from './controllers/ContactsController';

import RemoveHashtags from './filters/RemoveHashtags';
import RemoveNewline from './filters/RemoveNewline';
import Strip from './filters/Strip';
import Join from './filters/Join';
import UppercaseFirst from './filters/UppercaseFirst';

import IOService from './services/io';
import MenuService from './services/menu';
import API from './services/api';

import {routes} from './config';

let app = angular.module('hudozka', [
    'hudozhka.data',
    'ngRoute',
    'angulartics',
    'angulartics.google.analytics',
    'angularSpinner'
]);

app.config(($locationProvider, $routeProvider) => {
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(true);

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
    API,
    IOService,
    MenuService,
    RemoveHashtags,
    RemoveNewline,
    Strip,
    Join,
    UppercaseFirst,
    MainMenu,
    Breadcrumbs,
    Timeline,
    TimelineRecord,
    TimelineRecordPost,
    TimelineRecordInstagram,
    Document,
    Award,
    GalleryItem,
    AlbumCollection,
    TeacherProfile,
    PageSchool,
    PageSchedule,
    AppController,
    CollectiveController,
    GalleryController,
    AlbumController,
    DocumentsController,
    CopyrightController,
    ContactsController,
    Schedule,
    ScheduleTable,
    ScheduleSlider,
    ScheduleSlide,
    ScheduleRecord,
    FooterLinks,
    function (app) {
        app.controller('GalleryPageController', ($scope) => {
            $scope.pageClass = 'page-gallery';
        });

        app.controller('AlbumPageController', ($scope) => {
            $scope.pageClass = 'page-album';
        });

        app.controller('DocumentsPageController', ($scope) => {
            $scope.pageClass = 'page-documents';
        });

        app.controller('CollectivePageController', ($scope) => {
            $scope.pageClass = 'page-collective';
        });
    }
].map(i => i(app));
