$(function(){"rtl"===$("html").attr("dir")&&($("#hover-dropdown-demo .dropdown-menu").addClass("dropdown-menu-right"),$("#nesting-dropdown-demo > .dropdown-menu").addClass("dropdown-menu-right"),$("#btn-dropdown-demo .dropdown-menu").addClass("dropdown-menu-right"))}),$(function(){var o="rtl"===$("body").attr("dir")||"rtl"===$("html").attr("dir");new BootstrapMenu("#bs-menu-example",{menuPosition:o?"belowRight":"belowLeft",actionsGroups:[["actionName","anotherActionName"],["thirdActionName"]],actions:{actionName:{name:"Action",onClick:function(){toastr.info("'Action' clicked!")}},anotherActionName:{name:"Another action",iconClass:"ion ion-md-create",onClick:function(){toastr.info("'Another action' clicked!")}},thirdActionName:{name:"A third action",iconClass:"ion ion-md-unlock",onClick:function(){toastr.info("'A third action' clicked!")}}}})});