/**
 * Created by tmshv on 22/11/14.
 */

var route = require("koa-route");
var router = require("./");
var db = require("../core/db");
var schedule = require("../models/schedule");
var populate = require("../utils/populate").populate;
//import {getCourseNameByID} from "../models/course";
//const team = require("../models/team");

module.exports = function (app) {
    app.use(
        route.get("/schedule/:period?/:semester?", router.accepts(
            {
                "text/html": router.index(),
                "text/plain": router.index(),

                "application/json": function *(period, semester) {
                    this.type = "application/json";

                    var doPopulate = this.query.populate || false;

                    var data = yield db.c("schedules").findOne({
                        period: period,
                        semester: semester
                    });

                    if(!data) {
                        this.status = 404;
                        return;
                    }

                    if(doPopulate) {
                        //data.schedule = schedule.populate(data.schedule, [
                        //    populate(team.short, "teacher"),
                        //    populate(getCourseNameByID, "lesson")
                        //]);
                    }

                    this.body = data;
                }
            }
        ))
    );

    app.use(
        route.get("/schedules", router.accepts(
            {
                "text/html": router.index(),
                "text/plain": router.index(),

                "application/json": function *() {
                    this.type = "application/json";
                    var data = yield db.c("schedules").find({}, {period:1 , semester: 1}).toArray();
                    if(!data) this.status = 404;
                    else this.body = data;
                }
            }
        ))
    );
};