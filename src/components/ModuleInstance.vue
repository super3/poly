<template>
	<div class="col-md-4">
		<div class="card mb-4 shadow-sm">
			<div class="card-body">
				<h5 class="card-title">{{instance.constructor.name}}</h5>

				<div v-for="(value, key) in instance.constructor.inputs" class="input-group card-text" style="padding-bottom: 15px;">
					<div class="input-group-prepend">
						<div class="input-group-text">{{key}}</div>
					</div>

					<input v-model="instance[key]" type="text" class="form-control col-xs-12" v-bind:placeholder="key" disabled>
				</div>

				<div class="d-flex justify-content-between align-items-center">
					<div class="btn-group" >
						<button v-on:click="instance.start" v-bind:disabled="!instance.started" type="button" class="btn btn-sm btn-outline-secondary">Start</button>

						<button v-on:click="instance.stop" v-bind:disabled="instance.started" type="button" class="btn btn-sm btn-outline-secondary">Stop</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const { SourceModule, TransformModule } = require('pipeline');

module.exports = {
	props: [
		'instance'
	],
	data: () => ({
		SourceModule,
		TransformModule
	})
};
</script>
