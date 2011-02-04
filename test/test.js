$(document).ready(function(){  
  
  // get the original dimensions
  var origHeight = $("#testiframe").height(); 
  var origWidth = $("#testiframe").width();
  var pluginReady = [];
  
  // listen for the plugins ready event
  $(document).bind("iframeFitContentReady", function(event, timeStamp, _version){
   	pluginReady = [timeStamp, _version];
  });	

	
  	

  // these tests verfiy that the dimensions of the test iframe
  // are different from the iframe's original dimensions
  // I dont need to worry thet the dimensions will match during these test
  // since I know the sample content getting loaded into the iframe
  // does not match the existing dimensions.
	
 module("iframeFitContent initialization", {
 
 	setup: function(){
		 		
		  // init the plugin
		  $("#testiframe").iframeFitContent();

 	}
 
 });
 
 test("test for plugin version", function(){
 		
 	// check that _version is defined
	ok(pluginReady[1], "version: jQuery iframeFitContent " + pluginReady[1] );
 
 });
 
  test("test for plugin timeStamp", function(){
  


  		var re = new RegExp(pluginReady[0] + "$");
		var iframeSrcTimeStamp = $("#testiframe").attr("src").match( re );
		ok(pluginReady[0].toString(), "plugin timeStamp exists")
		
		// check that the plugin timestamp matches the test element
		equals(pluginReady[0].toString(), iframeSrcTimeStamp, 'plugin timeStamp matches iframe src attribute "z" querystring parameter, prevents cached iframe content');
 
 });


test("test for iframe div wrapper exists", function(){

		var $iframeWrapper = $("#testiframe").contents().find("body > #iframeWrapper"+pluginReady[0]);
		equals($iframeWrapper.length, 1, "div > #iframeWrapper"+pluginReady[0].toString()+" added to iframe DOM");
		
});

test("simulate a change to the iframe contents DOM dimensions" , function(){
 		
 	    // get the original dimensions
	    var renderedHeight = $("#testiframe").height(); 
	    var renderedWidth = $("#testiframe").width();
	    
	    var $iframeWrapper = $("#testiframe").contents().find("body > #iframeWrapper"+pluginReady[0]);
	    
		// simulate a change to the iframe content dimensions.
		$iframeWrapper.append('<div style="display:block; width:1000px; height:1000px"></div>');
		
		// test the resize method
		$("#testiframe").iframeFitContent({resize:'both'},'render');
		
		
		notEqual($("#testiframe").height(), renderedHeight, "new iframe content height is not equal to old iframe content height");
		notEqual($("#testiframe").width(), renderedWidth, "new iframe content width is not equal to old iframe content width");
 		
 		
		

 });


 module("iframeFitContent Test Dimensions", {
 
 	setup: function(){
		 		
		  // init the plugin
		  $("#testiframe").iframeFitContent();

 	},
 	teardown: function(){
		 		
		  // init the plugin
		  $("#testiframe").iframeFitContent('destroy');

 	}
 
 });
 
 test("resize by height", function(){
  		$("#testiframe").iframeFitContent({resize:'height'},'render');
  		notEqual($("#testiframe").height(), origHeight, "original iframe height is not equal to new iframe height after content is resized to fit");
 });
 
  test("resize by width", function(){
  		$("#testiframe").iframeFitContent({resize:'width'},'render');
  		notEqual($("#testiframe").width(), origWidth, "original iframe width is not equal to new iframe width after content is resized to fit");
 });
 
   test("resize both height and width", function(){
  		$("#testiframe").iframeFitContent({resize:'both'},'render');
  		notEqual($("#testiframe").width(), origWidth, "original iframe width is not equal to new iframe width after content is resized to fit");
  		notEqual($("#testiframe").height(), origHeight, "original iframe height is not equal to new iframe height after content is resized to fit");
 });
 

	

/*
  test("Sample test", function()  
  {  
     expect(1);  
     equals(divide(4,2),  
      2,  
      'Expected 2 as the result, result was: ' + divide(4,2));  
  });  
*/

});  