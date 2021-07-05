'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if(!req.body.puzzle || !req.body.coordinate || !req.body.value){
        return res.json({ error: 'Required field(s) missing' });
      }
      if(!/^\d{1}$/.test(req.body.value)){
        return res.json({ error: 'Invalid value' });
      }
      let coor = req.body.coordinate.split('');
      if(coor.length > 2 || !/^\d{1}$/.test(coor[1]) || !/^[a-iA-I]{1}$/.test(coor[0])){
        return res.json({ error: 'Invalid coordinate' });
      }else{
        let [r, c] = req.body.coordinate.split('');
        let row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].indexOf(r.toUpperCase());
        let col = parseInt(c) -1;
        let val = solver.validate(req.body.puzzle);
        if(val.error != 'None'){
          return res.json(val)
        }
        if(req.body.puzzle.charAt(row*9 + col) == req.body.value || solver.tester(req.body.puzzle, row, col, req.body.value)){
          return res.json({valid: true})
        }else{
          let cons = [];
          if(solver.checkRowPlacement(req.body.puzzle, row, col, req.body.value) == false){
              cons.push("row")
          }
            if(solver.checkColPlacement(req.body.puzzle, row, col, req.body.value) == false){
              cons.push("column")
            }
            if(solver.checkRegionPlacement(req.body.puzzle, row, col, req.body.value) == false){
              cons.push("region")
            }
            //console.log(cons)
            return res.json({valid: false, conflict: cons})
        }
      }
      
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if(!req.body.puzzle){
        return res.json({ error: 'Required field missing' })
      }
      let val = solver.validate(req.body.puzzle);
      if(val.error != 'None'){
        //console.log(val)
        return res.json(val)
      }
      let sol = solver.solve(req.body.puzzle);
      //console.log(sol)
      if(sol == "failed"){
        //console.log(req.body.puzzle)
        return res.json({ error: 'Puzzle cannot be solved' })
      }else{
        return res.json({solution: sol})
      }
    });
};
