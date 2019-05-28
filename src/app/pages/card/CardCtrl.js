import template from "./dialog1.tmpl.html";

class CardCtrl {
  constructor($scope, $mdDialog, $http, $stateParams, $state, list) {
    "ngInject";
    $scope.list = list;
    console.log($scope.list);

    /**** Delete Item 
    $scope.openDeleteItem = function(delItem, ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog
        .confirm()
        .title(`Delete ITEM  ${delItem.title}`)
        .textContent(`Description : ${delItem.description}`)
        .ariaLabel("Lucky day")
        .targetEvent(ev)
        .ok("Yes!")
        .cancel("Cancel");

      $mdDialog.show(confirm).then(
        function() {
          console.log("this is ", delItem);

          $http
            .delete("/del-item/" + $stateParams.id + "/" + delItem.itemId)
            .then(function(response) {
              $scope.list.list = response.data;
              $state.go("lists.list.list", { name: "id" }); //
            });
        },
        function() {
          $scope.status = "You decided to keep your debt.";
        }
      );
    };
    **/

    /*** ADD ITEM ***/
    $scope.openAddItem = function(ev) {
      $scope.newCard = {
        title: "",
        description: ""
      };
      $mdDialog
        .show({
          controller: DialogController,
          template: template,
          //parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
        .then(
          function(answer) {
            //adding title and description
            $scope.newCard = answer;
            console.log("in adding form list ctrl add", $scope.newCard);

            $http
              .post("/addItem/" + $stateParams.id, $scope.newCard)
              .then(function(response) {
                $scope.list.card[response.data.itemId] = response.data;
              });
          },
          function() {
            console.log("in canceling form ITEM ctrl add");
          }
        );
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function(cancel) {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }
  }
}

export default CardCtrl;
