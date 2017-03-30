
(function(){
    GM = new GameManager();

    var first_screen = new MainMenuScreen("home");

    GM.screenmanager.root = first_screen;

    GM.screenmanager.root.start();

    // Add event listeners to all inputs
	[].slice.call(document.querySelectorAll('[data-clear]')).forEach((input) => {
		let value = input.value;
		input.onfocus = (e) => {
			if (e.target.value == value) e.target.value = "";
		}
		input.onblur = (e) => {
			if (!e.target.value) e.target.value = value;
		}
	});
})();
