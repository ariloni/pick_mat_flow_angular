angular
    .module("ticApp")
    .controller("TicController", TicController);

    TicController.$inject = ['$firebaseArray']

    function TicController($firebaseArray){

    	var self = this;

    	self.grid = getGrid();
    	self.boxClick = boxClick;
    	self.turn = false;
    	self.getWinner = getWinner
    	self.clearBoard = clearBoard;
    	self.gameOver = false;

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

    	function getWinner() {
    
		    if (((self.grid[0].XIsHere === true) && (self.grid[1].XIsHere === true) && (self.grid[2].XIsHere === true)) 
		       || ((self.grid[3].XIsHere === true) && (self.grid[4].XIsHere === true) && (self.grid[5].XIsHere === true)) 
		       || ((self.grid[6].XIsHere === true) && (self.grid[7].XIsHere === true) && (self.grid[8].XIsHere === true))  
		       || ((self.grid[0].XIsHere === true) && (self.grid[3].XIsHere === true) && (self.grid[6].XIsHere === true)) 
		       || ((self.grid[1].XIsHere === true) && (self.grid[4].XIsHere === true) && (self.grid[7].XIsHere === true)) 
		       || ((self.grid[2].XIsHere === true) && (self.grid[5].XIsHere === true) && (self.grid[8].XIsHere === true)) 
		       || ((self.grid[0].XIsHere === true) && (self.grid[4].XIsHere === true) && (self.grid[8].XIsHere === true)) 
		       || ((self.grid[2].XIsHere === true) && (self.grid[4].XIsHere === true) && (self.grid[6].XIsHere === true))) 
		    {
		        self.gameOver = true
		        alert("x wins!");
		        
		        
		      }        
		     else if (((self.grid[0].OIsHere === true) && (self.grid[1].OIsHere === true) && (self.grid[2].OIsHere === true)) 
		       || ((self.grid[3].OIsHere === true) && (self.grid[4].OIsHere === true) && (self.grid[5].OIsHere === true)) 
		       || ((self.grid[6].OIsHere === true) && (self.grid[7].OIsHere === true) && (self.grid[8].OIsHere === true))  
		       || ((self.grid[0].OIsHere === true) && (self.grid[3].OIsHere === true) && (self.grid[6].OIsHere === true)) 
		       || ((self.grid[1].OIsHere === true) && (self.grid[4].OIsHere === true) && (self.grid[7].OIsHere === true)) 
		       || ((self.grid[2].OIsHere === true) && (self.grid[5].OIsHere === true) && (self.grid[8].OIsHere === true)) 
		       || ((self.grid[0].OIsHere === true) && (self.grid[4].OIsHere === true) && (self.grid[8].OIsHere === true)) 
		       || ((self.grid[2].OIsHere === true) && (self.grid[4].OIsHere === true) && (self.grid[6].OIsHere === true))) 
		    {
		        self.gameOver = true
		        alert("o wins!");
		        
		       
		      }        
		    }
  
     	
     	function boxClick(index){

     		if (self.gameOver === true) {
     			alert("Go back to the future to start new game!")
     		} else {
     		
     		var turn = getTurn();

     		
     		if ((self.grid[index].XIsHere === true) || (self.grid[index].OIsHere === true)){
     			alert("Sorry, box is taken. Choose another box!");
     		}

     		if (turn === "x") {
				self.grid[index].XIsHere = true
			} else { 
				self.grid[index].OIsHere = true
			}

			self.getWinner();

			console.log(self.grid[index]);
			self.grid.$save(self.grid[index]);
			}
     	} 

     	function clearBoard() {

     		for (var i = 0; i < self.grid.length; i++) {
                        self.grid[i].XIsHere = false;
                        self.grid[i].OIsHere = false;
                        self.grid.$save(self.grid[i]);
                    };

            self.gameOver = false;
     	}
     		
     		
	}

    	
    
