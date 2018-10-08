const { SourceModule } = require('pipeline');
const axios = require('axios');

module.exports = SourceModule.create(async function(url, tps) {
	setInterval(async () => {
		this.emit('output', (await axios.get(url)).data);
	}, 1000 / tps);
});
