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
        if (arrow) {
            if (this.parent == null) {
                arrow.style.display = "none";
            }
            else {
                arrow.style.display = "block";
            }
        }

        // add check marks to all buttons!
        if(this.menuName == "levels")
        {
            var buttons = $("#levelmenu div button");

            var completed = getCookie("completed").split(',');

            buttons.each(function(i){
                var onclick = $(this).prop("onclick").toString();
                var thisbutton = onclick.match(/'[a-zA-Z]*'/g)[1].replace(/'/g, "");
                if($.inArray(thisbutton, completed) != -1)
                {
                    if($(this).html().search('fa') == -1)
                    {
                        $(this).append('<i style="padding-left:10px;" class="fa fa-check" aria-hidden="true"></i>');
                    }
                }
            });
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

        $(".game-container").html(displayInterface() + displayStartButton() + "<div id='game-notification'>test</div>");

        $(".board-container").html(displayBoard(levels[level]));
        $(".piece-container").html(displayPieces(level));
        $(".solution-container").html(displaySolution(level));

        this.board_state = 'preload';
        this.halt = false;

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

    ActOnState()
    {
        if(this.board_state == 'preload')
        {
            this.loadBoard();
            this.Begin();
            this.board_state = 'active';
            $("#startbutton").text("Running!");
        }
        else if(this.board_state == 'ready')
        {
            this.Begin();
            this.board_state = 'active';
            $("#startbutton").text("Running!");
        }
        else if(this.board_state == 'active')
        {
            this.halt = true;
        }
        else if(this.board_state == 'inactive')
        {
            this.loadBoard();
            this.display();
            this.board_state = 'ready';
            $("#game-notification").hide();
            $("#startbutton").text("Start Execution!");
        }
    }

    loadBoard()
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
        this.num_players = players.length;
        this.goals = goals;
        this.tempboard = tempboard;
    }

    display()
    {
        $(".board-container").html(displayBoard(this.tempboard));
    }

    Begin()
    {
        $("#game-notification").hide();

        this.board_state = 'active';

        this.switchflag = null;
        this.switchflag_decay = 0;

        this.step_count = 0;
        this.speed = 200;
        this.halt = false;

        this.display();

        this.DoStep();
    }

    DoStep()
    {
        var currentStep = $("#track_" + this.tracker[0] + "_" + this.tracker[1]);
        currentStep.addClass("solution-selected");

        // apply move
        $(".board-container").html(displayBoard(this.tempboard));
        var result = this.ApplyMove(this.solution[this.tracker[0]][this.tracker[1]]);

        if(this.switchflag_decay == 0)
            this.switchflag = null;
        this.switchflag_decay--;

        // see where tracker should be moved next
        this.tracker[0] += result[0];
        this.tracker[1] += result[1];

        this.tracker[0] = Math.max(0, this.tracker[0]);
        this.tracker[1] = Math.max(0, this.tracker[1]);

        // check for various end of program conditions

        // check if goals were met first, nothing else matters if the goal was met!
        if(this.goals.length == 0)
        {
            // end
            $("#startbutton").prop('disabled', false);

            var completed = getCookie("completed").split(",");
            if($.contains(completed, this.level) == false)
            {
                completed.push(this.level);
                setCookie("completed", completed.join(","));
            }

            var that = this;
            setTimeout(function(){
                $("#game-notification").text("Victory!");
                $("#game-notification").show();
                $("#startbutton").text("Reset");
                that.board_state = 'inactive';
                that.display();
                currentStep.removeClass("solution-selected");
            }, 200);
        }
        else if(this.halt)
        {
            $("#startbutton").prop('disabled', false);
            $("#game-notification").html("Halted Execution");
            $("#game-notification").show();
            $("#startbutton").text("Reset");
            this.board_state = 'inactive';
            this.display();
            currentStep.removeClass("solution-selected");
        }
        else if(this.step_count >= 50 || this.tracker[1] >= this.solution[this.tracker[0]].length)
        {
            // ran out of time
            // either reached end of a track, or reached step limit

            $("#startbutton").prop('disabled', false);
            var that = this;
            setTimeout(function(){
                $("#game-notification").text("Ran out of time, try again!");
                $("#game-notification").show();
                $("#startbutton").text("Reset");
                that.board_state = 'inactive';
                that.display();
                currentStep.removeClass("solution-selected");
            }, 200);
        }
        else if(this.players.length != this.num_players)
        {
            $("#startbutton").prop('disabled', false);
            var that = this;
            setTimeout(function(){
                $("#game-notification").text("You spiked your poor robot...");
                $("#game-notification").show();
                $("#startbutton").text("Reset");
                that.board_state = 'inactive';
                that.display();
                currentStep.removeClass("solution-selected");
            }, 200);
        }
        else
        {
            this.step_count++;

            if(this.step_count > 20)
                this.speed = 100;

            var me = this;
            setTimeout(function(){
                me.DoStep();
                currentStep.removeClass("solution-selected");
            }, this.speed);
        }


    }

    ApplyMove(move)
    {

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
            if(move == 'down')
            {
                for(var p in this.players)
                {
                    p = this.players[p];
                    this.movePlayer(p, 1, 0);
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
            this.players = this.players.filter(function(p){
                return p[2];
            })

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
                if(this.tracker[0] == this.solution.length - 1)
                {
                    return [-(this.solution.length - 1), 0];
                }
                return [1, 0];
            }

            if(move == 'trackup')
            {
                if(this.tracker[0] == 0)
                {
                    return [0, 0];
                }
                return [-1, 0];
            }

            if(move == 'trackdown')
            {
                if(this.tracker[0] == this.solution.length - 1)
                {
                    return [0, 0];
                }
                return [1, 0];
            }

            if(move == 'testwallleft')
                return this.testFor(0, -1, 1);

            if(move == 'testwallright')
                return this.testFor(0, 1, 1);

            if(move == 'testwallup')
                return this.testFor(-1, 0, 1);

            if(move == 'testwalldown')
                return this.testFor(1, 0, 1);

        }
        return [0, 1];
    }

    testFor(ns, ew, block)
    {
        for(var p in this.players)
        {
            p = this.players[p];

            this.switchflag_decay = 1;
            if(this.tempboard[p[0] + ns][p[1] + ew] == block)
                return [0, 1];
        }
        return [0, 2];
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
            this.tempboard[player[0]][player[1]] = 5; // death marker
        }
    }
    isConflict(player)
    {
        var s = this.tempboard.length;
        if(player[0] < 0 || player[0] >= s || player[1] < 0 || player[1] >= this.tempboard[player[0]].length)
            return true;
        var value = this.tempboard[player[0]][player[1]];
        if(value == 1 || value == 2) // wall or player
            return true;
        return false;
    }

    reclaim(tracknum, trackpos)
    {
        if(this.board_state != 'active')
        {
            var d = this.solution[tracknum][trackpos];
            this.pieces[d] ++;
            $("#" + d).parent().removeClass("none-remain");
            $("#" + d).siblings().text(this.pieces[d]);
            $("#track_" + tracknum + "_" + trackpos).html("");
            this.solution[tracknum][trackpos] = null;
        }
    }

}

function tryLogin() {
    var username = document.getElementById("user-username");
    var password = document.getElementById("user-password");

    if (GM.checkLogin(username.value, password.value)) {
        changePage("main");
    }
    else {
        username.value = "";
        password.value = "";
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
        GM.screenmanager.topScreen = new GameScreen(level);
    }
}
