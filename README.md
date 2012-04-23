iframeFitContent jQuery Plugin v1.0.1
-------------------------------
Copyright (c) 2011 Asa Baylus. Licensed under the MIT license.
 

Overview
--------

A jQuery plugin which automatically sets the height of your iframes to match the iframes contents 

Features include:
	- jQuery-style instantiation
	- jQuery-style event handling
	- Hide the iframe until iframe content has loaded
	
IMPORTANT NOTE!!!
This plugin will not overcome the same origin browser policy domain restrictions.

IE 6 will leave a small border to the right and bottom between the body and the iframe


Usage
-----

```javascript
// apply the height fix
$("iframe").iframeFitContent();

The resize may now be applied to height, width or both. Both is the default
$("iframe").iframeFitContent({ resize : 'height' });
$("iframe").iframeFitContent({ resize : 'width' });
$("iframe").iframeFitContent({ resize : 'both' });
```

If a height or width attribute has been set on the iframe then the iframeFitConent plugin resize
will be ignored in favor of the attributes dimension.


The target iframe may be resized by calling "render" after the dimensions of the iframes contents have changed
`$("iframe").iframeFitContent('render');`

Alternately the iframe may be resized along height or width seperatley as follows
`$("iframe").iframeFitContent({ resize : 'height' }, 'render');`

Calling "destroy" will undo the changes iframeFitContent makes to the DOM.
`$("iframe").iframeFitContent('destroy');`

The plugin is chainable...
`$("iframe").iframeFitContent().each(function(){ alert('do somthing else') });`

For example usage view examples/demo.html

The example page also includes a common sample script taken from te wilds of the internet for comparison.