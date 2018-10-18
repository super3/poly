<template>
	<div>
		<section class="jumbotron text-center">
			<div class="container">
				<h1 class="jumbotron-heading">Pipeline</h1>
				<p class="lead text-muted">Sequence modules to create your own automated pipeline.</p>
				<p>
					<a href="#" class="btn btn-primary my-2">Main call to action</a>
					<a href="#" class="btn btn-secondary my-2">Secondary action</a>
				</p>
			</div>
		</section>

		<div class="album py-5 bg-light">
			<div class="container">
				<h4>Sources</h4>

				<div class="row">
					<Module v-for="module in sourceModules" v-bind:module="module" v-on:new="pushInstance"></Module>
				</div>

				<h4>Transform</h4>


				<div class="row">
					<Module v-for="module in sourceModules" v-bind:module="module" v-on:new="pushInstance"></Module>
			  	</div>

				<h4>Instances</h4>

				<div class="row">
					<ModuleInstance v-for="instance in instances" v-bind:instance="instance"></ModuleInstance>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const { Pipeline, TransformModule } = require('pipeline');
const { ImageReader, ImageCropper, ImageWriter } = require('pipeline-image');
const Puller = require('../modules/Puller');

module.exports = {
	data: () => ({
		logs: [],
		sourceModules: [
			Puller
		],
		transformModules: [

		],
		instances: []
	}),
	methods: {
		pushInstance(instance) {
			this.instances.push(instance);
		}
	},
	components: {
		Module: require('./Module.vue'),
		ModuleInstance: require('./ModuleInstance.vue')
	}
};
</script>
