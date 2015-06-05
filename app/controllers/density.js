var utils = require('utils');

/**
 * Self-executing function to wrap all stuff we do on creation.
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// device DPI exactly matches a category
	var exact = OS_IOS || ([120, 160, 240, 320, 480, 640].indexOf(Ti.Platform.displayCaps.dpi) !== -1);

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

	if (!exact) {
		$.suffixLabel.text = $.suffixLabel.text.replace('should*', 'might*');
		$.colorLabel.text = $.colorLabel.text.replace('should*', 'might*');
		$.rulerLabel.text = $.rulerLabel.text.replace('**', ' NOT**');
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

function toggleWidth(e) {
	e.source.width = (e.source.width === 100) ? Ti.UI.SIZE : 100;
	e.source.height = (e.source.height === 100) ? Ti.UI.SIZE : 100;
}

function openURL(e) {
	Ti.Platform.openURL(e.source.url);
}
