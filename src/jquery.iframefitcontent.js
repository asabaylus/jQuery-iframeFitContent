/**
 * Resizes the height of the iframe in blue dragon applications to accomodate content contained in the iframe without verticle scrollbars
 * @author Asa Baylus
 * @version 1.0.1
 * 
 * Copyright (c) 2011 Asa Baylus, http://baylus.com/
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function ($) {
	$.fn.extend({
		iframeFitContent: function (options, method) {			
				

					var defaults = {
						resize: 'both' // sets which dimensions to resize: height, width or both
						},
						_version = "1.0.1",
						_origHeight,
						_origWidth,
						$iframe = $(this), 
						$iframeContent, 
						$iframeWrapper,
						opt = options  = {},
						now = new Date(),
						methods = {
							init: function(){
								
								console.log("init!");
									
									
								return this.each(function () {
									
										$(document).trigger("iframeFitContentReady", [now.getTime(), _version]);
										
							            var $iframe = $(this), 
											opt = options;
											
											// get the originl dimensions
											// we'll use them during destroy
											_origHeight = $iframe.height();
											_origWidth = $iframe.width();
											
											
											
											//console.log($iframe, opt);
											
											$iframe.one("load" , function(){
																				
													// clear the browser cache by makeing the iframe url unique
													$iframe.attr("scrolling" , "no").attr({
														"src" : this.src + "?z=" +  now.getTime().toString()
													}).bind("load", function(){
														
														//$.fn.iframeFitContent(opt,'render');
														return methods.render.apply( $iframe );
													});
												
											});
										});			
									
								},
								render : function() {
									
									
									console.log('render!');
									
									
									
									// hide the iframe until it loaded to avoid the height pop
									$iframe.css({visibility: "hidden"});		
							
	
									// get iframe contents
									$iframeContent = $iframe.contents().find("body");
									
									// console.log($iframe.contents());
									
									
									// wrap the page content in a div with a unique ID
									$iframeContent.children().wrapAll("<div id='iframeWrapper" + now.getTime().toString() + "'></div>");
									
									// cache the wrapper
									$iframeWrapper = $iframeContent.find("#iframeWrapper" + now.getTime().toString());
									
									console.log($iframeWrapper);
									
									// copy the margins and borders from the body onto the wrapper div
									// convert margins to padding for IE6 or we end up with too much height
									$iframeWrapper.css({
										'padding-top' : $iframeContent.css("margin-top"),
										'padding-bottom' : $iframeContent.css("margin-bottom"),	
										'padding-left' : $iframeContent.css("margin-left"),
										'padding-right' : $iframeContent.css("margin-right"),
										'border-left-width' : $iframeContent.css("border-left-width"),
										'border-right-width' : $iframeContent.css("border-right-width"),
										'border-top-width' : $iframeContent.css("border-top-width"),
										'border-bottom-width' : $iframeContent.css("border-bottom-width"),
										'border-left-style' : $iframeContent.css("border-left-style"),
										'border-right-style' : $iframeContent.css("border-right-style"),
										'border-top-style' : $iframeContent.css("border-top-style"),
										'border-bottom-style' : $iframeContent.css("border-bottom-style"),
										'border-left-color' : $iframeContent.css("border-left-color"),
										'border-right-color' : $iframeContent.css("border-right-color"),
										'border-top-color' : $iframeContent.css("border-top-color"),
										'border-bottom-color' : $iframeContent.css("border-bottom-color"),
										'position' : 'absolute',
										'height' : 'auto',
										'width' : 'auto'				  
									});
									
									// remove margins from the iframe > body 
									$iframeContent.css({
										'border' : 'none',
										'margin-top' : '0',
										'margin-bottom' : '0',
										'margin-left' : '0',
										'margin-right' : '0'
									});
									
									// if resize is set then apply new size to the correct dimensions then
									// set height and width to wrapper + margins top & bot + border height + extra padding												
									if (opt.resize !== 'width') {
										$iframe.height($iframeWrapper.outerHeight(true));
									}
									
									if (opt.resize !== 'height') {
										$iframe.width($iframeWrapper.outerWidth(true));
									}
									
									
									// set the wrapper back to relative or we'll lose wrapping
									// add zoom to fix IE6 has layout bug
									$iframeWrapper.css({
										'position' : 'relative',
										'zoom' : '1'	  
									});  
									
									// show the iframe when finished
									$iframe.css("visibility", "visible");	
									
									
									// make plugin chainable
									// beware the height / width will be wrong in the chain
									return this;
									
									
								},
								
								originalWidth : function (){
									return this.each(function(){
										console.log("original width", _originalWidht);
										return _origWidth;									
									});
									
								},
								
								originalHeight : function (){
									return _origHeight;
								},
								destroy : function(){
									console.log("destroy");	
								}
								
							};
	
	
						
						options = $.extend(defaults, options);

	/*
					
						if (!opt) {
						
							method = opt;
						}
*/

						if (!options) { options = method};
					    console.log("options",options);
					    console.log("method",method);
						console.log("methods[method]", methods[method]);
													
						if ( methods[method] ) {
							// need to better understand  Array.prototype.slice.call( arguments, 1 ) I dont see the point
							console.log("run method = " + methods[ method ].toString());
							return methods[ method ].apply(this, Array.prototype.slice.call( arguments, 1 ));
						} else if ( typeof method === 'object' || ! method ) {
							return methods.init.apply( $(this), arguments );
						} else {
							$.error( 'Method ' +  methods[method] + ' does not exist on jQuery.iframeFitContent' );
						}    
	
							
						
	
					}
		
		
	});
	
})(jQuery);



