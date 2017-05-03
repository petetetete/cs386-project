
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
