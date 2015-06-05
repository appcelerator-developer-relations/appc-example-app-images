var ldf = Ti.Platform.displayCaps.logicalDensityFactor;

/**
 * Self-executing function to wrap all stuff we do on creation.
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	if (OS_ANDROID) {

		// width in dp
		var platformWidth = Ti.Platform.displayCaps.platformWidth / ldf;

		var closest = _.reduce([400, 600, 800], function (prev, curr) {
			return (Math.abs(curr - platformWidth) < Math.abs(prev - platformWidth) ? curr : prev);
		});

		var expectedFilename = 'res-w' + closest + 'dp-xhdpi';

		$.fullwidth.text = $.fullwidth.text.replace('FILENAME', expectedFilename);
	}

})(arguments[0] || {});

function openFullscreen() {
	Alloy.createController('device/fullscreen').getView().open();
}

function cropRemote() {
	$.remoteImage.removeEventListener('postlayout', cropRemote);

	var size = $.remoteImage.size;
	var width = Math.round(size.width * ldf);
	var height = Math.round(size.height * ldf);

	$.remoteImage.image = 'http://placehold.it/' + width + 'x' + height;
}

function cropLocal() {
	$.localImage.removeEventListener('postlayout', cropLocal);

	// target
	var targetSize = $.localImage.size;
	var targetWidth = Math.round(targetSize.width * ldf);
	var targetHeight = Math.round(targetSize.height * ldf);
	var targetRatio = targetWidth / targetHeight;

	var localPath = '/images/crop.jpg';

	// file to cache cropped image so we don't need to do that every time for the found width and height
	var cachedFilename = Ti.Utils.sha1(localPath + targetWidth + targetHeight) + localPath.substr(localPath.lastIndexOf('.'));
	var cachedFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory, cachedFilename);

	if (!cachedFile.exists()) {

		// source 
		var blob = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, localPath).read();
		var blobWidth = blob.width;
		var blobHeight = blob.height;
		var blobRatio = blobWidth / blobHeight;

		var coverWidth, coverHeight;

		// fill width, overflow height
		if (targetRatio > blobRatio) {
			coverWidth = targetWidth;
			coverHeight = Math.ceil(coverWidth / blobRatio);

			// fill height, overflow width
		} else {
			coverHeight = targetHeight;
			coverWidth = Math.ceil(coverHeight * blobRatio);
		}

		// resize to cover the target
		if (coverWidth !== blobWidth || coverHeight !== blobHeight) {
			blob = blob.imageAsResized(coverWidth, coverHeight);
		}

		// crop the overflow
		if (coverWidth !== targetWidth || coverHeight !== targetHeight) {
			blob = blob.imageAsCropped({
				width: targetWidth,
				height: targetHeight
			});
		}

		cachedFile.write(blob);
	}

	$.localImage.image = cachedFile.nativePath;
}
