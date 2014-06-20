// http://www.gravitycalc.com/

var FallingObject = function(height){

  this.height = height;

  this.startTime = new Date();

  var g = 9.80665;

  this.currentHeight = function(){

    // in seconds
    this.timeElapsed = (new Date() - startTime) / 1000;

    this.fallen = g * Math.pow(this.timeElapsed, 2) / 2

    return this.height - this.fallen;
  }

};