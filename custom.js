console.clear();

var myApp = angular.module('myApp', ["ngAnimate"]),
    dataUrl = "https://raw.githubusercontent.com/patelmr3/data/master/randomUserData.json";

myApp.filter('first', function() {
  return function(t) {
    if(t) 
    return t.substring(0, t.indexOf(" "));
  }
});

myApp.filter('last', function() {
  return function(t){
    if(t) 
    return t.substring(t.indexOf(" ") + 1, t.length);
  }
});

myApp.controller('FirstController', function($scope, $http, $timeout) {
  $scope.uInfoClass = "u-info-full";
  $http.get(dataUrl)
    .then(function(response){
    $scope.users = response.data.splice(0,1000);
    //console.log($scope.users);
    $scope.totalUsers = $scope.users.length
    $timeout(function() { 
      document.querySelector(".controller")
      .classList.remove("controller-hidden");
    },300);
    $timeout(function() { 
      document.querySelector(".u-name").click();
    }, 2000);
    
  });
  $scope.showUserData = function(clickedUser){
    $scope.isHidden = true;
    $scope.showData = true;
    $scope.uInfoClass = "";
    $timeout(function(){
      $scope.isHidden = false;
      $scope.curUser = clickedUser;
    },500);
  };
  $scope.closeUdata = function() {
    $scope.uInfoClass = "u-info-full";
  };
});

myApp.directive('userData', function(){
  return {
    template : `
      <span class="u-data-close-btn" ng-click="closeUdata()"><span class="fa fa-close"></span></span>
      <div class="u-data-inner" ng-hide="isHidden">
        <div class="u-image">
          <div class="u-image-inner">
            {{ curUser.name | first | limitTo : 1 }}{{ curUser.name | last | limitTo : 1 }}
          </div>
        </div>
        <div class="u-fname"> {{ curUser.name }} </div>
        <div class="u-data-item"> <strong>Id :</strong> {{ curUser.id }} </div> 
        <div class="u-data-item"> <strong>Gender :</strong> {{ curUser.gender }} </div>
        <div class="u-data-item"> <span class="fa fa-envelope"> </span> {{ curUser.email }} </div>
        <div class="u-data-item"> <span class="fa fa-phone"> </span> {{ curUser.phone }} </div>
      </div>
    `,
  };
});
