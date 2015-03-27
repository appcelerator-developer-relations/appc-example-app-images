exports.densitySuffix = densitySuffix;

/**
 * Determine the file (iOS) or directory (Android) suffix for the current
 * generalized density category.
 * @return {string} suffix
 */
function densitySuffix() {
	var category;

	if (OS_ANDROID) {

		// convert (X)NN to (X)Ndpi
		category = Ti.Platform.displayCaps.density.replace(/^([a-z])([x]*h)?.+$/, '$1$2dpi');

		// Titanium does not go beyond xxhigh
		if (category === 'xxhdpi' && Ti.Platform.displayCaps.dpi === 640) {
			category = 'xxxhdpi';
		}

	} else if (OS_IOS) {
		var ldf = Ti.Platform.displayCaps.logicalDensityFactor;

		if (ldf === 1) {
			category = '(none)';
		} else {
			category = '@' + ldf + 'x';
		}
	}

	return category;
}
