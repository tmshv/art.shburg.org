import co from 'co';
import route from 'koa-route';
import {c} from '../core/db';
import {json} from './';

export default function (app) {
    app.use(route.get('/gallery', json(
        function *() {
            let query = {};
            let fields = ['_id', 'id', 'title', 'date'];
                //.reduce((f, i) => {
                //    f[i] = 1;
                //    return f;
                //}, {});

            let albums = yield c('albums')
                .find(query)
                .toArray();

            //albums = albums.map(i => {
            //    return fields.reduce((a, key)=> {
            //        a[key] = i[key];
            //        return a;
            //    }, {});
            //});

            albums = yield albums.map(processAlbum);
            this.body = albums;
        }
    )));

    //app.use(route.get('/gallery/:year', json(
    //    function *(year) {
    //        year = parseInt(year);
    //        let start = new Date(year, 0, 1);
    //        let end = new Date(year, 11, 31);
    //        let query = {
    //            date: {$gte: start, $lt: end}
    //        };
    //        let albums = yield c('albums')
    //            .find(query)
    //            .toArray();
    //
    //        albums = yield albums.map(processAlbum);
    //        this.body = albums;
    //    }
    //)));

    app.use(route.get('/album/:id', json(
        function *(id) {
            //year = parseInt(year);
            //course = '/' + course;
            //album = '/' + album;
            //let start = new Date(year, 0, 1);
            //let end = new Date(year, 11, 31);
            //let query = {
            //    date: {$gte: start, $lt: end},
            //    course_uri: course,
            //    uri: album
            //};

            let record = yield c('albums').findOne({
                id: id
            });
            record = yield processAlbum(record);
            this.body = record;
        }
    )));
};

let processAlbum = album => co(function *() {
    //album.url = `/gallery/{year}{course}{album}`
    //    .replace('{year}', album.date.getFullYear())
    //    .replace('{course}', album.course_uri)
    //    .replace('{album}', album.uri);
    album.url = `/album/${album.id}`;

    //album.content = yield album.content.map(product_id => co(function *() {
    //    let product = yield c('products').findOne({_id: product_id});
    //    if (product) return product;
    //    else return null;
    //}));

    //let teacher = yield c('collective').findOne({id: album.teacher});
    //album.teacher = teacher.name;

    let previewImageId = album.images[0];
    let image = yield c('images').findOne({_id: previewImageId});
    album.preview = image.data.medium;

    return album;
});