$( "#followers" ).click(function() {
    let reg = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_\.]+)/g;
    let val = $('#competitor').val()
    if(val === undefined || val === '') {
        $( "#invalid-link" ).text( "Invalid Instagram Profile URL" );
        $( "#invalid-link" ).removeClass( "hide" );
        $( "#invalid-link" ).addClass( "show" );
        return
    }

    let match = reg.exec(val)
    if(match == null || match[1] == null) {
        $( "#invalid-link" ).text( "Invalid Instagram Profile URL" );
        $( "#invalid-link" ).removeClass( "hide" );
        $( "#invalid-link" ).addClass( "show" );
        return
    }

    $.ajax({ url: `https://www.instagram.com/${match[1]}`, success: function(data) { 
        let private = data.includes("\"is_private\":true")
        if(private) {
            $( "#invalid-link" ).text( "Invalid Instagram Profile (Private)" );
            $( "#invalid-link" ).removeClass( "hide" );
            $( "#invalid-link" ).addClass( "show" );
        }
        else {
            $.ajax({
                url: '/logs',
                type: 'POST',
                beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
                data: { message: `Error determining following count for ${match[1]}. Check regex.`}
            });

            // $( "#invalid-link" ).text( `Error determining following count. Please try again or contact us if this issue persists.` );
            $( "#invalid-link" ).text( `Due to Instagram API and Data policy changes, the Spyfluence report service will no longer be offered. You may still continue to access and download reports from existing campaigns however.` );
            $( "#invalid-link" ).removeClass( "hide" );
            $( "#invalid-link" ).addClass( "show" );
        }
        // else {
        //     let followers = data.match(new RegExp("\"edge_followed_by\":{\"count\":(.*?)\}"));
        //     if(followers && Number(followers[1]) > 0 && Number(followers[1]) <= 250000) {
        //         $( "#invalid-link" ).removeClass( "show" );
        //         $( "#invalid-link" ).addClass( "hide" );

        //         $.ajax({
        //             url: '/charges/new',
        //             type: 'POST',
        //             beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        //             data: { mode: "followers", account: match[1], amount: Number(followers[1]) },
        //             success: function(data) {
        //                 $.ajax({
        //                     url: '/charges/checkoutForm',
        //                     type: 'GET',
        //                     beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        //                     success: function(html) {
        //                         $('#page-body').html(html);
        //                         setupSummary(data);
                                
        //                         $("#continue-button").click(function() {
        //                             $( "#continue-button" ).removeClass( "show" );
        //                             $( "#continue-button" ).addClass( "hide" );
        //                             $( "#checkout-form" ).removeClass( "hide" );
        //                             $( "#checkout-form" ).addClass( "show" );

        //                             setupCheckout(data);
        //                         });
        //                     }
        //                 });
        //             },
        //             error: function () {
        //                 $( "#invalid-link" ).text( "Unexpected Error. Please contact support if this persists. (2)" );
        //                 $( "#invalid-link" ).removeClass( "hide" );
        //                 $( "#invalid-link" ).addClass( "show" );
        //             }
        //         });
        //     }
        //     else if(followers && Number(followers[1]) <= 0) {
        //         $( "#invalid-link" ).text( `Invalid Instagram Profile. Too few followers (< 100).` );
        //         $( "#invalid-link" ).removeClass( "hide" );
        //         $( "#invalid-link" ).addClass( "show" );
        //     }
        //     else if(followers && Number(followers[1]) > 250000) {
        //         $( "#invalid-link" ).text( `Invalid Instagram Profile. Too many followers (> 250000).` );
        //         $( "#invalid-link" ).removeClass( "hide" );
        //         $( "#invalid-link" ).addClass( "show" );
        //     }
        //     else {
        //         $.ajax({
        //             url: '/logs',
        //             type: 'POST',
        //             beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        //             data: { message: `Error determining followers count for ${match[1]}. Check regex.`}
        //         });

        //         // $( "#invalid-link" ).text( `Error determining followers count. Please try again or contact us if this issue persists.` );
        //         $( "#invalid-link" ).text( `Due to Instagram API and Data policy changes, the Spyfluence report service will no longer be offered. You may still continue to access and download reports from existing campaigns however.` );
        //         $( "#invalid-link" ).removeClass( "hide" );
        //         $( "#invalid-link" ).addClass( "show" );
        //     }
        }
    }, error: function () {
        $( "#invalid-link" ).text( "Unexpected Error. Please contact support if this persists. (1)" );
        $( "#invalid-link" ).removeClass( "hide" );
        $( "#invalid-link" ).addClass( "show" );
    }});
});

$( "#following" ).click(function() {
    let reg = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_\.]+)/g;
    let val = $('#competitor').val()
    if(val === undefined || val === '') {
        $( "#invalid-link" ).text( "Invalid Instagram Profile URL" );
        $( "#invalid-link" ).removeClass( "hide" );
        $( "#invalid-link" ).addClass( "show" );
        return
    }

    let match = reg.exec(val)
    if(match == null || match[1] == null) {
        $( "#invalid-link" ).text( "Invalid Instagram Profile URL" );
        $( "#invalid-link" ).removeClass( "hide" );
        $( "#invalid-link" ).addClass( "show" );
        return
    }

    $.ajax({ url: `https://www.instagram.com/${match[1]}`, success: function(data) { 
        let private = data.includes("\"is_private\":true")
        if(private) {
            $( "#invalid-link" ).text( "Invalid Instagram Profile (Private)" );
            $( "#invalid-link" ).removeClass( "hide" );
            $( "#invalid-link" ).addClass( "show" );
        }
        else {
            $.ajax({
                url: '/logs',
                type: 'POST',
                beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
                data: { message: `Error determining following count for ${match[1]}. Check regex.`}
            });

            // $( "#invalid-link" ).text( `Error determining following count. Please try again or contact us if this issue persists.` );
            $( "#invalid-link" ).text( `Due to Instagram API and Data policy changes, the Spyfluence report service will no longer be offered. You may still continue to access and download reports from existing campaigns however.` );
            $( "#invalid-link" ).removeClass( "hide" );
            $( "#invalid-link" ).addClass( "show" );
        }
        // else {
        //     let following = data.match(new RegExp("\"edge_follow\":{\"count\":(.*?)\}"));
        //     if(following && Number(following[1]) > 0 && Number(following[1]) <= 250000) {
        //         $( "#invalid-link" ).removeClass( "show" );
        //         $( "#invalid-link" ).addClass( "hide" );

        //         $.ajax({
        //             url: '/charges/new',
        //             type: 'POST',
        //             beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        //             data: { mode: "following", account: match[1], amount: Number(following[1]) },
        //             success: function(data) {
        //                 $.ajax({
        //                     url: '/charges/checkoutForm',
        //                     type: 'GET',
        //                     beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        //                     success: function(html) {
        //                         $('#page-body').html(html);
        //                         setupSummary(data);

        //                         $( "#continue-button" ).click(function() {
        //                             $( "#continue-button" ).removeClass( "show" );
        //                             $( "#continue-button" ).addClass( "hide" );
        //                             $( "#checkout-form" ).removeClass( "hide" );
        //                             $( "#checkout-form" ).addClass( "show" );

        //                             setupCheckout(data);
        //                         });
        //                     }
        //                 });
        //             },
        //             error: function () {
        //                 $( "#invalid-link" ).text( "Unexpected Error. Please contact support if this persists. (2)" );
        //                 $( "#invalid-link" ).removeClass( "hide" );
        //                 $( "#invalid-link" ).addClass( "show" );
        //             }
        //         }); 
        //     }
        //     else if(following && Number(following[1]) <= 0) {
        //         $( "#invalid-link" ).text( `Invalid Instagram Profile. Too few following (< 100).`);
        //         $( "#invalid-link" ).removeClass( "hide" );
        //         $( "#invalid-link" ).addClass( "show" );
        //     }
        //     else if(following && Number(following[1]) > 250000) {
        //         $( "#invalid-link" ).text( `Invalid Instagram Profile. Too many following (> 250000).`);
        //         $( "#invalid-link" ).removeClass( "hide" );
        //         $( "#invalid-link" ).addClass( "show" );
        //     }
        //     else {
        //         $.ajax({
        //             url: '/logs',
        //             type: 'POST',
        //             beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        //             data: { message: `Error determining following count for ${match[1]}. Check regex.`}
        //         });

        //         // $( "#invalid-link" ).text( `Error determining following count. Please try again or contact us if this issue persists.` );
        //         $( "#invalid-link" ).text( `Due to Instagram API and Data policy changes, the Spyfluence report service will no longer be offered. You may still continue to access and download reports from existing campaigns however.` );
        //         $( "#invalid-link" ).removeClass( "hide" );
        //         $( "#invalid-link" ).addClass( "show" );
        //     }
        // }
    }, error: function () {
        $( "#invalid-link" ).text( "Unexpected Error. Please contact support if this persists. (1)" );
        $( "#invalid-link" ).removeClass( "hide" );
        $( "#invalid-link" ).addClass( "show" );
    }});
});

function setupSummary(data) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    $('#job-price').text(`${formatter.format(data.total / 100)} USD`)
    $('#job-description-1').text(`${data.competitor}'s Instagram ${data.mode} Analysis`)
    $('#job-description-2').text(`${data.amount} x Profiles`)
    $('#job-duration').text(`${data.duration} Hours`)
}

function setupCheckout(data) {
    var stripe = Stripe(data.key);
    var elements = stripe.elements();
    var card = elements.create('card', {
        style: {
            base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '15px',

                '::placeholder': {
                    color: '#CFD7E0',
                },
            },
        }
    });

    card.mount('#card-element');

    function setOutcome(result) {
        var errorElement = document.querySelector('.error');
        var form = document.querySelector('form');

        errorElement.classList.remove('visible');

        if (result.token) {
            var hiddenInputToken = document.createElement('input');
            var hiddenInputAmount = document.createElement('input');
            var hiddenInputName = document.createElement('input');
            var hiddenInputMode = document.createElement('input');
            var hiddenDurationEstimate = document.createElement('input');

            hiddenInputToken.setAttribute('type', 'hidden');
            hiddenInputToken.setAttribute('name', 'stripeToken');
            hiddenInputToken.setAttribute('value', result.token.id);
            hiddenInputAmount.setAttribute('type', 'hidden');
            hiddenInputAmount.setAttribute('name', 'stripeAmount');
            hiddenInputAmount.setAttribute('value', data.total);
            hiddenInputName.setAttribute('type', 'hidden');
            hiddenInputName.setAttribute('name', 'competitor');
            hiddenInputName.setAttribute('value', data.competitor);
            hiddenInputMode.setAttribute('type', 'hidden');
            hiddenInputMode.setAttribute('name', 'mode');
            hiddenInputMode.setAttribute('value', data.mode);
            hiddenDurationEstimate.setAttribute('type', 'hidden');
            hiddenDurationEstimate.setAttribute('name', 'duration');
            hiddenDurationEstimate.setAttribute('value', data.duration);
            form.appendChild(hiddenInputAmount)
            form.appendChild(hiddenInputToken);
            form.appendChild(hiddenInputName);
            form.appendChild(hiddenInputMode);
            form.appendChild(hiddenDurationEstimate);
            form.submit();

        } else if (result.error) {
            errorElement.textContent = result.error.message;
            errorElement.classList.add('visible');
        }
    }

    card.on('change', function(event) {
        setOutcome(event);
    });

    document.querySelector('form').addEventListener('submit', function(e) {
        $('#payment-error').removeClass('show')
        e.preventDefault();

        if ($('#cardholder-phone').val() == '' || $('#cardholder-city').val() == '' || $('#cardholder-address').val() == '' ||
            $('#cardholder-name').val() == '' || $('#cardholder-state').val() == '') {
            $('#payment-error').addClass('show')
            $('#payment-error').text('All fields must be filled.')
            return
        }

        var extraDetails = {
            name: $("#cardholder-name").val(),
            address_line1: $("#cardholder-address-line1").val(),
            address_city: $("#cardholder-address-city").val(),
            address_state: $("#cardholder-address-state").val()
        };

        stripe.createToken(card, extraDetails).then(setOutcome);
    });
}

;
