// http://www.gravitycalc.com/

var FallingObject = function(height, g){

  var height = height;

  var startTime = new Date();

  var g = (g * 10);

  this.currentHeight = function(){

    // in seconds
    var timeElapsed = (new Date() - startTime) / 1000;

    var fallen = g * Math.pow(timeElapsed, 2) / 2

    return height - fallen;
  }

};
