<template>
	<div>
		<pre v-for="log in logs">{{log}}</pre>
	</div>
</template>

<script>
const { Pipeline, TransformModule } = require('pipeline');
const Puller = require('../modules/Puller');

module.exports = {
	data: () => ({
		logs: []
	}),
	created() {
		const Logger = TransformModule.create(x => {
			this.logs.push(JSON.stringify(x));
		});

		new Pipeline([
			new Puller('https://montyanderson.net/style.css', 1),
			new Logger()
		]);
	}
};
</script>
