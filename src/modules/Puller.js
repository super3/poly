const { SourceModule } = require('pipeline');
const axios = require('axios');

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
				responseType: 'arraybuffer'
			});

			this.emit('output', data);
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
