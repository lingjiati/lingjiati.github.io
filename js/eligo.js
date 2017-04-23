/*!
 *
 * Eligo JavaScript Library
 *
 * Copyright 2017, Tim Ling
 * Released Under The GPL license 
 * Date: April 8, 2017
 *
 * Credits:
 * W3Schools( W3.JS )
 * Ivan Castellanos( StackOverflow: How to find event listeners on a DOM node when debugging or from the JavaScript code? )
 */
"use strict";
(function (fn) {
	Element.prototype.realAddEventListener = Element.prototype.addEventListener;
	Element.prototype.realRemoveEventListener = Element.prototype.removeEventListener;
	Element.prototype.events = Element.prototype.events || [];
	Element.prototype.addEventListener = function (a, b, c) {
		this.realAddEventListener(a, b, c);
		this.events.push({
			type: a,
			handler: b
		});
		return this.events;
	};
	Element.prototype.removeEventListener = function (a, b) {
		this.realRemoveEventListener(a, b);
		this.events = this.events.filter(function (x) {
			return !(x.type === a && x.handler === b)
		})
		return this.events;
	}
	Object.defineProperty(Object.prototype, 'extend', {
		value: function (that) {
			for (var x in that) {
				this[x] = that[x];
			}
			return this;
		},
		enumerable: false,
		configurable: true,
		writable: false
	})
	Object.defineProperty(Array.prototype, 'all', {
		value: function () {
			var x = 0;
			for (var i = 0; i < this.length; i++) {
				x += this[i]
			};
			return x;
		},
		enumerable: false,
		configurable: true,
		writable: false
	})
	fn.fn = {};

	function calcScroll(y, time) {
		time = time / 4.14;
		var mount = y - document.body.scrollTop / (time * 1000),
			queue = [],
			current = document.body.scrollTop;
		for (var i = 0; i < time * 1000; i++) {
			queue.push(current += mount)
		};
		return queue;
	}
	fn.scroll = function (y, time) {
		var i = 0,
			queue = calcScroll(y, time);
		var x = setInterval(function () {
			document.body.scrollTop = queue[i];
			if (!(i <= time * 241)) {
				clearInterval(x);
			}
			i++;
		}, 1)
	}
	window.Eligo = window.$ = fn;
})(function (selector) {
	var Item = (function (selector) {
		var item;
		switch (typeof selector) {
			case "string":
				item = selector.includes("<") ? (function (str) {
					var x = document.createElement("div"),
						y = [];
					x.innerHTML = str;
					for (var i = 0; i < x.childNodes.length; i++) {
						y.push(x.childNodes[i])
					}
					return y;
				})(selector) : document.querySelectorAll(selector);
				break;
			case "object":
				item = selector[0] ? selector : [selector];
		}
		return Array.prototype.slice.call(item)
	})(selector);
	var indexof = 0,
		aniqueue = [0];
	Item.extend(Eligo.fn);
	Item.selector = selector;
	"click blur focus mouseover mouseout scroll load copy cut paste wheel select keyup keydown change".split(" ").forEach(function (type, index) {
		Item[type] = function (handler) {
			if (handler) {
				this.each(function () {
					Eligo(this).on(type, handler)
				})
			} else {
				this.trigger(type)
			}
		}
	});
	Item.item = function (num) {
		return this[num || indexof];
	};
	Item.dequeue = function () {
		aniqueue = [0];
		return this;
	}
	Item.delay = function (time) {
		aniqueue.push(time);
		return this;
	}
	Item.trigger = function (type) {
		return this.each(function () {
			this[type]();
		})
	}
	Item.on = function (type, handler, capture) {
		type = type.split(' ')
		return Item.each(function () {
			var self = this;
			type.forEach(function (item, idx) {
				self.addEventListener(type[idx], handler, capture)
			})
		})
	}
	Item.off = function (type, handler) {
		var types = type.split(' ')
		if (handler) {
			return this.each(function () {
				var self = this;
				types.forEach(function (item, idx) {
					self.removeEventListener(types[idx], handler)
				})
			})
		} else {
			return this.each(function () {
				var self = Eligo(this),
					elt = this;
				types.forEach(function (item, idx) {
					type = types[idx]
					elt.events.filter(function (x) {
						return x.type === type
					}).forEach(function (x) {
						self.off(x.type, x.handler)
					})
				})
			})
		}
	}
	Item.events = function () {
		return this.item().events
	}
	Item.height = function (num) {
		return num ? this.css("height", parseInt(num)) + "px" : this.css("height")
	}
	Item.width = function (num) {
		return num ? this.css("width", parseInt(num)) + "px" : this.css("width")
	}
	Item.css = function (prop, val) {
		if ((val === null || arguments.length === 1) && typeof prop === "string") {
			return window.getComputedStyle(this.item(), null).getPropertyValue(prop);

		} else if (typeof prop === "object") {
			return this.each(function () {
				this.style.extend(prop)
			})
		}
		return this.each(function () {
			this.style[prop] = val;
		});
	};
	Item.hide = function () {
		this.css("display", "none");
		return this;
	};
	Item.show = function (truthy) {
		return truthy ? this.css("display", "block") : this.css("display", "block").css("display", "")
	};
	Item.each = function (fn) {
		var i, l = this.length;
		for (i = 0; i < l; i++) {
			if (fn.call(this[i], i) === false)
				return false;
		}
		return this;
	};
	Item.addClass = function (name) {
		return this.each(function () {
			this.classList.add(name)
		})
	};
	Item.die = function (type, handler) {
		return this.each(function () {
			var self = this;
			this.events.forEach(function (x) {
				self.removeEventListener(x.type, x.handler, x.capture)
			})
		})
	}
	Item.toggleClass = function (c1, c2) {
		return this.each(function () {
			if (!this.className.includes(c1) && !this.className.includes(c2)) {
				Eligo(this).addClass(c1);
			} else if (this.className.includes(c1) && this.className.includes(c2)) {
				Eligo(this).removeClass(c2)
			} else {
				this.classList.toggle(c2);
				this.classList.toggle(c1)
			}
		})
	};
	Item.removeClass = function (name) {
		return this.each(function () {
			this.classList.remove(name)
		})
	};
	Item.once = function (type, handler, capture) {
		var self = this,
			types = type.split(' ');
		type.split(' ').forEach(function (item, idx) {
			type = types[idx];

			function fn() {
				self.off(type, handler);
				self.off(type, fn)
			}
			self.on(type, handler, capture)
			self.on(type, fn, false)
		})
		return this;
	}
	Item.filterHTML = function (key) {
		key = key.test ? key : RegExp("(" + key.toLowerCase() + ")");
		return this.each(function () {
			var self = Eligo(this);
			if (key.test(self.text().toLowerCase())) {
				self.show()
			} else {
				self.hide()
			}
		})
	};
	Item.hover = function (f1, f2) {
		this.on("mouseover", f1)
		this.on("mouseleave", f2)
	}
	Item.callback = function (fn) {
		setTimeout(fn, aniqueue.all() * 1000)
	}
	Item.animate = function (options, time, fn) {
		if (typeof options !== "object") throw new SyntaxError('Parameter 0 must be an object')
		var self = this;
		fn = fn || "cubic-bezier(.42,0,.58,1)";
		time = time || 0.5;
		setTimeout(function () {
			var x = self.css("transition"),
				i = 0;
			for (i in options) {
				x += ("," + i + " " + time + "s" + " " + fn);
			}
			self.css("transition", x).css(options);
		}, aniqueue.all() * 1000);
		aniqueue.push(time);
		return this;
	};
	Item.fadein = function (time, fn) {
		this.animate({
			"opacity": "1"
		}, time, fn);
		return this;
	};
	Item.fadeout = function (time, fn) {
		this.animate({
			"opacity": "0"
		}, time, fn);
		return this;
	}
	Item.wrap = function (element) {
		this.each(function () {
			var x = this.parentNode,
				y = element.cloneNode(false);
			y.appendChild(this)
			x.appendChild(y);
		});
		return this;
	}
	Item.unwrap = function () {
		var arr = [];
		this.each(function () {
			for (var i in arr) {
				if (this.parentNode === arr[i]) return;
			}
			arr.push(this.parentNode);
			this.parentNode.outerHTML = this.parentNode.innerHTML;
		})
	};
	Item.next = function () {
		indexof++;
		return this;
	}
	Item.prev = function () {
		indexof--;
		return this;
	}
	Item.parent = function () {
		return this.item().parentNode;
	}
	Item.parents = function () {
		var arr = [];
		this.each(function () {
			arr.push(this.parentNode)
		})
		return Eligo(arr);
	}
	Item.children = function () {
		return Eligo(this.selector + '>*')
	}
	Item.first = function () {
		return Eligo(this[0]);
	}
	Item.last = function () {
		return Eligo(this[this.length - 1]);
	}
	Item.nth = function (num) {
		return Eligo(this[num])
	}
	Item.text = function (str) {
		if (!str) return this.item().innerText;
		this.each(function () {
			this.innerText = str;
		});
		return this;
	}
	Item.html = function (str) {
		if (!str) return this.item().innerHTML;
		this.each(function () {
			this.innerHTML = str;
		});
		return this;
	}
	Item.remove = function () {
		this.each(function () {
			this.parentNode.removeChild(this)
		});
		return this;
	}
	Item.visable = function (truthy) {
		return this.each(function () {
			Eligo(this).css("display", truthy ? "" : "none")
		})
	}
	Item.toggleShow = function (id) {
		this.each(function () {
			return this.style.display === "none" ? Eligo(this).show() : Eligo(this).hide();
		})
	};
	Item.slideshow = function (f1, f2, ms) {
		var i, ss, x = document.querySelectorAll(selector),
			l = x.length;
		if (typeof f1 === "number") {
			ms = f1;
			f1 = f2 = undefined;
		}
		ss = {};
		ss.current = 0;
		ss.x = x;
		if (!isNaN(ms) || ms === 0) {
			ss.milliseconds = ms;
		} else {
			ss.milliseconds = 1000;
		}
		ss.start = function () {
			ss.display(ss.current);
			if (ss.milliseconds > 0) {
				window.clearTimeout(ss.timeout);
				ss.timeout = window.setTimeout(ss.next, ss.milliseconds);
			}
		};
		ss.next = function () {
			ss.current += 1;
			if (ss.current === ss.x.length) {
				ss.current = 0;
			}
			ss.start();
		};
		ss.previous = function () {
			ss.current -= 1;
			if (ss.current === 0) {
				ss.current = ss.x.length;
			}
			ss.start();
		};
		ss.display = function (n) {
			if (f1 && f2) {
				f1.call(ss.x[n]);
				f2.call(ss.x[n === 0 ? ss.x.length - 1 : n - 1]);
			} else {
				Eligo(ss.x[n]).show();
				Eligo(ss.x[n === 0 ? ss.x.length - 1 : n - 1]).hide();
			}
		}
		ss.start();
		return ss;
	};
	Item.attr = function (prop, val) {
		if (!bar) {
			return this.item().getAttribute(prop)
		} else {
			this.each(function () {
				this.setAttribute(prop, val)
			})
		}
		return this;
	};
	Item.val = function (val) {
		if (!val) {
			return this.item().type !== 'radio' && this.item().type !== 'checkbox' ? this.item().value : this.item().checked;
		} else {
			return this.each(function () {
				if (this.type !== 'radio' && this.type !== 'checkbox') {
					this.value = val;
				} else {
					Eligo(this).prop('checked', val)
				}
			})
		}
	};
	Item.prop = function (prop, val) {
		if (!val) return this.item()[prop];
		return this.each(function () {
			this[prop] = val;
		})
	}
	Item.toString = function () {
		var arr = [];
		this.each(function () {
			arr.push(this.outerHTML)
		})
		return arr.join();
	}
	Item.after = function (sel) {
		var x = Eligo(sel);
		Item.each(function () {
			var self = this;
			x.each(function () {
				self.after(this)
			})
		})
		return x;
	}
	Item.before = function (sel) {
		var x = Eligo(sel);
		Item.each(function () {
			var self = this;
			x.each(function () {
				self.before(this)
			})
		})
		return x;
	}
	Item.append = function (sel) {
		var x = Eligo(sel);
		Item.each(function () {
			var self = this;
			x.each(function () {
				self.appendChild(this)
			})
		})
		return x;
	}
	Item.prepend = function (sel) {
		var x = Eligo(sel);
		Item.each(function () {
			var self = this;
			x.each(function () {
				self.insertBefore(this, self.childNodes[0]);
			})
		})
		return x;
	}
	Item.offset = function (obj) {
		var result = {
				top: 0,
				left: 0
			},
			self = this.item();
		if (!obj) {
			while (self != null) {
				result.top += self.offsetTop;
				result.left += self.offsetLeft;
				self = self.offsetParent
			}
			return result;
		} else {
			this.css({
				"top": "0",
				"left": "0"
			})
			return this.each(function () {
				var elt = Eligo(this),
					offset = elt.offset();
				if (elt.css("position") === "static") {
					elt.css("position", "relative")
				}
				elt.css({
					"top": obj.top - offset.top + "px",
					"left": obj.left - offset.left + "px"
				})
			})
		}
	}
	return Item;
});
