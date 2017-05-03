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
	spike : 'images/spike.png',
	loop2 : 'images/loop2.png',
	loop3 : 'images/loop3.png',
	loop4 : 'images/loop4.png',
	trackup : 'images/trackup.png',
	trackdown : 'images/trackdown.png',
	trackswitch : 'images/trackswitch.png',
	testwallleft : 'images/testwallleft.png',
	testwallright : 'images/testwallright.png',
	testwallleft : 'images/testwallup.png',
	testwallright : 'images/testwalldown.png'
};
var rmap = {
	0 : 'blank',
	1 : 'wall',
	2 : 'person',
	3 : 'goal',
	4 : 'spike'
};

var levels = {
	/* Introduction to movement */
	1 : [
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 3, 1, 1, 1],
		[1, 1, 0, 0, 2, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1]
	],
	2 : [
		[1, 1, 1, 1, 1, 1],
		[1, 1, 0, 0, 1, 1],
		[1, 1, 3, 0, 1, 1],
		[1, 1, 1, 0, 1, 1],
		[1, 0, 0, 0, 1, 1],
		[1, 2, 1, 0, 0, 0]
	],

	/* Introducing spikes */
	3 : [
		[1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 1, 1],
		[1, 2, 4, 3, 0, 1],
		[1, 0, 1, 1, 0, 1],
		[1, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1]
	],

	4 : [
		[4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 3, 0, 0, 4],
		[4, 0, 4, 4, 4, 0, 4],
		[4, 0, 0, 0, 4, 0, 4],
		[4, 4, 4, 0, 2, 0, 4],
		[4, 4, 4, 4, 4, 4, 4]
	],

	/* Introducing loops */
	5 : [
		[0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0],
	    [3, 0, 0, 0, 0, 1],
	    [0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 2, 0],
	],

	/* Introducing tracks and track conditions */
	6 : [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[3, 0, 0, 1, 0, 0],
		[4, 4, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 2, 0, 0, 0],
	],

	/* Introducing multiple players */
	7 : [
		[1, 1, 1, 1, 1, 1, 1],
	    [1, 1, 1, 3, 0, 0, 1],
	    [1, 1, 1, 1, 1, 0, 1],
	    [4, 3, 0, 0, 1, 0, 1],
	    [1, 0, 1, 1, 1, 2, 1],
	    [1, 2, 1, 1, 1, 1, 1],
	    [1, 1, 1, 1, 1, 1, 1]
	]
};

var pieces = {
	1 : {
		left: 2,
		right: 1,
		up: 2,
		down: 1,
	},

	2 : {
		left : 2,
		right : 3,
		up : 3,
		down: 1,
	},

	3 : {
		left: 1,
		right : 3,
		up : 3,
		down : 1,
	},

	4 : {
		right : 1,
		left: 3,
		up : 3,
		down : 2,
	},

	5 : {
		right : 1,
		up : 1,
		loop2 : 1,
	},

	6 : {
		left : 1,
		up : 1,
		loop3 : 2,
		testwallright : 1,
		trackswitch : 2,
	},

	7 : {
		left : 1,
		right : 1,
		up : 4,
	},
};

var solutions = {
	1 : [
		4
	],
	2 : [
		8
	],
	3 : [
		6
	],
	4 : [
		8
	],
	5 : [
		4
	],
	6 : [
		5, 5
	],
	7 : [
		5
	],
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

		if(g.pieces[data] > 0)
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
	return "<div class='start-container'><button class='start-button' id='startbutton' onclick='GM.screenmanager.topScreen.Begin();'>Start Execution!</button></div>";
}
