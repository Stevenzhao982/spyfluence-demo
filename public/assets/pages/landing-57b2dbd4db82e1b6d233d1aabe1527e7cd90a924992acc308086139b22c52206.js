$(function(){var e=992,a={"default":{},alt:{}};$("html").hasClass("landing-1")||$("html").hasClass("landing-3")?a={"default":{variant:"navbar-light",classes:"pt-lg-4"},alt:{variant:"bg-white",classes:"py-1"}}:($("html").hasClass("landing-2")||$("html").hasClass("landing-4"))&&(a={"default":{variant:"navbar-dark",classes:"pt-lg-4"},alt:{variant:"bg-dark",classes:"py-1"}});var s=$(".landing-navbar"),l=$("#landing-navbar-collapse");l.on("show.bs.collapse hidden.bs.collapse",function(e){s.hasClass("landing-navbar-alt")||(s["show"===e.type?"removeClass":"addClass"](a["default"].variant),s["show"===e.type?"addClass":"removeClass"](a.alt.variant))}),$(window).on("resize",function(){if(!s.hasClass("landing-navbar-alt")){var i=$(this).outerWidth()<e,n=s.hasClass(a.alt.variant);i&&!n&&l.hasClass("show")?s.removeClass(a["default"].variant).addClass(a.alt.variant):!i&&n&&s.removeClass(a.alt.variant).addClass(a["default"].variant)}}),$("#landing-slider").each(function(){new Swiper(this,{autoHeight:!0,speed:1e3,followFinger:!1,threshold:50,preventClicks:!0,navigation:{nextEl:"#landing-slider-next",prevEl:"#landing-slider-prev"}})}),$("#landing-slider-parallax").each(function(){new Swiper(this,{parallax:!0,autoHeight:!0,speed:1e3,followFinger:!1,threshold:50,preventClicks:!0,navigation:{nextEl:"#landing-slider-next",prevEl:"#landing-slider-prev"}})}),$("#landing-video").each(function(){plyr.setup(this,{tooltips:{controls:!1,seek:!0}})[0]}),$("#landing-preview-slider").each(function(){new Swiper(this,{slidesPerView:3,spaceBetween:0,threshold:50,speed:400,centeredSlides:!0,slideToClickedSlide:!0,breakpoints:{992:{slidesPerView:1,spaceBetween:20}},pagination:{el:".swiper-pagination",clickable:!0}})}),$("#landing-testimonials-slider").each(function(){new Swiper(this,{navigation:{nextEl:"#landing-testimonials-slider-next",prevEl:"#landing-testimonials-slider-prev"}})}),$("#landing-logos-slider").each(function(){new Swiper(this,{slidesPerView:8,spaceBetween:30,breakpoints:{1200:{slidesPerView:7},992:{slidesPerView:6,spaceBetween:20},768:{slidesPerView:4,spaceBetween:10},576:{spaceBetween:0},480:{slidesPerView:3},380:{slidesPerView:2}},navigation:{nextEl:"#landing-logos-slider-next",prevEl:"#landing-logos-slider-prev"}})})});