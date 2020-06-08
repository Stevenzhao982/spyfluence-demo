$(window).on("load",function(){function e(e){var t=document.querySelector(".error"),r=document.querySelector("form");if(t.classList.remove("visible"),e.token){var o=document.createElement("input"),n=document.createElement("input"),a=document.createElement("input"),i=document.createElement("input");o.setAttribute("type","hidden"),o.setAttribute("name","stripeToken"),o.setAttribute("value",e.token.id),n.setAttribute("type","hidden"),n.setAttribute("name","stripeAmount"),n.setAttribute("value",gon.total),a.setAttribute("type","hidden"),a.setAttribute("name","competitor"),a.setAttribute("value",gon.competitor),i.setAttribute("type","hidden"),i.setAttribute("name","mode"),i.setAttribute("value",gon.mode),r.appendChild(n),r.appendChild(o),r.appendChild(a),r.appendChild(i),r.submit()}else e.error&&(t.textContent=e.error.message,t.classList.add("visible"))}var t=Stripe(gon.stripe_publishable_key),r=t.elements(),o=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}),n=r.create("card",{style:{base:{iconColor:"#666EE8",color:"#31325F",lineHeight:"40px",fontWeight:300,fontFamily:'"Helvetica Neue", Helvetica, sans-serif',fontSize:"15px","::placeholder":{color:"#CFD7E0"}}}});$("#job-description-1").text(`${gon.competitor}'s Instagram ${gon.mode} Analysis`),$("#job-description-2").text(`${gon.amount} x Profiles`),$("#job-duration").text(`${gon.duration} Hours`),$("#job-price").text(`${o.format(gon.total/100)} USD`),n.mount("#card-element"),n.on("change",function(t){e(t)}),document.querySelector("form").addEventListener("submit",function(r){if($("#payment-error").removeClass("show"),r.preventDefault(),""==$("#cardholder-phone").val()||""==$("#cardholder-city").val()||""==$("#cardholder-address").val()||""==$("#cardholder-name").val()||""==$("#cardholder-state").val())return $("#payment-error").addClass("show"),void $("#payment-error").text("All fields must be filled.");var o={name:$("#cardholder-name").val(),address_line1:$("#cardholder-address-line1").val(),address_city:$("#cardholder-address-city").val(),address_state:$("#cardholder-address-state").val()};t.createToken(n,o).then(e)})});