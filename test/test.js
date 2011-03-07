$(document).ready(function(){  
  

	// get the original dimensions
	var origHeight = $("#testiframe").height(), 
	  origWidth = $("#testiframe").width(),
	  pluginReady = [],
	  iframeSrcTimeStamp,	
	  $iframeWrapper;
	
	// listen for the plugins ready event
	$("#testiframe").bind("iframe.rendered", function(event, timeStamp, _version){
		pluginReady = [timeStamp, _version];
		var re = new RegExp(pluginReady[0] + "$");
		iframeSrcTimeStamp = $("#testiframe").attr("src").match( re ).toString();
	});	
	
	
	$("#testiframe").bind("iframe.rendered", function( iframe ){
		$iframeWrapper = $("#testiframe").contents().find("body > #iframeWrapper"+pluginReady[0]);
	});  

	$("#testiframe").iframeFitContent(); 
	
	// init the plugin
	 
	
	// these tests verfiy that the dimensions of the test iframe
	// are different from the iframe's original dimensions
	// I dont need to worry thet the dimensions will match during these test
	// since I know the sample content getting loaded into the iframe
	// does not match the existing dimensions.
	
	module("iframeFitContent");
 
	test("Test plugin initialization", function(){
	
		
	 	// check that _version is defined
		ok(pluginReady[1], "version: jQuery iframeFitContent " + pluginReady[1] );		
	
		ok(pluginReady[0].toString(), "plugin timeStamp exists");
		
		// check that the plugin timestamp matches the test element
		equals(pluginReady[0].toString(), iframeSrcTimeStamp, 'plugin timeStamp matches iframe src attribute "z" querystring parameter, prevents cached iframe content');
	
		// check for wrapper div		
		// equals($iframeWrapper.length, 1, "div > #iframeWrapper"+pluginReady[0].toString()+" added to iframe DOM");
	
	});

	test("resize by height", function(){
			//$("#testiframe").iframeFitContent({resize:'height'},'render');
			notEqual($("#testiframe").height(), origHeight, "original iframe height is not equal to new iframe height after content is resized to fit");
	});
	
	test("resize by width", function(){
			//$("#testiframe").iframeFitContent({resize:'width'},'render');
			notEqual($("#testiframe").width(), origWidth, "original iframe width is not equal to new iframe width after content is resized to fit");
	});
	
	test("resize both height and width", function(){
			//$("#testiframe").iframeFitContent({resize:'both'},'render');
			notEqual($("#testiframe").width(), origWidth, "original iframe width is not equal to new iframe width after content is resized to fit");
			notEqual($("#testiframe").height(), origHeight, "original iframe height is not equal to new iframe height after content is resized to fit");
	});

	test("simulate a change to the iframe contents DOM dimensions" , function(){
			// get the original dimensions
			var renderedHeight = $("#testiframe").height(); 
		    var renderedWidth = $("#testiframe").width();
		    
			// simulate a change to the iframe content dimensions.
			
			$iframeWrapper.append('<div style="display:block; width:1000px; height:1000px"></div>');
			

			$("#testiframe").iframeFitContent({resize:'both'},'render');
			
			notEqual($("#testiframe").height(), renderedHeight, "new iframe content height is not equal to old iframe content height");
			notEqual($("#testiframe").width(), renderedWidth, "new iframe content width is not equal to old iframe content width");


	});	

});  