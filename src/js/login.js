import m from "mithril";
import Cookies from "js-cookie";

var login = {};

login.vm = {};

login.user = function() {
  this.number = m.prop("");
  this.password = m.prop("");
}

login.vm.init = function() {
  this.user = new login.user();
  this.message = m.prop("入力してね");
  this.number = m.prop("");
  this.password = m.prop("");

  this.login = function() {
    m.request({
      method: "POST",
      url: "http://localhost:8000/auth/login",
      data: { number: this.number, password: this.password },
      unwrapSuccess: (response) => {
        Cookies.set("token", response.token);
        m.route("/users");
      },
      unwrapError: () => {
        this.message("学籍番号もしくはパスワードが違います");
      }
    });
  }
};

login.controller = function() {
  login.vm.init();
};

login.view = function(ctrl) {
  var vm = login.vm;
  return m("div", [
    m("h1", [vm.message()]),
    m("div", [
      m("label", ["学籍番号:", m("input", { value: vm.number(), onchange: m.withAttr("value", vm.number) })]),
      m("label", ["パスワード:", m("input[type=password]", { value: vm.password(), onchange: m.withAttr("value", vm.password) })]),
      m("button", { onclick: vm.login.bind(vm) }, ["submit"])
    ])
  ]);
};

module.exports = login
