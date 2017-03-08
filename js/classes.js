class GameManager
{
    constructor(firstScreen)
    {
        this.users = [];
        this.screenmanager = new ScreenManager(firstScreen);
    }

    draw()
    {
        this.screenmanager.draw();
    }
}


class ScreenManager
{
    constructor(r)
    {
        this._rootScreen = r;
        this._topScreen = r;
        this._settings = null;

        r.start();
    }

    set topScreen(r)
    {
        if(this._topScreen != null)
            r.parent = this._topScreen;
        this._topScreen.pause();
        this._topScreen = r;
        r.start();
    }

    closeAll()
    {
        while(this._topScreen != this._rootScreen)
            this.close();
    }

    close()
    {
        if(this._topScreen != null)
        {
            this._topScreen.close();
            this._topScreen = this._topScreen.parent;
            if(this._topScreen != null)
                this._topScreen.restart();
        }
    }

    draw()
    {
        this._topScreen.draw();
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
    }

    start()
    {
        if(this._state != null)
            this._state.start(); // clean up the state
    }

    restart() {
        if(this._state != null)
            this._state.restart(); // get state back into running shape
    } // called when the screen gets control back from a child

    pause() {
        if(this._state != null)
            this._state.pause();
    }

    draw() {
        if(this._state != null)
            this._state.draw();
    }
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
    constructor(){
        this.bb = new Blackboard();
    }

    // events
    // NOTE: these need to be implemented in subclasses
    close() {}
    start() {}
    restart() {}
    pause() {}
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



class Blackboard {
    constructor()
    {
        this._store = {};
    }

    add(key, value)
    {
        this._store[key] = value;
    }

    read(key)
    {
        value = this._store[key];
        if(value == undefined)
            return null;
        return value;
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
class SinglePlayer extends GameMode {
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
