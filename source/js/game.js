var game;

$(document).ready(function()
{
	game = new MadLibs.Page($(".page.page-input"), $(".page.page-results"));


	$("#btn-seeResults").on("click", function(){
		if (game.viewPage("results"))
		{
			// Response for succesfully viewing the page

		}
		else
		{
			alert("You need to fill out all the inputs!");
		}
	});
	$("#btn-seeList").on("click", function(){
		if (game.viewPage("input"))
		{
			// Response for succesfully viewing the page

		}
		else
		{
			
		}
	});

});