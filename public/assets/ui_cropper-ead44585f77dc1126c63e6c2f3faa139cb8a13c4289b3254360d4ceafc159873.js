$(function(){$('[data-toggle="cropper-example-tooltip"]').tooltip({container:"body"});var e,a=window.URL||window.webkitURL,t=$("#cropper-example-image"),o=$("#cropper-example-download"),p={aspectRatio:16/9,preview:".cropper-example-preview",crop:function(e){$("#cropper-example-dataX").val(Math.round(e.detail.x)),$("#cropper-example-dataY").val(Math.round(e.detail.y)),$("#cropper-example-dataHeight").val(Math.round(e.detail.height)),$("#cropper-example-dataWidth").val(Math.round(e.detail.width)),$("#cropper-example-dataRotate").val(e.detail.rotate),$("#cropper-example-dataScaleX").val(e.detail.scaleX),$("#cropper-example-dataScaleY").val(e.detail.scaleY)}},r=t.attr("src");t.cropper(p),"number"==typeof document.documentMode&&document.documentMode<11&&(p=$.extend({},p,{zoomOnWheel:!1}),setTimeout(function(){t.cropper("destroy").cropper(p)},1e3)),$.isFunction(document.createElement("canvas").getContext)||$('button[data-method="getCroppedCanvas"]').prop("disabled",!0),"undefined"==typeof document.createElement("cropper").style.transition&&($('button[data-method="rotate"]').prop("disabled",!0),$('button[data-method="scale"]').prop("disabled",!0)),"undefined"==typeof o[0].download&&o.addClass("disabled"),$(".cropper-example-buttons").on("click","[data-method]",function(){var p,d=$(this),c=d.data();if(!d.prop("disabled")&&!d.hasClass("disabled")&&t.data("cropper")&&c.method)switch("rotate"===(c=$.extend({},c)).method&&t.cropper("clear"),p=t.cropper(c.method,c.option,c.secondOption),"rotate"===c.method&&t.cropper("crop"),c.method){case"scaleX":case"scaleY":$(this).data("option",-c.option);break;case"getCroppedCanvas":p&&($("#cropper-example-getCroppedCanvasModal").modal().find(".modal-body").html(p),o.hasClass("disabled")||o.attr("href",p.toDataURL("image/jpeg")));break;case"destroy":e&&(a.revokeObjectURL(e),e="",t.attr("src",r))}});var d=$("#cropper-example-inputImage");a?d.change(function(){var o,r=this.files;t.data("cropper")&&r&&r.length&&(o=r[0],/^image\/\w+$/.test(o.type)?(e&&a.revokeObjectURL(e),e=a.createObjectURL(o),t.cropper("destroy").attr("src",e).cropper(p),d.val("")):window.alert("Please choose an image file."))}):d.prop("disabled",!0).parent().addClass("disabled")});