<template>
	<div>
		<pre v-for="log in logs">{{log}}</pre>
	</div>
</template>

<script>
const { Pipeline, TransformModule } = require('pipeline');
const { ImageReader, ImageCropper, ImageWriter } = require('pipeline-image');
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
			new Puller('image.jpg', 1),
			new (TransformModule.create(async (...args) => console.log(args))),
			new ImageReader(),
			new ImageCropper(0, 0, 50, 50),
			new ImageWriter(),
			new Logger()
		]);
	}
};
</script>
