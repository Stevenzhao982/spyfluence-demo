$(function(){$('[data-toggle="cropper-example-tooltip"]').tooltip({container:"body"});var o,p=window.URL||window.webkitURL,r=$("#cropper-example-image"),d=$("#cropper-example-download"),t={aspectRatio:16/9,preview:".cropper-example-preview",crop:function(e){$("#cropper-example-dataX").val(Math.round(e.detail.x)),$("#cropper-example-dataY").val(Math.round(e.detail.y)),$("#cropper-example-dataHeight").val(Math.round(e.detail.height)),$("#cropper-example-dataWidth").val(Math.round(e.detail.width)),$("#cropper-example-dataRotate").val(e.detail.rotate),$("#cropper-example-dataScaleX").val(e.detail.scaleX),$("#cropper-example-dataScaleY").val(e.detail.scaleY)}},c=r.attr("src");r.cropper(t),"number"==typeof document.documentMode&&document.documentMode<11&&(t=$.extend({},t,{zoomOnWheel:!1}),setTimeout(function(){r.cropper("destroy").cropper(t)},1e3)),$.isFunction(document.createElement("canvas").getContext)||$('button[data-method="getCroppedCanvas"]').prop("disabled",!0),"undefined"==typeof document.createElement("cropper").style.transition&&($('button[data-method="rotate"]').prop("disabled",!0),$('button[data-method="scale"]').prop("disabled",!0)),"undefined"==typeof d[0].download&&d.addClass("disabled"),$(".cropper-example-buttons").on("click","[data-method]",function(){var e,a=$(this),t=a.data();if(!a.prop("disabled")&&!a.hasClass("disabled")&&r.data("cropper")&&t.method)switch("rotate"===(t=$.extend({},t)).method&&r.cropper("clear"),e=r.cropper(t.method,t.option,t.secondOption),"rotate"===t.method&&r.cropper("crop"),t.method){case"scaleX":case"scaleY":$(this).data("option",-t.option);break;case"getCroppedCanvas":e&&($("#cropper-example-getCroppedCanvasModal").modal().find(".modal-body").html(e),d.hasClass("disabled")||d.attr("href",e.toDataURL("image/jpeg")));break;case"destroy":o&&(p.revokeObjectURL(o),o="",r.attr("src",c))}});var l=$("#cropper-example-inputImage");p?l.change(function(){var e,a=this.files;r.data("cropper")&&a&&a.length&&(e=a[0],/^image\/\w+$/.test(e.type)?(o&&p.revokeObjectURL(o),o=p.createObjectURL(e),r.cropper("destroy").attr("src",o).cropper(t),l.val("")):window.alert("Please choose an image file."))}):l.prop("disabled",!0).parent().addClass("disabled")});