/**
 * Created by tmshv on 22/11/14.
 */

var route = require("koa-route");
var router = require("./");
var db = require("../core/db");

module.exports = function (app) {
    app.use(route.get("/news", router.accepts({
        "text/html": function *(){
            this.redirect("/");
        },
        "text/plain": function *(){
            this.redirect("/");
        },
        "application/json": function *(){
            var count = parseInt(this.query["count"]) || 10;
            var portion = parseInt(this.query["portion"]) || 0;
            var skip = portion * count;

            var query = {};
            if(this.query.type) query.type = this.query.type;

            this.body = yield db.c("posts").find(query).skip(skip).limit(count).toArray();
        }
    })));

    app.use(route.get("/news/:uri", router.accepts({
        "text/html": router.index(),
        "text/plain": router.index(),
        "application/json": function *(uri){
            var item = yield db.c("posts").findOne({uri: uri});
            if(item){
                this.body = item;
            }else {
                this.status = 404;
            }
        }
    })));
};