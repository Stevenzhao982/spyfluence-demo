$(function(){var t=new Tour({backdrop:!0,steps:[{element:"#tour-1",title:"Title of first step",content:"Content of first step",smartPlacement:!0},{element:"#tour-2",title:"Title of second step",content:"Content of second step",smartPlacement:!0},{element:"#tour-3",title:"Title of third step",content:"Content of third step",smartPlacement:!0},{element:"#tour-4",title:"Title of fourth step",content:"Content of fourth step",smartPlacement:!0},{element:"#tour-5",title:"Title of fifth step",content:"Content of fifth step",smartPlacement:!0}]});t.init(),$("#bs-tour-example").click(function(){t.restart()})});