const { TransformModule } = require('pipeline');
const Select = require('../lib/Select');

class Logger extends TransformModule {
	constructor() {
		super();
	}

	transform(input) {
		this.emit('log', {
			type: this.type,
			name: this.name,
			data: input
		});

		return input;
	}
}

Logger.description = "Log to console";

Logger.inputs = {
	name: String,
	type: new Select(
		'utf8',
		'image/jpeg',
		'image/png',
		'image/bmp'
	)
};

module.exports = Logger;
