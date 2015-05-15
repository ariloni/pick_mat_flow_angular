angular
    .module("ticApp")
    .controller("TicController", TicController);

    TicController.$inject = ['$firebaseArray']

    function TicController($firebaseArray){

    	var self = this;

    	self.grid = getGrid();
    	self.boxClick = boxClick;
    	self.turn = false;

    	function getGrid(){
    	var ref = new Firebase("https://tictactoe5000.firebaseio.com/grid");
		var grid = $firebaseArray(ref);
		return grid;
    	};

    	self.move = 0;

    	function getTurn() {

    		
	
			self.move++;
				if (self.move % 2 === 0) {
					return "o";
				} else {
					return "x";
				}
		}

    	// self.whackMole = function(i){
     //      if (self.holes[i].moleIsHere === true){
     //          self.holes[i].moleIsHere = false;
     //          console.log('whacked');
     //          self.holes[randomHole()].moleIsHere = true;
     //      }
     	
     	function boxClick(index){
     		
     		var turn = getTurn();
     		
     		if ((self.grid[index].XIsHere === true) || (self.grid[index].OIsHere === true)){
     			alert("Sorry, box is taken. Choose another box!");
     		}

     		if (turn === "x") {
     				self.grid[index].XIsHere = true
     			} else { 
     				self.grid[index].OIsHere = true
     			}
     		} 
			

     	}

    	
    
