$(function(){$("#gallery-thumbnails").on("click",".gallery-thumbnail > .img-thumbnail",function(l){l.preventDefault();var a=$("#gallery-thumbnails").find(".gallery-thumbnail:not(.d-none) > .img-thumbnail");window.blueimpGallery(a,{container:"#gallery-lightbox",carousel:!0,hidePageScrollbars:!0,disableScroll:!0,index:this})});var l=new Masonry("#gallery-thumbnails",{itemSelector:".gallery-thumbnail:not(.d-none)",columnWidth:".gallery-sizer",originLeft:!("rtl"===$("body").attr("dir")||"rtl"===$("html").attr("dir"))});$("#gallery-filter").on("click",".nav-link",function(a){a.preventDefault(),$("#gallery-filter .nav-link").removeClass("active"),$(this).addClass("active"),"#all"===this.getAttribute("href")?$("#gallery-thumbnails .gallery-thumbnail").removeClass("d-none"):($('#gallery-thumbnails .gallery-thumbnail:not([data-tag="'+this.getAttribute("href").replace("#","")+'"])').addClass("d-none"),$('#gallery-thumbnails .gallery-thumbnail[data-tag="'+this.getAttribute("href").replace("#","")+'"]').removeClass("d-none")),l.layout()})});