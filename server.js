var path = require("path");

var koa = require("koa");
var route = require("koa-route");
var serve = require("koa-static");
var logger = require("koa-logger");
var conditional = require("koa-conditional-get");
var etag = require("koa-etag");
var prerender = require("koa-prerender");

var config = require("./config");
var routes = require("./routes");

var app = koa();
app.proxy = true;

app.use(logger());
app.use(conditional());
app.use(etag());
app.use(prerender(config.prerender));

app.use(serve(path.join(__dirname, "public")));
app.use(serve(path.join(__dirname, "templates")));

app.use(function *(next) {
	var q = this.query;
	this.query = Object.keys(q)
		.reduce(function (q, key) {
			var v = q[key];
			if(v === "true"){
				v = true;
			}else if(v === "false"){
				v = false;
			}
			q[key] = v;
			return q;
		}, q);

	yield next;
});

app.use(route.get("/", routes.index()));
app.use(route.get("/team", routes.index()));
app.use(route.get("/docs", routes.index()));

app.use(route.get("/document/:doc", routes.index(
	path.join(__dirname, "templates/document.html")
)));

require("./routes/schedule")(app);
require("./routes/news")(app);

if (process.env["NODE_ENV"] === "development") {
	app.use(route.get("/debug", function *() {
		var out = {};
		out.ip = this.ip;
		out.host = this.host;
		out.headers = this.headers;
		out.protocol = this.protocol;
		out.query = this.query;
		out.url = this.url;

		this.type = "application/json";
		this.body = out;
	}));
}

module.exports = function (port) {
	app.listen(port);
};
