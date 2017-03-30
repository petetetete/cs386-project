class GameManager
{
    constructor()
    {
        this.screenmanager = new ScreenManager();
    }

    draw()
    {
        this.screenmanager.draw();
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

    get root()
    {
        return this._rootScreen;
    }
    set root(r)
    {
        this._rootScreen = r;
        this._topScreen = r;
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


class State
{
    constructor(){
        //this.bb = new Blackboard();
    }

    // events
    // NOTE: these need to be implemented in subclasses
    close() {}
    start() {}
    restart() {}
    pause() {}
}
