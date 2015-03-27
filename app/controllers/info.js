var utils = require('utils');

/**
 * Self-executing function to wrap all stuff we do on creation.
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	$.dpi.text = Ti.Platform.displayCaps.dpi;
	$.ldf.text = Ti.Platform.displayCaps.logicalDensityFactor;
	$.density.text = Ti.Platform.displayCaps.density;
	$.suffix.text = utils.densitySuffix();

})(arguments[0] || {});
