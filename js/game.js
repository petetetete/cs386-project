var resources = {
	empty : "images/empty.gif",
	goal : "images/apple_green_good.png",
	up : 'images/up.png',
	blank : 'images/blank.png',
	person : 'images/person.png',
	right : 'images/right.png',
	left : 'images/left.png',
	wall : 'images/Wall.png',
	spike : 'images/spike.png',
	loop2 : 'images/loop2.png',
	loop3 : 'images/loop3.png',
	loop4 : 'images/loop4.png',
	trackup : 'images/trackup.png',
	trackdown : 'images/trackdown.png',
	trackswitch : 'images/trackswitch.png',
	testwallleft : 'images/testwallleft.png',
	testwallright : 'images/testwallright.png'
};
var rmap = {
	0 : 'blank',
	1 : 'wall',
	2 : 'person',
	3 : 'goal',
	4 : 'spike'
};

var levels = {
	1 : [
		[1, 0, 0, 0, 0, 0],
		[1, 0, 0, 3, 1, 0],
		[1, 0, 0, 0, 1, 0],
		[1, 1, 1, 0, 1, 0],
		[1, 0, 0, 0, 1, 0],
		[1, 2, 1, 0, 0, 0]
	],
	2 : [
		[1, 0, 0, 0, 0, 0],
		[1, 0, 0, 1, 1, 1],
		[1, 1, 1, 3, 0, 1],
		[4, 3, 0, 1, 0, 1],
		[1, 0, 1, 1, 2, 1],
		[1, 2, 1, 0, 1, 0]
	],
	3 : [
		[1, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 1, 1],
		[1, 0, 0, 3, 0, 1],
		[4, 0, 0, 1, 0, 1],
		[0, 0, 1, 1, 0, 1],
		[2, 0, 0, 0, 1, 0]
	],
	4 : [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[3, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 2, 0, 0, 0],
	],
};

var pieces = {
	1 : {
		'up' : 4,
		'right' : 4
	},

	2 : {
		'up' : 4,
		'right' : 1,
		'left' : 1
	},

	3 : {
		'up' : 1,
		'right' : 1,
		'loop2' : 1
	},

	4 : {
		'up' : 1,
		'loop3' : 2,
		'testwallright' : 1,
		'trackswitch' : 2,
		'left' : 1
	}
};

var solutions = {
	1 : [
		10
	],
	2 : [
		5
	],
	3 : [
		4
	],
	4 : [
		5, 5
	]
};


var get_draggable = function(id, p, s, style = '')
{
	s = s || "";
	return '<img data="'+s+'" style="'+style+'" id="'+id+'" ondragstart="drag_functions.drag(event)" draggable="true" src="' + p + '">';
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

			$("#" + data).siblings().text(g.pieces[data]);
			$("#track_" + tracknum + "_" + trackpos).html(
				"<button style='padding:0; border-width:0; width: 47px; height: 47px;' onclick='GM.screenmanager.topScreen.reclaim(" +
				tracknum + ", " + trackpos + ")'>" +
				get_draggable(data, resources[data], 1, 'width: inherit;') + "</button>"
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



	var html = '<div>';

	for(var name in parts)
	{
		var count = parts[name];

		var img = get_draggable(name, resources[name], count);

		html += '<div style="display: inline-flex; position: relative; width: 75px; height: 75px; margin: 5px;">' +
			img +
			"<div style='position: absolute; top: 0; right: 0;'>" + count + "</div>" +
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
	var html = '<table>';

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
	return "<button id='startbutton' onclick='GM.screenmanager.topScreen.Begin();'>Start Program</button>";
}
