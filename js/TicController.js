angular
    .module("ticApp")
    .controller("TicController", TicController);

    TicController.$inject = ['$firebaseArray']

    function TicController($firebaseArray) {

    	var self = this;

    	self.grid = getGrid();
    	self.gameData = getGameData();
    	self.boxClick = boxClick;
    	self.turn = false;
    	self.getWinner = getWinner;
    	self.getTie = getTie;
    	self.clearBoard = clearBoard;
    	self.gameOver = false;
    	self.newGame = newGame;

    	function getGrid(){
    	var ref = new Firebase("https://tictactoe5000.firebaseio.com/grid");
		var grid = $firebaseArray(ref);
		return grid;
    	};

    	function getGameData(){
    	var ref = new Firebase("https://tictactoe5000.firebaseio.com/gameData");
		var gameData = $firebaseArray(ref);
		return gameData;
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
		        
		        self.gameData[0].gameStatus = "Yogi 1 wins! Practice Non-Attachment to play again.";
		        self.gameData[0].p1win++;
		        self.gameData.$save(self.gameData[0]);
		        
		        
		        
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
		        
		        self.gameData[0].gameStatus = "Yogi 2! Yogi 1 wins! Practice Non-Attachment to play again.";
		        self.gameData[0].p2win++;
		        self.gameData.$save(self.gameData[0]);
		        
		        
		       
		      } 
					      
		    	
		} 
		
		function getTie() {
			if (self.gameData[0].turns === 8) {
		  		
				self.gameData[0].gameStatus  = "Peace wins! Practice Non-Attachment to play again.";
				self.gameData[0].ties++;
				self.gameData.$save(self.gameData[0]);
				
				
				}
		}   
  
     	
     	function boxClick(index){

     		if (self.gameOver === true) {
     			
     		} else {
     		
     		var turn = getTurn();

     		
     		if ((self.grid[index].XIsHere === true) || (self.grid[index].OIsHere === true)){
     			alert("Sorry, box is taken. Choose another box!");
     		}

     		else if (turn === "x") {
				self.grid[index].XIsHere = true;
			} else { 
				self.grid[index].OIsHere = true;
			}

			self.getWinner();
			self.getTie();

			self.gameData[0].turns++;


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
            self.gameData[0].gameStatus = "Let the peace Begin!";
            self.gameData[0].turns = 0;
            self.gameData.$save(self.gameData[0]);
     	}
     		
     		
	
		function newGame() {
			self.gameData[0].p1win = 0;
			self.gameData[0].p2win = 0;
			self.gameData[0].ties = 0;
			self.gameData.$save(self.gameData[0]);
			
			self.clearBoard();
		}
	}

    	
    
