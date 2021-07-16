/*

	Badminton Companion
	Written By Tim Ling
	7/11/2021

*/

function expandClose() {
		if (closed == true) {
			$(".toolbar").show(true).fadeIn();
			$(".layer-1, .layer-2, .scoreKeeper").css("margin-top", "8vh");

			closed = false;
		} else if ($(".scoreKeeper").css("display") !== "none") {
			setTimeout(function() {
				$(".toolbar").hide()
			}, 500)
			$(".toolbar").fadeOut();
			$(".layer-1, .layer-2, .scoreKeeper").css("margin-top", "0")
			closed = true;
		}
};

function expandClose2(k) {
    if(k == true) $(".toolbar-2").show(true)
    else{

        $(".toolbar-2").hide()
    }
}

let closed = false;

//DOM Setup
window.addEventListener("load",  function() {

	resize();




	//Add Score
	$(".scoreKeeper .card").click(function() {

		queue[queue.length] = [document.querySelectorAll(".score")[0].innerText, document.querySelectorAll(".score")[1].innerText];
		var item = $(this.querySelectorAll('.score'));
		item.text(Number(item.text()) + 1);


	})

	let b = $(".layer-1"),
		a = $(".layer-2"),
		c = $(".scoreKeeper");


	//Toolbar


	$('.scoreKeeper .rounded, .toucharea').dblclick(expandClose);

	//Buttons
	$('.nav .click:nth-child(1)').click(function() {
		if (document.querySelector('.lineup').innerText == '-') main();
		b.hide();
		a.hide();
		c.show(true);
	})

	$('.nav .click:nth-child(2)').click(function() {
		a.show(true);
		b.hide();
		c.hide();
	})

	$('.nav .click:nth-child(3)').click(function() {
		b.show(true);
		a.hide();
		c.hide();
		let k = '';
		$('.layer-1 .card').forEach(function(a){
			if(a.scrollHeight > a.clientHeight) k += ('.' + a.classList[2] + ' .column:last-child {border-bottom: none;}')
		});
		$('style').text(k);
		sortTable();
	})

	$('.ac .click:nth-child(3)').click(function(){
		if(c.css("display")  == "block") main();
	});

	$('.ac .click:nth-child(2)').click(function(){
		if(c.css("display")  == "block"){
			queue[queue.length] = [document.querySelectorAll(".score")[0].innerText, document.querySelectorAll(".score")[1].innerText];
			$(".score").each(function(){
				this.innerText = 0;
			});

		}
	});

	$('.ac .click:nth-child(1)').click(function(){
		let v = queue.pop();
		if(v){
			document.querySelectorAll(".score")[0].innerText = v[0];
			document.querySelectorAll(".score")[1].innerText = v[1];
		}
	});

	//Ripple Effect
	var buttons = document.querySelectorAll('.clickable');
	Array.prototype.forEach.call(buttons, function(b) {
		b.addEventListener('click', createRipple);
	});



})

window.addEventListener('resize', resize)

//Functions

//Sort Table

function resize(){
	if(document.documentElement.clientHeight > document.documentElement.clientWidth){
		$('.card').css("opacity", "0");
        $('.toolbar').hide();
        expandClose2(true)
	}
	else {
		$('.card').css("opacity", "1");
        $('.toolbar').show(true)
        expandClose2(false)
	};
}

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.querySelector(".layer-1 .left");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.querySelectorAll('.column');
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].querySelector(".team-3");
      y = rows[i + 1].querySelector(".team-3");
      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
	assignNumbers();
}

//
function assignNumbers(){
	var table = document.querySelectorAll(".layer-1 .left .column:not(:first-child)");
	Array.prototype.forEach.call(table, function(a, b){
		a.querySelector('.points').innerText = b + 1;
	})
}

//Calculate Deviation
function getDev(numbers, round) {
	let a = 0,
		avg = 4 / total * round;
	for (var i in numbers) a += Math.abs(avg - numbers[i]);

	return a;
}

//Randomizer
var randomProperty = function(obj) {
	var keys = Object.keys(obj);
	return keys[keys.length * Math.random() << 0];
};

//Count Letters in String
const count = (str, re) => {
	let amount = 0;
	for (let i in str) {
		if (str[i] === re) amount += 1;
	}
	return amount;
}

//Transcript Data
function pushByPlayer(obj, obj2, a) {
	let {
		...b
	} = obj2;
	for (var i in b) {
		b[i] += obj[a][i]
	};
	return b
}

//Global Variables
var teams = {
		AA: 16,
		AB: 12,
		BB: 9,
		AC: 8,
		BC: 6,
		AD: 4,
		CC: 4,
		BD: 3,
		CD: 2,
		DD: 1
	},
	total = 0,
	matchesCompetitive = [],
	matchesPractical = [],
	round = 0,
	graph = [],
	graph2 = {
		A: 0,
		B: 0,
		C: 0,
		D: 0
	},
	playersName,
	queue = [[0, 0]],
	p;


//Main Function
function main() {
	queue = [[0, 0]];
	console.log(queue);
	var i = [];
	total = 0;
	//Update Players
	$('.tier').each(function(e, f) {
		let g = this.querySelectorAll('.player');
		i[e] = [];
		for (let h in g) {
			if (g[h].innerText && g[h].innerText != '\n') {
				i[e].push(g[h].innerText)
				total++;
				if (!document.getElementsByClassName(g[h].innerText).length) {
					var r = $(".layer-1 .left .column").item().cloneNode(true);
					r.classList.add(g[h].innerText);
					$(".layer-1 .left").item().appendChild(r);
					r.querySelector('.team-3').innerHTML = 0;
					r.querySelector('.team-1').innerHTML = g[h].innerText;
				}
			}
		}
	})
	players = {
		A: i[0].length,
		B: i[1].length,
		C: i[2].length,
		D: i[3].length
	};
	playersName = {
		A: i[0],
		B: i[1],
		C: i[2],
		D: i[3]
	};

	//Push Data
	if (round != 0) {
		var x = $(".layer-1 .right .column"),
			y = x.item().cloneNode(true),
			z = document.querySelectorAll('.lineup'),
			w = document.querySelectorAll('.score'),
			j = false;
		y.querySelector('.points').innerHTML = x.length;

		if (w[1].innerText > w[0].innerText) {
			j = z[1].innerText
		} else if (w[1].innerText < w[0].innerText) {
			j = z[0].innerText
		}
		if (j) {
			j = j.split("/");
			j.forEach(function(k) {
				var n = ('.' + k + ' .team-3');
				console.log(document.querySelectorAll(n));
				document.querySelector(n).innerText = (Number(document.querySelector(n).innerText || '0') + 1)
			})
		}

		for (var d in [0, 1]) {
			y.querySelectorAll('.team-3 div')[d].innerHTML = w[d].innerText.length == 1 ? '0' + w[d].innerText : w[d].innerText;
			y.querySelectorAll('.team-1 div')[d].innerHTML = z[d].innerText;
			w[d].innerText = 0;
		}
		$(".layer-1 .right").append(y);
	}

	//Create Matchup Data
	init();

	//Generate Match
	addMatch();
}

//Create Matchup Data
function init() {
	//Competitive Matchups
	for (var i in teams) {
		for (var j in teams) {
			if ((teams[i] / teams[j] <= 2 && teams[i] >= teams[j]) && !(teams[i] == teams[j] && i > j)) matchesCompetitive.push(String(i + j));
		}
	}

	//Practical Matchups
	var failed = false;
	for (var i in matchesCompetitive) {
		for (var j in players) {
			let exi = count(matchesCompetitive[i], j);
			if (exi > players[j]) {
				failed = true;
				break;
			} else {
				if (!graph[matchesCompetitive[i]]) graph[matchesCompetitive[i]] = [];
				graph[matchesCompetitive[i]][j] = (exi / players[j] || 0)
			}
		}
		if (failed == false) {
			matchesPractical[i] = (matchesCompetitive[i]);
		} else {
			delete graph[matchesCompetitive[i]];
		};
		failed = false;
	}
}





function newMatch() {
	round++;
	if (round == 1 || getDev(graph2, round) < 2.1) {
		//Random Match
		let r = randomProperty(graph);
		graph2 = pushByPlayer(graph, graph2, r);
		return r;
	} else {
		//Optimized Match
		var current = 0,
			currentMatch = [],
			c = new Object(graph2);
		for (var i in graph) {
			let k = pushByPlayer(graph, c, i);
			if (current == 0 || current > getDev(k, round)) {
				current = getDev(k, round);
				currentMatch = [i];
			} else if (current == getDev(k, round)) currentMatch.push(i);
			c = new Object(graph2);
		}
		if (currentMatch.length > 1) {
			currentMatch = currentMatch[randomProperty(currentMatch)]
		} else currentMatch = currentMatch[0];
		graph2 = pushByPlayer(graph, graph2, currentMatch);
		return currentMatch;
	}
}

function addMatch() {
	if(!p) p = new Object(playersName);
	var q = newMatch(),
		playersList = [],
		r, repeated = false, o;
	//Pick Players
	for (var l in q) {
		console.log(p[q[l]]);
		if(p[q[l]].length == 0) p[q[l]] = playersName[q[l]];
        do{
            r = Math.floor(Math.random() * p[q[l]].length);
            o = p[q[l]][r];
            repeated = false;
            playersList.forEach(function(a){
                if(a == o) repeated = true
            })
        } while(repeated == true)
		
		playersList.push(o);
		p[q[l]].splice(r, 1)
	}

	document.querySelectorAll('.lineup')[0].innerHTML = playersList[0] + "/" + playersList[1];
	document.querySelectorAll('.lineup')[1].innerHTML = playersList[2] + "/" + playersList[3];

}
