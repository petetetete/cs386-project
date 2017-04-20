
class MainMenuScreen extends ScreenContainer
{
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

    start()
    {
        super.start();

        var pages = [].slice.call(document.getElementsByClassName("page"));
    	// Hide all other pages
    	pages.forEach((page) => {
    		if (page.dataset.page == this.menuName) {
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
        if(this.no_backtrack_menus[this.menuName] === undefined)
            this.start();
        else
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
