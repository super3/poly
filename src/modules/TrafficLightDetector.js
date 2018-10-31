const { TransformModule } = require('pipeline');
const PolyNet = require('polynet');
const indexOfMax = require('../lib/indexOfMax');

const net = Object.assign(new PolyNet(), require('./TrafficLightDetectorNet.json'));

net.f = x => x / (1 + Math.abs(x));

class TrafficLightDetector extends TransformModule {
	constructor() {
		super();
	}

	async transform(image) {
		const values = image.bitmap.data.map(x => x / 256);

		const outputs = net.update(values);

		const colors = {
			0: 'Green',
			1: 'Yellow',
			2: 'Red'
		};

		return colors[indexOfMax(outputs)];
	}
};

TrafficLightDetector.inputs = {};

module.exports = TrafficLightDetector;
