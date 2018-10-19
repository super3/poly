const { TransformModule } = require('pipeline');

class Logger extends TransformModule {
	transform(input) {
		this.emit('log', `${this.name}: ${input.toString()}`);
	}
}

Logger.inputs = {
	name: String
};

module.exports = Logger;
