var utils = require('utils');

/**
 * Self-executing function to wrap all stuff we do on creation.
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {
	var ldf = Ti.Platform.displayCaps.logicalDensityFactor;

	var platformWidth = Ti.Platform.displayCaps.platformWidth;
	var platformHeight = Ti.Platform.displayCaps.platformHeight;

	// on Android these are in px
	if (OS_ANDROID) {
		platformWidth = platformWidth / ldf;
		platformHeight = platformHeight / ldf;
	}

	$.platformWidth.text = platformWidth;
	$.platformHeight.text = platformHeight;

	$.dpi.text = Ti.Platform.displayCaps.dpi;
	$.ldf.text = ldf;
	$.density.text = Ti.Platform.displayCaps.density;
	$.suffix.text = utils.densitySuffix();

})(arguments[0] || {});
