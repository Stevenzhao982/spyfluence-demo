$(function(){var t="rtl"===$("body").attr("dir")||"rtl"===$("html").attr("dir");$("#growl-default").click(function(){$.growl({title:"Growl",message:"The kitten is awake!",location:t?"tl":"tr"})}),$("#growl-notice").click(function(){$.growl.notice({message:"The kitten is cute!",location:t?"tl":"tr"})}),$("#growl-warning").click(function(){$.growl.warning({message:"The kitten is ugly!",location:t?"tl":"tr"})}),$("#growl-error").click(function(){$.growl.error({message:"The kitten is attacking!",location:t?"tl":"tr"})}),$("#growl-static").click(function(){$.growl({title:"Growl",message:"The kitten is awake!",duration:99980001,location:t?"tl":"tr"})}),$("#growl-small").click(function(){$.growl({title:"Growl",message:"The kitten is awake!",size:"small",location:t?"tl":"tr"})}),$("#growl-large").click(function(){$.growl({title:"Growl",message:"The kitten is awake!",size:"large",location:t?"tl":"tr"})})}),$(function(){function r(){var t=["My name is Inigo Montoya. You killed my father. Prepare to die!","Are you the six fingered man?","Inconceivable!","I do not think that means what you think it means.","Have fun storming the castle!"];return++e===t.length&&(e=0),t[e]}var e=-1;$("#toastr-show").click(function(){var t=$("#toastr-message").val()||r(),e=$("#toastr-title").val()||"",o=$("#toastr-type").val();toastr[o](t,e,{positionClass:$('input[name="toastr-position"]:checked').val(),closeButton:$("#toastr-close-button").prop("checked"),progressBar:$("#toastr-progress-bar").prop("checked"),preventDuplicates:$("#toastr-prevent-duplicates").prop("checked"),newestOnTop:$("#toastr-newest-on-top").prop("checked"),rtl:"rtl"===$("body").attr("dir")||"rtl"===$("html").attr("dir")})}),$("#toastr-clear").on("click",function(){toastr.clear()})});