
class MainMenuScreen extends ScreenContainer
{
    constructor(mmname)
    {
        super(new MainMenuState(mmname), "menu");
    }

    start()
    {
        super.start();

        var pages = [].slice.call(document.getElementsByClassName("page"));
    	// Hide all other pages
    	pages.forEach((page) => {
    		if (page.dataset.page == this._state.menuName) {
    			page.style.display = "flex";
    		}
    		else {
    			page.style.display = "none";
    		}
    	});

        var arrow = document.getElementById("back");
    	// Conditionally hide back arrow
    	if (this.parent == null) {
    		arrow.style.display = "none";
    	}
    	else {
    		arrow.style.display = "block";
    	}
    }

    restart()
    {
        super.restart();

        if(this._state.no_backtrack_menus[this._state.menuName] === undefined)
            this.start();
    }
}

class MainMenuState extends State {
    constructor(menuName)
    {
        super();
        this.menuName = menuName;

        this.no_backtrack_menus = {
            "difficulty" : 1,
            "guest-login" : 1,
            "user-login" : 1
        }
    }

    // for when this state is first created
    start()
    {
        if(this.menuName == "logout")
        {
            setTimeout(() => {
                GM.screenmanager.closeAll();
            }, 1000);
        }
    }
    
    // for when the user clicked the back button and ended up here
    restart()
    {
        // we don't need the menu again so back up one more
        if(this.no_backtrack_menus[this.menuName] !== undefined)
            GM.screenmanager.close();
    }

}


function changePage(toPage) {
	// If navigating back
	if (toPage == "back") {
		GM.screenmanager.close();
	}
	else {
		GM.screenmanager.topScreen = new MainMenuScreen(toPage);
	}
}


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
