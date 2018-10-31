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
				<button v-on:click="save" class="btn btn-primary">Save</button>

				<h4>Sources</h4>

				<div class="row">
					<Module v-for="module in sourceModules" v-bind:module="module" v-on:new="pushInstance"></Module>
				</div>

				<h4>Transform</h4>


				<div class="row">
					<Module v-for="module in transformModules" v-bind:module="module" v-on:new="pushInstance"></Module>
			  	</div>

				<h4>Instances</h4>

				<div class="row">
					<ModuleInstance v-for="instance in instances" v-bind:instance="instance" v-on:start="start(instance)" v-on:stop="stop(instance)" v-on:remove="remove(instance)"></ModuleInstance>
				</div>

				<h5>Logs</h5>

				<pre>
					<span v-for="log in logs">
						{{typeof log.data}}
						{{log.data.length}}
						<img v-bind:src="imageSrc(log.data)">
					</span>
				</pre>
			</div>
		</div>
	</div>
</template>

<script>
const { Pipeline, TransformModule } = require('pipeline');
const base64ArrayBuffer = require('../lib/base64ArrayBuffer');

const pipelineImage = require('../modules/Image');
const { ImageReader, ImageCropper, ImageWriter } = pipelineImage;

pipelineImage.Jimp = window.Jimp;

const Puller = require('../modules/Puller');
const Logger = require('../modules/Logger');
const TrafficLightDetector = require('../modules/TrafficLightDetector');

module.exports = {
	data: () => ({
		logs: [],
		sourceModules: [
			Puller
		],
		transformModules: [
			ImageReader,
			ImageCropper,
			ImageWriter,
			Logger,
			TrafficLightDetector
		],
		instances: [],
		logs: []
	}),
	computed: {
		modules() {
			return [ ...this.sourceModules, ...this.transformModules ];
		}
	},
	created() {
		if(localStorage.getItem('instances')) {
			const instances = JSON.parse(localStorage.getItem('instances'));

			for(const instance of instances) {
				const module = this.modules.find(module => module.name === instance.module);

				this.pushInstance(Object.assign(new module(), instance.inputs));
			}
		}
	},
	methods: {
		save() {
			const data = this.instances.map(instance => {
				const inputs = {};

				for(let key in instance.constructor.inputs) {
					inputs[key] = instance[key];
				}

				return {
					module: instance.constructor.name,
					inputs
				}
			});

			localStorage.setItem('instances', JSON.stringify(data));
		},
		start(instance) {
			instance.start();
		},
		stop(instance) {
			instance.stop();
		},
		pushInstance(instance) {
			this.instances.push(instance);

			instance.on('output', output => {
				const nextInstance = this.instances[this.instances.indexOf(instance) + 1];

				console.log(instance, nextInstance, output);

				if(nextInstance !== undefined) {
					nextInstance.emit('input', output);
				}
			});

			instance.on('log', log => {
				this.logs.unshift(log);
			});
		},
		remove(instance) {
			if(typeof instance.stop === 'function')
				instance.stop();

			this.instances.splice(this.instances.indexOf(instance), 1);
		},
		imageSrc(data) {
			return 'data:image/jpeg;base64,' + base64ArrayBuffer(data);
		}
	},
	components: {
		Module: require('./Module.vue'),
		ModuleInstance: require('./ModuleInstance.vue')
	}
};
</script>
