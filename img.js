
var page = require('webpage').create();
page.open('http://127.0.0.1:8888/', function () {
	Function.prototype.bind = Function.prototype.bind || function (thisp) {
  var fn = this;
  return function () {
    return fn.apply(thisp, arguments);
  };
};
  	setTimeout(timer, 5000);
  	function timer(){
  		page.clipRect = { top: 0, left: 0, width: 600, height: 700 };
  		page.render("test.png");
  		phantom.exit();
  	}
   
});