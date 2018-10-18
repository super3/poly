const { SourceModule } = require('pipeline');
const axios = require('axios');

class Puller extends SourceModule {
	constructor(inputs) {
		super();

		Object.assign(this, inputs);
	}

	start() {
		this.started = true;

		this.interval = setInterval(async () => {
			const { data } = axios.get(this.url);

			this.emit('data', data);
		}, 1000 / this.fps);
	}

	stop() {
		this.started = false;

		clearInterval(this.interval);
	}
}

Puller.inputs = {
	url: String,
	fps: Number
};

module.exports = Puller;
