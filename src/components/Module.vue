<template>
	<div class="col-md-4">
		<div class="card mb-4 shadow-sm">
			<div class="card-body">
				<h5 class="card-title">{{module.name}}</h5>

				<p v-if="module.description" class="card-description grey-color">{{module.description}}</p>

				<div v-for="(value, key) in module.inputs" class="input-group card-text" style="padding-bottom: 15px;">
					<div class="input-group-prepend">
						<div class="input-group-text">{{key}}</div>
					</div>

					<input v-if="value === String" v-model="inputs[key]" type="text" class="form-control col-xs-12" v-bind:placeholder="key">
					<input v-if="value === Number" v-model="inputs[key]" type="number" class="form-control col-xs-12" v-bind:placeholder="key">

					<select v-if="value instanceof Select" v-model="inputs[key]">
						<option v-for="option in value.options" v-bind:value="option" class="form-control col-xs-12">{{option}}</option>
					</select>
				</div>

				<div class="d-flex justify-content-between align-items-center">
					<div class="btn-group">
						<button v-on:click="newInstance" type="button" class="btn btn-sm btn-outline-secondary">New</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const Select = require('../lib/Select');

module.exports = {
	props: [
		"module"
	],
	data: () => ({
		inputs: {},
		Select
	}),
	methods: {
		newInstance() {
			const inputs = Object.assign(this.inputs);

			for(const key in inputs)
				if(typeof this.module.inputs[key] === 'function')
					inputs[key] = this.module.inputs[key](inputs[key]);

			const instance = new this.module();

			// remove once pipeline fix
			Object.assign(instance, inputs);

			this.$emit('new', instance);
		}
	}
};
</script>
