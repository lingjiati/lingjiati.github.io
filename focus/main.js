! function (a) {
    if ("undefined" == typeof Domify) {
        if (Element.prototype.realAddEventListener = Element.prototype.addEventListener, Element.prototype.realRemoveEventListener = Element.prototype.removeEventListener, Element.prototype.events = Element.prototype.events || [], Element.prototype.addEventListener = function (a, b, c) {
                return this.realAddEventListener(a, b, c), this.events.push({
                    type: a,
                    handler: b
                }), this.events
            }, Element.prototype.removeEventListener = function (a, b) {
                return this.realRemoveEventListener(a, b), this.events = this.events.filter(function (c) {
                    return !(c.type === a && c.handler === b)
                })
            }, Element.__toggle__ = [], Object.defineProperty(Object.prototype, "extend", {
                value: function (a) {
                    for (var b in a) this[b] = a[b];
                    return this
                },
                enumerable: !1
            }), a.fn = {}, a.scroll = function (a, b) {
                for (var c = (a - document.body.scrollTop) / (1e3 * b), d = [], e = document.body.scrollTop, f = (new Date).getTime(), g = 0; g < 1e3 * b; g++) d.push(e += c);
                var h = setInterval(function () {
                    document.body.scrollTop = d[(new Date).getTime() - f], (new Date).getTime() - f >= 1e3 * b && (document.body.scrollTop = a, clearInterval(h))
                }, 0)
            }, a.copy = function (a) {
                var b = document.activeElement,
                    c = document.createElement("textarea");
                document.body.appendChild(c), c.innerHTML = a, c.select(), document.execCommand("copy"), b.focus(), c.parentNode.removeChild(c)
            }, a.vh = innerHeight, a.vw = innerWidth, a.formatCss = function (a, b) {
                var c = Domify("body").append(Domify("<div></div>"));
                return a = c.css(a, b).css(a), c.remove(), a
            }, Notification) {
            var b = function (a, b, c) {
                return "granted" !== Notification.permission && Notification.requestPermission(), c = c || {}, c.icon = {
                    error: "https://lingjiati.github.io/base/ic_error_outline_black_48dp.png",
                    info: "https://lingjiati.github.io/base/ic_info_outline_black_48dp.png",
                    warn: "https://lingjiati.github.io/base/ic_warning_black_48dp.png"
                }[a], {
                    show: function () {
                        var a = new Notification(b, c);
                        a.onclick = this.click, a.onclose = this.close, a.onshow = this.Show
                    },
                    onclick: function (a) {
                        return this.click = a, this
                    },
                    onclose: function (a) {
                        return this.close = a, this
                    },
                    onshow: function (a) {
                        return this.Show = a, this
                    },
                    hint: function (a) {
                        return c.body = a, this
                    },
                    click: function () {},
                    close: function () {},
                    Show: function () {}
                }
            };
            a.Notify = {
                info: b.bind(null, "info"),
                warn: b.bind(null, "warn"),
                error: b.bind(null, "error")
            }
        }
        a.pageX = a.pageY = NaN, a.toCamelCase = function (a) {
            return a = a.split("-"), a.shift() + a.map(function (a) {
                return a.replace(a.charAt(0), a.charAt(0).toUpperCase())
            }).join("")
        }, a.noConflict = function () {
            window.Domify = window.$ = a
        }, a.fullScreen = function fullscreen(f1, f2) {
            var isInFullScreen = document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement;
            var docElm = document.documentElement;
            if (!isInFullScreen) {
                f1 && f1();
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                } else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                } else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                } else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                }
            } else {
                f2 && f2();
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        }, a.noConflict()
    }
}(function (a) {
    var b = function (a) {
            switch (typeof a) {
                case "string":
                    var b = a.includes("<") ? function (a) {
                        var b = document.createElement("div"),
                            c = [];
                        for (b.innerHTML = a, a = 0; a < b.childNodes.length; a++) c.push(b.childNodes[a]);
                        return c
                    }(a) : a.includes("Toast:") ? function () {
                        return [];
                    }() : document.querySelectorAll(a);
                    break;
                case "object":
                    b = a[0] ? a : [a]
            }
            return Array.prototype.slice.call(b)
        }(a),
        c = 0,
        d = !1;
    a = typeof a === "string" && a.replace('Toast:', '')
    return b.extend(Domify.fn), b.selector = a, "click blur focus mouseover mouseout scroll load copy cut paste wheel select keyup keydown change mousemove mousedown mouseup resize".split(" ").forEach(function (a, c) {
        b[a] = function (b) {
            return b ? this.each(function () {
                Domify(this).on(a, b)
            }) : this.trigger(a), this
        }
    }), b.item = function (a) {
        return this[a || 0]
    }, b.dequeue = function () {
        return c = 0, this
    }, b.delay = function (a) {
        return c += a, this
    }, b.trigger = function (a) {
        return this.each(function () {
            this[a]()
        })
    }, b.inorder = function () {
        return d = !d, this
    }, b.on = function (a, b, c) {
        return a = a.split(" "), this.each(function (d) {
            var e = this;
            a.forEach(function (f, g) {
                e.addEventListener(a[g], function () {
                    b.call(e, d)
                }, c)
            })
        })
    }, b.off = function (a, b) {
        var c = a.split(" ");
        return b ? this.each(function () {
            var a = this;
            c.forEach(function (d, e) {
                a.removeEventListener(c[e], b)
            })
        }) : this.each(function () {
            var b = Domify(this),
                d = this;
            c.forEach(function (e, f) {
                a = c[f], d.events.filter(function (b) {
                    return b.type === a
                }).forEach(function (a) {
                    b.off(a.type, a.handler)
                })
            })
        })
    }, b.events = function () {
        return this.item().events
    }, b.height = function (a) {
        return 0 === arguments.length ? parseInt(this.css("height")) : (/([a-z])/.test(a) || (a += "px"), parseInt(this.css("height", a)))
    }, b.width = function (a) {
        return 0 === arguments.length ? parseInt(this.css("width")) : (/([a-z])/.test(a) || (a += "px"), parseInt(this.css("width", a)))
    }, b.css = function (a, b) {
        return null !== b && 1 !== arguments.length || "string" != typeof a ? "object" == typeof a ? this.each(function () {
            this.style.extend(a)
        }) : this.each(function () {
            this.style[a] = b
        }) : getComputedStyle(this.item(), null).getPropertyValue(a)
    }, b.hide = function () {
        return this.css("display", "none"), this
    }, b.show = function (a) {
        return a ? this.css("display", "block") : this.css("display", "block").css("display", "")
    }, b.each = function (a) {
        var b, c = this.length;
        for (b = 0; b < c; b++)
            if (!1 === a.call(this[b], b)) return !1;
        return this
    }, b.addClass = function (a) {
        return this.each(function () {
            this.classList.add(a)
        })
    }, b.die = function (a, b) {
        return this.each(function () {
            var a = this;
            this.events.forEach(function (b) {
                a.removeEventListener(b.type, b.handler, b.capture)
            })
        })
    }, b.toggleClass = function (a, b) {
        return this.each(function () {
            this.className.includes(a) || this.className.includes(b) ? this.className.includes(a) && this.className.includes(b) ? Domify(this).removeClass(b) : (this.classList.toggle(b), this.classList.toggle(a)) : Domify(this).addClass(a)
        })
    }, b.removeClass = function (a) {
        return this.each(function () {
            this.classList.remove(a)
        })
    }, b.once = function (a, b, c) {
        var d = a.split(" ");
        return this.each(function () {
            var e = Domify(this);
            a.split(" ").forEach(function (f, g) {
                function h() {
                    e.off(a, b), e.off(a, h)
                }
                a = d[g], e.on(a, b, c), e.on(a, h, !1)
            })
        }), this
    }, b.filterHTML = function (a) {
        return a = a.test ? a : RegExp("(" + a.toLowerCase() + ")"), this.each(function () {
            var b = Domify(this);
            a.test(b.text().toLowerCase()) ? b.show() : b.hide()
        })
    }, b.hover = function (a, b) {
        this.on("mouseover", a), this.on("mouseleave", b)
    }, b.callback = function (a) {
        setTimeout(a.bind(b), 1e3 * c)
    }, b.animate = function (a, b, e) {
        if ("string" == typeof a) {
            var f = a;
            a = {}, a[f] = null;
            var g = !0
        }
        return e = e || "cubic-bezier(0.42, 0, 0.58, 1)", b = b || .5, this.each(function () {
            var f = Domify(this);
            setTimeout(function () {
                var c = "",
                    d = 0;
                for (d in a) c += (c ? ", " : "") + d + " " + b + "s " + e;
                c = Domify.formatCss("transition", c), f.css("transition", f.css("transition") + ", " + c).css(a).delay(b).callback(function () {
                    g || f.css("transition", f.css("transition").replace(c, "").replace(/\, $/, "").replace(/ ,/, ""))
                })
            }, 1e3 * c), d && (c += b)
        }), d || (c += b), this
    }, b.size = function () {
        return this.length
    }, b.replaceWith = function (a) {
        a = Domify(a).clone(), a.size() === b.size() ? this.each(function (b) {
            this.replaceWith(a[b])
        }) : this.each(function () {
            Domify(this).replaceWith(a[0])
        })
    }, b.fadein = function (a, b) {
        return this.animate({
            opacity: "1"
        }, a, b), this
    }, b.attr = function (a, b) {
        return b ? (this.each(function () {
            this.setAttribute(a, b)
        }), this) : this.item().getAttribute(a)
    }, b.fadeout = b.animate.bind(b, {
        opacity: "0"
    }), b.wrap = function (a) {
        return this.each(function () {
            var b = this.parentNode,
                c = a.cloneNode(!1);
            c.appendChild(this), b.appendChild(c)
        }), this
    }, b.clone = function () {
        return Domify(b.map(function (a) {
            return a.cloneNode(!0)
        }))
    }, b.unwrap = function () {
        var a = [];
        this.each(function () {
            for (var b in a)
                if (this.parentNode === a[b]) return;
            a.push(this.parentNode), this.parentNode.outerHTML = this.parentNode.innerHTML
        })
    }, b.next = function () {
        return Domify(this.item().nextElementSibling)
    }, b.prev = function () {
        return Domify(this.item().previousElementSibling)
    }, b.parent = function () {
        return this.item().parentNode
    }, b.parents = function () {
        return Domify(this.map(function (a) {
            return a.parentNode
        }))
    }, b.children = function () {
        return Domify(this.selector + ">*")
    }, b.first = function () {
        return Domify(this[0])
    }, b.last = function () {
        return Domify(this[this.length - 1])
    }, b.nth = function (a) {
        return Domify(this[a])
    }, b.text = function (a) {
        return a ? (this.each(function () {
            this.innerText = a
        }), this) : this.item().innerText
    }, b.html = function (a) {
        return a ? (this.each(function () {
            this.innerHTML = a
        }), this) : this.item().innerHTML
    }, b.empty = b.html.bind(b, " "), b.remove = function () {
        return this.each(function () {
            this.parentNode.removeChild(this)
        }), this
    }, b.visable = function (a) {
        return this.each(function () {
            Domify(this).css("display", a ? "" : "none")
        })
    }, b.toggleShow = function (a) {
        this.each(function () {
            return "none" === this.style.display ? Domify(this).show() : Domify(this).hide()
        })
    }, b.slideshow = function (b, c, d) {
        var e = document.querySelectorAll(a);
        "number" == typeof b && (d = b, b = c = void 0);
        var f = {
            current: 0
        };
        return f.x = e, isNaN(d) && 0 !== d ? f.milliseconds = 1e3 : f.milliseconds = d, f.start = function () {
            f.display(f.current), 0 < f.milliseconds && (clearTimeout(f.timeout), f.timeout = setTimeout(f.next, f.milliseconds))
        }, f.next = function () {
            f.current += 1, f.current === f.x.length && (f.current = 0), f.start()
        }, f.previous = function () {
            --f.current, 0 === f.current && (f.current = f.x.length), f.start()
        }, f.display = function (a) {
            b && c ? (b.call(f.x[a]), c.call(f.x[0 === a ? f.x.length - 1 : a - 1])) : (Domify(f.x[a]).show(), Domify(f.x[0 === a ? f.x.length - 1 : a - 1]).hide())
        }, f.start(), f
    }, b.val = function (a) {
        return a ? this.each(function () {
            "radio" !== this.type && "checkbox" !== this.type ? this.value = a : Domify(this).prop("checked", a)
        }) : "radio" !== this.item().type && "checkbox" !== this.item().type ? this.item().value : this.item().checked
    }, b.prop = function (a, b) {
        return b ? this.each(function () {
            this[a] = b
        }) : this.item()[a]
    }, b.toString = function () {
        return this.map(function (a) {
            return a.outerHTML
        }).join("")
    }, b.after = function (a) {
        var c = Domify(a);
        return b.each(function () {
            var a = this;
            c.each(function () {
                a.after(this)
            })
        }), c
    }, b.before = function (a) {
        var c = Domify(a);
        return b.each(function () {
            var a = this;
            c.each(function () {
                a.before(this)
            })
        }), c
    }, b.append = function (a) {
        var c = Domify(a);
        return b.each(function () {
            var a = this;
            c.each(function () {
                a.appendChild(this)
            })
        }), c
    }, b.prepend = function (a) {
        var c = Domify(a);
        return b.each(function () {
            var a = this;
            c.each(function () {
                a.insertBefore(this, a.childNodes[0])
            })
        }), c
    }, b.offset = function (a) {
        var b = {
                top: 0,
                left: 0
            },
            c = this.item();
        if (a) return this.css({
            top: "0",
            left: "0"
        }), this.each(function () {
            var b = Domify(this),
                c = b.offset();
            "static" === b.css("position") && b.css("position", "relative"), b.css({
                top: a.top - c.top + "px",
                left: a.left - c.left + "px"
            })
        });
        for (; null != c;) b.top += c.offsetTop, b.left += c.offsetLeft, c = c.offsetParent;
        return b
    }, b
}), Domify(window).resize(function () {
    $.vh = innerHeight, $.vw = innerWidth
}), Domify("html").mousemove(function (a) {
    $.pageX = a.clientX, $.pageY = a.clientY
});
$.fn.fixbar = function (mount) {
    return this.css('top', document.body.scrollTop / mount + 'px')
};
$.fn.toast = function (delay, link) {
    if (typeof delay === 'string') {
        link = delay;
        delay = undefined;
    }
    var item = Domify('body').append('<div>' + this.selector + '</div>')
    item.click(function () {
        if (link) location.href = link
    }).css({
        'min-width': '250px',
        'margin-left': '-125px',
        'background-color': '#333',
        'color': '#fff',
        'border-radius': '0.23em',
        'padding': '18px',
        'position': 'fixed',
        'z-index': '1',
        'left': '50%',
        'top': '100vh',
        'box-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        'opacity': '0',
        'cursor': 'pointer'
    }).addClass('ripple').animate({
        'opacity': '1',
        'top': 'calc(100vh - 80px)'
    }).delay(delay || 3).animate({
        'opacity': '0',
        'top': '100vh'
    }).callback(function () {
        item.remove()
    })
}
if ($.vw < 968) {
    alert('The "Focus" webapp only supports computer.')
    window.onload = () => document.body.innerHTML = 'The "Focus" webapp only supports computer.'
    throw new Error('The "Focus" webapp only supports computer.');
}
var seconds = 0,
    toggle = true,
    quotes = ["Simpler code has less bugs.", "A poor programmer blames the language.", "The best code is no code at all.", "Absence is beauty, in error logs.", "Testing is easier than debugging.", "Everything you can imagine is real.", "Simpler code has less bugs.", "Don't commit on master when drunk.", "Customers are the best testers.", "If opportunity doesn't knock, build a door.", "Whatever you are, be a good one.", "Here today, gone tomorrow.", "Creativity is intelligence having fun.", "Never optimize before measuring.", "Life is trying things to see if they work.", "A git pull a day, keeps the doctor away."],
    min, h, sec, interval, time = 0;

$(window).load(function () {
    var item = $('#fullscreen')

    $('#quote').text(quotes[Math.floor(Math.random() * quotes.length)])
    $('h1').text(localStorage.bigThing || 'What are you going to do today?').keyup(function () {
        localStorage.bigThing = $('h1').text();
        setPos()
    })
    item.click(function () {
        $.fullScreen(() => item.text("fullscreen_exit"), () => item.text("fullscreen"))
    })
    setTimeout(function () {
        $('#quote').fadeout(.8);
        $('#time').fadein(.8);
    }, 5000)
    update();
    setTimeout(setPos, 0)
    document.querySelectorAll('.w3-container span').forEach(function (span) {
        span.onclick = function () {
            var self = this,
                result = localStorage.bgcolor = $(self).css('background-color')
            document.querySelectorAll('.w3-container span').forEach(function (span) {
                span.style.borderWidth = "0";
            })
            setTimeout(function () {
                self.style.borderWidth = "5px";
                self.style.borderStyle = "solid";
                self.style.borderColor = "white";
            }, 0);
            $('header').each(function () {
                $(this).css('background-color', result)
            })
        }
    })
    $('header').css('background-color', localStorage.bgcolor || 'rgb(63, 81, 181)')
    $('#save').click(function () {
        setTimeout(function () {
            notify($('#autoperiod').val())
        }, parseInt($('#nTime').val() * 60000))
    })
    $('#closesettings').click(() => $('#settings').hide())
    $('#closenotify').click(() => $('#notify').hide())
    $('#shownotify').click(() => $('#notify').show('model'))
    $('#showsettings').click(() => $('#settings').show('model'))
    $('#showtimer').click(() => $('#timer').show('model'))
    $('#update').click(() => update())
    $('#closetimer').click(() => $('#timer').hide())
    $('#startstop').animate('background-color').click(function () {
        var self = $(this);

        if (self.text() === "timer") {
            self.text('timer_off')
            interval = setInterval(function () {
                time += 1;
                sec = time % 60;
                min = (time - sec) / 60;
                h = (min - min % 60) / 60;
                min -= h * 60;
                $('#timertext').text(
                    (h.toString().length === 1 ? "0" + h : h) + ' : ' +
                    (min.toString().length === 1 ? "0" + min : min) + ' : ' +
                    (sec.toString().length === 1 ? "0" + sec : sec))
            }, 1000)
        } else {
            self.text('timer');
            console.log(interval)
            clearInterval(interval)
        }
        self.toggleClass('w3-green', 'w3-red')
    })
})

$(window).resize(function () {
    setPos()
})

function setPos() {
    $('.banner-container').css('top', ($.vh - $('.banner-container').height()) / 2 + "px")
}

function update() {
    var ontime = false;
    setTimeout(function () {
        ontime = true;
    }, 500)
    $('#unsplash').fadeout(.6).attr('src', ('https://source.unsplash.com/random/' + screen.width + 'x' + screen.height + '?time=' + new Date().getTime())).load(function () {
        function fadein() {
            if (ontime) {
                ontime = false;
                return $('#unsplash').fadein(.5);
            }
            setTimeout(function () {
                fadein()
            }, 100)
        }
        fadein()
    })
}

function notify(text) {
    text = text || "Untitled Task"
    var basetext = $('script').nth(1).text();
    $('body').append($(basetext.replace('MX', text))).callback(() => $('#notification').css('opacity', '0').delay(.01).fadein().delay(-0.4).callback(function () {
        var audio = new Audio('notify.wav');
        audio.play();
    }))
    $('#close').click(() => $('#notification').fadeout().callback(() => $('#notification').remove()))
    $('#shownotify').click(() => $('#notify').show('model'))
}
setInterval(update, 60000)
setInterval(function () {
    seconds += 1;
    $('#time').text(
        (new Date().getHours().toString().length === 1 ? "0" + new Date().getHours() : new Date().getHours()) + ' : ' +
        (new Date().getMinutes().toString().length === 1 ? "0" + new Date().getMinutes() : new Date().getMinutes()) + ' : ' +
        (new Date().getSeconds().toString().length === 1 ? "0" + new Date().getSeconds() : new Date().getSeconds()))
}, 1000)
