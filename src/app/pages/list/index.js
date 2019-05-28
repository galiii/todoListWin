import template from "./template.html";
import ListCtrl from "./ListCtrl";

export default {
  url: "/list",
  name: "list",
  template: template,
  controller: ListCtrl,
  resolve: {
    lists: function($http) {
      return $http.get("/list").then(function(response) {
        return response.data;
      });
    }
  }
};
