/* Copyright (c) 2014 Alex Grozav (http://grozav.com)
 * Licensed under the Envato License (LICENSE.txt).
 *
 * Plugin: Bootslider
 * Version: 2.1
 *
 * Requires: 
 * jQuery 1.2.2+
 * Bootstrap 3.0+
 * 
 * All plugins used in the creation of Bootslider licensed for Commercial use and belong to their respectful owners.
 */

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.6
 *
 * Requires: jQuery 1.2.2+
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
            toBind = ('onwheel' in document || document.documentMode >= 9) ?
            ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
            slice = Array.prototype.slice,
            nullLowestDeltaTimeout, lowestDelta;

    if ($.event.fixHooks) {
        for (var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        version: '3.1.6',
        setup: function() {
            if (this.addEventListener) {
                for (var i = toBind.length; i; ) {
                    this.addEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
        },
        teardown: function() {
            if (this.removeEventListener) {
                for (var i = toBind.length; i; ) {
                    this.removeEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },
        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event,
                args = slice.call(arguments, 1),
                delta = 0,
                deltaX = 0,
                deltaY = 0,
                absDelta = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ('detail'      in orgEvent) {
            deltaY = orgEvent.detail * -1;
        }
        if ('wheelDelta'  in orgEvent) {
            deltaY = orgEvent.wheelDelta;
        }
        if ('wheelDeltaY' in orgEvent) {
            deltaY = orgEvent.wheelDeltaY;
        }
        if ('wheelDeltaX' in orgEvent) {
            deltaX = orgEvent.wheelDeltaX * -1;
        }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ('deltaY' in orgEvent) {
            deltaY = orgEvent.deltaY * -1;
            delta = deltaY;
        }
        if ('deltaX' in orgEvent) {
            deltaX = orgEvent.deltaX;
            if (deltaY === 0) {
                delta = deltaX * -1;
            }
        }

        // No change actually happened, no reason to go any further
        if (deltaY === 0 && deltaX === 0) {
            return;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if (!lowestDelta || absDelta < lowestDelta) {
            lowestDelta = absDelta;
        }

        // Get a whole, normalized value for the deltas
        delta = Math[ delta >= 1 ? 'floor' : 'ceil' ](delta / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) {
            clearTimeout(nullLowestDeltaTimeout);
        }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

}));

(function(a) {
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define(["jquery"], a)
    } else {
        a(jQuery)
    }
}(function(e) {
    var o = "left", n = "right", d = "up", v = "down", c = "in", w = "out", l = "none", r = "auto", k = "swipe", s = "pinch", x = "tap", i = "doubletap", b = "longtap", A = "horizontal", t = "vertical", h = "all", q = 10, f = "start", j = "move", g = "end", p = "cancel", a = "ontouchstart" in window, y = "TouchSwipe";
    var m = {fingers: 1, threshold: 75, cancelThreshold: null, pinchThreshold: 20, maxTimeThreshold: null, fingerReleaseThreshold: 250, longTapThreshold: 500, doubleTapThreshold: 200, swipe: null, swipeLeft: null, swipeRight: null, swipeUp: null, swipeDown: null, swipeStatus: null, pinchIn: null, pinchOut: null, pinchStatus: null, click: null, tap: null, doubleTap: null, longTap: null, triggerOnTouchEnd: true, triggerOnTouchLeave: false, allowPageScroll: "auto", fallbackToMouseEvents: true, excludedElements: "label, button, input, select, textarea, a, .noSwipe"};
    e.fn.swipe = function(D) {
        var C = e(this), B = C.data(y);
        if (B && typeof D === "string") {
            if (B[D]) {
                return B[D].apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                e.error("Method " + D + " does not exist on jQuery.swipe")
            }
        } else {
            if (!B && (typeof D === "object" || !D)) {
                return u.apply(this, arguments)
            }
        }
        return C
    };
    e.fn.swipe.defaults = m;
    e.fn.swipe.phases = {PHASE_START: f, PHASE_MOVE: j, PHASE_END: g, PHASE_CANCEL: p};
    e.fn.swipe.directions = {LEFT: o, RIGHT: n, UP: d, DOWN: v, IN: c, OUT: w};
    e.fn.swipe.pageScroll = {NONE: l, HORIZONTAL: A, VERTICAL: t, AUTO: r};
    e.fn.swipe.fingers = {ONE: 1, TWO: 2, THREE: 3, ALL: h};
    function u(B) {
        if (B && (B.allowPageScroll === undefined && (B.swipe !== undefined || B.swipeStatus !== undefined))) {
            B.allowPageScroll = l
        }
        if (B.click !== undefined && B.tap === undefined) {
            B.tap = B.click
        }
        if (!B) {
            B = {}
        }
        B = e.extend({}, e.fn.swipe.defaults, B);
        return this.each(function() {
            var D = e(this);
            var C = D.data(y);
            if (!C) {
                C = new z(this, B);
                D.data(y, C)
            }
        })
    }
    function z(a0, aq) {
        var av = (a || !aq.fallbackToMouseEvents), G = av ? "touchstart" : "mousedown", au = av ? "touchmove" : "mousemove", R = av ? "touchend" : "mouseup", P = av ? null : "mouseleave", az = "touchcancel";
        var ac = 0, aL = null, Y = 0, aX = 0, aV = 0, D = 1, am = 0, aF = 0, J = null;
        var aN = e(a0);
        var W = "start";
        var T = 0;
        var aM = null;
        var Q = 0, aY = 0, a1 = 0, aa = 0, K = 0;
        var aS = null;
        try {
            aN.bind(G, aJ);
            aN.bind(az, a5)
        } catch (ag) {
            e.error("events not supported " + G + "," + az + " on jQuery.swipe")
        }
        this.enable = function() {
            aN.bind(G, aJ);
            aN.bind(az, a5);
            return aN
        };
        this.disable = function() {
            aG();
            return aN
        };
        this.destroy = function() {
            aG();
            aN.data(y, null);
            return aN
        };
        this.option = function(a8, a7) {
            if (aq[a8] !== undefined) {
                if (a7 === undefined) {
                    return aq[a8]
                } else {
                    aq[a8] = a7
                }
            } else {
                e.error("Option " + a8 + " does not exist on jQuery.swipe.options")
            }
            return null
        };
        function aJ(a9) {
            if (ax()) {
                return
            }
            if (e(a9.target).closest(aq.excludedElements, aN).length > 0) {
                return
            }
            var ba = a9.originalEvent ? a9.originalEvent : a9;
            var a8, a7 = a ? ba.touches[0] : ba;
            W = f;
            if (a) {
                T = ba.touches.length
            } else {
                a9.preventDefault()
            }
            ac = 0;
            aL = null;
            aF = null;
            Y = 0;
            aX = 0;
            aV = 0;
            D = 1;
            am = 0;
            aM = af();
            J = X();
            O();
            if (!a || (T === aq.fingers || aq.fingers === h) || aT()) {
                ae(0, a7);
                Q = ao();
                if (T == 2) {
                    ae(1, ba.touches[1]);
                    aX = aV = ap(aM[0].start, aM[1].start)
                }
                if (aq.swipeStatus || aq.pinchStatus) {
                    a8 = L(ba, W)
                }
            } else {
                a8 = false
            }
            if (a8 === false) {
                W = p;
                L(ba, W);
                return a8
            } else {
                ak(true)
            }
            return null
        }
        function aZ(ba) {
            var bd = ba.originalEvent ? ba.originalEvent : ba;
            if (W === g || W === p || ai()) {
                return
            }
            var a9, a8 = a ? bd.touches[0] : bd;
            var bb = aD(a8);
            aY = ao();
            if (a) {
                T = bd.touches.length
            }
            W = j;
            if (T == 2) {
                if (aX == 0) {
                    ae(1, bd.touches[1]);
                    aX = aV = ap(aM[0].start, aM[1].start)
                } else {
                    aD(bd.touches[1]);
                    aV = ap(aM[0].end, aM[1].end);
                    aF = an(aM[0].end, aM[1].end)
                }
                D = a3(aX, aV);
                am = Math.abs(aX - aV)
            }
            if ((T === aq.fingers || aq.fingers === h) || !a || aT()) {
                aL = aH(bb.start, bb.end);
                ah(ba, aL);
                ac = aO(bb.start, bb.end);
                Y = aI();
                aE(aL, ac);
                if (aq.swipeStatus || aq.pinchStatus) {
                    a9 = L(bd, W)
                }
                if (!aq.triggerOnTouchEnd || aq.triggerOnTouchLeave) {
                    var a7 = true;
                    if (aq.triggerOnTouchLeave) {
                        var bc = aU(this);
                        a7 = B(bb.end, bc)
                    }
                    if (!aq.triggerOnTouchEnd && a7) {
                        W = ay(j)
                    } else {
                        if (aq.triggerOnTouchLeave && !a7) {
                            W = ay(g)
                        }
                    }
                    if (W == p || W == g) {
                        L(bd, W)
                    }
                }
            } else {
                W = p;
                L(bd, W)
            }
            if (a9 === false) {
                W = p;
                L(bd, W)
            }
        }
        function I(a7) {
            var a8 = a7.originalEvent;
            if (a) {
                if (a8.touches.length > 0) {
                    C();
                    return true
                }
            }
            if (ai()) {
                T = aa
            }
            a7.preventDefault();
            aY = ao();
            Y = aI();
            if (a6()) {
                W = p;
                L(a8, W)
            } else {
                if (aq.triggerOnTouchEnd || (aq.triggerOnTouchEnd == false && W === j)) {
                    W = g;
                    L(a8, W)
                } else {
                    if (!aq.triggerOnTouchEnd && a2()) {
                        W = g;
                        aB(a8, W, x)
                    } else {
                        if (W === j) {
                            W = p;
                            L(a8, W)
                        }
                    }
                }
            }
            ak(false);
            return null
        }
        function a5() {
            T = 0;
            aY = 0;
            Q = 0;
            aX = 0;
            aV = 0;
            D = 1;
            O();
            ak(false)
        }
        function H(a7) {
            var a8 = a7.originalEvent;
            if (aq.triggerOnTouchLeave) {
                W = ay(g);
                L(a8, W)
            }
        }
        function aG() {
            aN.unbind(G, aJ);
            aN.unbind(az, a5);
            aN.unbind(au, aZ);
            aN.unbind(R, I);
            if (P) {
                aN.unbind(P, H)
            }
            ak(false)
        }
        function ay(bb) {
            var ba = bb;
            var a9 = aw();
            var a8 = aj();
            var a7 = a6();
            if (!a9 || a7) {
                ba = p
            } else {
                if (a8 && bb == j && (!aq.triggerOnTouchEnd || aq.triggerOnTouchLeave)) {
                    ba = g
                } else {
                    if (!a8 && bb == g && aq.triggerOnTouchLeave) {
                        ba = p
                    }
                }
            }
            return ba
        }
        function L(a9, a7) {
            var a8 = undefined;
            if (F() || S()) {
                a8 = aB(a9, a7, k)
            } else {
                if ((M() || aT()) && a8 !== false) {
                    a8 = aB(a9, a7, s)
                }
            }
            if (aC() && a8 !== false) {
                a8 = aB(a9, a7, i)
            } else {
                if (al() && a8 !== false) {
                    a8 = aB(a9, a7, b)
                } else {
                    if (ad() && a8 !== false) {
                        a8 = aB(a9, a7, x)
                    }
                }
            }
            if (a7 === p) {
                a5(a9)
            }
            if (a7 === g) {
                if (a) {
                    if (a9.touches.length == 0) {
                        a5(a9)
                    }
                } else {
                    a5(a9)
                }
            }
            return a8
        }
        function aB(ba, a7, a9) {
            var a8 = undefined;
            if (a9 == k) {
                aN.trigger("swipeStatus", [a7, aL || null, ac || 0, Y || 0, T]);
                if (aq.swipeStatus) {
                    a8 = aq.swipeStatus.call(aN, ba, a7, aL || null, ac || 0, Y || 0, T);
                    if (a8 === false) {
                        return false
                    }
                }
                if (a7 == g && aR()) {
                    aN.trigger("swipe", [aL, ac, Y, T]);
                    if (aq.swipe) {
                        a8 = aq.swipe.call(aN, ba, aL, ac, Y, T);
                        if (a8 === false) {
                            return false
                        }
                    }
                    switch (aL) {
                        case o:
                            aN.trigger("swipeLeft", [aL, ac, Y, T]);
                            if (aq.swipeLeft) {
                                a8 = aq.swipeLeft.call(aN, ba, aL, ac, Y, T)
                            }
                            break;
                        case n:
                            aN.trigger("swipeRight", [aL, ac, Y, T]);
                            if (aq.swipeRight) {
                                a8 = aq.swipeRight.call(aN, ba, aL, ac, Y, T)
                            }
                            break;
                        case d:
                            aN.trigger("swipeUp", [aL, ac, Y, T]);
                            if (aq.swipeUp) {
                                a8 = aq.swipeUp.call(aN, ba, aL, ac, Y, T)
                            }
                            break;
                        case v:
                            aN.trigger("swipeDown", [aL, ac, Y, T]);
                            if (aq.swipeDown) {
                                a8 = aq.swipeDown.call(aN, ba, aL, ac, Y, T)
                            }
                            break
                    }
                }
            }
            if (a9 == s) {
                aN.trigger("pinchStatus", [a7, aF || null, am || 0, Y || 0, T, D]);
                if (aq.pinchStatus) {
                    a8 = aq.pinchStatus.call(aN, ba, a7, aF || null, am || 0, Y || 0, T, D);
                    if (a8 === false) {
                        return false
                    }
                }
                if (a7 == g && a4()) {
                    switch (aF) {
                        case c:
                            aN.trigger("pinchIn", [aF || null, am || 0, Y || 0, T, D]);
                            if (aq.pinchIn) {
                                a8 = aq.pinchIn.call(aN, ba, aF || null, am || 0, Y || 0, T, D)
                            }
                            break;
                        case w:
                            aN.trigger("pinchOut", [aF || null, am || 0, Y || 0, T, D]);
                            if (aq.pinchOut) {
                                a8 = aq.pinchOut.call(aN, ba, aF || null, am || 0, Y || 0, T, D)
                            }
                            break
                    }
                }
            }
            if (a9 == x) {
                if (a7 === p || a7 === g) {
                    clearTimeout(aS);
                    if (V() && !E()) {
                        K = ao();
                        aS = setTimeout(e.proxy(function() {
                            K = null;
                            aN.trigger("tap", [ba.target]);
                            if (aq.tap) {
                                a8 = aq.tap.call(aN, ba, ba.target)
                            }
                        }, this), aq.doubleTapThreshold)
                    } else {
                        K = null;
                        aN.trigger("tap", [ba.target]);
                        if (aq.tap) {
                            a8 = aq.tap.call(aN, ba, ba.target)
                        }
                    }
                }
            } else {
                if (a9 == i) {
                    if (a7 === p || a7 === g) {
                        clearTimeout(aS);
                        K = null;
                        aN.trigger("doubletap", [ba.target]);
                        if (aq.doubleTap) {
                            a8 = aq.doubleTap.call(aN, ba, ba.target)
                        }
                    }
                } else {
                    if (a9 == b) {
                        if (a7 === p || a7 === g) {
                            clearTimeout(aS);
                            K = null;
                            aN.trigger("longtap", [ba.target]);
                            if (aq.longTap) {
                                a8 = aq.longTap.call(aN, ba, ba.target)
                            }
                        }
                    }
                }
            }
            return a8
        }
        function aj() {
            var a7 = true;
            if (aq.threshold !== null) {
                a7 = ac >= aq.threshold
            }
            return a7
        }
        function a6() {
            var a7 = false;
            if (aq.cancelThreshold !== null && aL !== null) {
                a7 = (aP(aL) - ac) >= aq.cancelThreshold
            }
            return a7
        }
        function ab() {
            if (aq.pinchThreshold !== null) {
                return am >= aq.pinchThreshold
            }
            return true
        }
        function aw() {
            var a7;
            if (aq.maxTimeThreshold) {
                if (Y >= aq.maxTimeThreshold) {
                    a7 = false
                } else {
                    a7 = true
                }
            } else {
                a7 = true
            }
            return a7
        }
        function ah(a7, a8) {
            if (aq.allowPageScroll === l || aT()) {
                a7.preventDefault()
            } else {
                var a9 = aq.allowPageScroll === r;
                switch (a8) {
                    case o:
                        if ((aq.swipeLeft && a9) || (!a9 && aq.allowPageScroll != A)) {
                            a7.preventDefault()
                        }
                        break;
                    case n:
                        if ((aq.swipeRight && a9) || (!a9 && aq.allowPageScroll != A)) {
                            a7.preventDefault()
                        }
                        break;
                    case d:
                        if ((aq.swipeUp && a9) || (!a9 && aq.allowPageScroll != t)) {
                            a7.preventDefault()
                        }
                        break;
                    case v:
                        if ((aq.swipeDown && a9) || (!a9 && aq.allowPageScroll != t)) {
                            a7.preventDefault()
                        }
                        break
                }
            }
        }
        function a4() {
            var a8 = aK();
            var a7 = U();
            var a9 = ab();
            return a8 && a7 && a9
        }
        function aT() {
            return !!(aq.pinchStatus || aq.pinchIn || aq.pinchOut)
        }
        function M() {
            return !!(a4() && aT())
        }
        function aR() {
            var ba = aw();
            var bc = aj();
            var a9 = aK();
            var a7 = U();
            var a8 = a6();
            var bb = !a8 && a7 && a9 && bc && ba;
            return bb
        }
        function S() {
            return !!(aq.swipe || aq.swipeStatus || aq.swipeLeft || aq.swipeRight || aq.swipeUp || aq.swipeDown)
        }
        function F() {
            return !!(aR() && S())
        }
        function aK() {
            return((T === aq.fingers || aq.fingers === h) || !a)
        }
        function U() {
            return aM[0].end.x !== 0
        }
        function a2() {
            return !!(aq.tap)
        }
        function V() {
            return !!(aq.doubleTap)
        }
        function aQ() {
            return !!(aq.longTap)
        }
        function N() {
            if (K == null) {
                return false
            }
            var a7 = ao();
            return(V() && ((a7 - K) <= aq.doubleTapThreshold))
        }
        function E() {
            return N()
        }
        function at() {
            return((T === 1 || !a) && (isNaN(ac) || ac === 0))
        }
        function aW() {
            return((Y > aq.longTapThreshold) && (ac < q))
        }
        function ad() {
            return !!(at() && a2())
        }
        function aC() {
            return !!(N() && V())
        }
        function al() {
            return !!(aW() && aQ())
        }
        function C() {
            a1 = ao();
            aa = event.touches.length + 1
        }
        function O() {
            a1 = 0;
            aa = 0
        }
        function ai() {
            var a7 = false;
            if (a1) {
                var a8 = ao() - a1;
                if (a8 <= aq.fingerReleaseThreshold) {
                    a7 = true
                }
            }
            return a7
        }
        function ax() {
            return !!(aN.data(y + "_intouch") === true)
        }
        function ak(a7) {
            if (a7 === true) {
                aN.bind(au, aZ);
                aN.bind(R, I);
                if (P) {
                    aN.bind(P, H)
                }
            } else {
                aN.unbind(au, aZ, false);
                aN.unbind(R, I, false);
                if (P) {
                    aN.unbind(P, H, false)
                }
            }
            aN.data(y + "_intouch", a7 === true)
        }
        function ae(a8, a7) {
            var a9 = a7.identifier !== undefined ? a7.identifier : 0;
            aM[a8].identifier = a9;
            aM[a8].start.x = aM[a8].end.x = a7.pageX || a7.clientX;
            aM[a8].start.y = aM[a8].end.y = a7.pageY || a7.clientY;
            return aM[a8]
        }
        function aD(a7) {
            var a9 = a7.identifier !== undefined ? a7.identifier : 0;
            var a8 = Z(a9);
            a8.end.x = a7.pageX || a7.clientX;
            a8.end.y = a7.pageY || a7.clientY;
            return a8
        }
        function Z(a8) {
            for (var a7 = 0; a7 < aM.length; a7++) {
                if (aM[a7].identifier == a8) {
                    return aM[a7]
                }
            }
        }
        function af() {
            var a7 = [];
            for (var a8 = 0; a8 <= 5; a8++) {
                a7.push({start: {x: 0, y: 0}, end: {x: 0, y: 0}, identifier: 0})
            }
            return a7
        }
        function aE(a7, a8) {
            a8 = Math.max(a8, aP(a7));
            J[a7].distance = a8
        }
        function aP(a7) {
            if (J[a7]) {
                return J[a7].distance
            }
            return undefined
        }
        function X() {
            var a7 = {};
            a7[o] = ar(o);
            a7[n] = ar(n);
            a7[d] = ar(d);
            a7[v] = ar(v);
            return a7
        }
        function ar(a7) {
            return{direction: a7, distance: 0}
        }
        function aI() {
            return aY - Q
        }
        function ap(ba, a9) {
            var a8 = Math.abs(ba.x - a9.x);
            var a7 = Math.abs(ba.y - a9.y);
            return Math.round(Math.sqrt(a8 * a8 + a7 * a7))
        }
        function a3(a7, a8) {
            var a9 = (a8 / a7) * 1;
            return a9.toFixed(2)
        }
        function an() {
            if (D < 1) {
                return w
            } else {
                return c
            }
        }
        function aO(a8, a7) {
            return Math.round(Math.sqrt(Math.pow(a7.x - a8.x, 2) + Math.pow(a7.y - a8.y, 2)))
        }
        function aA(ba, a8) {
            var a7 = ba.x - a8.x;
            var bc = a8.y - ba.y;
            var a9 = Math.atan2(bc, a7);
            var bb = Math.round(a9 * 180 / Math.PI);
            if (bb < 0) {
                bb = 360 - Math.abs(bb)
            }
            return bb
        }
        function aH(a8, a7) {
            var a9 = aA(a8, a7);
            if ((a9 <= 45) && (a9 >= 0)) {
                return o
            } else {
                if ((a9 <= 360) && (a9 >= 315)) {
                    return o
                } else {
                    if ((a9 >= 135) && (a9 <= 225)) {
                        return n
                    } else {
                        if ((a9 > 45) && (a9 < 135)) {
                            return v
                        } else {
                            return d
                        }
                    }
                }
            }
        }
        function ao() {
            var a7 = new Date();
            return a7.getTime()
        }
        function aU(a7) {
            a7 = e(a7);
            var a9 = a7.offset();
            var a8 = {left: a9.left, right: a9.left + a7.outerWidth(), top: a9.top, bottom: a9.top + a7.outerHeight()};
            return a8
        }
        function B(a7, a8) {
            return(a7.x > a8.left && a7.x < a8.right && a7.y > a8.top && a7.y < a8.bottom)
        }}
}
));

/*global jQuery */
/*jshint browser:true */
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */

(function($) {

    "use strict";

    $.fn.fitVids = function(options) {
        var settings = {
            customSelector: null
        };

        if (!document.getElementById('fit-vids-style')) {
            // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
            var head = document.head || document.getElementsByTagName('head')[0];
            var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
            var div = document.createElement('div');
            div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
            head.appendChild(div.childNodes[1]);
        }

        if (options) {
            $.extend(settings, options);
        }

        return this.each(function() {
            var selectors = [
                "iframe[src*='player.vimeo.com']",
                "iframe[src*='youtube.com']",
                "iframe[src*='youtube-nocookie.com']",
                "iframe[src*='kickstarter.com'][src*='video.html']",
                "object",
                "embed"
            ];

            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }

            var $allVideos = $(this).find(selectors.join(','));
            $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

            $allVideos.each(function() {
                var $this = $(this);
                if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
                    return;
                }
                var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(),
                        width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
                        aspectRatio = height / width;

                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100) + "%");
                $this.removeAttr('height').removeAttr('width');
            });
        });
    };

// Works with either jQuery or Zepto
})(window.jQuery || window.Zepto);


/**************************************************************
 *  Youtube Handling
 **************************************************************/

// Load YouTube Frame API
(function() { // Closure, to not leak to the scope
    var s = document.createElement("script");
    s.src = "https://www.youtube.com/player_api";
    var before = document.getElementsByTagName("script")[0];
    before.parentNode.insertBefore(s, before);
})();

function getFrameID(id) {
    var elem = document.getElementById(id);
    if (elem) {
        if (/^iframe$/i.test(elem.tagName))
            return id; //Frame, OK
        // else: Look for frame
        var elems = elem.getElementsByTagName("iframe");
        if (!elems.length)
            return null; //No iframe found, FAILURE
        for (var i = 0; i < elems.length; i++) {
            if (/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com(\/|$)/i.test(elems[i].src))
                break;
        }
        elem = elems[i]; //The only, or the best iFrame
        if (elem.id)
            return elem.id; //Existing ID, return it
        // else: Create a new ID
        do { //Keep postfixing `-frame` until the ID is unique
            id += "-frame";
        } while (document.getElementById(id));
        elem.id = id;
        return id;
    }
    // If no element, return null.
    return null;
}

var YT_ready = (function() {
    var onReady_funcs = [], api_isReady = false;
    /* @param func function     Function to execute on ready
     * @param func Boolean      If true, all qeued functions are executed
     * @param b_before Boolean  If true, the func will added to the first
     position in the queue*/
    return function(func, b_before) {
        if (func === true) {
            api_isReady = true;
            while (onReady_funcs.length) {
                // Removes the first func from the array, and execute func
                onReady_funcs.shift()();
            }
        } else if (typeof func == "function") {
            if (api_isReady)
                func();
            else
                onReady_funcs[b_before ? "unshift" : "push"](func);
        }
    }
})();

// This function will be called when the API is fully loaded
function onYouTubePlayerAPIReady() {
    YT_ready(true)
}




var youtubeplayers = {};

YT_ready(function() {

    setTimeout(function() {
        try {
            $("iframe[src*='youtube.com']").each(function() {
                var identifier = this.id;
                var src = this.src;

                if (!identifier) {
                    $(this).attr('id', 'bs-iframe' + Math.floor(Math.random(10) * 9999 + 1));
                    identifier = this.id;
                }

                if (/\?/.test(src) && !/\enablejsapi=1/.test(src)) {
                    $(this).attr('src', src + '&amp;playerapiid=' + identifier + '&amp;enablejsapi=1');
                    src = this.src;
                } else if (!/\?/.test(src)) {
                    $(this).attr('src', src + '?playerapiid=' + identifier + '&amp;enablejsapi=1');
                    src = this.src;
                }

                var frameID = getFrameID(identifier);
                if (frameID) { //If the frame exists
                    youtubeplayers[frameID] = new YT.Player(frameID, {
                        events: {
                            "onStateChange": onPlayerStateChange
                        }
                    });
                }
            });
        }
        catch (err) {
        }
    }, 500)

});

function onPlayerStateChange(event) {
    var slidertarget = $(event.target.a).attr('data-bootslider-target');
    if (slidertarget != 'undefined') {
        switch (event.data) {
            case YT.PlayerState.ENDED :
                {
                    BOOTSLIDER[slidertarget].playTimer();
                }
                break;
            case YT.PlayerState.PAUSED :
                {
                    BOOTSLIDER[slidertarget].playTimer();
                }
                break;
            case YT.PlayerState.PLAYING :
                {
                    BOOTSLIDER[slidertarget].pauseTimer();
                }
                break;
        }
    }
}

/**************************************************************
 *  Vimeo Handling
 **************************************************************/
var Froogaloop = function() {
    function e(a) {
        return new e.fn.init(a)
    }
    function h(a, c, b) {
        if (!b.contentWindow.postMessage)
            return!1;
        var f = b.getAttribute("src").split("?")[0], a = JSON.stringify({method: a, value: c});
        "//" === f.substr(0, 2) && (f = window.location.protocol + f);
        b.contentWindow.postMessage(a, f)
    }
    function j(a) {
        var c, b;
        try {
            c = JSON.parse(a.data), b = c.event || c.method
        } catch (f) {
        }
        "ready" == b && !i && (i = !0);
        if (a.origin != k)
            return!1;
        var a = c.value, e = c.data, g = "" === g ? null : c.player_id;
        c = g ? d[g][b] : d[b];
        b = [];
        if (!c)
            return!1;
        void 0 !==
                a && b.push(a);
        e && b.push(e);
        g && b.push(g);
        return 0 < b.length ? c.apply(null, b) : c.call()
    }
    function l(a, c, b) {
        b ? (d[b] || (d[b] = {}), d[b][a] = c) : d[a] = c
    }
    var d = {}, i = !1, k = "";
    e.fn = e.prototype = {element: null, init: function(a) {
            "string" === typeof a && (a = document.getElementById(a));
            this.element = a;
            a = this.element.getAttribute("src");
            "//" === a.substr(0, 2) && (a = window.location.protocol + a);
            for (var a = a.split("/"), c = "", b = 0, f = a.length; b < f; b++) {
                if (3 > b)
                    c += a[b];
                else
                    break;
                2 > b && (c += "/")
            }
            k = c;
            return this
        }, api: function(a, c) {
            if (!this.element ||
                    !a)
                return!1;
            var b = this.element, f = "" !== b.id ? b.id : null, d = !c || !c.constructor || !c.call || !c.apply ? c : null, e = c && c.constructor && c.call && c.apply ? c : null;
            e && l(a, e, f);
            h(a, d, b);
            return this
        }, addEvent: function(a, c) {
            if (!this.element)
                return!1;
            var b = this.element, d = "" !== b.id ? b.id : null;
            l(a, c, d);
            "ready" != a ? h("addEventListener", a, b) : "ready" == a && i && c.call(null, d);
            return this
        }, removeEvent: function(a) {
            if (!this.element)
                return!1;
            var c = this.element, b;
            a:{
                if ((b = "" !== c.id ? c.id : null) && d[b]) {
                    if (!d[b][a]) {
                        b = !1;
                        break a
                    }
                    d[b][a] = null
                } else {
                    if (!d[a]) {
                        b =
                                !1;
                        break a
                    }
                    d[a] = null
                }
                b = !0
            }
            "ready" != a && b && h("removeEventListener", a, c)
        }};
    e.fn.init.prototype = e.fn;
    window.addEventListener ? window.addEventListener("message", j, !1) : window.attachEvent("onmessage", j);
    return window.Froogaloop = window.$f = e
}();


// Enable the API on each Vimeo video
    jQuery("iframe[src*='player.vimeo.com']").each(function() {

        var identifier = this.id;
        var src = this.src;

        if (!identifier) {
            $(this).attr('id', 'bs-iframe' + Math.floor(Math.random(10) * 9999 + 1));
            identifier = this.id;
        }

        if (/\?/.test(src) && !/\api=1/.test(src)) {
            $(this).attr('src', src + '&amp;player_id=' + identifier + '&amp;api=1');
            src = this.src;
        } else if (!/\?/.test(src)) {
            $(this).attr('src', src + '?player_id=' + identifier + '&amp;api=1');
            src = this.src;
        }

        Froogaloop(this).addEvent('ready', ready);
    });

    function ready(playerID) {
        Froogaloop(playerID).addEvent('play', function(data) {
            vimeoplay(playerID);
        });
        Froogaloop(playerID).addEvent('pause', function(data) {
            vimeopause(playerID);
        });
        Froogaloop(playerID).addEvent('finish', function(data) {
            vimeofinish(playerID);
        });
    }

    function vimeoplay(playerID) {
        var slidertarget = $('#' + playerID).attr('data-bootslider-target');
        if (slidertarget != 'undefined') {
            BOOTSLIDER[slidertarget].pauseTimer();
        }
    }

    function vimeopause(playerID) {
        var slidertarget = $('#' + playerID).attr('data-bootslider-target');

        if (slidertarget != 'undefined') {
            BOOTSLIDER[slidertarget].playTimer();
        }
    }

    function vimeofinish(playerID) {
        var slidertarget = $('#' + playerID).attr('data-bootslider-target');

        if (slidertarget != 'undefined') {
            BOOTSLIDER[slidertarget].playTimer();
        }
    }

