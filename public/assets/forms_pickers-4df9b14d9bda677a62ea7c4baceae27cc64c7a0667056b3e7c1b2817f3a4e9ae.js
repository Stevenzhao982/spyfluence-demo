$(function(){var t="rtl"===$("html").attr("dir");$("#datepicker-base").datepicker({orientation:t?"auto right":"auto left"}),$("#datepicker-features").datepicker({calendarWeeks:!0,todayBtn:"linked",daysOfWeekDisabled:"1",clearBtn:!0,todayHighlight:!0,multidate:!0,daysOfWeekHighlighted:"1,2",orientation:t?"auto left":"auto right",beforeShowMonth:function(t){if(8===t.getMonth())return!1},beforeShowYear:function(t){if(2014===t.getFullYear())return!1}}),$("#datepicker-range").datepicker({orientation:t?"auto right":"auto left"}),$("#datepicker-inline").datepicker()}),$(function(){function t(t,e){$("#daterange-4").html(t.format("MMMM D, YYYY")+" - "+e.format("MMMM D, YYYY"))}var e="rtl"===$("body").attr("dir")||"rtl"===$("html").attr("dir");$("#daterange-1").daterangepicker({opens:e?"left":"right",showWeekNumbers:!0}),$("#daterange-2").daterangepicker({timePicker:!0,timePickerIncrement:30,locale:{format:"MM/DD/YYYY h:mm A"},opens:e?"left":"right"}),$("#daterange-3").daterangepicker({singleDatePicker:!0,showDropdowns:!0,opens:e?"left":"right"},function(t){var e=moment().diff(t,"years");alert("You are "+e+" years old.")});var i=moment().subtract(29,"days"),r=moment();$("#daterange-4").daterangepicker({startDate:i,endDate:r,ranges:{Today:[moment(),moment()],Yesterday:[moment().subtract(1,"days"),moment().subtract(1,"days")],"Last 7 Days":[moment().subtract(6,"days"),moment()],"Last 30 Days":[moment().subtract(29,"days"),moment()],"This Month":[moment().startOf("month"),moment().endOf("month")],"Last Month":[moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]},opens:e?"left":"right"},t),t(i,r)}),$(function(){$("#b-m-dtp-date").bootstrapMaterialDatePicker({weekStart:0,time:!1,clearButton:!0}),$("#b-m-dtp-time").bootstrapMaterialDatePicker({date:!1,shortTime:!1,format:"HH:mm"}),$("#b-m-dtp-datetime").bootstrapMaterialDatePicker({weekStart:1,format:"dddd DD MMMM YYYY - HH:mm",shortTime:!0,nowButton:!0,minDate:new Date})}),$(function(){var t="rtl"===$("body").attr("dir")||"rtl"===$("html").attr("dir");$("#timepicker-example-1").timepicker({scrollDefault:"now",orientation:t?"r":"l"}),$("#timepicker-example-2").timepicker({minTime:"2:00pm",maxTime:"11:30pm",showDuration:!0,orientation:t?"r":"l"}),$("#timepicker-example-3").timepicker({disableTimeRanges:[["1am","2am"],["3am","4:01am"]],orientation:t?"r":"l"}),$("#timepicker-example-4").timepicker({timeFormat:"H:i:s",orientation:t?"r":"l"}),$("#timepicker-example-5").timepicker({timeFormat:"h:i A",orientation:t?"r":"l"}),$("#timepicker-example-6").timepicker({step:15,orientation:t?"r":"l"})}),$(function(){var t="rtl"===$("body").attr("dir")||"rtl"===$("html").attr("dir");$("#minicolors-hue").minicolors({control:"hue",position:"bottom "+(t?"right":"left")}),$("#minicolors-saturation").minicolors({control:"saturation",position:"bottom "+(t?"left":"right")}),$("#minicolors-wheel").minicolors({control:"wheel",position:"top "+(t?"left":"right")}),$("#minicolors-opacity").minicolors({control:"wheel",opacity:!0,position:"bottom "+(t?"right":"left")}),$("#minicolors-brightness").minicolors({control:"brightness",position:"top "+(t?"right":"left")}),$("#minicolors-hidden").minicolors({position:"top "+(t?"right":"left")})});