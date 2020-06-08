$(function(){var e=5e3;$(document).on("idle.idleTimer",function(){$("#idletimer-doc-Status").val(function(e,t){return t+"Idle @ "+moment().format()+" \n"}).removeClass("alert-success").addClass("alert-warning")}),$(document).on("active.idleTimer",function(e,t,i,r){$("#idletimer-doc-Status").val(function(e,t){return t+"Active ["+r.type+"] ["+r.target.nodeName+"] @ "+moment().format()+" \n"}).addClass("alert-success").removeClass("alert-warning")}),$("#idletimer-doc-Pause").click(function(){return $(document).idleTimer("pause"),$("#idletimer-doc-Status").val(function(e,t){return t+"Paused @ "+moment().format()+" \n"}),$(this).blur(),!1}),$("#idletimer-doc-Resume").click(function(){return $(document).idleTimer("resume"),$("#idletimer-doc-Status").val(function(e,t){return t+"Resumed @ "+moment().format()+" \n"}),$(this).blur(),!1}),$("#idletimer-doc-Elapsed").click(function(){return $("#idletimer-doc-Status").val(function(e,t){return t+"Elapsed (since becoming active): "+$(document).idleTimer("getElapsedTime")+" \n"}),$(this).blur(),!1}),$("#idletimer-doc-Destroy").click(function(){return $(document).idleTimer("destroy"),$("#idletimer-doc-Status").val(function(e,t){return t+"Destroyed: @ "+moment().format()+" \n"}).removeClass("alert-success").removeClass("alert-warning"),$(this).blur(),!1}),$("#idletimer-doc-Init").click(function(){return $(document).idleTimer({timeout:e}),$("#idletimer-doc-Status").val(function(e,t){return t+"Init: @ "+moment().format()+" \n"}),$(document).idleTimer("isIdle")?$("#idletimer-doc-Status").removeClass("alert-success").addClass("alert-warning"):$("#idletimer-doc-Status").addClass("alert-success").removeClass("alert-warning"),$(this).blur(),!1}),$("#idletimer-doc-Status").val(""),$(document).idleTimer(e),$(document).idleTimer("isIdle")?$("#idletimer-doc-Status").val(function(e,t){return t+"Initial Idle State @ "+moment().format()+" \n"}).removeClass("alert-success").addClass("alert-warning"):$("#idletimer-doc-Status").val(function(e,t){return t+"Initial Active State @ "+moment().format()+" \n"}).addClass("alert-success").removeClass("alert-warning")}),$(function(){var e=3e3;$("#idletimer-el-Status").on("idle.idleTimer",function(e){e.stopPropagation(),$("#idletimer-el-Status").val(function(e,t){return t+"Idle @ "+moment().format()+" \n"}).removeClass("alert-success").addClass("alert-warning")}),$("#idletimer-el-Status").on("active.idleTimer",function(e){e.stopPropagation(),$("#idletimer-el-Status").val(function(e,t){return t+"Active @ "+moment().format()+" \n"}).addClass("alert-success").removeClass("alert-warning")}),$("#idletimer-el-Reset").click(function(){return $("#idletimer-el-Status").idleTimer("reset").val(function(e,t){return t+"Reset @ "+moment().format()+" \n"}),$("#idletimer-el-Status").idleTimer("isIdle")?$("#idletimer-el-Status").removeClass("alert-success").addClass("alert-warning"):$("#idletimer-el-Status").addClass("alert-success").removeClass("alert-warning"),$(this).blur(),!1}),$("#idletimer-el-Remaining").click(function(){return $("#idletimer-el-Status").val(function(e,t){return t+"Remaining: "+$("#idletimer-el-Status").idleTimer("getRemainingTime")+" \n"}),$(this).blur(),!1}),$("#idletimer-el-LastActive").click(function(){return $("#idletimer-el-Status").val(function(e,t){return t+"LastActive: "+$("#idletimer-el-Status").idleTimer("getLastActiveTime")+" \n"}),$(this).blur(),!1}),$("#idletimer-el-State").click(function(){return $("#idletimer-el-Status").val(function(e,t){return t+"State: "+($("#idletimer-el-Status").idleTimer("isIdle")?"idle":"active")+" \n"}),$(this).blur(),!1}),$("#idletimer-el-Status").val("").idleTimer(e),$("#idletimer-el-Status").idleTimer("isIdle")?$("#idletimer-el-Status").val(function(e,t){return t+"Initial Idle @ "+moment().format()+" \n"}).removeClass("alert-success").addClass("alert-warning"):$("#idletimer-el-Status").val(function(e,t){return t+"Initial Active @ "+moment().format()+" \n"}).addClass("alert-success").removeClass("alert-warning")});