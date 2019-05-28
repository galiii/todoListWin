import template from "./template.html";
import CardtCtrl from "./CardCtrl";

export default {
  url: "/:id",
  name: "lists.card",
  template: template,
  //component:'item',
  controller: CardtCtrl,
  resolve: {
    list: function($http, $stateParams) {
      return $http.get("/lists/" + $stateParams.id).then(function(response) {
        console.log("line 13", response.data);
        return response.data;
      });
    }
  }
};
