import angular from "angular";
import "@uirouter/angularjs";//for ui router

/*for angularjs material*/
import "angular-animate";
import "angular-aria";
import "angular-material";
import "angular-messages";

/* controllers */
import about from "./pages/about";
import list from "./pages/list";
import card from "./pages/card";

angular
  .module("myApp", [
    "ui.router",
    "ngAnimate",
    "ngMaterial",
    "ngMessages"
  ])
  //remove the old dependencies from the file
  .config(($stateProvider, $urlRouterProvider, $mdThemingProvider) => {
    "ngInject";
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state(about)
      .state(list)
      .state(card);
  })
  .run(($transitions, $stateParams) => {
    $transitions.onStart({}, transition => {
      console.log(transition.from(), transition.to());
    });
  });
