angular
    .module("ticApp")
    .controller("TicController", TicController);

    TicController.$inject = ['$firebaseArray']

    function TicController($firebaseArray){

    	var self = this;

    	self.grid = getGrid();
    	self.boxClick = boxClick;

    	function getGrid(){
    	var ref = new Firebase("https://tictactoe5000.firebaseio.com/grid");
		var grid = $firebaseArray(ref);
		return grid;
    	};



    	// self.whackMole = function(i){
     //      if (self.holes[i].moleIsHere === true){
     //          self.holes[i].moleIsHere = false;
     //          console.log('whacked');
     //          self.holes[randomHole()].moleIsHere = true;
     //      }
     	function boxClick($index){
     		if (self.grid[$index].status === "unclicked"){
     			

     		} console.log("x");
     	}

    	
    }
