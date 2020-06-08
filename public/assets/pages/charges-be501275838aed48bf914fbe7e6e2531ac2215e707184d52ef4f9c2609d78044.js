$(window).on('load', function() {
    var stripe = Stripe(gon.stripe_publishable_key);
    var elements = stripe.elements();
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
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

    $('#job-price').text(`${formatter.format(gon.total / 100)} USD`)
    $('#job-description-1').text(`${gon.competitor}'s Instagram ${gon.mode} Analysis`)
    $('#job-description-2').text(`${gon.amount} x Profiles`)
    $('#job-duration').text(`${gon.duration} Hours`)

    $('#job-price').text(`${formatter.format(gon.total / 100)} USD`)

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
            hiddenInputAmount.setAttribute('value', gon.total);
            hiddenInputName.setAttribute('type', 'hidden');
            hiddenInputName.setAttribute('name', 'competitor');
            hiddenInputName.setAttribute('value', gon.competitor);
            hiddenInputMode.setAttribute('type', 'hidden');
            hiddenInputMode.setAttribute('name', 'mode');
            hiddenInputMode.setAttribute('value', gon.mode);
            hiddenDurationEstimate.setAttribute('type', 'hidden');
            hiddenDurationEstimate.setAttribute('name', 'duration');
            hiddenDurationEstimate.setAttribute('value', gon.duration);
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
});
