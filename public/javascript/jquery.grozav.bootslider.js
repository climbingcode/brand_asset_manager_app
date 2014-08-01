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
function bootslider(target, options) {
    /* Settings
     =============================== */
    var settings = $.extend({
        animationIn: "fadeInUp",
        animationOut: "fadeOutUp",
        timeout: 5000,
        autoplay: true,
        looponce: false,
        preload: true,
        pauseOnHover: false,
        pagination: false,
        thumbnails: false,
        mousewheel: false,
        keyboard: true,
        touchscreen: true,
        parallax: 0.2,
        layout: 'default',
        canvas: {
            width: 1920,
            height: 1080
        }
    }, options);

    /* Variables
     =============================== */
    var self = this;
    var $this = $(target);
    var $slides = $('.bs-slide', $this);
    var $active = $('.active', $this) ? $('.active', $this) : $slides.eq(0);
    var $length = $slides.length - 1;
    var $next = $('.bs-next', $this);
    var $prev = $('.bs-prev', $this);
    var $loader = $('.bs-loader', $this);
    var $pagination = $('.bs-pagination', $this);
    var $thumbnails = $('.bs-thumbnails', $this);
    var $progress = $('.bs-progress .progress-bar', $this);
    var timeout;
    var $current;
    var animated;
    var settleTime = 800;
    var margin = -$active.height();

    /* Initialization
     =============================== */
    self.init = function() {
        var loaded = 0;
        if (settings.layout !== 'content') {
            $('.bs-background img', $this).each(function() {
                var $this = $(this);
                var src = $this.attr('src');
                var preloadedImage = $(new Image());
                preloadedImage.load(function() {
                    ++loaded;
                    if (loaded === $length || settings.preload === false) {
                        $loader.fadeOut(500).remove();
                        if (settings.touchscreen == true) {
                            self.add('touchscreen');
                        }
                        if (settings.mousewheel == true) {
                            self.add('mousewheel');
                        }
                        if (settings.keyboard == true) {
                            self.add('keyboard');
                        }
                        if (settings.pagination == true) {
                            self.add('pagination');
                        } else {
                            $pagination.hide();
                        }
                        if (settings.thumbnails == true) {
                            self.add('thumbnails');
                        } else {
                            $thumbnails.hide();
                        }

                        margin = -$active.height();

                        setLayers();

                        var layoutOption = $this.attr('data-layout') ? $this.attr('data-layout') : settings.layout;
                        self.layout(layoutOption);

                        $slides.addClass('animated');
                        $('[data-animate-in]', $slides).each(function() {
                            $(this).addClass('animated');
                        })
                        $('[data-animate-out]', $slides).each(function() {
                            $(this).addClass('animated');
                        })

                        $active.addClass('active');
                        $active.addClass('visible');
                        var animationin = $active.attr('data-animate-in') ? $active.attr('data-animate-in') : settings.animationIn;
                        $active.addClass(animationin);
                        $current = $active.index();
                        $('[data-animate-in]', $active).each(function() {
                            var $element = $(this);
                            var animationin = $element.attr('data-animate-in');
                            var animationout = $element.attr('data-animate-out') ? $element.attr('data-animate-out') : 'fadeOut';
                            var delay = $element.attr('data-delay') ? $element.attr('data-delay') : 0;
                            var delayout = $element.attr('data-delay-out') ? $element.attr('data-delay-out') : 0;
                            $element.hide();
                            $element.removeClass(animationout);
                            if (delay === 0) {
                                $element.show();
                                $element.addClass('visible');
                                $element.addClass(animationin);
                            } else {
                                setTimeout(function() {
                                    $element.show();
                                    $element.addClass('visible');
                                    $element.addClass(animationin);
                                }, delay);
                                if (delayout !== 0) {
                                    setTimeout(function() {
                                        $element.removeClass(animationin);
                                        $element.addClass(animationout);
                                    }, delayout + delay);
                                }
                            }
                        });
                    }
                });
                preloadedImage.attr('src', src);
            });
        } else {
            if (settings.touchscreen == true) {
                self.add('touchscreen');
            }
            if (settings.mousewheel == true) {
                self.add('mousewheel');
            }
            if (settings.keyboard == true) {
                self.add('keyboard');
            }
            if (settings.pagination == true) {
                self.add('pagination');
            } else {
                $pagination.hide();
            }
            if (settings.thumbnails == true) {
                self.add('thumbnails');
            } else {
                $thumbnails.hide();
            }

            margin = -$active.height();

            setLayers();

            var layoutOption = $this.attr('data-layout') ? $this.attr('data-layout') : settings.layout;
            self.layout(layoutOption);

            $slides.addClass('animated');
            $('[data-animate-in]', $slides).each(function() {
                $(this).addClass('animated');
            })
            $('[data-animate-out]', $slides).each(function() {
                $(this).addClass('animated');
            })

            $active.addClass('active');
            $active.addClass('visible');
            var animationin = $active.attr('data-animate-in') ? $active.attr('data-animate-in') : settings.animationIn;
            $active.addClass(animationin);
            $current = $active.index();
            $('[data-animate-in]', $active).each(function() {
                var $element = $(this);
                var animationin = $element.attr('data-animate-in');
                var animationout = $element.attr('data-animate-out') ? $element.attr('data-animate-out') : 'fadeOut';
                var delay = $element.attr('data-delay') ? $element.attr('data-delay') : 0;
                var delayout = $element.attr('data-delay-out') ? $element.attr('data-delay-out') : 0;
                $element.removeClass(animationout);
                $element.hide();
                if (delay === 0) {
                    $element.show();
                    $element.addClass('visible');
                    $element.addClass(animationin);
                } else {
                    setTimeout(function() {
                        $element.show();
                        $element.addClass('visible');
                        $element.addClass(animationin);
                    }, delay);
                    if (delayout !== 0) {
                        setTimeout(function() {
                            $element.show();
                            $element.removeClass(animationin);
                            $element.addClass(animationout);
                        }, delayout + delay);
                    }
                }
            });
        }

    };

    /* Layers
     =============================== */
    function setLayers() {
        $('.bs-layer', $this).each(function() {
            var $layer = $(this);
            var $active = $('.active', $this);

            var left = $layer.attr('data-left');
            var right = $layer.attr('data-right');
            var top = $layer.attr('data-top');
            var bottom = $layer.attr('data-bottom');

            var width = $layer.attr('data-width') ? $layer.attr('data-width') : $layer.get(0).width;
            var height = $layer.attr('data-height') ? $layer.attr('data-height') : $layer.get(0).height;


            var Xratio = $active.width() / settings.canvas.width;
            var Yratio = $active.height() / settings.canvas.height;

            if (settings.layout != 'default') {
                var $bsimg = $('.bs-background img', $this).not('.bs-layer');
                var ratio = $active.width() / $active.height();
                var imgratio = width / height;
                if (ratio >= imgratio) {
                    //Xratio is ok
                    Yratio = Xratio;
                }
                else {
                    Xratio = Yratio;
                }
            }

            $('[data-fontsize]', $this).each(function() {
                var $text = $(this);
                var fontsize = $text.attr('data-fontsize') * Xratio + 'px';
                $text.css({'font-size': fontsize});
            })


            if (left) {
                $layer.css({
                    'left': left * Xratio
                });
            } else if (right) {
                $layer.css({
                    'right': right * Xratio
                });
            } else {
                $layer.css({
                    'left': 0
                });
            }

            if (top) {
                $layer.css({
                    'top': top * Yratio
                });
            } else if (bottom) {
                $layer.css({
                    'bottom': bottom * Yratio
                });
            } else {
                $layer.css({
                    'top': 0
                });
            }

            $layer.css({
                'width': width * Xratio,
                'height': height * Yratio
            });

        });
    }

    /* Layout
     =============================== */
    self.layout = function(layout) {
        var $bsslide = $('.active', $this);
        var $bsimg = $('.bs-background img', $this).not('.bs-layer');

        var setLayout = function() {
        };

        if (layout === 'fixedheight') {
            $this.addClass('bootslider-variableheight');
            setLayout = function() {
                $bsimg.each(function() {
                    var $this = $(this);
                    var height = $this.get(0).height;
                    var width = $this.get(0).width;
                    var ratio = $bsslide.width() / $bsslide.height();
                    var imgratio = width / height;
                    if (ratio >= imgratio) {
                        $this.removeClass('fullheight').addClass('fullwidth');
                    }
                    else {
                        $this.removeClass('fullwidth').addClass('fullheight');
                    }
                });
            }

        } else if (layout === 'fixedheight-center') {
            $this.addClass('bootslider-variableheight');
            setLayout = function() {
                $bsimg.each(function() {
                    var $this = $(this);
                    var height = $this.get(0).height;
                    var width = $this.get(0).width;
                    var ratio = $bsslide.width() / $bsslide.height();
                    var imgratio = width / height;
                    var margintop = ($bsslide.height() - ($bsslide.width() / width) * height) / 2;
                    var marginleft = ($bsslide.width() - ($bsslide.height() / height) * width) / 2;
                    if (ratio >= imgratio) {
                        $this.removeClass('fullheight').addClass('fullwidth');
                        $this.css({
                            'left': 0,
                            'top': margintop
                        });
                    }
                    else {
                        $this.removeClass('fullwidth').addClass('fullheight');
                        $this.css({
                            'top': 0,
                            'left': marginleft
                        });
                    }
                });
            }

        } else if (layout === 'fullscreen') {
            $this.addClass('bootslider-variableheight');
            setLayout = function() {
                $bsimg.each(function() {
                    var $this = $(this);
                    var winwidth = window.innerWidth;
                    var winheight = window.innerHeight;
                    var height = $this.get(0).height;
                    var width = $this.get(0).width;
                    $slides.width(winwidth).height(winheight);
                    var ratio = $bsslide.width() / $bsslide.height();
                    var imgratio = width / height;

                    if (ratio >= imgratio) {
                        $this.removeClass('fullheight').addClass('fullwidth');
                    }
                    else {
                        $this.removeClass('fullwidth').addClass('fullheight');
                    }
                })
            }
        } else if (layout === 'fullscreen-center') {
            $this.addClass('bootslider-variableheight');
            setLayout = function() {
                $bsimg.each(function() {
                    var $this = $(this);
                    var winwidth = window.innerWidth;
                    var winheight = window.innerHeight;
                    var height = $this.get(0).height;
                    var width = $this.get(0).width;
                    $slides.width(winwidth).height(winheight);
                    var ratio = $bsslide.width() / $bsslide.height();
                    var imgratio = width / height;
                    var margintop = (winheight - ($bsslide.width() / width) * height) / 2;
                    var marginleft = (winwidth - ($bsslide.height() / height) * width) / 2;
                    if (ratio >= imgratio) {
                        $this.removeClass('fullheight').addClass('fullwidth');
                        $this.css({
                            'left': 0,
                            'top': margintop
                        });
                    }
                    else {
                        $this.removeClass('fullwidth').addClass('fullheight');
                        $this.css({
                            'top': 0,
                            'left': marginleft
                        });
                    }
                });
            }
        } else if (layout === 'content') {
            $this.addClass('bootslider-content');
        }

        var delay = (function() {
            var timer = 0;
            return function(callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        $(window).resize(function() {
            delay(function() {
                setLayout();
            }, 200);
        }).trigger('resize');

    }

    /* Go To Slide
     =============================== */
    self.gotoslide = function(index) {
        var current = $current;
        /*=== Validity Check ===*/
        if (index == current)
            return;
        if (animated == 1)
            return;
        if (index > $length)
            index = 0;

        else if (index < 0)
            index = $length;
        animated = 1;
        /*=== Set pagination ===*/
        $('ul li', $pagination).eq(current).removeClass('active');
        $('ul li', $pagination).eq(index).addClass('active');
        /*=== Set thumbnails ===*/
        $('ul li', $thumbnails).eq(current).removeClass('active');
        $('ul li', $thumbnails).eq(index).addClass('active');
        /*=== Reset previous ===*/
        if (settings.autoplay == true)
            timerinit();
        $("iframe[src*='player.vimeo.com']", $this).each(function() {
            var iframeid = this.id;
            if (typeof Froogaloop(iframeid).api === 'function')
                Froogaloop(iframeid).api('pause');
            else
                $(this).attr('src', this.src);
        });
        $("iframe[src*='youtube.com']", $this).each(function() {
            var iframeid = this.id;
            if (typeof youtubeplayers[iframeid].pauseVideo === 'function')
                youtubeplayers[iframeid].pauseVideo();
            else
                $(this).attr('src', this.src);
        });


        var $previous = $slides.eq(current);
        $previous.removeClass('active');
        var animationout = $previous.attr('data-animate-out') ? $previous.attr('data-animate-out') : settings.animationOut;
        var animationinprev = $active.attr('data-animate-in') ? $active.attr('data-animate-in') : settings.animationIn;
        $previous.addClass(animationout);
        /*=== Animate previous content ===*/
        $('[data-animate-out]', $previous).each(function() {
            var $element = $(this);
            var animationout = $element.attr('data-animate-out');
            $element.addClass(animationout);
        });
        /*=== Set active ===*/
        $active = $slides.eq(index);
        $active.addClass('active').addClass('visible');
        var animationin = $active.attr('data-animate-in') ? $active.attr('data-animate-in') : settings.animationIn;
        $active.removeClass(animationin).addClass(animationin);

        $('[data-bs-video-autoplay="true"]').each(function() {
            var src = this.src;
            if (/\autoplay=1/.test(src)) {
                $(this).attr('src', src.replace(/\autoplay=1/g, ''));
            }
        });

        $('[data-bs-video-autoplay="true"]', $active).each(function() {
            var src = this.src;
            if (/\?/.test(src) && !/\autoplay=1/.test(src)) {
                $(this).attr('src', src + '&amp;autoplay=1');
            } else if (!/\?/.test(src)) {
                $(this).attr('src', src + '?autoplay=1');
            }
        });


        /*=== Animate active content ===*/
        $('[data-animate-in]', $active).removeClass('visible');
        $('[data-animate-in]', $active).each(function() {
            var $element = $(this);
            var animationin = $element.attr('data-animate-in');
            var animationout = $element.attr('data-animate-out') ? $element.attr('data-animate-out') : 'fadeOut';
            var delay = $element.attr('data-delay') ? $element.attr('data-delay') : 0;
            var delayout = $element.attr('data-delay-out') ? $element.attr('data-delay-out') : 0;
            $element.removeClass(animationout);
            $element.hide();
            if (delay === 0) {
                $element.show();
                $element.addClass('visible');
                $element.addClass(animationin);
            } else {
                setTimeout(function() {
                    $element.show();
                    $element.addClass('visible');
                    $element.addClass(animationin);
                }, delay);
                if (delayout !== 0) {
                    setTimeout(function() {
                        $element.removeClass(animationin);
                        $element.addClass(animationout);
                    }, delayout + delay);
                }
            }
        });
        /*=== Reset After Animation ===*/
        margin = -$active.height();
        if (index > current)
            $active.css({'margin-top': margin});
        else
            $previous.css({'margin-top': margin});
        setTimeout(function() {
            $previous.removeClass('visible').removeClass(animationout).removeClass(animationinprev);
            if (index > current)
                $active.css({'margin-top': 0});
            else
                $previous.css({'margin-top': 0});
            animated = 0;
        }, settleTime);
        timeout = $active.attr('data-timeout') ? $active.attr('data-timeout') : settings.timeout;
        /*=== Set current ===*/
        $current = index;
    };
    /* Timer Function
     =============================== */
    (function($) {
        $.timer = function(func, time, autostart) {
            this.set = function(func, time, autostart) {
                this.init = true;
                if (typeof func == 'object') {
                    var paramList = ['autostart', 'time'];
                    for (var arg in paramList) {
                        if (func[paramList[arg]] != undefined) {
                            eval(paramList[arg] + " = func[paramList[arg]]");
                        }
                    }
                    func = func.action;
                }
                if (typeof func == 'function') {
                    this.action = func;
                }
                if (!isNaN(time)) {
                    this.intervalTime = time;
                }
                if (autostart && !this.isActive) {
                    this.isActive = true;
                    this.setTimer();
                }
                return this;
            };
            this.once = function(time) {
                var timer = this;
                if (isNaN(time)) {
                    time = 0;
                }
                window.setTimeout(function() {
                    timer.action();
                }, time);
                return this;
            };
            this.play = function(reset) {
                if (!this.isActive) {
                    if (reset) {
                        this.setTimer();
                    } else {
                        this.setTimer(this.remaining);
                    }
                    this.isActive = true;
                }
                return this;
            };
            this.pause = function() {
                if (this.isActive) {
                    this.isActive = false;
                    this.remaining -= new Date() - this.last;
                    this.clearTimer();
                }
                return this;
            };
            this.stop = function() {
                this.isActive = false;
                this.remaining = this.intervalTime;
                this.clearTimer();
                return this;
            };
            this.toggle = function(reset) {
                if (this.isActive) {
                    this.pause();
                } else if (reset) {
                    this.play(true);
                } else {
                    this.play();
                }
                return this;
            };
            this.reset = function() {
                this.isActive = false;
                this.play(true);
                return this;
            };
            this.clearTimer = function() {
                window.clearTimeout(this.timeoutObject);
            };
            this.setTimer = function(time) {
                var timer = this;
                if (typeof this.action != 'function') {
                    return;
                }
                if (isNaN(time)) {
                    time = this.intervalTime;
                }
                this.remaining = time;
                this.last = new Date();
                this.clearTimer();
                this.timeoutObject = window.setTimeout(function() {
                    timer.go();
                }, time);
            };
            this.go = function() {
                if (this.isActive) {
                    this.action();
                    this.setTimer();
                }
            };
            if (this.init) {
                return new $.timer(func, time, autostart);
            } else {
                this.set(func, time, autostart);
                return this;
            }
        };
    })(jQuery);
    /* Timer Initialization
     =============================== */
    function timerinit() {
        count = -10;
        $progress.css({
            width: '0%'
        });
    }

    /* Autoplay
     =============================== */
    if (settings.autoplay == true) {
        var count = 0;
        var timer = $.timer(function() {
            count++;
            timeout = $active.attr('data-timeout') ? $active.attr('data-timeout') : settings.timeout;
            if (count >= timeout / 100) {
                if (settings.looponce == true && $current < $length)
                    self.gotoslide($current + 1);
                else if (settings.looponce == false)
                    self.gotoslide($current + 1);

            }
            $progress.css({
                width: (count * 11000) / timeout + '%'
            });
        }, 100, true);
        if (settings.pauseOnHover == true) {
            $slides.hover(function() {
                self.pauseTimer();
            }, function() {
                self.playTimer();
            });
        }
        timer.go();
    } else {
        $progress.closest('.progress').hide(0);
    }


    self.pauseTimer = function() {
        timer.pause();
    };
    self.playTimer = function() {
        timer.play();
    };

    /* Slider Controls
     =============================== */
    $next.click(function() {
        self.gotoslide($current + 1);
    });
    $prev.click(function() {
        self.gotoslide($current - 1);
    });
    /* Add Controls
     =============================== */
    self.add = function(control) {
        switch (control) {
            case 'touchscreen' :
                /* Swipe
                 =============================== */
                {
                    $this.swipe({
                        swipeLeft: function(event, direction) {
                            self.gotoslide($current + 1);
                        },
                        swipeRight: function(event, direction) {
                            self.gotoslide($current - 1);
                        }
                    });
                }
                ;
                break;
            case 'mousewheel' :
                /* Mousewheel
                 =============================== */
                {
                    $this.bind('mousewheel', function(event, delta) {
                        if (delta < 0) {
                            self.gotoslide($current + 1);
                        }
                        if (delta > 0) {
                            self.gotoslide($current - 1);
                        }
                        event.stopPropagation();
                        event.preventDefault();
                    });
                }
                ;
                break;
            case 'keyboard' :
                /* Keyboard
                 =============================== */
                {
                    $(document).keydown(function(e) {
                        if (e.keyCode == 37) {
                            self.gotoslide($current - 1);
                        }
                        if (e.keyCode == 39) {
                            self.gotoslide($current + 1);
                        }
                    });
                }
                ;
                break;
            case 'pagination' :
                /* Pagination
                 =============================== */
                {
                    var i;
                    for (i = 1; i <= $length + 1; i++)
                        $('ul', $pagination).append('<li><a href="javascript:void(0);">' + i + '</a></li>');
                    $('ul li', $pagination).eq($active.index()).addClass('active');
                    $('ul li a', $pagination).click(function() {
                        var gotoindex = $(this).closest('li').index();
                        self.gotoslide(gotoindex);
                    });
                }
                ;
                break;
            case 'thumbnails' :
                /* Thumbnails
                 =============================== */
                {
                    var i;
                    var width = 100 / ($length + 1);
                    if (width > 25)
                        width = 25;
                    for (i = 0; i <= $length; i++) {
                        var src = $('.bs-slide', $this).eq(i).attr('data-thumbnail') ? $('.bs-slide', $this).eq(i).attr('data-thumbnail') : $('.bs-background img').eq(i).attr('src');
                        var alt = $('.bs-background img', $this).eq(i).attr('alt');
                        $('ul', $thumbnails).append('<li style="width: ' + width + '%" class="bs-thumbnail"><a href="javascript:void(0);"><img src="' + src + '" alt="' + alt + '" /></a></li>');
                    }

                    $('ul li', $thumbnails).eq($active.index()).addClass('active');
                    $('ul li a', $thumbnails).click(function() {
                        var gotoindex = $(this).closest('li').index();
                        self.gotoslide(gotoindex);
                    });
                }
                ;
                break;
        }

    };

    /* Parallax
     =============================== */
    function parallax() {
        $('.bs-parallax', $this).each(function() {
            var scrolled = $(window).scrollTop();
            $(this).css('top', -(scrolled * settings.parallax) + 'px');
        });
    }

    $(window).scroll(function(e) {
        parallax();
    });


    /* Bootslider Videos
     =============================== */
    $('.bs-video', $this).fitVids();
    function fullvideo() {
        var sliderWidth = $active.width();
        var sliderHeight = $active.height() - 7;
        $('.bs-video-fullscreen iframe', $this).css({
            'width': sliderWidth + 'px',
            'height': sliderHeight + 'px'
        });
    }


    $("iframe", $this).attr('data-bootslider-target', bootsliderCount);



    ++bootsliderCount;

    /* Window Resize Event
     =============================== */
    $(window).resize(function() {
        fullvideo();
        margin = -$active.height();
        setLayers();
    }).trigger('resize');

    if (window.addEventListener) {
        window.addEventListener('orientationchange', function() {
            $(window).trigger('resize')
        });
    } else if (window.attachEvent) {
        window.attachEvent('orientationchange', function() {
            $(window).trigger('resize')
        });
    }

    window.BOOTSLIDER.push(this);
}

var bootsliderCount = 0;

window.BOOTSLIDER = new Array();
