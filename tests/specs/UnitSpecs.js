describe("Menu Navigation", function() {

    var testGM;

    beforeEach(function() {
        testGM = new GameManager();
        testGM.screenmanager.root = new MainMenuScreen("home");
        testGM.screenmanager.root.start();
    });

    it("should be able to navigate from home to user-login", function() {
        testGM.screenmanager.changePage("user-login");
        expect(testGM.screenmanager.topScreen.menuName).toEqual("user-login");
    });

    it("should navigate back a page correctly", function() {
        testGM.screenmanager.changePage("user-login");
        testGM.screenmanager.changePage("back");

        expect(testGM.screenmanager.topScreen.menuName).toEqual("home");
    });

    // Add a few menu navigation tests (make sure to check them with the html file)
});

describe("User Management", function() {

    var testGM;

    beforeEach(function() {
        testGM = new GameManager();
        testGM.screenmanager.root = new MainMenuScreen("home");
        testGM.screenmanager.root.start();
    });

    it("should be able to add a user", function() {
        var testUser = new User(5);
        testGM.addUser(testUser);

        expect(testGM.users.length).toEqual(1);
    });

    it("should initialize a users id correctly", function() {
        var testUser = new User(42);
        testGM.addUser(testUser);

        expect(testGM.getUser(42).id).toEqual(42);
    });

    it("should be able to remove a user", function() {
        var testUser1 = new User(1);
        var testUser2 = new User(2);
        testGM.addUser(testUser1);
        testGM.addUser(testUser2);
        testGM.removeUser(1);

        expect(testGM.users.length).toEqual(1);
    });
});
