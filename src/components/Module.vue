<template>
	<div class="col-md-4">
		<div class="card mb-4 shadow-sm">
			<div class="card-body">
				<h5 class="card-title">{{module.name}}</h5>

				<div v-for="(value, key) in module.inputs" class="input-group card-text" style="padding-bottom: 15px;">
					<div class="input-group-prepend">
						<div class="input-group-text">{{key}}</div>
					</div>

					<input v-model="inputs[key]" type="text" class="form-control col-xs-12" v-bind:placeholder="key">
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
module.exports = {
	props: [
		"module"
	],
	data: () => ({
		inputs: {}
	}),
	methods: {
		newInstance() {
			const inputs = Object.assign(this.inputs);

			for(const key in inputs)
				inputs[key] = this.module.inputs[key](inputs[key]);

			const instance = new this.module();

			// remove once pipeline fix
			Object.assign(instance, inputs);

			this.$emit('new', instance);
		}
	}
};
</script>
