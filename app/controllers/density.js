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

	if (!OS_IOS) {

		// device DPI does not exactly match a category
		if ([120, 160, 240, 320, 480, 640].indexOf(Ti.Platform.displayCaps.dpi) !== -1) {
			$.rulerLabel.text = $.rulerLabel.text.replace('%s', ' NOT');
		}
	}

	// on iOS we can use remote density-specific images as well (note the hires attribute in the XML!)
	if (OS_IOS) {

		// but we have to set the URL to the right one ourselves
		var ldf = Ti.Platform.displayCaps.logicalDensityFactor;
		var url = 'http://dev.fokkezb.nl/devrel/';

		// FIXME: remote @3x is not supported ATM
		url += (ldf > 1) ? 'image%402x.png' : 'image.png';

		$.remoteImage.image = url;
	}

})(arguments[0] || {});
