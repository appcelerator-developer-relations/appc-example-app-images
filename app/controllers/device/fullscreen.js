/**
 * Self-executing function to wrap all stuff we do on creation.
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {
	var expectedFilename = 'fullscreen';

	var ldf = Ti.Platform.displayCaps.logicalDensityFactor;

	if (OS_IOS) {
		var platformHeight = Ti.Platform.displayCaps.platformHeight;

		if (!Alloy.isTablet && platformHeight >= 568) {
			expectedFilename += '-' + platformHeight.toString();
		}

		if (ldf >= 2) {
			expectedFilename += '@' + ldf + 'x';
		}

		if (Alloy.isTablet) {
			expectedFilename += '~ipad';

		} else if (platformHeight < 568) {
			expectedFilename += '~iphone';
		}
	}

	expectedFilename += '.png';

	$.expectedFilename.text = $.expectedFilename.text.replace('FILENAME', expectedFilename);

})(arguments[0] || {});

function close() {
	$.win.close();
}
