const { SourceModule } = require('pipeline');
const axios = require('axios');

const Puller = SourceModule.create(async function(url, tps) {
	setInterval(async () => {
		this.emit('output', (await axios.get(url)).data);
	}, 1000 / tps);
});

Puller.name = "Puller";

module.exports = Puller;
