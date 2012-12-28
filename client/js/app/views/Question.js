define(
        [ 'jquery', 'underscore', 'backbone', '/js/app/templates/question.js' ],
        function($, _, Backbone, QuestionTemplate) {

            var Question = Backbone.View
                    .extend( {
                        /* spectify the tag to be created for this view */
                        tagName : 'div',

                        id : 'questionWrapper',

                        // Define all the events here,In backbone all the events
                        // use event delegation
                        events : {
                            'change #answersWrapper :input' : 'updateAnswer'
                        },

                        /*
                         * this function will be called while creating the new
                         * instance of the view. All the thirdparty code
                         * corresponding to the view. should be initialized here
                         */
                        initialize : function() {
                            // Best practice for having reference of the view
                            this.render();
                            this.showQuestionDetails();
                            this.showQuestion();
                            this.showOption();
                            this.model.listenTo("error", function(model, error) {
                                alert(error);
                            });
                        },

                        /*
                         * All the templating updation should be done here, only
                         * this should talk to the template
                         */
                        render : function() {
                            this.$el.html(QuestionTemplate.details
                                    + QuestionTemplate.questionWrapper
                                    + QuestionTemplate.answersWrapper);
                        },

                        /**
                         * show Question details
                         * 
                         * @returns
                         */
                        showQuestionDetails : function() {
                            // show the question index
                            var $questionDetailsWrapper = this.$el
                                    .find('#questionDetails');
                            $questionDetailsWrapper.find('.index').text(
                                    "Question : "
                                            + this.model.get("questionNumber")
                                            + "/"
                                            + this.model.get("totalQuestions"));
                            // show the question weight
                            $questionDetailsWrapper.find('.weight').text(
                                    this.model.get("weight"));
                        },

                        /**
                         * show Question text, If the question has image show
                         * the image
                         * 
                         * @returns
                         */
                        showQuestion : function() {
                            var $questionWrapper = this.$el.find('#question');
                            // If the question has image, then add it into the
                            // image wrapper
                            if (this.model.get("imageURL")) {
                                $questionWrapper
                                        .html(QuestionTemplate.imageWrapper);
                                this.$el.find('#imageWrapper > img').attr(
                                        "src", this.model.get("imageURL"));
                            }
                            $questionWrapper.append(this.model.get("question"));

                        },

                        /**
                         * show all possible answers (options) based on the type
                         * of the question
                         * 
                         * @returns
                         */
                        showOption : function() {
                            var $answerWrapper = this.$el
                                    .find('#answersWrapper');
                            var answersHtml = '';
                            switch (this.model.get("type")) {
                            case "radio":
                                var answers = this.model.get("answers");
                                $
                                        .each(
                                                answers,
                                                function(index, answer) {
                                                    answersHtml += '<label><input type="radio" value="'
                                                            + answer
                                                            + '" name="answer">'
                                                            + answer
                                                            + '</input><label>';
                                                });
                                break;
                            case "fillin":
                                answersHtml += '<div id="inputWrapper"><input type="text" placeholder="Enter your anser" /></div>';
                                break;
                            }
                            $answerWrapper.html(answersHtml);
                        },

                        /**
                         * function to update the answer
                         * 
                         * @returns
                         */
                        updateAnswer : function(e) {
                            var $input = $(e.target);
                            if (e.target.nodeName === "INPUT") {
                                switch ($input.attr("type")) {
                                case "radio":
                                    this.model.set("selectedAnswer", $input
                                            .val());
                                    break;
                                case "text":
                                    this.model.set("selectedAnswer", $input
                                            .val());
                                    break;
                                }
                            }
                        },
                        
                        /**
                         * method to unbind all event handlers and remove the view from the DOM
                         * @returns
                         */
                        destroy: function(){
                        	this.stopListening();
                        	this.remove();
                        }

                    });

            return Question;

        });