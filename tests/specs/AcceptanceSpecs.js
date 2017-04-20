describe("Feature Checks", function() {

    it("should have functionality to manage game state", function() {
        var testGM = new GameManager();

        expect(testGM).toBeDefined();
    });

    it("should have user functionality", function() {
        var testUser = new User();

        expect(testUser).toBeDefined();
    });

    it("should have main menu screens", function() {
        var testScreen = new MainMenuScreen();

        expect(testScreen).toBeDefined();
    });

});
