(function(){
    GM = new GameManager();

    var first_screen = new MainMenuScreen("home");

    GM.screenmanager.root = first_screen;

    GM.screenmanager.root.start();
})();
