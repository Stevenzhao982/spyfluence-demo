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
            let followers = data.match(new RegExp("\"edge_followed_by\":{\"count\":(.*?)\}"));
            if(followers && Number(followers[1]) > 0 && Number(followers[1]) <= 250000) {
                $( "#invalid-link" ).removeClass( "show" );
                $( "#invalid-link" ).addClass( "hide" );

                $.ajax({
                    url: '/charges/redirect',
                    type: 'GET',
                    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
                    data: { mode: "followers", account: match[1], amount: Number(followers[1]) },
                    contentType: 'application/json',
                    success: function(data) { window.location.href = data.redirect },
                    error: function () {
                        $( "#invalid-link" ).text( "Unexpected Error. Please contact support if this persists. (2)" );
                        $( "#invalid-link" ).removeClass( "hide" );
                        $( "#invalid-link" ).addClass( "show" );
                    }
                }); 
            }
            else if(followers && Number(followers[1]) <= 0) {
                $( "#invalid-link" ).text( `Invalid Instagram Profile. Too few followers (< 100).` );
                $( "#invalid-link" ).removeClass( "hide" );
                $( "#invalid-link" ).addClass( "show" );
            }
            else if(followers && Number(followers[1]) > 250000) {
                $( "#invalid-link" ).text( `Invalid Instagram Profile. Too many followers (> 250000).` );
                $( "#invalid-link" ).removeClass( "hide" );
                $( "#invalid-link" ).addClass( "show" );
            }
            else {
                $.ajax({
                    url: '/logs',
                    type: 'POST',
                    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
                    data: { message: `Error determining followers count for ${match[1]}. Check regex.`}
                });

                $( "#invalid-link" ).text( `Error determining followers count. Please try again or contact us if this issue persists.` );
                $( "#invalid-link" ).removeClass( "hide" );
                $( "#invalid-link" ).addClass( "show" );
            }
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
            let following = data.match(new RegExp("\"edge_follow\":{\"count\":(.*?)\}"));
            if(following && Number(following[1]) > 0 && Number(following[1]) <= 250000) {
                $( "#invalid-link" ).removeClass( "show" );
                $( "#invalid-link" ).addClass( "hide" );

                $.ajax({
                    url: '/charges/redirect',
                    type: 'GET',
                    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
                    data: { mode: "following", account: match[1], amount: Number(following[1]) },
                    contentType: 'application/json',
                    success: function(data) { window.location.href = data.redirect },
                    error: function () {
                        $( "#invalid-link" ).text( "Unexpected Error. Please contact support if this persists. (2)" );
                        $( "#invalid-link" ).removeClass( "hide" );
                        $( "#invalid-link" ).addClass( "show" );
                    }
                }); 
            }
            else if(following && Number(following[1]) <= 0) {
                $( "#invalid-link" ).text( `Invalid Instagram Profile. Too few following (< 100).`);
                $( "#invalid-link" ).removeClass( "hide" );
                $( "#invalid-link" ).addClass( "show" );
            }
            else if(following && Number(following[1]) > 250000) {
                $( "#invalid-link" ).text( `Invalid Instagram Profile. Too many following (> 250000).`);
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

                $.post('/logs', {message: `Error determining following count for ${match[1]}. Check regex.`})
                $( "#invalid-link" ).text( `Error determining following count. Please try again or contact us if this issue persists.` );
                $( "#invalid-link" ).removeClass( "hide" );
                $( "#invalid-link" ).addClass( "show" );
            }
        }
    }, error: function () {
        $( "#invalid-link" ).text( "Unexpected Error. Please contact support if this persists. (1)" );
        $( "#invalid-link" ).removeClass( "hide" );
        $( "#invalid-link" ).addClass( "show" );
    }});
});

