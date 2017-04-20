class GameManager
{
    constructor()
    {
        this.users = [];
        this.screenmanager = new ScreenManager();
    }

    draw()
    {
        this.screenmanager.draw();
    }

    addUser(user)
    {
        this.users.push(user);
    }

    removeUser(id)
    {
        let toRemove = this.users.findIndex(user => user.id == id);
        if (toRemove != -1) {
            this.users.splice(toRemove, 1);
        }
    }

    getUser(id)
    {
        return this.users.find(user => user.id == id);
    }
}


class ScreenManager
{
    constructor()
    {
        this._rootScreen = null;
        this._topScreen = null;
        this._settings = null;
    }

    set root(r)
    {
        this._rootScreen = r;
        this._topScreen = r;
    }

    get root()
    {
        return this._rootScreen;
    }

    get topScreen()
    {
        return this._topScreen;
    }

    set topScreen(r)
    {
        if(this._topScreen != null) {
            r.parent = this._topScreen;
        }
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

            if(this._topScreen != null) {
                this._topScreen.restart();
            }
        }
    }

    backUpTo(cls)
    {
        while(this._topScreen != null && !(this._topScreen.parent instanceof cls))
        {
            this._topScreen.close();
            this._topScreen = this._topScreen.parent;
        }
        this.close();
    }

    draw()
    {
        this._topScreen.draw();
    }

    changePage(toPage)
    {
        // If navigating back
        if (toPage == "back") {
            this.close();
        }
        else {
            this.topScreen = new MainMenuScreen(toPage);
        }
    }
}

// NOTE: this class should be subclassed
class ScreenContainer
{
    constructor(name = null)
    {
        this._parent = null
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

    set name(n)
    {
        this._name = n;
    }

    get name()
    {
        return this._name;
    }

    back()
    {
        return true;
    }

    // events
    // NOTE: these need to be implemented in subclasses
    close() {}
    start() {}
    restart() {
        this.start();
    }
    pause() {}
    draw() {}
}

class User
{
    constructor(id)
    {
        this.username = null;
        this.id = id;
    }
}
