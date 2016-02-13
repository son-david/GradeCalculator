angular.module('app',[])
  .controller('control', function ($scope) {
    
    $scope.final = {
      total : [0,0],
      totalPercent : 0,
      projected : 90,
      remaining : 0,
      percentNeeded : 0
    };

    $scope.storage = [
        {data : [],
        future : [],
        total: [0,0],
        totalPercent : 0,
        remaining : 0}
      ];

    $scope.message = ''

    $scope.addItem = function (index, num, denom, future) {
      if (!future && (typeof num !== 'number' || typeof denom !== 'number')) {
        $scope.message = 'Try inputting numbers';
        return;
      }
      if (future) {
        $scope.storage[index].future.push(denom);
        $scope.message = '';
      } else {
        $scope.storage[index].data.push([num, denom]);
        $scope.message = '';
      }
      $scope.recalcTotal();
    }

    $scope.delete = function (section, index, future) {
      if (future) {
        section.future = section.future.slice(0, index).concat(section.future.slice(index + 1));
      } else {
        section.data = section.data.slice(0, index).concat(section.data.slice(index + 1));
        $scope.recalcTotal();
      }
    }

    $scope.recalcTotal = function () {

      for (var i =0; i < $scope.storage.length; i++) {
        var num = 0;
        var denom = 0;
        var remaining = 0;

        for (var j =0; j < $scope.storage[i].data.length ; j++) {
          num += $scope.storage[i].data[j][0];
          denom += $scope.storage[i].data[j][1];
        }

        for (var k = 0; k < $scope.storage[i].future.length; k++) {
          remaining += $scope.storage[i].future[k];
        }

        $scope.storage[i].total = [num, denom];
        $scope.storage[i].remaining = remaining;
        if (denom === 0) {
          $scope.storage[i].totalPercent = 0;
        } else {
          $scope.storage[i].totalPercent = Math.round(num * 10000/denom)/100;
        }
      }

      $scope.recalcFinal();
    }

    $scope.addSection = function () {
      $scope.storage.push({
        data : [],
        future : [],
        total : [0,0],
        totalPercent : 0,
        remaining : 0
      })
    }

    $scope.deleteSection = function (index){
      $scope.storage = $scope.storage.slice(0, index).concat($scope.storage.slice(index + 1));
      $scope.recalcFinal();
    }

    $scope.recalcFinal = function () {
      var num = 0;
      var denom = 0;
      var remaining = 0;
      for (var i = 0; i < $scope.storage.length; i++) {
        num += $scope.storage[i].total[0];
        denom += $scope.storage[i].total[1];
        remaining += $scope.storage[i].remaining;
      }
      $scope.final.total = [num, denom];
      $scope.final.totalPercent = Math.round(num * 10000/denom)/100;
      $scope.final.remaining = remaining;

      $scope.recalcRemaining();
    }

    $scope.recalcRemaining = function () {
      var x = ((($scope.final.total[1] + $scope.final.remaining) * ($scope.final.projected / 100)) - $scope.final.total[0]) / $scope.final.remaining;

      $scope.final.percentNeeded = x;
    }


  });