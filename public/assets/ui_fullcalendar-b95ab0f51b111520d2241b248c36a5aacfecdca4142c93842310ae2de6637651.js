$(function(){var e=new Date,t=e.getFullYear(),a=e.getMonth(),n=e.getDate(),l=[{title:"All Day Event",start:new Date(t,a,n-12)},{title:"Long Event",start:new Date(t,a,n-8),end:new Date(t,a,n-5),className:"fc-event-warning"},{id:999,title:"Repeating Event",start:new Date(t,a,n-6,16,0)},{id:999,title:"Repeating Event",start:new Date(t,a,n+1,16,0),className:"fc-event-success"},{title:"Conference",start:new Date(t,a,n-4),end:new Date(t,a,n-2)},{title:"Meeting",start:new Date(t,a,n-3,10,30),end:new Date(t,a,n-3,12,30),className:"fc-event-danger"},{title:"Lunch",start:new Date(t,a,n-3,12,0),className:"fc-event-info"},{title:"Meeting",start:new Date(t,a,n-3,14,30),className:"fc-event-dark"},{title:"Happy Hour",start:new Date(t,a,n-3,17,30)},{title:"Dinner",start:new Date(t,a,n-3,20,0)},{title:"Birthday Party",start:new Date(t,a,n-2,7,0)},{title:"Background event",start:new Date(t,a,n+5),end:new Date(t,a,n+7),rendering:"background"},{title:"Click for Google",url:"http://google.com/",start:new Date(t,a,n+13)}];$("#fullcalendar-default-view").fullCalendar({themeSystem:"bootstrap4",bootstrapFontAwesome:{close:" ion ion-md-close",prev:" ion ion-ios-arrow-back scaleX--1-rtl",next:" ion ion-ios-arrow-forward scaleX--1-rtl",prevYear:" ion ion-ios-arrow-dropleft-circle scaleX--1-rtl",nextYear:" ion ion-ios-arrow-dropright-circle scaleX--1-rtl"},header:{left:"title",center:"month,agendaWeek,agendaDay",right:"prev,next today"},defaultDate:e,navLinks:!0,selectable:!0,selectHelper:!0,weekNumbers:!0,nowIndicator:!0,firstDay:1,businessHours:{dow:[1,2,3,4,5],start:"9:00",end:"18:00"},editable:!0,eventLimit:!0,events:l,select:function(e,t){$("#fullcalendar-default-view-modal").on("shown.bs.modal",function(){$(this).find('input[type="text"]').trigger("focus")}).on("hidden.bs.modal",function(){$(this).off("shown.bs.modal hidden.bs.modal submit").find('input[type="text"], select').val(""),$("#fullcalendar-default-view").fullCalendar("unselect")}).on("submit",function(a){a.preventDefault();var n=$(this).find('input[type="text"]').val(),l=$(this).find("select").val()||null;if(n){var i={title:n,start:e,end:t,className:l};$("#fullcalendar-default-view").fullCalendar("renderEvent",i,!0)}$(this).modal("hide")}).modal("show")},eventClick:function(e){alert("Event: "+e.title)}}),$("#fullcalendar-list-view").fullCalendar({themeSystem:"bootstrap4",bootstrapFontAwesome:{close:" ion ion-md-close",prev:" ion ion-ios-arrow-back scaleX--1-rtl",next:" ion ion-ios-arrow-forward scaleX--1-rtl",prevYear:" ion ion-ios-arrow-dropleft-circle scaleX--1-rtl",nextYear:" ion ion-ios-arrow-dropright-circle scaleX--1-rtl"},header:{left:"title",center:"listDay,listWeek,month",right:"prev,next today"},views:{listDay:{buttonText:"list day"},listWeek:{buttonText:"list week"}},defaultView:"listWeek",defaultDate:e,navLinks:!0,editable:!0,eventLimit:!0,events:l})});