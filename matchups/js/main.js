/*

	Matchups - an intelligent Badminton companion
	Written By Tim Ling
	7/11/2021
    
    Gestures detection from http://www.javascriptkit.com/javatutors/touchevents2.shtml

*/
function expandClose(a) {
	if (a == true || closed == true) {
		$(".toolbar").show(true).fadeIn();
		$(".layer-1, .layer-2, .scoreKeeper").css("margin-top", "8vh");

		closed = false;
	} else {
		setTimeout(function() {
			$(".toolbar").hide()
		}, 500)
		$(".toolbar").fadeOut();
		$(".scoreKeeper").css("margin-top", "0");
		$(".layer-1, .layer-2").css("margin-top", "0")
		closed = true;
	}
};

document.fonts.ready.then(function(){
    $('.splash, i').fadeIn(0.5)
})

function clear(){

		queue[queue.length] = [document.querySelectorAll(".score")[0].innerText, document.querySelectorAll(".score")[1].innerText];
		$(".score").each(function() {
			this.innerText = 0;
		});

	
    }

function expandClose2(k) {
	if (k == true) $(".toolbar-2").show(true).fadeIn()
	else {
		$(".toolbar-2").css("opacity", "0");
        setTimeout(function(){
            $(".toolbar-2").hide()
        }, 500)
	}
}

function update(){
	document.querySelector('#eveness').step = 'any';
	document.querySelector('#eveness').value = randomRate = 4.2 - 0.3 * Array.from(document.querySelectorAll('.player')).filter((a) => a.innerText!=='' && a.innerText!== '\n').length
}

function swipedetect(el, callback) {

	var touchsurface = el,
		swipedir,
		startX,
		startY,
		distX,
		distY,
		threshold = 150, //required min distance traveled to be considered swipe
		restraint = 100, // maximum distance allowed at the same time in perpendicular direction
		allowedTime = 300, // maximum time allowed to travel that distance
		elapsedTime,
		startTime,
		handleswipe = callback || function(swipedir) {},
		isSwipe = false;



	function disableScrolling() {
		var x = [];
		document.querySelectorAll('.container').forEach(function(a, b) {
			a.style.overflowY = "hidden";
			x.push([a.scrollX, a.scrollY]);
			a.onscroll = function() {
				a.scrollTo(x[b][0], x[b][1]);

			};

		})
	}

	function enableScrolling() {
		document.querySelectorAll('.container').forEach(function(a) {
			a.style.overflowY = "scroll"
			a.onscroll = function() {

			};
		})
	}

	touchsurface.addEventListener('touchstart', function(e) {
		var touchobj = e.changedTouches[0]
		swipedir = 'none'
		dist = 0
		isSwipe = false
		startX = touchobj.pageX
		startY = touchobj.pageY
		startTime = new Date().getTime() // record time when finger first makes contact with surface
	}, false)

	touchsurface.addEventListener('touchmove', function(e) {
		var touchobj = e.changedTouches[0]
		distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
		distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
		elapsedTime = new Date().getTime() - startTime // get time elapsed;
		var scrollX, scrollY;
		if (elapsedTime <= allowedTime && Math.abs(distX) >= Math.abs(distY)) { // 2nd condition for horizontal swipe met
			isSwipe = true;
			disableScrolling();
		}
		if (!isSwipe) {
			if (elapsedTime > allowedTime) enableScrolling();
		}

	}, false)

	touchsurface.addEventListener('touchend', function(e) {
		enableScrolling();
		var touchobj = e.changedTouches[0]
		distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
		distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
		elapsedTime = new Date().getTime() - startTime // get time elapsed
		if (elapsedTime <= allowedTime) { // first condition for awipe met
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
				swipedir = (distX < 0) ? 'left' : 'right';
			} else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
				swipedir = (distY < 0) ? 'up' : 'down';
			}
		}
		handleswipe(swipedir)
	}, false)
}


var closed = false,
	random = false,
	mode = '2v2',
    timeOut, countOver = false,
	randomRate = 2.1,
	comRate = 2,
	referee,
	gestures;



//DOM Setup
window.addEventListener("load", function() {
    
	timeOut = setTimeout(function(){
        countOver = true;
        resize()
    }, 3000);

	if (document.documentElement.clientHeight > 1000 || document.documentElement.clientWidth > 1000) {
		$('.layer-1, .scoreKeeper').css('top', '6vh').css("height", "92%");
		$('.layer-2').css('top', '6vh')
		$('.layer-2 > div').css("height", "82%");
		$('.options').css('margin-top', '-2vh');
		$('.tier').css('top', '9.2vh');
		$('.help-mobile').remove();
		gestures = false;
	} else {
		expandClose();
		$('.help-ipad').remove();
		$('.layer-2 > div').css('height', '80%')
		gestures = true;
	}

	$('.radio input').change(function() {
		if (document.getElementById('two').checked == true) {
			mode = '2v2';
			$('.layer-1 .left, .layer-1 .right').show(true);
			$('.layer-1 .middle-left, .layer-1 .middle-right').hide();
		} else {
			mode = '1v1'
			$('.layer-1 .left, .layer-1 .right').hide();
			$('.layer-1 .middle-left, .layer-1 .middle-right').show(true);
		}
	})
	let timeout, timeout2;
	$('#fairness').input((a) => {
		a.target.step = 0.4;
		comRate = a.target.value;
		let key = {"1.2": "Strict", "1.6": "Even", "2": "Standard", "2.4": "Loose"};
		console.log(Math.floor(a.target.value * 10)/10, key)
		$('.test:nth-child(4) [kk]').text(key[Math.floor(a.target.value * 10)/10]);
		$('.test:nth-child(4) [kk]').css("right", `${a.target.value / 3 * 200 - 80}px`).fadeIn()
		clearTimeout(timeout);
		timeout = setTimeout(() => $('.test:nth-child(4) [kk]').fadeOut(), 2000)
	})



	$('#eveness').input((a) => {
		a.target.step = "1.2";
		randomRate = a.target.value;
		let key = {"0": "Strict", "1.2": "Stable", "2.4": "Minimum"};
		$('.test:nth-child(3) [kk]').text(key[Math.floor(a.target.value * 10)/10])
		$('.test:nth-child(3) [kk]').css("right", `${a.target.value / 3 * 100}px`).fadeIn()
		clearTimeout(timeout2);
		timeout2 = setTimeout(() => $('.test:nth-child(3) [kk]').fadeOut(), 2000)
	})

		

	//Add Score
	$(".scoreKeeper .card").click(function() {

		queue[queue.length] = [document.querySelectorAll(".score")[0].innerText, document.querySelectorAll(".score")[1].innerText];
		var item = $(this.querySelectorAll('.score'));
		item.text(Number(item.text()) + 1);


	})

	let b = $(".layer-1"),
		a = $(".layer-2"),
		c = $(".scoreKeeper"),
		index = 3;





	function home() {
		if (document.querySelector('.lineup').innerText == '-') main();
		b.hide();
		a.hide();
		c.show(true);
		index = 1;
	}

	function settings() {
		a.show(true);
		b.hide();
		c.hide();
		index = 3;
	}

	function analytics() {
		b.show(true);
		a.hide();
		c.hide();
		let k = '';
		$('.layer-1 .card .container').forEach(function(a) {
			if (a.scrollHeight > a.clientHeight) k += ('.' + a.classList[1] + ' .column:last-child {border-bottom: none; margin-bottom: 4px}')
		});
		$('style').text(k);
		sortTable();
		index = 2;
	}

	function undo() {
		let v = queue.pop();
		if (v) {
			document.querySelectorAll(".score")[0].innerText = v[0];
			document.querySelectorAll(".score")[1].innerText = v[1];
		}
	}

	function _referee(){
		createSnackbar(`Referee: ${referee}`)
	}
	if(gestures) swipedetect(document.body, function(direction) {
		if (direction == "right") {
			if (index === 1) analytics();
			else if (index === 2) settings();
			else if (index === 3) home();
		} else if (index === 1) {
			if (direction == "left") undo();
			else if (direction == "up") main();
			else if(direction == "down") _referee()
		}
	})
    
    

	//Buttons
	$('.nav .click:nth-child(1)').click(home)

	$('.nav .click:nth-child(2)').click(analytics)

	$('.nav .click:nth-child(3)').click(settings)

	$('.ac .click:nth-child(3)').click(main);

	$('i').click(function() {
		$('.help, .splash').toggleShow();
        clearTimeout(timeOut);
        countOver = true;
        if(document.documentElement.clientHeight < document.documentElement.clientWidth){
            $('i').die().click(resize)
        } 
        
	})

	$('.ac .click:nth-child(2)').click(_referee);

	$('.ac .click:nth-child(1)').click(undo);

	//Ripple Effect
	var buttons = document.querySelectorAll('.clickable');
	Array.prototype.forEach.call(buttons, function(b) {
		b.addEventListener('click', createRipple);

	});



})

window.addEventListener('resize', resize)

//Functions

//Sort Table

function resize() {
    if(countOver == false) return;
    count
	if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
		$('.card, .options').css("opacity", "0");
		$('.toolbar').hide();
		expandClose2(true)
	} else {
		$('.card, .options').css("opacity", "1");
		$('.toolbar').show(true)
		expandClose2(false);

	};
	let k = "";
	$('.layer-1 .card .container').forEach(function(a) {
		if (a.scrollHeight > a.clientHeight) k += ('.' + a.classList[1] + ' .column:last-child {border-bottom: none; margin-bottom: 4px}');
	});
	$('style').text(k);
}

function sortTable() {
	var table, rows, switching, i, x, y, shouldSwitch;
	table = mode == '1v1' ? document.querySelector(".layer-1 .middle-left .container") : document.querySelector(".layer-1 .left .container");
	switching = true;
	while (switching) {
		switching = false;
		rows = table.querySelectorAll('.column');
		for (i = 0; i < rows.length - 1; i++) {
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
	assignNumbers(table);
}

//
function assignNumbers(a) {
	var table = a.querySelectorAll(".column");
	Array.prototype.forEach.call(table, function(a, b) {
		a.querySelector('.points').innerText = b + 1;
	})
}

//Calculate Deviation
function getDev(numbers, round) {
	let a = 0,
		avg = 4 / total * round;
	for (var i in numbers) {
		if (playersName[i].length > 0) {
			a += Math.abs(avg - numbers[i]);
		}

	};
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
	queue = [
		[0, 0]
	],
	p,
	tiers = 0,
	waitingList = [],
	onTop = null,
	round1 = 0,
    lastGame = null,
	prev;


//Main Function
function main() {
    if(lastGame == '1v1'){
        var z = document.querySelectorAll('.lineup'),
				w = document.querySelectorAll('.score'),
				j = false,
                x = $(".layer-1 .middle-right .column"),
				y = x.item().cloneNode(true);
            y.querySelector('.points').innerHTML = x.length;
			if (Number(w[1].innerText) > Number(w[0].innerText)) {
				j = onTop = z[1].innerText;
                waitingList.push(z[0].innerText)
			} else if (Number(w[1].innerText) < Number(w[0].innerText)) {
				j = onTop = z[0].innerText;
                waitingList.push(z[1].innerText)
			} else{
                onTop = undefined;
                waitingList.push(z[0].innerText);
                waitingList.push(z[1].innerText)
            }
            
			
            
			if (j) {
				var n = ('.middle-left .' + j + ' .team-3');
				document.querySelector(n).innerText = (Number(document.querySelector(n).innerText || '0') + 1);
                
			}
            for (var d in [0, 1]) {
				y.querySelectorAll('.team-3 div')[d].innerHTML = w[d].innerText.length == 1 ? '0' + w[d].innerText : w[d].innerText;
				y.querySelectorAll('.team-1 div')[d].innerHTML = z[d].innerText;
                
			}
            $(".layer-1 .middle-right .container").append(y);
            clear();
    }
    else if(lastGame == '2v2'){
        var x = $(".layer-1 .right .column"),
				y = x.item().cloneNode(true),
				z = document.querySelectorAll('.lineup'),
				w = document.querySelectorAll('.score'),
				j = false;
			y.querySelector('.points').innerHTML = x.length;

			if (Number(w[1].innerText) > Number(w[0].innerText)) {
				j = z[1].innerText
			} else if (Number(w[1].innerText) < Number(w[0].innerText)) {
				j = z[0].innerText
			}
			j = `${z[0].innerText}/${z[1].innerText}`
			if (j) {
				j = j.split("/");
				j.forEach(function(k) {
					var n = ('.left .' + k + ' .team-3');
					document.querySelector(n).innerText = (Number(document.querySelector(n).innerText || '0') + 1)
				})
			}

			for (var d in [0, 1]) {
				y.querySelectorAll('.team-3 div')[d].innerHTML = w[d].innerText.length == 1 ? '0' + w[d].innerText : w[d].innerText;
				y.querySelectorAll('.team-1 div')[d].innerHTML = z[d].innerText;
				w[d].innerText = 0;
			}
			$(".layer-1 .right .container").append(y);
    }
	if (mode === '2v2') {
		queue = [
			[0, 0]
		];
		var i = [],
			exist = false;
		total = 0;
		var tiersTemp = 0;
		//Update Players
		$('.tier').each(function(e, f) {
			let g = this.querySelectorAll('.player');
			i[e] = [];
			exist = false;
			for (let h in g) {
				if (g[h].innerText && g[h].innerText != '\n') {
					i[e].push(g[h].innerText);
					exist = true;
					total++;
					if (!document.querySelector('.layer-1 .left').getElementsByClassName(g[h].innerText).length) {
						var r = $(".layer-1 .left .column").item().cloneNode(true);
						r.classList.add(g[h].innerText);
						$(".layer-1 .left .container").item().appendChild(r);
						r.querySelector('.team-3').innerHTML = 0;
						r.querySelector('.team-1').innerHTML = g[h].innerText;
					}
				}
				
			}
			if (exist) tiersTemp += 1;
		})
		if(String(i) !== String(prev)){
			graph2 = {A: 0, B: 0, C: 0, D: 0};
			round = 0;
			p = false;
		}
		prev = [...i]

		if (tiersTemp === 0) return;
		tiers = tiersTemp;
		
		players = {
			A: i[0].length,
			B: i[1].length,
			C: i[2].length,
			D: i[3].length
		};
		playersName = {
			A: [...i[0]],
			B: [...i[1]],
			C: [...i[2]],
			D: [...i[3]]
		};



		//Create Matchup Data
		init();

		//Generate Match
		addMatch();
        lastGame = '2v2'
	} else {

		$('.player').each(function() {
			if (this.innerText && this.innerText != '\n' && !document.querySelector('.middle-left').querySelector('.' + this.innerText)) {


				waitingList.push(this.innerText);
				var r = $(".layer-1 .left .column").item().cloneNode(true);
				r.classList.add(this.innerText);
				$(".layer-1 .middle-left .container").item().appendChild(r);
				r.querySelector('.team-3').innerHTML = 0;
				r.querySelector('.team-1').innerHTML = this.innerText;

			}

		})
		onTop = onTop || waitingList.shift();
		$('.lineup')[0].innerText = onTop;
		$('.lineup')[1].innerText = waitingList.shift();
        lastGame = '1v1'
	}
	
	var k = document.querySelectorAll('.lineup')
	k = Array.prototype.map.call(k, a => a.innerText).join('/').split('/')
	var l = document.querySelectorAll((mode == '2v2' ? '.left' : '.middle-left') + ' .team-1');
	l = Array.prototype.filter.call(l, function(d){
		return !k.includes(d.innerText) && d.innerText != '' && d.innerText != '\n'
	});
	l.shift();
	referee = l[randomProperty(l)].innerText
}

//Create Matchup Data
function init() {
	//Competitive Matchups
	for (var i in teams) {
		for (var j in teams) {
			if ((teams[i] / teams[j] <= comRate && teams[i] >= teams[j]) && !(teams[i] == teams[j] && i > j)) matchesCompetitive.push(String(i + j));
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
	console.log(getDev(graph2, (round - 1)), graph2)
	if (round == 1 || (getDev(graph2, round - 1) < randomRate)) {
		//Random Match
		let r = randomProperty(graph);
		graph2 = pushByPlayer(graph, graph2, r);
		console.log('surprise')
		return r;
	} else {
		//Optimized Match
		var current = 0,
			currentMatch = [],
			c = new Object(graph2);
		console.log('no surprise')
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
	if (!p) p = new Object(playersName);
	var q = newMatch(),
		playersList = [],
		r, repeated = false,
		o, k;
	//Pick Players
	for (var l in q) {
		if (p[q[l]].length == 0) p[q[l]] = playersName[q[l]];
		do {
			r = Math.floor(Math.random() * p[q[l]].length);
			o = p[q[l]][r];
			repeated = false;
			playersList.forEach(function(a) {
				if (a == o) repeated = true
			})
		} while (repeated == true)

		playersList.push(o);
		p[q[l]].splice(r, 1)
	}

	document.querySelectorAll('.lineup')[0].innerHTML = playersList[0] + "/" + playersList[1];
	document.querySelectorAll('.lineup')[1].innerHTML = playersList[2] + "/" + playersList[3];

}

var createSnackbar = (function() {
	// Any snackbar that is already shown
	var previous = null;
	
  /*
  <div class="paper-snackbar">
	<button class="action">Dismiss</button>
	This is a longer message that won't fit on one line. It is, inevitably, quite a boring thing. Hopefully it is still useful.
  </div>
  */
	
	return function(message, actionText, action) {
	  if (previous) {
		previous.dismiss();
	  }
	  var snackbar = document.createElement('div');
	  snackbar.className = 'paper-snackbar card-3';
	  snackbar.dismiss = function() {
		this.style.transform = 'translateY(100%)'
	  };
	  var text = document.createTextNode(message);
	  snackbar.appendChild(text);
	  if (actionText) {
		if (!action) {
		  action = snackbar.dismiss.bind(snackbar);
		}
		var actionButton = document.createElement('button');
		actionButton.className = 'action';
		actionButton.innerHTML = actionText;
		actionButton.addEventListener('click', action);
		snackbar.appendChild(actionButton);
	  }
	  setTimeout(function() {
		if (previous === this) {
		  previous.dismiss();
		}
	  }.bind(snackbar), 4000);
	  
	  snackbar.addEventListener('transitionend', function(event, elapsed) {
		if (event.propertyName === 'transform' && this.style.transform == 'translateY(100%)') {
		  this.parentElement.removeChild(this);
		  if (previous === this) {
			previous = null;
		  }
		}
	  }.bind(snackbar));
  
	  
	  
	  previous = snackbar;
	  document.body.appendChild(snackbar);
	  // In order for the animations to trigger, I have to force the original style to be computed, and then change it.
	  getComputedStyle(snackbar).bottom;
	  snackbar.style.bottom = '0px';
	  snackbar.style.opacity = 1;
	};
  })();