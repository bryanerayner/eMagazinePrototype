(function(_, $){

	var root = this;


	var MadLibs = root.MadLibs = {};


	var array = new Array();
	var slice = array.slice;
	var concat = array.concat;



	//Function to aggregate all MadLibs words on the page.

	var getWordData = MadLibs.getWords = function($page)
	{
		var $words = $page.find("input.word.word-input");

		var wordData = {};

		$words.each(function(){
			var $word = $(this);
			var wordId = $word.attr("data-word");
			var wordType = $word.attr("data-wordType");
			var wordValue = $word.val();

			wordData[wordId] = {
				wordType:wordType,
				word:wordValue
			}
		});

		return wordData;
	};

	var wordTypes = ["adjective", "noun", "verb", "adverb", "pronoun"];

	var wordTypeCSSClasses = _.map(wordTypes, function(wordType){
		return "wordType-"+wordType;
	});

	var wordTypeClassList = wordTypeCSSClasses.join(" ");

	// Class for the base game. Use one per page.

	/**
	* @class Page
	* @description Page outlines all the functionality for a page.
	*/

	/**
	* @constructor Page
	* @param jQuery $inputPage The jQuery object (should be a top level page) for the page containing the inputs.
	* @param jQuery $resultsPage The jQuery object (should be a top level page) for the page containing the results
	*/
	var Page = MadLibs.Page = function($inputPage, $resultsPage)
	{
		this.$inputPage = $inputPage;
		this.$resultsPage = $resultsPage;
		this.currentPage = "input";
		this.configure();
	};

	_.extend(Page.prototype, {

		configure:function(){
			this.viewPage(this.currentPage);
		},

		/**
		@method getWordData
		@description Get data about the words input to this page.
		*/
		getWordData:function()
		{
			return getWordData(this.$inputPage);
		},

		/**
		* @method displayWords
		* @description Display words onto this.$resultsPage. Calls this.getWordData if words is not supplied.
		* @param Object [words] The words to display (optional)
		*/
		displayWords:function(words)
		{
			var t = this;
			var $results = t.$resultsPage;
			words || (words = t.getWordData());

			_.each(words, function(wordData, wordId){

				// Wrap in try/catch to avoid crashing.

				try 
				{
					var wordType = wordData.wordType;
					var word = wordData.word;
					var $word = $results.find("#"+wordId);
					// Remove the styles for the type of word - add the correct type of word that this is
					$word.removeClass(wordTypeClassList).addClass("wordType-"+wordType).addClass("word word-output");
					// Add the word content.
					$word.text(word);
				}
				catch (e) {

				}
			});
		},

		/**
		* @method inputComplete
		* @description Return whether or not each input tag is filled out.
		* @returns boolean Whether or not each input tag is filled out.
		*/
		inputComplete:function()
		{
			var $inputs = this.$inputPage.find(".word.word-input");
			var vals = [];
			$inputs.each(function(){
				vals.push($(this).val());
			});
			return _.every(vals);
		},

		/**
		* @method viewPage
		* @description Transition between two pages
		* @param string page Either "input" or "results"
		*/
		viewPage:function(page)
		{
			if (page == "input")
			{
				// Switch to input
				this.$inputPage.addClass("is-page-primary");
				this.$resultsPage.removeClass("is-page-primary");
				return true;
			}else if (page =="results")
			{
				if (this.inputComplete())
				{
					this.$inputPage.removeClass("is-page-primary");
					this.$resultsPage.addClass("is-page-primary");
					return true;					
				}else{
					return false;
				}
			}
		}


	});



  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };



  Page.extend = extend;


}).call(this, _, $);