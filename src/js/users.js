import m from "mithril";
import Cookies from "js-cookie";

var users = {};

users.vm = {};

class User {
  constructor(user) {
    this.user_id = m.prop(user.user_id);
    this.number = m.prop(user.number);
    this.name = m.prop(user.name);
    this.image_path = m.prop(user.image_path);
    this.college = {
      code: m.prop(user.college.code),
      name: m.prop(user.college.name)
    };
  }
}

users.vm.init = function() {
  var token = m.prop(Cookies.get("token"));
  if (token()) {
    this.user = m.request({
      method: "GET",
      url: "http://localhost:8000/users",
      config: (xhr) => xhr.setRequestHeader("Authorization", `Bearer ${token()}`),
      unwrapSuccess: (response) => {
        return new User(response);
      },
      unwrapError: () => {
        Cookies.remove("token");
        m.route("/login");
      }
    });
  } else {
    m.route("/login");
  }
};

users.controller = function() {
  users.vm.init();
};

users.view = function(ctrl) {
  var vm = users.vm;
  return m("div", [
    m("table", [
      m("tr", [
        m("td", "ユーザID"),
        m("td", vm.user().user_id())
      ]),
      m("tr", [
        m("td", "学籍番号"),
        m("td", vm.user().number())
      ]),
      m("tr", [
        m("td", "氏名"),
        m("td", vm.user().name())
      ]),
      m("tr", [
        m("td", "カレッジコード"),
        m("td", vm.user().college.code())
      ]),
      m("tr", [
        m("td", "カレッジ名"),
        m("td", vm.user().college.name())
      ]),
      m("img", { src: vm.user().image_path() }),
    ])
  ]);
};

module.exports = users
