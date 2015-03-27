var utils = require('utils');

/**
 * Self-executing function to wrap all stuff we do on creation.
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	var suffix = utils.densitySuffix();

	$.suffix.text = suffix;

	// the color shows if the image is shared or in a platform-specific folder
	if (suffix === '(none)' || suffix === 'mdpi') {
		$.color.applyProperties({
			text: 'black (shared folder)'
		});
	} else if (OS_ANDROID) {
		$.color.applyProperties({
			color: 'green',
			text: 'green (android folder)'
		});
	} else if (OS_IOS) {
		$.color.applyProperties({
			color: 'blue',
			text: 'blue (iphone folder)'
		});
	}

	// test if the device dpi exactly matches a category
	var exact = [120,160,240,320,480,640].indexOf(Ti.Platform.displayCaps.dpi) !== -1;

	$.widthText.text = $.widthText.text.replace('%s', exact ? 'EXACTLY' : 'ABOUT');

})(arguments[0] || {});
