const { TransformModule } = require('pipeline');

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

Logger.inputs = {
	name: String,
	type: String
};

module.exports = Logger;
