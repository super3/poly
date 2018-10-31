const { SourceModule } = require('pipeline');
const axios = require('axios');
const Select = require('../lib/Select');

class Puller extends SourceModule {
	constructor(inputs) {
		super();

		Object.assign(this, inputs);

		this.started = false;
	}

	start() {
		this.started = true;

		this.interval = setInterval(async () => {
			const { data } = await axios.get(this.url, {
				responseType: this.type
			});

			this.emit('output', data);
		}, 1000 / this.fps);
	}

	stop() {
		this.started = false;

		clearInterval(this.interval);
	}
}

Puller.description = "Repeatedly perform GET requests on a URL";

Puller.inputs = {
	url: String,
	fps: Number,
	type: new Select(
		'utf8',
		'arraybuffer'
	)
};

module.exports = Puller;
