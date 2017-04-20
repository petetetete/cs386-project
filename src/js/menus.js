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
            page.style.display = (page.dataset.page == this.menuName) ? "flex" : "none";
        });

        var arrow = document.getElementById("back");

        // Conditionally hide back arrow
        if (arrow) {
            arrow.style.display = (this.parent == null) ? "none" : "block";
        }
    }

    restart()
    {
        if(this.no_backtrack_menus[this.menuName] === undefined) {
            this.start();
        }
        else {
            GM.screenmanager.close();
        }
    }
}
