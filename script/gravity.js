// http://www.gravitycalc.com/

var FallingObject = function(height){

  var height = height;

  var startTime = new Date();

  var g = 9.80665;

  this.currentHeight = function(){

    // in seconds
    var timeElapsed = (new Date() - startTime) / 1000;

    var fallen = g * Math.pow(timeElapsed, 2) / 2

    return height - fallen;
  }

  this.stats = function(){
    console.log('currentHeight: ', this.currentHeight().toFixed(2));
  }

};

// var orange = new FallingObject(316);

// console.log(orange.currentHeight());
// setTimeout(function(){
//   console.log(orange.stats());
// }, 1000)
// setTimeout(function(){
//   console.log(orange.stats());
// }, 2000)
// setTimeout(function(){
//   console.log(orange.stats());
// }, 3000)
// setTimeout(function(){
//   console.log(orange.stats());
// }, 4000)
// setTimeout(function(){
//   console.log(orange.stats());
// }, 5000)
// setTimeout(function(){
//   console.log(orange.stats());
// }, 6000)
// setTimeout(function(){
//   console.log(orange.stats());
// }, 7000)
// setTimeout(function(){
//   console.log(orange.stats());
// }, 8000)
