var m = require("mithril");
var Cookies = require("js-cookie")
var login = require("./login")
var users = require("./users")

m.route(document.querySelector("#content"), "/login",
  {
    "/login": login,
    "/users": users,
    "/events": login,
    "/files": login
  }
);
