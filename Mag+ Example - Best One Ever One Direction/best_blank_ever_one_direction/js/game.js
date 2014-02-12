var game;

$(document).ready(function()
{
	game = new MadLibs.Page($(".page.page-input"), $(".page.page-results"));
	
	// This code switches the game to the popup and then quickly back to the input. This rectifies a problem with the game on Android tablets.
	game.viewPage("intro");

	$("#btn-next").on("click", function(){
		if (game.viewPage("input"))
		{
			// Response for succesfully viewing the page
		}
		else
		{
			game.viewPage("input");
		}
	});

	$("#btn-reset").on("click", function(){
		game.reset();
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