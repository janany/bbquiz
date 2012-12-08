define([
				'jquery', 
				'underscore',
				'backbone',
				'/js/app/templates/login.js'
				], function($, _, Backbone,loginTemplate){

	var loginView = Backbone.View.extend({
		tagName:'div',
		
		id:'loginWrapper',
		
		//Define all the events here,In backbone all the events use event delegation
		events :{
			'click #startGame':'startQuiz'
		},
		
		/*this function will be called while creating the new instance of the view. All the thirdparty 
		* code corresponding to the view. should be initialized here
		*/
		initialize: function(){
			//Best practice for having reference of the view
			var that = this;
			that.render();
			that.bindDisplay();
		},
		
		/*
		* All the templating updation should be done here, only this  should talk to the template
		*/
		render: function(){
			var that = this;
			that.$el.html(loginTemplate.loginHeader+loginTemplate.login+loginTemplate.loginButton);
		},
	
		/**
		 * function to start the model
		 * @returns
		 */
		startQuiz: function(){
			var that = this;
			var quizModel = that.options.quizModel;
			quizModel.set('display','quiz');
			that.model.set('display',false);
		},
		
		bindDisplay: function(){
			var that = this;
			that.model.on("change:display",function(model,display){
				if(display){
					that.$el.removeClass('hide');
				}else{
					that.$el.addClass('hide');
				}
			});
		}
		
	});

	return loginView;
	
});