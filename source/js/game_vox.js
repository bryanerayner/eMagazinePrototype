var game;

meSpeak.loadConfig("js/lib/mespeak_config.json");
meSpeak.loadVoice("assets/voices/en/en-us.json");

meSpeak.speak("Yo dawg, I heard you liked text to speech, so I put some text to speech in your text to speech so you could text while you speech.");


$(document).ready(function()
{
	




	game = new MadLibs.Page($(".page.page-input"), $(".page.page-results"));
	
	// This code switches the game to the popup and then quickly back to the input. This rectifies a problem with the game on Android tablets.
	_.defer(function(){
		game.viewPage("intro");
		_.defer(function(){
			game.viewPage("input");			
		});	
	});

	$("#btn-ok").on("click", function(){
		if (game.viewPage("input"))
		{
			// Response for succesfully viewing the page
		}
		else
		{
			game.viewPage("input");
		}
	});
	$("#btn-seeResults").on("click", function(){
		if (game.viewPage("results"))
		{
			// Response for succesfully viewing the page

		}
		else
		{
			game.viewPage("popup");
		}
	});
	$("#btn-seeList").on("click", function(){
		if (game.viewPage("input"))
		{
			// Response for succesfully viewing the page
			game.reset();
		}
		else
		{
			
		}
	});


	/*
	
	Should you wish to display another page here, use code similar to the following:


	game.viewPage("myPageNameHere");

	 */


});