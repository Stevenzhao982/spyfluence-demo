$(function(){function e(){return $.map(t.bootstrapTable("getSelections"),function(e){return e.id})}var t=$("#bootstrap-table-example"),o=$("#bootstrap-table-remove");t.bootstrapTable({height:500,iconsPrefix:"opacity-75 ion",icons:{paginationSwitchDown:"ion-ios-arrow-down icon-chevron-down",paginationSwitchUp:"ion-ios-arrow-up icon-chevron-up",refresh:"ion-md-refresh icon-refresh",columns:"ion-md-apps icon-th",detailOpen:"ion-md-add icon-plus",detailClose:"ion-md-remove icon-minus","export":"ion-md-cloud-download icon-share"},detailFormatter:function(e,t){var o=[];return $.each(t,function(e,t){o.push("<p><b>"+e+":</b> "+(void 0!==t&&t)+"</p>")}),o.join("")},columns:[[{field:"state",checkbox:!0,rowspan:2,align:"center",valign:"middle"},{title:"Item ID",field:"id",rowspan:2,align:"center",valign:"middle",sortable:!0,footerFormatter:function(){return"Total"}},{title:"Item Detail",colspan:3,align:"center"}],[{field:"name",title:"Item Name",sortable:!0,editable:!0,footerFormatter:function(e){return e.length},align:"center"},{field:"price",title:"Item Price",sortable:!0,align:"center",editable:{type:"text",title:"Item Price",validate:function(e){if(!(e=$.trim(e)))return"This field is required";if(!/^\$/.test(e))return"This field needs to start width $.";t.bootstrapTable("getData"),$(this).parents("tr").data("index");return""}},footerFormatter:function(e){var t=0;return $.each(e,function(e,o){t+=+o.price.substring(1)}),"$"+t}},{field:"operate",title:"Item Operate",align:"center",events:{"click .like":function(e,t,o){alert("You click like action, row: "+JSON.stringify(o))},"click .remove":function(e,o,i){t.bootstrapTable("remove",{field:"id",values:[i.id]})}},formatter:function(){return['<a class="btn btn-xs icon-btn btn-outline-default borderless like" href="javascript:void(0)" title="Like">','<i class="ion ion-md-heart"></i>',"</a>  ",'<a class="btn btn-xs icon-btn btn-outline-danger borderless remove" href="javascript:void(0)" title="Remove">','<i class="ion ion-md-close"></i>',"</a>"].join("")}}]]}),"rtl"!==$("body").attr("dir")&&"rtl"!==$("html").attr("dir")?($(".bootstrap-table .pull-right .dropdown-menu").addClass("dropdown-menu-right"),$(".bootstrap-table .pull-left .dropdown-menu").removeClass("dropdown-menu-right")):$(".bootstrap-table .pull-left .dropdown-menu").addClass("dropdown-menu-right"),setTimeout(function(){t.bootstrapTable("resetView")},200),t.on("check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table",function(){o.prop("disabled",!t.bootstrapTable("getSelections").length),e()}),t.on("all.bs.table",function(){}),o.click(function(){var i=e();t.bootstrapTable("remove",{field:"id",values:i}),o.prop("disabled",!0)})});