$(function(){$(".article-edit-tagsinput").tagsinput({tagClass:"badge badge-default"}),window.Quill?($("#article-editor-fallback").remove(),new Quill("#article-editor",{modules:{toolbar:"#article-editor-toolbar"},theme:"snow"})):($("#article-editor,#article-editor-toolbar").remove(),$("#article-editor-fallback").removeClass("d-none"))});