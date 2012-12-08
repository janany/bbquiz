define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
	var loginModel = Backbone.Model.extend({
		//Set all the default properties here
		defaults:{
			userName:'',
			display:true
		}
	});
	return loginModel;
});