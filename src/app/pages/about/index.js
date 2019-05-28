import template from "./template.html";
import AboutCtrl from "./AboutCtrl";

export default {
  url: "/",
  name: "about",
  template: template,
  controller: AboutCtrl,
  resolve: {
    aboutData: function($http, $stateParams) {
      return $http.get("/about").then(function(response) {
        return response.data;
      });
    }
  }
};
