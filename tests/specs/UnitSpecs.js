describe("Menu Navigation", function() {

    it("should be able to navigate from home to user-login", function() {
        changePage("user-login");
        expect(GM.screenmanager.topScreen.menuName).toEqual("user-login");
    });

    it("should navigate back a page correctly", function() {
        changePage("user-login");
        changePage("back");

        expect(GM.screenmanager.topScreen.menuName).toEqual("home");
    });

    it("should be able to navigate from home screen to guest login", function(){
        changePage("guest-login");
        expect(GM.screenmanager.topScreen.menuName).toEqual("guest-login");
    });

    it("should be able to navigate from home screen to teacher login", function(){
        changePage("teacher-login");
        expect(GM.screenmanager.topScreen.menuName).toEqual("teacher-login");
    });

    it("should be able to navigate from home screen to creator login", function(){
       changePage("creator-login");
        expect(GM.screenmanager.topScreen.menuName).toEqual("creator-login");
    });
    
});

describe("User Management", function() {

    var testGM;

    beforeEach(function() {
        testGM = new GameManager();
        testGM.screenmanager.root = new MainMenuScreen("home");
        testGM.screenmanager.root.start();
    });

    it("should be able to add a new user", function() {
        var testUser = new User(5);
        testGM.addUser(testUser);

        expect(testGM.users.length).toEqual(1);
    });

});

describe("In Game Menu Navigation", function(){

    it("should be able to start a single player game", function(){
        changePage("levels");
        expect(GM.screenmanager.topScreen.menuName).toEqual("levels");
    });

    it("should be able to start a multiplayer player game", function(){
        changePage("levels");
        expect(GM.screenmanager.topScreen.menuName).toEqual("levels");
    });

    it("should be able to go to settings", function(){
        changePage("settings");
        expect(GM.screenmanager.topScreen.menuName).toEqual("settings");
    });

    it("should be able to logout", function(){
        changePage("logout");
        expect(GM.screenmanager.topScreen.menuName).toEqual("logout");
    });
});

describe("Teacher Options Menu Navigation", function(){

    it("should be able to navigate to the list of student names", function(){
        changePage("view-students");
        expect(GM.screenmanager.topScreen.menuName).toEqual("view-students");
    });

    it("should be able to navigate to assign students page", function(){
        changePage("assign-students");
        expect(GM.screenmanager.topScreen.menuName).toEqual("assign-students");
    });

    it("should be able navigate to remind student page ", function(){
        changePage("send-reminder");
        expect(GM.screenmanager.topScreen.menuName).toEqual("send-reminder");
    });

});

describe("Settings Menu Navigation", function(){
 
    it("should be able to navigate difficulty page", function(){
        changePage("chosen");
        expect(GM.screenmanager.topScreen.menuName).toEqual("chosen");
    });

    it("should be able to navigate to sound page", function(){
        changePage("nothing");
        expect(GM.screenmanager.topScreen.menuName).toEqual("nothing");
    });


});
