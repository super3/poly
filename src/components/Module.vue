<template>
	<div class="col-md-4">
	  <div class="card mb-4 shadow-sm">
		<div class="card-img-top">
			{{module.name}} <span v-on:click="$emit('new')">+</span>
		</div>

		<div class="card-body">

			<div class="input-group card-text" style="padding-bottom: 15px;">
			  <div class="input-group-prepend">
				<div class="input-group-text">URL:</div>
			  </div>
			  <input type="text" class="form-control col-xs-12" id="inlineFormInputGroup" placeholder="URL for a JPEG stream.">
			</div>

			<div class="input-group card-text" style="padding-bottom: 15px;">
			  <div class="input-group-prepend">
				<div class="input-group-text">FPS:</div>
			  </div>
			  <input type="text" class="form-control col-xs-12" id="inlineFormInputGroup" value="1">
			</div>

		  <div class="d-flex justify-content-between align-items-center">
			<div class="btn-group">
			  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
			  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
			</div>
			<small class="text-muted">9 mins</small>
		  </div>
		</div>
	  </div>
	</div>
</template>

<script>
module.exports = {
	props: [
		"module"
	]
};
</script>
