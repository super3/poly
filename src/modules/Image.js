const { TransformModule } = require('pipeline');
const Select = require('../lib/Select');

const promisify = f => (...args) => new Promise((resolve, reject) => f(...args, (err, res) => err ? reject(err) : resolve(res)));

class ImageReader extends TransformModule {
	constructor() {
		super();
	}

	async transform(image) {
		return promisify(module.exports.Jimp.read)(image);
	}
}

class ImageCropper extends TransformModule {
	constructor() {
		super();
	}

	async transform(image) {
		image.crop(this.x, this.y, this.w, this.h);

		return image;
	}
}

ImageCropper.inputs = {
	x: Number,
	y: Number,
	w: Number,
	h: Number
};

class ImageWriter extends TransformModule {
	constructor() {
		super();
	}

	async transform(image) {
		return await promisify(image.getBuffer.bind(image))(this.format);
	}
}

ImageWriter.inputs = {
	format: new Select(
		'image/jpeg',
		'image/png',
		'image/bmp'
	)
};

module.exports = {
	ImageReader,
	ImageCropper,
	ImageWriter
};
