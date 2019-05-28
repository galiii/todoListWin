import template from "./dialog.addOrEdit.tmpl.html";

class ListCtrl {
  constructor($scope, $mdDialog, lists, $http, $state) {
    "ngInject";
    $scope.$mdDialog = $mdDialog;
    $scope.lists = lists;
    $scope.flag = false;

    /*** Delete List 
    $scope.openDeleteList = function(delList, ev) {
      var confirm = $mdDialog
        .confirm()
        .title(`Delete List  ${delList.title}`)
        .textContent(`Description : ${delList.description}`)
        .ariaLabel("Lucky day")
        .targetEvent(ev)
        .ok("OK")
        .cancel("Cancel");

      $mdDialog.show(confirm).then(
        function() {
          console.log("this is ", delList);
          $http.delete("/del-list/" + delList.id).then(function(response) {
            $scope.lists = response.data;
            $state.go("lists", { name: "lists" }); //
          });
        },
        function() {
          $scope.status = "You decided to keep your debt.";
        }
      );
    };
*/
    /** Add List **/
    $scope.openAddList = function(ev, list) {
      console.log(`before add or editing ${list}`);
      if (list !== undefined) {
        $scope.flag = true;
        editList(ev, list);
      } else {
        addList(ev);
      }
    };

    function addList(ev) {
      $scope.newList = {
        title: "",
        description: ""
      };
      $mdDialog
        .show({
          controller: DialogController,
          template: template,
          targetEvent: ev,
          clickOutsideToClose: true,
          locals: {
            flag: $scope.flag,
            newList: $scope.newList
          }
        })
        .then(
          function(answer) {
            $scope.newList = answer;
            $http.post("/addlist", $scope.newList).then(function(response) {
              $scope.lists[response.data.id] = response.data;
            });
          },
          function() {
            $scope.status = "You cancelled the dialog.";
            console.log("in canceling form list ctrl add");
          }
        );
    }
/*************************************************************************************/    
/************                 Edit List                            *******************/
/*************************************************************************************/
function editList(ev, list) {
      $scope.newList = {
        title: list.title,
        description: list.description
      };
      $mdDialog
        .show({
          controller: DialogController,
          template: template,
          targetEvent: ev,
          clickOutsideToClose: true,
          locals: {
            flag: $scope.flag,
            newList: $scope.newList
          }
        })
        .then(
          function(answer) {
            $scope.newList = answer;
            $http
              .post("/edit-list/" + list.id, $scope.newList)
              .then(function(response) {
                $scope.lists[list.id] = response.data[list.id];
                $state.go("lists", { name: "lists" }); //
              });
          },
          function() {
            $scope.status = "You cancelled the dialog.";
            console.log("Cansel in  List ctrl Editt");
          }
        );
    }

    /*** Action ***/
    function DialogController($scope, flag, newList, $mdDialog) {
      $scope.flag = flag;
      $scope.newList = newList;

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

export default ListCtrl;
