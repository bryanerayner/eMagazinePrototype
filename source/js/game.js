var game;

$(document).ready(function()
{
	game = new MadLibs.Page($(".page.page-input"), $("page.page-results"));


	$(".btn.btn-seeList").on("click", function(){
		if (game.viewPage("results"))
		{
			// Response for succesfully viewing the page

		}
		else
		{
			alert("You need to fill out all the inputs!");
		}
	});

});