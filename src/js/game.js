var resources = {
	empty : "images/empty.gif",
	goal : "images/apple_green_good.png",
	blank : 'images/blank.png',
	person : 'images/person.png',
	right : 'images/right.png',
	left : 'images/left.png',
	up : 'images/up.png',
	down : 'images/down.png',
	wall : 'images/Wall.png',
	spike : 'images/spikeB.png',
	loop2 : 'images/loop2.png',
	loop3 : 'images/loop3.png',
	loop4 : 'images/loop4.png',
	trackup : 'images/trackup.png',
	trackdown : 'images/trackdown.png',
	trackswitch : 'images/trackswitch.png',
	testwallleft : 'images/testwallleft.png',
	testwallright : 'images/testwallright.png',
	testwallup : 'images/testwallup.png',
	testwalldown : 'images/testwalldown.png',
	death : 'images/death.png',
	robot : 'images/robot1.png',
	battery : 'images/battery.png'
};
var rmap = {
	0 : 'blank',
	1 : 'wall',
	2 : 'robot',
	3 : 'battery', // goal
	4 : 'spike',
	5 : 'death'
};

var levels = {
	/* Introduction to movement */
	basics : [
		[1, 1, 1, 1, 1],
		[1, 3, 0, 0, 1],
		[1, 0, 0, 2, 1],
		[1, 1, 1, 1, 1],
	],
	basicsII : [
		[1, 0, 0, 1, 1],
		[1, 3, 0, 1, 1],
		[1, 1, 0, 1, 1],
		[0, 0, 0, 1, 1],
		[2, 1, 0, 0, 0]
	],

	/* Introducing spikes */
	spikes : [
		[1, 0, 0, 0, 1],
		[1, 2, 4, 3, 1],
		[1, 0, 1, 0, 1],
		[1, 0, 0, 0, 1]
	],

	spikesII : [
		[4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 3, 0, 0, 4],
		[4, 0, 4, 4, 4, 0, 4],
		[4, 0, 0, 0, 4, 0, 4],
		[4, 4, 4, 0, 2, 0, 4],
		[4, 4, 4, 4, 4, 4, 4]
	],

	// Multiple Goals
	multiplegoals : [
		[1, 1, 1, 1, 1],
	    [0, 0, 0, 1, 1],
	    [3, 4, 3, 0, 2],
	    [1, 1, 1, 1, 1],
	    [1, 1, 1, 1, 1],
	],

	/* Introducing loops */

	loops : [
		[1, 1, 1, 1, 1, 1],
		[1, 2, 0, 0, 3, 1],
		[1, 1, 1, 1, 1, 1],
	],

	loopsII : [
		[1, 1, 1, 1, 1, 1],
	    [1, 4, 4, 0, 3, 1],
	    [1, 4, 0, 0, 0, 1],
	    [1, 0, 0, 0, 4, 1],
	    [1, 2, 0, 4, 4, 1],
	    [1, 1, 1, 1, 1, 1],
	],

	/* Introducing tracks */
	tracks : [
		[1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 4, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 3],
		[1, 2, 0, 0, 4, 1, 1],
		[1, 1, 1, 1, 1, 1, 1],
	],

	// Introducing conditioning
	conditionsI : [
		[1, 1, 1, 1, 1, 1],
		[1, 3, 4, 4, 4, 1],
		[1, 0, 0, 0, 2, 1],
		[1, 4, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
	],
	conditionsII : [
		[1, 1, 0, 0, 0],
		[3, 0, 0, 1, 0],
		[4, 4, 0, 0, 0],
		[1, 1, 0, 0, 0],
		[1, 1, 2, 1, 1],
	],

	/* Introducing multiple players */
	multiplerobots : [
	    [1, 1, 3, 0, 0],
	    [1, 1, 1, 1, 0],
	    [4, 3, 0, 0, 0],
	    [1, 0, 1, 1, 2],
	    [1, 2, 1, 1, 1],
	],

	// leveraging multiple tracks for fun and profit
	TestI : [
		[1, 1, 1, 4, 4, 4, 1],
		[1, 4, 3, 0, 0, 0, 2],
		[4, 3, 4, 4, 4, 4, 4],
		[4, 0, 4, 1, 1, 1, 1],
		[1, 0, 4, 1, 4, 0, 1],
		[4, 0, 4, 1, 0, 4, 1],
		[4, 2, 4, 1, 1, 1, 1],
	],

	spikesIII : [
		[4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 2, 0, 3, 4],
		[4, 0, 0, 0, 0, 0, 4],
		[4, 2, 0, 0, 0, 2, 4],
		[4, 0, 0, 0, 0, 0, 4],
		[4, 0, 0, 2, 0, 0, 1],
		[4, 4, 4, 1, 4, 4, 4],
	]
};

var pieces = {
	basics : {
		left: 2,
		right: 1,
		up: 2,
		down: 1,
	},

	basicsII : {
		left : 2,
		right : 3,
		up : 3,
		down: 1,
	},

	spikes : {
		left: 3,
		right : 2,
		up : 1,
		down : 3,
	},

	spikesII : {
		right : 1,
		left: 3,
		up : 3,
		down : 2,
	},

	loops : {
		loop2 : 1,
		right : 1
	},

	loopsII : {
		right : 1,
		up : 1,
		loop2 : 1,
	},

	multiplegoals : {
		left : 4,
		up : 2,
		down : 2,
	},

	tracks : {
		up : 1,
		loop2 : 1,
		right : 1,
		trackdown : 1
	},

	conditionsI : {
		left : 1,
		up : 1,
		loop3 : 1,
		testwallup : 1,
		testwalldown : 1,
	},

	conditionsII : {
		left : 1,
		up : 1,
		loop3 : 2,
		testwallright : 1,
		trackswitch : 2,
	},

	multiplerobots : {
		left : 2,
		right : 2,
		up : 4,
	},

	TestI : {
		left : 3,
		up : 3,
		trackswitch : 2,
		testwallup : 1,
		testwallleft : 1,
		loop3 : 2,
	},

	spikesIII : {
		down : 3,
		left : 3,
		up : 3,
		right : 3
	}
};

var solutions = {
	basics : [
		4
	],
	basicsII : [
		8
	],
	spikes : [
		6
	],
	spikesII : [
		8
	],
	loops : [
		3
	],
	loopsII : [
		4
	],
	multiplegoals : [
		7
	],
	tracks : [
		3, 3
	],
	conditionsI : [
		5
	],
	conditionsII :[
		6, 6
	],
	multiplerobots : [
		8
	],
	TestI : [
		8, 8
	],
	spikesIII : [
		8
	]
};


var get_image = function(id, p, s, dragable)
{
	s = s || "";
	d = (dragable) ? "ondragstart='drag_functions.drag(event)'' draggable='true'" : "draggable='false'";
	return '<img data="'+s+'" class="game-piece-image" id="'+id+'" '+d+' src="' + p + '">';
};

var drag_functions = {
	allowDrop : function(ev) {
		ev.preventDefault();
	},

	drag : function(ev) {
		ev.dataTransfer.setData("id", ev.target.id);
	},

	drop : function(tracknum, trackpos, ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("id");

		var g = GM.screenmanager.topScreen;

		if(g.pieces[data] > 0 && g.board_state != 'active')
		{

			if(g.solution[tracknum][trackpos] !== null)
			{
				g.reclaim(tracknum, trackpos);
			}

			g.pieces[data] --;

			if (g.pieces[data] == 0) {
				$("#" + data).parent().addClass("none-remain");
			}

			$("#" + data).siblings().text(g.pieces[data]);
			$("#track_" + tracknum + "_" + trackpos).html(
				"<button class='solution-spot-button' onclick='GM.screenmanager.topScreen.reclaim(" +
				tracknum + ", " + trackpos + ")'>" +
				get_image(data, resources[data], 1, false) + "</button>"
			);
			g.solution[tracknum][trackpos] = data;
		}

	}
}

function displayInterface()
{
	var html = "";

	html += "<div class='board-container'></div>";
	html += "<div class='piece-container'></div>";
	html += "<div class='solution-container'></div>";

	return html;
}

function displayPieces(level)
{
	var parts = pieces[level];

	var html = '<div class="game-pieces">';

	for(var name in parts)
	{
		var count = parts[name];

		var img = get_image(name, resources[name], count, true);

		html += '<div class="game-piece">' +
					img +
					'<div class="game-piece-number">' + count + '</div>' +
				'</div>';

	}

	return html + "</div>";
}

function displaySolution(level)
{
	var tracks = solutions[level];

	var html = '';

	for(var i in tracks)
	{
		var track = tracks[i];

		html += '<div class="track-container">';

		for(var j = 0; j < track; j++)
		{
			html += '<div id="track_' + i + '_' + j +
				'" class="solution-spot" ondragover="drag_functions.allowDrop(event)" ondrop="drag_functions.drop(' + i + ',' + j + ', event)">';
			html += "</div>";
		}

		html += "</div>";
	}

	return html;
}

function displayBoard(boarddata)
{
	var html = '<table class="game-table">';

	for(var e in boarddata)
	{
		html += "<tr>";
		var row = boarddata[e];
		for(var i in row)
		{
			var d = row[i];

			html += "<td style='position: relative;'><img src='" + resources['empty'] + "'></img><img class='overlay' src='" + resources[rmap[d]] + "'></img></td>";
		}

		html += "</tr>";
	}

	return html + "</table>";
}

function displayStartButton()
{
	return "<div class='start-container'><button class='start-button' id='startbutton' onclick='GM.screenmanager.topScreen.ActOnState();'>Start Execution!</button></div>";
}
