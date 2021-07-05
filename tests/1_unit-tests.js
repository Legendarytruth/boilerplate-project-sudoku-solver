const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('UnitTests', () => {

  solver = new Solver;
  test('Logic handles a valid puzzle string of 81 characters', function(done){
    let output = solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');
    assert.equal(output.error, 'None');
    done();
  })

  test('Logic handles a puzzle string with invalid characters', function(done){
    let output = solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37A');
    assert.equal(output.error, 'Invalid characters in puzzle');
    done();
  })

  test('Logic handles a puzzle string with invalid characters', function(done){
    let output = solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37');
    assert.equal(output.error, 'Expected puzzle to be 81 characters long');
    done();
  })

  test('Logic handles a valid row placement', function(done){
    let output = solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 0, 1, '3');
    assert.equal(output, true);
    done();
  })

  test('Logic handles an invalid row placement', function(done){
    let output = solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 2, '1');
    assert.equal(output, false);
    done();
  })

  test('Logic handles a valid column placement', function(done){
    let output = solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 2, '3');
    assert.equal(output, true);
    done();
  })

  test('Logic handles an invalid column placement', function(done){
    let output = solver.checkColPlacement('1.5762984946381257728459613694517832812936745357824196473298561581673429269145378', 1, 2, '1');
    assert.equal(output, false);
    done();
  })

  test('Logic handles a valid region (3x3 grid) placement', function(done){
    let output = solver.checkRegionPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 2, '3');
    assert.equal(output, true);
    done();
  })

  test('Logic handles an invalid region (3x3 grid) placement', function(done){
    let output = solver.checkRegionPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 2, '1');
    assert.equal(output, false);
    done();
  })

  test('Valid puzzle strings pass the solver', function(done){
    let output = solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');
    assert.equal(output, '135762984946381257728459613694517832812936745357824196473298561581673429269145378')
    done();
  })

  test('Invalid puzzle strings fail the solver', function(done){
    let output = solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37..');
    assert.equal(output.error, 'Expected puzzle to be 81 characters long')
    done();
  })

  test('Solver returns the the expected solution for an incomplete puzzle', function(done){
    let output = solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');
    assert.equal(output, '135762984946381257728459613694517832812936745357824196473298561581673429269145378')
    done();
  })
});
