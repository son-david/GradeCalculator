angular.module('app',[])
  .controller('control', function ($scope) {
    
    $scope.final = {
      total : [0,0],
      totalPercent : 0
    };

    $scope.storage = [
        {data : [],
        total: [0,0],
        totalPercent : 0}
      ];

    $scope.addItem = function (index, num, denom) {
      $scope.storage[index].data.push([num, denom]);
      $scope.recalcTotal();
    }

    $scope.delete = function (section, index) {
      section.data = section.data.slice(0, index).concat(section.data.slice(index + 1));
      $scope.recalcTotal();
    }

    $scope.recalcTotal = function () {

      for (var i =0; i < $scope.storage.length; i++) {
        var num = 0;
        var denom = 0;

        for (var j =0; j < $scope.storage[i].data.length ; j++) {
          num += $scope.storage[i].data[j][0];
          denom += $scope.storage[i].data[j][1];
        }

        $scope.storage[i].total = [num, denom];
        $scope.storage[i].totalPercent = Math.round(num * 10000/denom)/100;
      }

      $scope.recalcFinal();
    }

    $scope.addSection = function () {
      $scope.storage.push({
        data : [],
        total : [0,0],
        totalPercent : 0
      })
    }

    $scope.deleteSection = function (index){
      $scope.storage = $scope.storage.slice(0, index).concat($scope.storage.slice(index + 1));
      $scope.recalcFinal();
    }

    $scope.recalcFinal = function () {
      var num = 0;
      var denom = 0;
      for (var i = 0; i < $scope.storage.length; i++) {
        num += $scope.storage[i].total[0];
        denom += $scope.storage[i].total[1];
      }
      $scope.final.total = [num, denom];
      $scope.final.totalPercent = Math.round(num * 10000/denom)/100;
    }


  });