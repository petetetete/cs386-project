class GameManager
{
    constructor()
    {
        var loadscreen = new LoadScreen();
        this.screenmanager = new ScreenManager(loadscreen);
    }
}


class ScreenManager
{
    constructor(r)
    {
        this.users = [];
        this._rootScreen = r;
        this._topScreen = r;
        this._settings = null;
    }

    set topScreen(r)
    {
        if(this._topScreen != null)
            r.parent = this._topScreen;
        this._topScreen = r;
    }

    closeTop()
    {
        if(this._topScreen != null)
        {
            this._topScreen.close();
            this._topScreen = this._topScreen.parent;
            this._topScreen.onFocus();
        }
    }
}

// NOTE: this class should be subclassed
class ScreenContainer
{
    constructor(state = null, name = null)
    {
        this._parent = null
        this._state = state;
        this._name = name;
    }

    set parent(p)
    {
        this._parent = p;
    }
    get parent()
    {
        return this._parent;
    }

    // this screen will not be displayed anymore after this function ends,
    // so keep that in mind
    close()
    {
        if(this._state != null)
            this._state.close(); // clean up the state
        this.onClose();
    }

    // events
    // NOTE: these need to be implemented in subclasses
    onClose() {} // when the screen is closed
    onReturn() {} // called when the screen gets control back from a child
}

class LoadScreen extends ScreenContainer
{
    constructor()
    {
        super(new LoadState(), "load");
    }
}

class State
{
    constructor(){}
}
class MainMenuState extends State {
    constructor()
    {
        super();
    }
}
class LoadState extends State {
    constructor()
    {
        super();
    }
}

class Settings
{
    constructor()
    {

    }
}


class User
{
    constructor() {}
}

class RegisteredUser extends User {
    constructor()
    {
        super();
    }
}

class GuestUser extends User {
    constructor()
    {
        super();
    }
}



// usage:
// gm = new <subclass of GameMode>(<name>, [levelData])
// gm.unpackLevel() -> creates a new Level object

class GameMode {

    // NOTE: name should not be changed ever

    constructor(n, l)
    {
        this._name = n;
        this._leveldata = l;
        this._level = null;
    }

    // the logic for taking
    unpackLevel() // return Level
    {
        level = new Level();
        this._level = level;

        // TODO: deserialize level data
    }

    saveLevel()
    {
        // store the level state somewhere?
    }
    resetLevel()
    {
        // remove saved level state?
    }
}
class SinglePlayer {
    constructor(n, l)
    {
        // TODO: check if level data is compatible with this mode
        super(n, l);
    }

}


// only holds the pre-loaded serialized data
// this is not an realized representation of the game level yet
class LevelData {
    constructor(levelname)
    {
        this._levelname = levelname;

        this._data = {};

        // go load the data from wherever we store the level information
    }
    get levelname()
    {
        return this._levelname;
    }
}

// holds the realized and fully loaded game world
class Level {
    constructor()
    {
        this._world = [];
    }

    addObject(o)
    {
        this._world.push(o);
    }

    findObjectByName(name)
    {

    }

    queryWorld(q)
    {
        // filter the world and return an array of objects
    }

}
