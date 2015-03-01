/**
 * Created by tmshv on 06/11/14.
 */

angular.module("hudozhka.data", [])
    .service("team", function () {
        return require("../models/team");
    })
    .service("schedule", function () {
        return require("../models/schedule");
    })
    .service("docs", function () {
        return require("../models/document");
    })
    .service("config", function(){
        return {
            telephone: "8 (81362) 76-312"
        };
    });