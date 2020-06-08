$(window).on('load', function() {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    $('#job-price').text(`${formatter.format(gon.total / 100)} USD`)

    $("#continue").click(function(){
        $.post("/charges/confirm", {
            "total": gon.total,
            "amount": gon.amount,
            "competitor": gon.competitor,
            "mode": gon.mode,
            "duration": gon.duration
        }) 
    });
});
