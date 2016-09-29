var swiperDesign = new Swiper('.swiper-container-design', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
});
var swiperPanda = new Swiper('.swiper-container-panda', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
});

var swiperHetao = new Swiper('.swiper-container-hetao', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
});

var swiperAnli = new Swiper('.swiper-container-anli', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
});

(function(){
    function filePreLoad(obj) {
        this.files = obj.files;
        this.progress = obj.progress;
        this.complete = obj.complete;
        // 当前加载数量为0
        this.current = 0;
        // 容器设置
        this.box = document.createElement('div');
        this.box.style.cssText = 'overflow:hidden; position: absolute; left: -9999px; top: 0; width: 1px; height: 1px;';
        document.body.appendChild(this.box);
        this.getFiles();
    }

    // 获取每一个图片
    filePreLoad.prototype.getFiles = function() {
        var fileArr = [];
        for (var i = 0; i < this.files.length; i++) {
            fileArr[i] = this.files[i];
            this.loadImg(fileArr[i]);
        };
    }

    // 加载图像
    filePreLoad.prototype.loadImg = function(file) {
        var _this = this;
        var newImg = new Image();

        newImg.onload = function(){
            newImg.onload = null;
            _this.loadFtn(newImg);
        }

        newImg.src = file;
    }

    // 执行相关回调
    filePreLoad.prototype.loadFtn = function(currentImg) {
        this.current++;
        this.box.appendChild(currentImg);
        if (this.progress) {
            var precentage = parseInt(this.current / this.files.length * 100);
            this.progress(precentage, currentImg);
        };
        if (this.current == this.files.length) {
            if (this.complete) {
                this.complete();
            };
        };
    }

    function preload(obj) {
        return new filePreLoad(obj);
    }
    
    window.preload = preload;
})();


(function(a) {
    $.fn.fullpage = function(c) {
        //关于页内轮播
        function about(b) {
            b.find(".fp-slides").after('<div class="fp-controlArrow fp-prev"></div><div class="fp-controlArrow fp-next"></div>');
            "#fff" != c.controlArrowColor && (b.find(".fp-controlArrow.fp-next").css("border-color", "transparent transparent transparent " + c.controlArrowColor), 
            b.find(".fp-controlArrow.fp-prev").css("border-color", "transparent " + c.controlArrowColor + " transparent transparent"));
            c.loopHorizontal || b.find(".fp-controlArrow.fp-prev").hide();
        }
        //右侧菜单
        function list() {
            $("body").append('<div id="fp-nav"><ul></ul></div>');
            I = $("#fp-nav");
            I.css("color", c.navigationColor);
            I.addClass(c.navigationPosition);
            for (var b = 0; b < $(".fp-section").length; b++) {
                var d = "";
                c.anchors.length && (d = c.anchors[b]);
                var d = '<li><a href="#' + d + '"><span></span></a>', e = c.navigationTooltips[b];
                void 0 != e && "" != e && (d += '<div class="fp-tooltip ' + c.navigationPosition + '">' + e + "</div>");
                d += "</li>";
                I.find("ul").append(d);
            }
        }


        function z() {
            $(".fp-section").each(function() {
                var b = $(this).find(".fp-slide");
                b.length ? b.each(function() {
                    u($(this));
                }) : u($(this));
            });
            a.isFunction(c.afterRender) && c.afterRender.call(this);
        }
        function u(b) {
            b.css("overflow", "hidden");
            var a = b.closest(".fp-section"), e = b.find(".fp-scrollable");
            if (e.length) var f = e.get(0).scrollHeight; else f = b.get(0).scrollHeight, c.verticalCentered && (f = b.find(".fp-tableCell").get(0).scrollHeight);
            a = E - parseInt(a.css("padding-bottom")) - parseInt(a.css("padding-top"));
            f > a ? e.length ? e.css("height", a + "px").parent().css("height", a + "px") : (c.verticalCentered ? b.find(".fp-tableCell").wrapInner('<div class="fp-scrollable" />') : b.wrapInner('<div class="fp-scrollable" />'), 
            b.find(".fp-scrollable").slimScroll({
                allowPageScroll: !0,
                height: a + "px",
                size: "10px",
                alwaysVisible: !0
            })) : F(b);
            b.css("overflow", "");
        }
        function w() {
            if (!c.autoScrolling || c.scrollBar) {
                var b = $(window).scrollTop(), d = 0, e = Math.abs(b - $(".fp-section").first().offset().top);
                $(".fp-section").each(function(c) {
                    var f = Math.abs(b - a(this).offset().top);
                    f < e && (d = c, e = f);
                });
                var f = $(".fp-section").eq(d);
            }
            if (!c.autoScrolling && !f.hasClass("active")) {
                ia = !0;
                var k = $(".fp-section.active").index(".fp-section") + 1, h = R(f), g = f.data("anchor"), l = f.index(".fp-section") + 1, n = f.find(".fp-slide.active");
                if (n.length) var p = n.data("anchor"), H = n.index();
                f.addClass("active").siblings().removeClass("active");
                A || (a.isFunction(c.onLeave) && c.onLeave.call(this, k, l, h), a.isFunction(c.afterLoad) && c.afterLoad.call(this, g, l));
                N(g, 0);
                c.anchors.length && !A && (O = g, ja(H, p, g, l));
                clearTimeout(i);
                i = setTimeout(function() {
                    ia = !1;
                }, 100);
            }
            c.scrollBar && (clearTimeout(ra), ra = setTimeout(function() {
                A || m(f);
            }, 1e3));
        }
        function S(b) {
            return scrollable = b.find(".fp-slides").length ? b.find(".fp-slide.active").find(".fp-scrollable") : b.find(".fp-scrollable");
        }

        function r(b, d) {
            if (J[b]) {
                if ("down" == b) var c = "bottom", f = a.fn.fullpage.moveSectionDown; else c = "top", 
                f = a.fn.fullpage.moveSectionUp;
                if (0 < d.length) if (c = "top" === c ? !d.scrollTop() : "bottom" === c ? d.scrollTop() + 1 + d.innerHeight() >= d[0].scrollHeight : void 0, 
                c) f(); else return !0; else f();
            }
        }
        function t(b) {
            var d = b.originalEvent;
            if (!P(b.target)) {
                c.autoScrolling && !c.scrollBar && b.preventDefault();
                b = $(".fp-section.active");
                var e = S(b);
                A || Q || (d = sa(d), T = d.y, ca = d.x, b.find(".fp-slides").length && Math.abs(da - ca) > Math.abs(U - T) ? Math.abs(da - ca) > $(window).width() / 100 * c.touchSensitivity && (da > ca ? J.right && a.fn.fullpage.moveSlideRight() : J.left && a.fn.fullpage.moveSlideLeft()) : c.autoScrolling && !c.scrollBar && Math.abs(U - T) > $(window).height() / 100 * c.touchSensitivity && (U > T ? r("down", e) : T > U && r("up", e)));
            }
        }
        function P(b, d) {
            d = d || 0;
            var e = a(b).parent();
            return d < c.normalScrollElementTouchThreshold && e.is(c.normalScrollElements) ? !0 : d == c.normalScrollElementTouchThreshold ? !1 : P(e, ++d);
        }
        function p(b) {
            b = sa(b.originalEvent);
            U = b.y;
            da = b.x;
        }
        function n(b) {
            if (c.autoScrolling) {
                b = window.event || b;
                var d = Math.max(-1, Math.min(1, b.wheelDelta || -b.deltaY || -b.detail));
                c.scrollBar && (b.preventDefault ? b.preventDefault() : b.returnValue = !1);
                b = $(".fp-section.active");
                b = S(b);
                A || (0 > d ? r("down", b) : r("up", b));
                return !1;
            }
        }
        function B(b) {
            var d = $(".fp-section.active").find(".fp-slides");
            if (d.length && !Q) {
                var e = d.find(".fp-slide.active"), f = null, f = "prev" === b ? e.prev(".fp-slide") : e.next(".fp-slide");
                if (!f.length) {
                    if (!c.loopHorizontal) return;
                    f = "prev" === b ? e.siblings(":last") : e.siblings(":first");
                }
                Q = !0;
                q(d, f);
            }
        }
        function C() {
            $(".fp-slide.active").each(function() {
                ka($(this));
            });
        }
        function m(b, d, e) {
            var f = b.position();
            if ("undefined" !== typeof f && (d = {
                element: b,
                callback: d,
                isMovementUp: e,
                dest: f,
                dtop: f.top,
                yMovement: R(b),
                anchorLink: b.data("anchor"),
                sectionIndex: b.index(".fp-section"),
                activeSlide: b.find(".fp-slide.active"),
                activeSection: $(".fp-section.active"),
                leavingSection: $(".fp-section.active").index(".fp-section") + 1,
                localIsResizing: V
            }, !(d.activeSection.is(b) && !V || c.scrollBar && $(window).scrollTop() === d.dtop))) {
                if (d.activeSlide.length) var k = d.activeSlide.data("anchor"), g = d.activeSlide.index();
                c.autoScrolling && c.continuousVertical && "undefined" !== typeof d.isMovementUp && (!d.isMovementUp && "up" == d.yMovement || d.isMovementUp && "down" == d.yMovement) && (d.isMovementUp ? $(".fp-section.active").before(d.activeSection.nextAll(".fp-section")) : $(".fp-section.active").after(d.activeSection.prevAll(".fp-section").get().reverse()), 
                K($(".fp-section.active").position().top), C(), d.wrapAroundElements = d.activeSection, 
                d.dest = d.element.position(), d.dtop = d.dest.top, d.yMovement = R(d.element));
                b.addClass("active").siblings().removeClass("active");
                A = !0;
                ja(g, k, d.anchorLink, d.sectionIndex);
                a.isFunction(c.onLeave) && !d.localIsResizing && c.onLeave.call(this, d.leavingSection, d.sectionIndex + 1, d.yMovement);
                W(d);
                O = d.anchorLink;
                c.autoScrolling && N(d.anchorLink, d.sectionIndex);
            }
        }
        function W(b) {
            if (c.css3 && c.autoScrolling && !c.scrollBar) ea("translate3d(0px, -" + b.dtop + "px, 0px)", !0), 
            setTimeout(function() {
                X(b);
            }, c.scrollingSpeed); else {
                var d = h(b);
                a(d.element).animate(d.options, c.scrollingSpeed, c.easing).promise().done(function() {
                    X(b);
                });
            }
        }
        function h(b) {
            var a = {};
            c.autoScrolling && !c.scrollBar ? (a.options = {
                top: -b.dtop
            }, a.element = "." + ta) : (a.options = {
                scrollTop: b.dtop
            }, a.element = "html, body");
            return a;
        }
        function Y(b) {
            b.wrapAroundElements && b.wrapAroundElements.length && (b.isMovementUp ? $(".fp-section:first").before(b.wrapAroundElements) : $(".fp-section:last").after(b.wrapAroundElements), 
            K($(".fp-section.active").position().top), C());
        }
        function X(b) {
            Y(b);
            a.isFunction(c.afterLoad) && !b.localIsResizing && c.afterLoad.call(this, b.anchorLink, b.sectionIndex + 1);
            setTimeout(function() {
                A = !1;
                a.isFunction(b.callback) && b.callback.call(this);
            }, 600);
        }
        function Z() {
            if (!ia) {
                var b = window.location.hash.replace("#", "").split("/"), a = b[0], b = b[1];
                if (a.length) {
                    var c = "undefined" === typeof O, f = "undefined" === typeof O && "undefined" === typeof b && !Q;
                    (a && a !== O && !c || f || !Q && la != b) && k(a, b);
                }
            }
        }
        function q(b, d) {
            var e = d.position(), f = b.find(".fp-slidesContainer").parent(), k = d.index(), g = b.closest(".fp-section"), h = g.index(".fp-section"), l = g.data("anchor"), n = g.find(".fp-slidesNav"), m = d.data("anchor"), p = V;
            if (c.onSlideLeave) {
                var H = g.find(".fp-slide.active").index(), q;
                q = H == k ? "none" : H > k ? "left" : "right";
                p || "none" === q || a.isFunction(c.onSlideLeave) && c.onSlideLeave.call(this, l, h + 1, H, q);
            }
            d.addClass("active").siblings().removeClass("active");
            "undefined" === typeof m && (m = k);
            !c.loopHorizontal && c.controlArrows && (g.find(".fp-controlArrow.fp-prev").toggle(0 != k), 
            g.find(".fp-controlArrow.fp-next").toggle(!d.is(":last-child")));
            g.hasClass("active") && ja(k, m, l, h);
            var r = function() {
                p || a.isFunction(c.afterSlideLoad) && c.afterSlideLoad.call(this, l, h + 1, m, k);
                Q = !1;
            };
            c.css3 ? (e = "translate3d(-" + e.left + "px, 0px, 0px)", x(b.find(".fp-slidesContainer"), 0 < c.scrollingSpeed).css(ua(e)), 
            setTimeout(function() {
                r();
            }, c.scrollingSpeed, c.easing)) : f.animate({
                scrollLeft: e.left
            }, c.scrollingSpeed, c.easing, function() {
                r();
            });
            n.find(".active").removeClass("active");
            n.find("li").eq(k).find("a").addClass("active");
        }
        function L() {
            y();
            if (fa) {
                if ("text" !== $(document.activeElement).attr("type")) {
                    var b = $(window).height();
                    Math.abs(b - j) > 20 * Math.max(j, b) / 100 && (a.fn.fullpage.reBuild(!0), j = b);
                }
            } else clearTimeout(va), va = setTimeout(function() {
                a.fn.fullpage.reBuild(!0);
            }, 500);
        }
        function y() {
            if (c.responsive) {
                var b = l.hasClass("fp-responsive");
                $(window).width() < c.responsive ? b || (a.fn.fullpage.setAutoScrolling(!1, "internal"), 
                $("#fp-nav").hide(), l.addClass("fp-responsive")) : b && (a.fn.fullpage.setAutoScrolling(na.autoScrolling, "internal"), 
                $("#fp-nav").show(), l.removeClass("fp-responsive"));
            }
        }
        function x(b) {
            var a = "all " + c.scrollingSpeed + "ms " + c.easingcss3;
            b.removeClass("fp-notransition");
            return b.css({
                "-webkit-transition": a,
                transition: a
            });
        }
        function v(b) {
            return b.addClass("fp-notransition");
        }
        function D(b, d) {
            if (825 > b || 900 > d) {
                var c = Math.min(100 * b / 825, 100 * d / 900).toFixed(2);
                $("body").css("font-size", c + "%");
            } else $("body").css("font-size", "100%");
        }
        function N(b, d) {
            c.menu && (a(c.menu).find(".active").removeClass("active"), a(c.menu).find('[data-menuanchor="' + b + '"]').addClass("active"));
            c.navigation && ($("#fp-nav").find(".active").removeClass("active"), b ? a("#fp-nav").find('a[href="#' + b + '"]').addClass("active") : $("#fp-nav").find("li").eq(d).find("a").addClass("active"));
        }
        function R(b) {
            var d = $(".fp-section.active").index(".fp-section");
            b = b.index(".fp-section");
            return d == b ? "none" : d > b ? "up" : "down";
        }
        function F(b) {
            b.find(".fp-scrollable").children().first().unwrap().unwrap();
            b.find(".slimScrollBar").remove();
            b.find(".slimScrollRail").remove();
        }
        function G(b) {
            b.addClass("fp-table").wrapInner('<div class="fp-tableCell" style="height:' + M(b) + 'px;" />');
        }
        function M(b) {
            var a = E;
            if (c.paddingTop || c.paddingBottom) a = b, a.hasClass("fp-section") || (a = b.closest(".fp-section")), 
            b = parseInt(a.css("padding-top")) + parseInt(a.css("padding-bottom")), a = E - b;
            return a;
        }
        function ea(b, a) {
            a ? x(l) : v(l);
            l.css(ua(b));
            setTimeout(function() {
                l.removeClass("fp-notransition");
            }, 10);
        }
        function k(b, c) {
            "undefined" === typeof c && (c = 0);
            var e = isNaN(b) ? a('[data-anchor="' + b + '"]') : a(".fp-section").eq(b - 1);
            b === O || e.hasClass("active") ? H(e, c) : m(e, function() {
                H(e, c);
            });
        }
        function H(b, a) {
            if ("undefined" != typeof a) {
                var c = b.find(".fp-slides"), f = c.find('[data-anchor="' + a + '"]');
                f.length || (f = c.find(".fp-slide").eq(a));
                f.length && q(c, f);
            }
        }
        function g(b, a) {
            b.append('<div class="fp-slidesNav"><ul></ul></div>');
            var e = b.find(".fp-slidesNav");
            e.addClass(c.slidesNavPosition);
            for (var f = 0; f < a; f++) e.find("ul").append('<li><a href="#"><span></span></a></li>');
            e.css("margin-left", "-" + e.width() / 2 + "px");
            e.find("li").first().find("a").addClass("active");
        }
        function ja(b, a, e, f) {
            var k = "";
            c.anchors.length ? (b ? ("undefined" !== typeof e && (k = e), "undefined" === typeof a && (a = b), 
            la = a, wa(k + "/" + a)) : ("undefined" !== typeof b && (la = a), wa(e)), ga(location.hash)) : "undefined" !== typeof b ? ga(f + "-" + b) : ga(String(f));
        }
        function wa(b) {
            if (c.recordHistory) location.hash = b; else if (fa || oa) history.replaceState(void 0, void 0, "#" + b); else {
                var a = window.location.href.split("#")[0];
                window.location.replace(a + "#" + b);
            }
        }
        function ga(b) {
            b = b.replace("/", "-").replace("#", "");
            a("body")[0].className = a("body")[0].className.replace(/\b\s?fp-viewing-[^\s]+\b/g, "");
            a("body").addClass("fp-viewing-" + b);
        }
        function ya() {
            var b = document.createElement("p"), a, c = {
                webkitTransform: "-webkit-transform",
                OTransform: "-o-transform",
                msTransform: "-ms-transform",
                MozTransform: "-moz-transform",
                transform: "transform"
            };
            document.body.insertBefore(b, null);
            for (var f in c) void 0 !== b.style[f] && (b.style[f] = "translate3d(1px,1px,1px)", 
            a = window.getComputedStyle(b).getPropertyValue(c[f]));
            document.body.removeChild(b);
            return void 0 !== a && 0 < a.length && "none" !== a;
        }
        function xa() {
            return window.PointerEvent ? {
                down: "pointerdown",
                move: "pointermove"
            } : {
                down: "MSPointerDown",
                move: "MSPointerMove"
            };
        }
        function sa(b) {
            var a = [];
            a.y = "undefined" !== typeof b.pageY && (b.pageY || b.pageX) ? b.pageY : b.touches[0].pageY;
            a.x = "undefined" !== typeof b.pageX && (b.pageY || b.pageX) ? b.pageX : b.touches[0].pageX;
            return a;
        }
        function ka(b) {
            a.fn.fullpage.setScrollingSpeed(0, "internal");
            q(b.closest(".fp-slides"), b);
            a.fn.fullpage.setScrollingSpeed(na.scrollingSpeed, "internal");
        }
        function K(b) {
            c.scrollBar ? l.scrollTop(b) : c.css3 ? ea("translate3d(0px, -" + b + "px, 0px)", !1) : l.css("top", -b);
        }
        function ua(b) {
            return {
                "-webkit-transform": b,
                "-moz-transform": b,
                "-ms-transform": b,
                transform: b
            };
        }
        function za() {
            K(0);
            a("#fp-nav, .fp-slidesNav, .fp-controlArrow").remove();
            a(".fp-section").css({
                height: "",
                "background-color": "",
                padding: ""
            });
            a(".fp-slide").css({
                width: ""
            });
            l.css({
                height: "",
                position: "",
                "-ms-touch-action": "",
                "touch-action": ""
            });
            a(".fp-section, .fp-slide").each(function() {
                F(a(this));
                a(this).removeClass("fp-table active");
            });
            v(l);
            v(l.find(".fp-easing"));
            l.find(".fp-tableCell, .fp-slidesContainer, .fp-slides").each(function() {
                a(this).replaceWith(this.childNodes);
            });
            a("html, body").scrollTop(0);
        }
        function pa(b, a, e) {
            c[b] = a;
            "internal" !== e && (na[b] = a);
        }
        function ha(b, a) {
            console && console[b] && console[b]("fullPage: " + a);
        }
        c = a.extend({
            menu: !1,
            anchors: [],
            navigation: !1,
            navigationPosition: "right",
            navigationColor: "#000",
            navigationTooltips: [],
            slidesNavigation: !1,
            slidesNavPosition: "bottom",
            scrollBar: !1,
            css3: !0,
            scrollingSpeed: 700,
            autoScrolling: !0,
            easing: "easeInQuart",
            easingcss3: "ease",
            loopBottom: !1,
            loopTop: !1,
            loopHorizontal: !0,
            continuousVertical: !1,
            normalScrollElements: null,
            scrollOverflow: !1,
            touchSensitivity: 5,
            normalScrollElementTouchThreshold: 5,
            keyboardScrolling: !0,
            animateAnchor: !0,
            recordHistory: !0,
            controlArrows: !0,
            controlArrowColor: "#fff",
            verticalCentered: !0,
            resize: !0,
            sectionsColor: [],
            paddingTop: 0,
            paddingBottom: 0,
            fixedElements: null,
            responsive: 0,
            sectionSelector: ".section",
            slideSelector: ".slide",
            afterLoad: null,
            onLeave: null,
            afterRender: null,
            afterResize: null,
            afterReBuild: null,
            afterSlideLoad: null,
            onSlideLeave: null
        }, c);
        // (function() {
        //     c.continuousVertical && (c.loopTop || c.loopBottom) && (c.continuousVertical = !1, 
        //     ha("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"));
        //     c.continuousVertical && c.scrollBar && (c.continuousVertical = !1, ha("warn", "Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"));
        //     a.each(c.anchors, function(b, c) {
        //         (a("#" + c).length || a('[name="' + c + '"]').length) && ha("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).");
        //     });
        // })();
        // a.extend(a.easing, {
        //     easeInQuart: function(b, a, c, f, k) {
        //         return f * (a /= k) * a * a * a + c;
        //     }
        // });
        a.fn.fullpage.setAutoScrolling = function(b, d) {
            pa("autoScrolling", b, d);
            var e = a(".fp-section.active");
            c.autoScrolling && !c.scrollBar ? (a("html, body").css({
                overflow: "hidden",
                height: "100%"
            }), a.fn.fullpage.setRecordHistory(c.recordHistory, "internal"), l.css({
                "-ms-touch-action": "none",
                "touch-action": "none"
            }), e.length && K(e.position().top)) : (a("html, body").css({
                overflow: "visible",
                height: "initial"
            }), a.fn.fullpage.setRecordHistory(!1, "internal"), l.css({
                "-ms-touch-action": "",
                "touch-action": ""
            }), K(0), a("html, body").scrollTop(e.position().top));
        };
        a.fn.fullpage.setRecordHistory = function(b, a) {
            pa("recordHistory", b, a);
        };
        a.fn.fullpage.setScrollingSpeed = function(b, a) {
            pa("scrollingSpeed", b, a);
        };
        a.fn.fullpage.setMouseWheelScrolling = function(a) {
            a ? document.addEventListener ? (document.addEventListener("mousewheel", n, !1), 
            document.addEventListener("wheel", n, !1)) : document.attachEvent("onmousewheel", n) : document.addEventListener ? (document.removeEventListener("mousewheel", n, !1), 
            document.removeEventListener("wheel", n, !1)) : document.detachEvent("onmousewheel", n);
        };
        a.fn.fullpage.setAllowScrolling = function(b, c) {
            if ("undefined" != typeof c) c = c.replace(" ", "").split(","), a.each(c, function(c, d) {
                switch (d) {
                  case "up":
                    J.up = b;
                    break;

                  case "down":
                    J.down = b;
                    break;

                  case "left":
                    J.left = b;
                    break;

                  case "right":
                    J.right = b;
                    break;

                  case "all":
                    a.fn.fullpage.setAllowScrolling(b);
                }
            }); else if (b) {
                if (a.fn.fullpage.setMouseWheelScrolling(!0), fa || oa) MSPointer = xa(), a(document).off("touchstart " + MSPointer.down).on("touchstart " + MSPointer.down, p), 
                a(document).off("touchmove " + MSPointer.move).on("touchmove " + MSPointer.move, t);
            } else if (a.fn.fullpage.setMouseWheelScrolling(!1), fa || oa) MSPointer = xa(), 
            a(document).off("touchstart " + MSPointer.down), a(document).off("touchmove " + MSPointer.move);
        };
        a.fn.fullpage.setKeyboardScrolling = function(a) {
            c.keyboardScrolling = a;
        };
        a.fn.fullpage.moveSectionUp = function() {
            var b = a(".fp-section.active").prev(".fp-section");
            b.length || !c.loopTop && !c.continuousVertical || (b = a(".fp-section").last());
            b.length && m(b, null, !0);
        };
        a.fn.fullpage.moveSectionDown = function() {
            var b = a(".fp-section.active").next(".fp-section");
            b.length || !c.loopBottom && !c.continuousVertical || (b = a(".fp-section").first());
            b.length && m(b, null, !1);
        };
        a.fn.fullpage.moveTo = function(b, c) {
            var e = "", e = isNaN(b) ? a('[data-anchor="' + b + '"]') : a(".fp-section").eq(b - 1);
            "undefined" !== typeof c ? k(b, c) : 0 < e.length && m(e);
        };
        a.fn.fullpage.moveSlideRight = function() {
            B("next");
        };
        a.fn.fullpage.moveSlideLeft = function() {
            B("prev");
        };
        a.fn.fullpage.reBuild = function(b) {
            V = !0;
            var d = a(window).width();
            E = a(window).height();
            c.resize && D(E, d);
            a(".fp-section").each(function() {
                parseInt(a(this).css("padding-bottom"));
                parseInt(a(this).css("padding-top"));
                c.verticalCentered && a(this).find(".fp-tableCell").css("height", M(a(this)) + "px");
                a(this).css("height", E + "px");
                if (c.scrollOverflow) {
                    var b = a(this).find(".fp-slide");
                    b.length ? b.each(function() {
                        u(a(this));
                    }) : u(a(this));
                }
                b = a(this).find(".fp-slides");
                b.length && q(b, b.find(".fp-slide.active"));
            });
            a(".fp-section.active").position();
            d = a(".fp-section.active");
            d.index(".fp-section") && m(d);
            V = !1;
            a.isFunction(c.afterResize) && b && c.afterResize.call(this);
            a.isFunction(c.afterReBuild) && !b && c.afterReBuild.call(this);
        };
        var Q = !1, fa = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/), oa = "ontouchstart" in window || 0 < navigator.msMaxTouchPoints || navigator.maxTouchPoints, l = a(this), E = a(window).height(), A = !1, V = !1, O, la, I, ta = "fullpage-wrapper", J = {
            up: !0,
            down: !0,
            left: !0,
            right: !0
        }, na = jQuery.extend(!0, {}, c);
        a.fn.fullpage.setAllowScrolling(!0);
        c.css3 && (c.css3 = ya());
        a(this).length ? (l.css({
            height: "100%",
            position: "relative"
        }), l.addClass(ta)) : ha("error", "Error! Fullpage.js needs to be initialized with a selector. For example: $('#myContainer').fullpage();");
        a(c.sectionSelector).each(function() {
            a(this).addClass("fp-section");
        });
        a(c.slideSelector).each(function() {
            a(this).addClass("fp-slide");
        });
        c.navigation && list();

        a(".fp-section").each(function(b) {
            var d = a(this), e = a(this).find(".fp-slide"), k = e.length;
            b || 0 !== a(".fp-section.active").length || a(this).addClass("active");
            a(this).css("height", E + "px");
            (c.paddingTop || c.paddingBottom) && a(this).css("padding", c.paddingTop + " 0 " + c.paddingBottom + " 0");
            "undefined" !== typeof c.sectionsColor[b] && a(this).css("background-color", c.sectionsColor[b]);
            "undefined" !== typeof c.anchors[b] && a(this).attr("data-anchor", c.anchors[b]);
            if (1 < k) {
                b = 100 * k;
                var h = 100 / k;
                e.wrapAll('<div class="fp-slidesContainer" />');
                e.parent().wrap('<div class="fp-slides" />');
                a(this).find(".fp-slidesContainer").css("width", b + "%");
                c.controlArrows && about(a(this));
                c.slidesNavigation && g(a(this), k);
                e.each(function(b) {
                    a(this).css("width", h + "%");
                    c.verticalCentered && G(a(this));
                });
                d = d.find(".fp-slide.active");
                0 == d.length ? e.eq(0).addClass("active") : ka(d);
            } else c.verticalCentered && G(a(this));
        }).promise().done(function() {
            a.fn.fullpage.setAutoScrolling(c.autoScrolling, "internal");
            var b = a(".fp-section.active").find(".fp-slide.active");
            b.length && (0 != a(".fp-section.active").index(".fp-section") || 0 == a(".fp-section.active").index(".fp-section") && 0 != b.index()) && ka(b);
            c.fixedElements && c.css3 && a(c.fixedElements).appendTo("body");
            c.navigation && (I.css("margin-top", "-" + I.height() / 2 + "px"), I.find("li").eq(a(".fp-section.active").index(".fp-section")).find("a").addClass("active"));
            c.menu && c.css3 && a(c.menu).closest(".fullpage-wrapper").length && a(c.menu).appendTo("body");
            c.scrollOverflow ? ("complete" === document.readyState && z(), a(window).on("load", z)) : a.isFunction(c.afterRender) && c.afterRender.call(this);
            y();
            b = window.location.hash.replace("#", "").split("/")[0];
            if (b.length) {
                var d = a('[data-anchor="' + b + '"]');
                !c.animateAnchor && d.length && (c.autoScrolling ? K(d.position().top) : (K(0), 
                ga(b), a("html, body").scrollTop(d.position().top)), N(b, null), a.isFunction(c.afterLoad) && c.afterLoad.call(this, b, d.index(".fp-section") + 1), 
                d.addClass("active").siblings().removeClass("active"));
            }
            a(window).on("load", function() {
                var a = window.location.hash.replace("#", "").split("/"), b = a[0], a = a[1];
                b && k(b, a);
            });
        });
        var i, ra, ia = !1;
        a(window).on("scroll", w);
        var U = 0, da = 0, T = 0, ca = 0;
        a(window).on("hashchange", Z);
        a(document).keydown(function(b) {
            if (c.keyboardScrolling && c.autoScrolling && (40 != b.which && 38 != b.which || b.preventDefault(), 
            !A)) switch (b.which) {
              case 38:
              case 33:
                a.fn.fullpage.moveSectionUp();
                break;

              case 40:
              case 34:
                a.fn.fullpage.moveSectionDown();
                break;

              case 36:
                a.fn.fullpage.moveTo(1);
                break;

              case 35:
                a.fn.fullpage.moveTo(a(".fp-section").length);
                break;

              case 37:
                a.fn.fullpage.moveSlideLeft();
                break;

              case 39:
                a.fn.fullpage.moveSlideRight();
            }
        });
        $(document).on("click touchstart", "#fp-nav a", function(b) {
            b.preventDefault();
            b = $(this).parent().index();
            m($(".fp-section").eq(b));
        });
        $(document).on("click touchstart", ".fp-slidesNav a", function(b) {
            b.preventDefault();
            b = $(this).closest(".fp-section").find(".fp-slides");
            var c = b.find(".fp-slide").eq($(this).closest("li").index());
            q(b, c);
        });
        c.normalScrollElements && ($(document).on("mouseenter", c.normalScrollElements, function() {
            a.fn.fullpage.setMouseWheelScrolling(!1);
        }), a(document).on("mouseleave", c.normalScrollElements, function() {
            a.fn.fullpage.setMouseWheelScrolling(!0);
        }));
        a(".fp-section").on("click touchstart", ".fp-controlArrow", function() {
            a(this).hasClass("fp-prev") ? a.fn.fullpage.moveSlideLeft() : a.fn.fullpage.moveSlideRight();
        });
        a(window).resize(L);
        var j = E, va;
        $.fn.fullpage.destroy = function(b) {
            a.fn.fullpage.setAutoScrolling(!1, "internal");
            a.fn.fullpage.setAllowScrolling(!1);
            a.fn.fullpage.setKeyboardScrolling(!1);
            a(window).off("scroll", w).off("hashchange", Z).off("resize", L);
            a(document).off("click", "#fp-nav a").off("mouseenter", "#fp-nav li").off("mouseleave", "#fp-nav li").off("click", ".fp-slidesNav a").off("mouseover", c.normalScrollElements).off("mouseout", c.normalScrollElements);
            a(".fp-section").off("click", ".fp-controlArrow");
            b && za();
        };
    };
})(jQuery);

$(function() {
    function a(a) {
        t.eq(a).animate({
            opacity: 0
        }, 500).removeClass("active");
        
        a == P - 1 ? (a = 0, S.css("background", "none")) : a += 1;
        aa(a);

    }
    function c(a) {
        t.eq(a).animate({
            opacity: 0
        }, 500).removeClass("active");
        r.next().find("li").eq(a).fadeOut();
        0 >= a ? a = P - 1 : --a;
        aa(a);
    }

    function aa(a) {
        t.eq(a).attr("style", t.eq(a).data(B)).addClass("active").delay(500).animate({
            opacity: 1
        }, 500);
        r.find(".pageon").text("0" + (a + 1));
        r.next().find("li").delay(500).eq(a).fadeIn();
        p = a;
    }

    
    function next(){
        t.hasClass('active').animate({
            opacity: 0
        }, 500).removeClass("active");
    }
    //弹窗动画
    function ba() {
        Y || (Y = !0, $.fn.fullpage.setAllowScrolling(!1), C.removeClass("dis-none").tween({
            opacity: {
                start: 0,
                stop: 100,
                time: 0,
                duration: .7,
                effect: "easeOut"
            },
            top: {
                start: 55,
                stop: 50,
                time: 0,
                units: "%",
                duration: .7,
                effect: "easeOut"
            }
        }).play());
    }

    //首页加载初始化
    var z, w = 0;
    // $(window).load(function() {
    //     $("#loading").remove();
    //     z = setInterval(function() {
    //         a(p);
    //     }, 5e3);
    //     $(".left-top").first().children().each(function() {
    //         w += .2;
    //         $(this).css({
    //             animation: "foottxt 0.7s ease-out " + w + "s forwards",
    //             "-moz-animation": "foottxt 0.7s ease-out " + w + "s forwards",
    //             "-webkit-animation": "foottxt 0.7s ease-out " + w + "s forwards",
    //             "-o-animation": "foottxt 0.7s ease-out " + w + "s forwards"
    //         });
    //     });
    //     $("#home-btn").addClass("btn-fadein");
    //     $(".news-power").addClass("foot-news");
    //     $(".foot-eng").addClass("foot-t1");
    //     $(".foot-copy").addClass("foot-t2");
    //     $("#top-logo").addClass("logo-animate");
    //     $(".bgpic3").first().attr("style", $(".bgpic3").data("src"));
    //     $(".bgpic6").first().attr("style", $(".bgpic6").data("src"));
    // });


//预加载
(function(){
    var imgArr = [
      'images/home_loading.gif',
      'upload/pc-slide1.jpg',
      'upload/mac.png',
      'upload/mac1.png',
      'upload/pizza.png',
      'upload/pizza1.png',
      'upload/note.png',
      'upload/note1.png',
      'images/close.png',
      'images/close_active.png',
      'upload/section2-bg.jpg',
      'upload/section4-bg.jpg',
      'upload/section5-bg.jpg',
      'upload/section6-bg.jpg'
    ];
    preload({
      files: imgArr,
      complete: function(){
        $("#loading").remove();
        section1slide = setInterval(function() {
            a(p);
        }, 3000);
        $(".left-top").first().children().each(function() {
            w += .2;
            $(this).css({
                animation: "foottxt 0.7s ease-out " + w + "s forwards",
                "-moz-animation": "foottxt 0.7s ease-out " + w + "s forwards",
                "-webkit-animation": "foottxt 0.7s ease-out " + w + "s forwards",
                "-o-animation": "foottxt 0.7s ease-out " + w + "s forwards"
            });
        });
        $("#home-btn").addClass("btn-fadein");
        $(".news-power").addClass("foot-news");
        $(".foot-eng").addClass("foot-t1");
        $(".foot-copy").addClass("foot-t2");
        $("#top-logo").addClass("logo-animate");
        $(".bgpic3").first().attr("style", $(".bgpic3").data("src"));
        $(".bgpic6").first().attr("style", $(".bgpic6").data("src"));
      }
    });
})();


$('#homebanner .text').on('mouseover', function(){
    clearTimeout(section1slide);
})
$('#homebanner .text').on('mouseleave', function(){
    section1slide = setInterval(function() {
            a(p);
    }, 3000);
})

    //首页轮播
    var S = $("#homebanner"),   //容器
        r = $(".home-page"),    //页码
        t = S.find("li"),       //li
        P = t.length,           
        p = 0, 
        n, 
        li_indext = t.index();
        B = "image";

    n = $("#logo-mobile").css("display");
    B = "block" == n ? "mobile" : "image";

    t.eq(p).attr("style", t.eq(p).data("image")).animate({
        opacity: 1
    }, 500).addClass("active");
    $(".home-page").html("<span class='pageon'>0" + (p + 1) + "</span><b class='pagecut'>/</b>0" + P).next().find("li:eq(0)").fadeIn();

    $(".img-prev").click(function() {
        clearTimeout(section1slide);
        c(p);
        section1slide = setInterval(function() {
            a(p);
        }, 3000);
    });
    $(".img-next").click(function() {
        clearTimeout(section1slide);
        a(p);
        section1slide = setInterval(function() {
            a(p);
        }, 3000);
    });


    var C = $("#iframe-warp"), 
        m = C.children().first(), 
        W = C.find(".iframe-body"), 
        h, Y = !1, 
        X = $(window).width(), 
        Z = $(window).height();

    // $(window).resize(function() {
    //     if (X != $(window).width() || Z != $(window).height()) X = $(window).width(), Z = $(window).height(), 
    //     n = $("#logo-mobile").css("display"), B = "block" == n ? "mobile" : "image", t.eq(p).attr("style", "opacity:1;" + t.eq(p).data(B));
    // });

    //弹窗
    $(".slide-detail").click(function(a) {
        var c = $(this).data("sec");
            n = $("#logo-mobile").css("display");
            if (n == "block") {
                ba()
            }
            a.preventDefault(), ba();
    });

    $(".slide-page").click(function(a) {
        a = $(this).data("sec");
        $.fn.fullpage.moveTo(a);
    });

    //弹窗
    $("#panda").click(function(a) {
            $('.swiper-container-panda').show().siblings().hide();  
             ba();
            swiperPanda.update();
            $(".swiper-container-panda .btn-group div").click(function(a) {
                var index = $(this).index();
                swiperPanda.slideTo(index + 1, 300);
            });
    });

    $("#hetao").click(function(a) {
            $('.swiper-container-hetao').show().siblings().hide();
             ba();
            swiperHetao.update();
    });

    $(".section2 .box").click(function(a) {
            $('.swiper-container-design').show().siblings().hide();  
             ba();
            swiperDesign.update();
    });

    $(".swiper-container-anli img").click(function(a) {
            $('.swiper-container-design').show().siblings().hide();  
             ba();
            swiperDesign.update();
    });

    

    //关闭按钮
    m.click(function() {
        $.fn.fullpage.setAllowScrolling(!0);
        C.tween({
            opacity: {
                start: 100,
                stop: 0,
                time: 0,
                duration: .7,
                effect: "easeInOut"
            },
            top: {
                start: 50,
                stop: 55,
                time: 0,
                units: "%",
                duration: .7,
                effect: "easeInOut"
            },
            onStop: function(a) {
                C.addClass("dis-none");
                // W.attr("src", "");
                Y = !1;
            }
        }).play();
    });

    //关闭按钮2
    $('.mb-back').click(function() {
        $.fn.fullpage.setAllowScrolling(!0);
        C.tween({
            opacity: {
                start: 100,
                stop: 0,
                time: 0,
                duration: .7,
                effect: "easeInOut"
            },
            onStop: function(a) {
                C.addClass("dis-none");
                // W.attr("src", "");
                Y = !1;
            }
        }).play();
    });

    //横向滚动插件
    m = $(".star-list");
    $(".showfloat");
    m.slick({
        dots: !0,
        infinite: !1,
        speed: 1200,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [ {
            breakpoint: 1200,
            settings: {
                dots: !0,
                slidesToShow: 4,
                slidesToScroll: 4
            }
        }, {
            breakpoint: 769,
            settings: {
                dots: !0,
                arrows: !1,
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 481,
            settings: {
                dots: !0,
                arrows: !1,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        } ]
    });
    // $(".movie-list").slick({
    //     dots: !0,
    //     infinite: !0,
    //     speed: 800,
    //     autoplay: !1,
    //     slidesToShow: 3,
    //     slidesToScroll: 3,
    //     responsive: [ {
    //         breakpoint: 769,
    //         settings: {
    //             dots: !0,
    //             arrows: !1,
    //             slidesToShow: 3,
    //             slidesToScroll: 3
    //         }
    //     }, {
    //         breakpoint: 481,
    //         settings: {
    //             dots: !0,
    //             arrows: !1,
    //             slidesToShow: 2,
    //             slidesToScroll: 2
    //         }
    //     } ]
    // });
    $("#designer").slick({
        dots: !0,
        infinite: !0,
        speed: 800,
        autoplay: !1,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [ {
            breakpoint: 769,
            settings: {
                dots: !0,
                arrows: !1,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 481,
            settings: {
                dots: !0,
                arrows: !1,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        } ]
    }); 
    $("#anli").slick({
        dots: !0,
        infinite: !0,
        speed: 800,
        autoplay: !1,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [ {
            breakpoint: 769,
            settings: {
                dots: !0,
                arrows: !1,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 481,
            settings: {
                dots: !0,
                arrows: !1,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        } ]
    }); 
    $(".top-protxt1");
    $(".top-protxt2");
    var r = $(".home-page"), 
        q = $(".left-txt2"), 
        L = $(".left-txt3"), 
        y = $(".left-txt4"),
        x = $(".left-txt5"), 
        v = $(".left-txt6"), 
        D = $(".left-txt7"),
        N = $(".bgpic3"), 
        R = $(".slide");

    $("#dowebok").fullpage({
        sectionsColor: [ "#010101", "#f2f2f2", "#4c5769", "#f2f2f2", "#0d0d0d" ],
        navigationTooltips: "1 of 6;2 of 6;3 of 6;4 of 6;5 of 6;6 of 6".split(";"),
        afterSlideLoad: function(a, c, g, h) {
            2 == c && (R.find(".bgpic3").removeClass("bg-scale"), $(".slide.active").find(".bgpic3").addClass("bg-scale"));
        },
        afterLoad: function(a, c) {
            switch (c) {
              case 2:
                $(".left-txt2").find(".title-img").addClass("animate-title");
                $(".left-txt2").find("h2").addClass("animate-h2");
                $(".left-txt2").find("h3").addClass("animate-h3");
                break;

              case 3:
                $(".left-txt3").find(".title-img").addClass("animate-title");
                $(".left-txt3").find("h2").addClass("animate-h2");
                $(".section3").find(".bgpic3").addClass("bg-scale");
                $(".bgpic3").each(function() {
                    void 0 == $(this).attr("style") && $(this).attr("style", $(this).data("src"));
                });
                break;
              

              case 5:
                $(".left-txt2").find(".title-img").addClass("animate-title");
                $(".left-txt2").find("h2").addClass("animate-h2");
                $(".left-txt2").find("h3").addClass("animate-h3");
                break;

              case 4:
                $(".left-txt2").find(".title-img").addClass("animate-title");
                $(".left-txt2").find("h2").addClass("animate-h2");
                $(".left-txt2").find("h3").addClass("animate-h3");      
                break;

              case 6:
                $(".left-txt7").find(".title-img").addClass("animate-title");
                $(".left-txt7").find("h2").addClass("animate-h2");
                $(".left-txt7").find("h3").addClass("animate-h3");
                var g = .2;
                $(".contact-box").children().each(function() {
                    g += .1;
                    $(this).css({
                        animation: "foottxt 0.5s linear " + g + "s forwards",
                        "-moz-animation": "foottxt 0.5s linear " + g + "s forwards",
                        "-webkit-animation": "foottxt 0.5s linear " + g + "s forwards",
                        "-o-animation": "foottxt 0.5s linear " + g + "s forwards"
                    });
                });
            }
        },
        onLeave: function(a, c) {
            switch (a) {
              case 2:
                $(".left-txt2").find(".title-img").removeClass("animate-title");
                $(".left-txt2").find("h2").removeClass("animate-h2");
                $(".left-txt2").find("h3").removeClass("animate-h3");
                break;

              case 3:
                $(".left-txt3").find(".title-img").removeClass("animate-title");
                $(".left-txt3").find("h2").removeClass("animate-h2");
                $(".bgpic3").removeClass("bg-scale");
                break;

              case 5:
                $(".left-txt2").find(".title-img").removeClass("animate-title");
                $(".left-txt2").find("h2").removeClass("animate-h2");
                $(".left-txt2").find("h3").removeClass("animate-h3");
                break;

              case 4:
                $(".left-txt2").find(".title-img").removeClass("animate-title");
                $(".left-txt2").find("h2").removeClass("animate-h2");
                $(".left-txt2").find("h3").removeClass("animate-h3");
                
                break;

              case 6:
                $(".left-txt7").find(".title-img").removeClass("animate-title"), $(".left-txt7").find("h2").removeClass("animate-h2"), 
                $(".left-txt7").find("h3").removeClass("animate-h3");
            }
        },
        navigation: !0,
        anchors: "page1 page2 page3 page4 page5 page6".split(" "),
        menu: "#menu-link"
    });
    var u = $("#menu-btn-wrap");
    u.find(".menu-icon");
    u.find(".menu-txt");
    var F = u.next(), G = F.find("li a"), M = !0;
    u.click(function() {
        $(window).width();
        if (M) {
            F.css("display", "block").tween({
                opacity: {
                    start: 0,
                    stop: 100,
                    time: g,
                    duration: .3,
                    effect: "easeInOut"
                }
            }).play();
            $(this).addClass("active");
            G.opacity(0);
            for (var a = 0, c = G.length, g = 0; a < c; a++) G.eq(a).tween({
                opacity: {
                    start: 0,
                    stop: 100,
                    time: g,
                    duration: .7,
                    effect: "easeInOut"
                },
                top: {
                    start: 40,
                    stop: 0,
                    time: g,
                    units: "px",
                    duration: .7,
                    effect: "easeInOut"
                }
            }).play(), g += .07;
            M = !1;
        } else G.eq(0).removeClass("active"), F.tween({
            opacity: {
                start: 100,
                stop: 0,
                time: g,
                duration: .3,
                effect: "easeInOut"
            },
            onStop: function(a) {
                F.css("display", "none");
            }
        }).play(), M = !0, $(this).removeClass("active");
    });
    G.click(function() {
        F.hide();
        M = !0;
        u.removeClass("active");
    });

    //弹窗关闭按钮
    var b = $(".btn-work"), m = $("#iframe-close");
    b.hover(function() {
        $(this).tween({
            border: {
                start: "solid 3px #fff",
                stop: "solid 3px #01feae",
                time: 0,
                duration: .3,
                effect: "easeIn"
            }
        }).play();
        $(this).children("a").tween({
            color: {
                start: "#01feae",
                stop: "#fff",
                time: 0,
                duration: .3,
                effect: "bounceInOut"
            }
        }).play();
        $(this).children(".btn-b").tween({
            width: {
                start: 0,
                stop: 100,
                time: 0,
                units: "%",
                duration: .6,
                effect: "easeInOut"
            }
        }).play();
    }, function() {
        $(this).tween({
            border: {
                start: "solid 3px #01feae",
                stop: "solid 3px #fff",
                time: 0,
                duration: .3,
                effect: "easeIn"
            }
        }).play();
        $(this).children("a").tween({
            color: {
                start: "#ffffff",
                stop: "#ffffff",
                time: 0,
                duration: .3,
                effect: "bounceInOut"
            }
        }).play();
        $(this).children(".btn-b").tween({
            width: {
                start: 100,
                stop: 0,
                time: 0,
                units: "%",
                duration: .4,
                effect: "easeInOut"
            }
        }).play();
    });

    // m = $(".star-list1 .slick-slide");
    // m.hover(function() {
    //     $(this).find(".star-name").css("display", "block").stop().animate({
    //         opacity: 1,
    //         left: "0px"
    //     });
    // }, function() {
    //     $(this).find(".star-name").stop().animate({
    //         opacity: 0,
    //         left: "-70px"
    //     });
    //     setTimeout(function() {
    //         $(this).find(".star-name").css("display", "none");
    //     }, 600);
    // });
});

//滚动条
// $('.section2 .box').mCustomScrollbar({
//   axis: 'x',
//   scrollbarPosition: 'outside',
//   mouseWheel:'true',
//   scrollButtons:{
//         enable:false,
//         scrollType:"continuous",
//         scrollSpeed:20,
//         scrollAmount:40
//     },
// });


$('.swiper-container-design .swiper-slide').mCustomScrollbar({
  axis: 'y',
  scrollbarPosition: 'inside',
});

var TeamName = ['王子', 'Tom', '我名字很长很长很长', 'Peter', '老张', '老李']

$('.section4 .bottom .button').on('mouseover', function(){
    $(this).attr("src","upload/team-button1.png");
})
$('.section4 .bottom .button').on('mouseleave', function(){
    $(this).attr("src","upload/team-button2.png");
})


$('.section4 .right li').on('mouseover', function(){
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    var index = $(this).index();
    $('.left .detail .name').html(TeamName[index])
})
// $('.section4 .right li').on('mouseleave', function(){
//     $(this).removeClass('active');
// })
// 

