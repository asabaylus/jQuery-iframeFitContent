/**
 * Resizes the height of the iframe in blue dragon applications to accomodate content contained in the iframe without verticle scrollbars
 * @author Asa Baylus
 * @version 1.0.0
 * 
 * Copyright (c) 2010 Asa Baylus, http://baylus.com/
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
		iframeFitContent: function (options) {			
					
					var defaults = {padding: 0}, now = new Date();
					
					options = $.extend(defaults, options);
					
		            return this.each(function () {
		            
						var $iframe = $(this), opt = options;
					
						function setHeight() {
								
								
								// hide the iframe until it loaded to avoid the height pop
								// set overflow hidden to fix IE6 display issues wich result in extra margin
								$iframe.css({visibility: "hidden"});
						
								// create vars
								var $iframeContent, 
									$iframeWrapper, 
									marginTop, 
									marginBottom, 
									marginLeft, 
									marginRight,
									originalHeight = $iframe.height(),
									originalWidth = $iframe.width(),
									i=0, 
									y=0, 
									$iframeChildren, 
									iframeWrapperBorderLeft, 
									iframeWrapperBorderRight;
						
								// get iframe contents
								$iframeContent = $iframe.contents().find("body");
								
								
								// wrap the page content in a div with a unique ID
								$iframeContent.children().wrapAll("<div id='iframeWrapper" + now.getTime().toString() + "'></div>");
								
								// cache the wrapper
								$iframeWrapper = $iframeContent.find("#iframeWrapper" + now.getTime().toString());
								
								// copy the margins from the body onto the div
								marginTop = $iframeContent.css("margin-top");
								marginBottom = $iframeContent.css("margin-bottom");
								marginLeft = $iframeContent.css("margin-left");
								marginRight = $iframeContent.css("margin-right");
								
								// after we calc the trueHeight add those margins to the padding of the wrapper
								// use padding for IE6 or we end up with too much height
								$iframeWrapper.css({
									'padding-top' : marginTop,
									'padding-bottom' : marginBottom,	
									'padding-left' : marginLeft,
									'padding-right' : marginRight
								});
								
								// remove margins from the iframe > body 
								$iframeContent.css({
									'margin-top' : '0',
									'margin-bottom' : '0',
									'margin-left' : '0',
									'margin-right' : '0'
								});
								
								
								
								// set height to wrapper + margins top & bot + border height + extra padding	
								$iframe.height($iframeContent.outerHeight(true) + opt.padding); 
								
								// after we calc the trueHeight add set the wrapper to absolute
								// this'll prep a div from which the true width is obtained
								$iframeWrapper.css({
									'position' : 'absolute',
									'height' : 'auto',
									'width' : 'auto'				  
								});   
											
								
								// now do the width except width is bugged so work around the issues, 
								//$iframe.width($iframeContent.outerWidth(true)+opt.padding);
								iframeContentBorderLeft  = parseInt($iframeContent.css("border-left-width"));
								iframeContentBorderRight  = parseInt($iframeContent.css("border-right-width"));	
								$iframe.width($iframeWrapper.outerWidth() + opt.padding + iframeContentBorderLeft + iframeContentBorderRight);

								
								// set the wrapper back to relative or we'll lose wrapping
								// and the top and bottom borders if they exist
								// add zoom to fix IE6 has layout bug
								$iframeWrapper.css({
									'position' : 'relative',
									'zoom' : '1'	  
								});  
								
								// show the iframe when finished
								$iframe.css("visibility", "visible");	
								
							}

						$(this).bind("load", setHeight);
						
					});
					
					
				}
		
	});
	
})(jQuery);



