const Vue = require('vue');
const App = require('./components/App.vue');

require('pipeline-image').Jimp = require('./lib/Jimp');

new Vue({
	el: '#app',
	components: {
		App
	},
	render: createElement => createElement('app')
});
