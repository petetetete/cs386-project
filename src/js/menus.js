
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
    		if (page.dataset.page == this.menuName) {
    			page.style.display = "flex";
    		}
    		else {
    			page.style.display = "none";
    		}
    	});

        var arrow = document.getElementById("back");
    	// Conditionally hide back arrow
    	if (this.parent == null) {
    		arrow.style.display = "none";
    	}
    	else {
    		arrow.style.display = "block";
    	}
    }

    restart()
    {
        if(this.no_backtrack_menus[this.menuName] === undefined)
            this.start();
        else
            GM.screenmanager.close();
    }
}

class GameScreen extends ScreenContainer {
    constructor(level)
    {
        super();
        this.level = level;

        $(".game-container").html(displayInterface() + displayStartButton());

        $(".board-container").html(displayBoard(levels[level]));
        $(".piece-container").html(displayPieces(level));
        $(".solution-container").html(displaySolution(level));

        this.pieces = {};
        this.solution = [];

        for(var e in pieces[level])
        {
            this.pieces[e] = pieces[level][e]
        }

        for(var i in solutions[level])
        {
            this.solution[i] = [];
            for(var j = 0; j < solutions[level][i]; j++)
                this.solution[i].push(null);
        }
    }

    Begin()
    {
        var players = [];
        var goals = [];

        var board = levels[this.level];
        var tempboard = [];

        // find all controllable entities
        for(var r in board)
        {
            tempboard.push([]);
            for(var e in board[r])
            {
                tempboard[r][e] = board[r][e];

                if(board[r][e] == 2)
                    players.push([parseInt(r),parseInt(e), true]);

                if(board[r][e] == 3)
                    goals.push([parseInt(r),parseInt(e)]);
            }
        }

        this.tracker = [0, 0];
        this.players = players;
        this.goals = goals;
        this.tempboard = tempboard;

        this.switchflag = null;
        this.switchflag_decay = 0;

        this.step_count = 0;
        this.speed = 200;

        $(".board-container").html(displayBoard(this.tempboard));
        this.DoStep();

        $("#startbutton").prop('disabled', true);
    }

    ApplyMove(move)
    {
        $(".board-container").html(displayBoard(this.tempboard));

        if(move != null)
        {
            if(move == 'up')
            {
                for(var p in this.players)
                {
                    p = this.players[p];
                    this.movePlayer(p, -1, 0);
                }
            }
            if(move == 'right')
            {
                for(var p in this.players)
                {
                    p = this.players[p];
                    this.movePlayer(p, 0, 1);
                }
            }
            if(move == 'left')
            {
                for(var p in this.players)
                {
                    p = this.players[p];
                    this.movePlayer(p, 0, -1);
                }
            }
            if(move == 'loop2')
            {
                return [0, -2];
            }
            if(move == 'loop3')
            {
                return [0, -3];
            }
            if(move == 'loop4')
            {
                return [0, -4];
            }

            if(move == 'trackswitch')
            {
                if(this.switchflag == null || this.switchflag == true)
                {
                    // do action
                    if(this.tracker[0] == this.solution.length - 1)
                    {
                        return [-(this.solution.length - 1), 0];
                    }
                    return [1, 0];
                }
            }

            if(move == 'trackup')
            {
                if(this.switchflag == null || this.switchflag == true)
                {
                    // do action
                    if(this.tracker[0] == this.solution.length - 1)
                    {
                        return [0, 0];
                    }
                    return [-1, 0];
                }
            }

            if(move == 'trackdown')
            {
                if(this.switchflag == null || this.switchflag == true)
                {
                    // do action
                    if(this.tracker[0] == this.solution.length - 1)
                    {
                        return [0, 0];
                    }
                    return [1, 0];
                }
            }

            if(move == 'testwallleft')
                this.testFor(0, -1, 1);

            if(move == 'testwallright')
                this.testFor(0, 1, 1);

            if(move == 'testwallup')
                this.testFor(-1, 0, 1);

            if(move == 'testwalldown')
                this.testFor(1, 0, 1);


        }
        return [0, 1];
    }

    testFor(ns, ew, block)
    {
        for(var p in this.players)
        {
            p = this.players[p];
            if(this.tempboard[p[0] + ns][p[1] + ew] == block)
                this.switchflag = true;
            else
                this.switchflag = false;
            this.switchflag_decay = 1;
        }
    }

    movePlayer(player, ns, ew)
    {
        this.tempboard[player[0]][player[1]] = 0;

        player[0] += ns;
        player[1] += ew;

        if(this.isConflict(player))
        {
            player[0] -= ns;
            player[1] -= ew;
        }

        this.getDead(player);
        // Check for death here

        if(player[2])
        {
            this.getGoal(player);

            this.tempboard[player[0]][player[1]] = 2;
        }
    }

    getGoal(player)
    {
        if(this.tempboard[player[0]][player[1]] == 3)
        {
            var i = this.goals.findIndex(function(e){
                return player[0] == e[0] && player[1] == e[1];
            });

            this.goals.splice(i, 1);
        }
    }
    getDead(player)
    {
        if(this.tempboard[player[0]][player[1]] == 4)
        {
            var i = this.players.findIndex(function(e){
                return player[0] == e[0] && player[1] == e[1];
            });
            player[2] = false;
            this.goals.splice(i, 1);
        }
    }
    isConflict(player)
    {
        var s = this.tempboard.length;
        if(player[0] < 0 || player[0] >= s || player[1] < 0 || player[1] >= s)
            return true;
        var value = this.tempboard[player[0]][player[1]];
        if(value == 1 || value == 2) // wall or player
            return true;
        return false;
    }

    DoStep()
    {
        var currentStep = $("#track_" + this.tracker[0] + "_" + this.tracker[1]);
        currentStep.addClass("solution-selected");

        // apply move
        var result = this.ApplyMove(this.solution[this.tracker[0]][this.tracker[1]]);

        if(this.switchflag_decay == 0)
            this.switchflag = null;
        this.switchflag_decay--;

        // see where tracker should be moved next
        this.tracker[0] += result[0];
        this.tracker[1] += result[1];

        // check for end of program
        if(this.step_count >= 100 || this.players.length == 0 || this.goals.length == 0 || this.tracker[1] >= this.solution[this.tracker[0]].length)
        {
            // end
            $("#startbutton").prop('disabled', false);

            var finished = true;
            for(var i = 0; i < this.players.length; i++)
            {
                if (this.players[i][2] == false)
                    finished = false;
            }

            setTimeout(function(){
                if(finished) {
                    console.log("finished!");
                }
                currentStep.removeClass("solution-selected");
            }, 200);
        }
        else
        {
            this.step_count++;

            if(this.step_count > 25)
                this.speed = 100;

            var me = this;
            setTimeout(function(){
                me.DoStep();
                currentStep.removeClass("solution-selected");
            }, this.speed);
        }


    }

    reclaim(tracknum, trackpos)
    {
        var d = this.solution[tracknum][trackpos];
        this.pieces[d] ++;
        $("#" + d).siblings().text(this.pieces[d]);
        $("#track_" + tracknum + "_" + trackpos).html("");
        this.solution[tracknum][trackpos] = null;
    }

}

function changePage(toPage, level) {

	// If navigating back
	if (toPage == "back") {
		GM.screenmanager.close();

        // If leaving a game screen
        if (GM.screenmanager.topScreen.menuName == "game") {
            GM.screenmanager.close();
        }
	}
	else {
		GM.screenmanager.topScreen = new MainMenuScreen(toPage);
	}

    if (toPage == 'game') {
        console.log("GAME");
        GM.screenmanager.topScreen = new GameScreen(level);
    }
}
