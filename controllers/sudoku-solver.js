class SudokuSolver {

  validate(puzzleString) {
    if(puzzleString.length !== 81){
      return { error: 'Expected puzzle to be 81 characters long' }
    }else if(!/^[0-9.]*$/.test(puzzleString)){
      return {error: 'Invalid characters in puzzle'}
    }else{
      return {error: 'None'}
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    if (puzzleString.substring(row*9, (row*9)+9).includes(value)){
      return false
    }else{
      return true
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (var n = 0; n < 9; n++) {
      if (puzzleString[n*9+column] == value) {
          return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    for(var n = 0; n < 9; n++){
      let r = 3 * Math.floor(row / 3) + Math.floor(n / 3);
      let c = 3 * Math.floor(column / 3) + n % 3;
      if (puzzleString[r*9+c] === value) {
          return false;
      }
    }
    return true;
    }

  tester(puzzleString, row, column, value){
    if(!this.checkRowPlacement(puzzleString, row, column, String(value))){
      return false
    }else if(!this.checkColPlacement(puzzleString, row, column, String(value))){
      return false
    }else if(!this.checkRegionPlacement(puzzleString, row, column, String(value))){
      return false
    }else{
      return true
    }
    
  }

  solvehelper(puzzleString){
    let row = -1;
    let column = -1;
    let index = puzzleString.indexOf(".")
    if(index == -1){
      //console.log('failed: '+ index)
      return puzzleString
    }else{
    row = parseInt(index/9);
    column = index%9;
    //console.log(index+ " row: " + row + " col: " + column);
    }
    
    for(var n = 1; n <= 9; n++){
      if(this.tester(puzzleString, row, column, n)){
        puzzleString = puzzleString.substring(0, index) + String(n) + puzzleString.substring(index+1, puzzleString.length)
        //console.log(puzzleString)
        let fin = this.solvehelper(puzzleString);
        if(fin !=  "failed"){
          //console.log("done")
          return fin
        }else{
        puzzleString = puzzleString.substring(0, index) + "." + puzzleString.substring(index+1, puzzleString.length)
        }
    }
    }
    //console.log(puzzleString);
    return "failed"  
  }
  

  solve(puzzleString) {
    let test = this.validate(puzzleString);
    if(test.error !== "None"){
      return test
    }
    return this.solvehelper(puzzleString)
  }

}
module.exports = SudokuSolver;

