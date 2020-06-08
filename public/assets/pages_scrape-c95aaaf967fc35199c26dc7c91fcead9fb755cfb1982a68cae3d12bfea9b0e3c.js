$( "#followers" ).click(function() {
    let regex = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_\.]+)/g;
    let val = $('#competitor').val()
    if(val === undefined || val === '') {
        $( "#invalid-link" ).text( "Invalid Instagram Profile URL" );
        $( "#invalid-link" ).removeClass( "hide" );
        $( "#invalid-link" ).addClass( "show" );
        return
    }

    let match = regex.exec(val)
    if(match == null || match[1] == null) {
        $( "#invalid-link" ).text( "Invalid Instagram Profile URL" );
        $( "#invalid-link" ).removeClass( "hide" );
        $( "#invalid-link" ).addClass( "show" );
        return
    }

    $.ajax({ url: 'https://www.instagram.com/' + match[1], success: function(data) { 
        let private = data.includes("\"is_private\":true")
        if(private) {
            $( "#invalid-link" ).text( "Invalid Instagram Profile (Private)" );
            $( "#invalid-link" ).removeClass( "hide" );
            $( "#invalid-link" ).addClass( "show" );
        }
        else {
            let followers = data.match(new RegExp("\"edge_followed_by\":{\"count\":(.*?)\}"))[1];
            if(Number(followers) && Number(followers) < 1000) {
                $( "#invalid-link" ).text( "Invalid Instagram Profile, Too few followers (< 1000)" );
                $( "#invalid-link" ).removeClass( "hide" );
                $( "#invalid-link" ).addClass( "show" );
            }
            else{
                $( "#invalid-link" ).removeClass( "show" );
                $( "#invalid-link" ).addClass( "hide" );

                $.ajax({
                    url: '/charges/new',
                    type: 'GET',
                    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
                    data: { mode: "followers", account: match[1], amount: Number(followers) },
                    contentType: 'application/json',
                    success: function(response) { 
                        $( "#page-body" ).replaceWith(response)
                        alert("what is this ", gon.amount)
                    },
                    error: function () {
                        $( "#invalid-link" ).text( "Unexpected Error. Please contact support if this persists. (2)" );
                        $( "#invalid-link" ).removeClass( "hide" );
                        $( "#invalid-link" ).addClass( "show" );
                    }
                }); 
            }
        }
    }, error: function () {
        $( "#invalid-link" ).text( "Unexpected Error. Please contact support if this persists. (1)" );
        $( "#invalid-link" ).removeClass( "hide" );
        $( "#invalid-link" ).addClass( "show" );
    }});
});

$( "#following" ).click(function() {
    let regex = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_\.]+)/g;
    let val = $('#competitor').val()
    if(val === undefined || val === '') {
        $( "#invalid-link" ).text( "Invalid Instagram Profile URL" );
        $( "#invalid-link" ).removeClass( "hide" );
        $( "#invalid-link" ).addClass( "show" );
        return
    }

    let match = regex.exec(val)
    if(match == null || match[1] == null) {
        $( "#invalid-link" ).text( "Invalid Instagram Profile URL" );
        $( "#invalid-link" ).removeClass( "hide" );
        $( "#invalid-link" ).addClass( "show" );
        return
    }

    $.ajax({ url: 'https://www.instagram.com/' + match[1], success: function(data) { 
        let private = data.includes("\"is_private\":true")
        if(private) {
            $( "#invalid-link" ).text( "Invalid Instagram Profile (Private)" );
            $( "#invalid-link" ).removeClass( "hide" );
            $( "#invalid-link" ).addClass( "show" );
        }
        else {
            let following = data.match(new RegExp("\"edge_follow\":{\"count\":(.*?)\}"))[1];
            if(Number(following) && Number(following) < 1000) {
                $( "#invalid-link" ).text( "Invalid Instagram Profile, Too few following (< 1000)" );
                $( "#invalid-link" ).removeClass( "hide" );
                $( "#invalid-link" ).addClass( "show" );
            }
            else{
                $( "#invalid-link" ).removeClass( "show" );
                $( "#invalid-link" ).addClass( "hide" );

                $.ajax({
                    url: '/charges/redirect',
                    type: 'GET',
                    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
                    data: { mode: "following", account: match[1], amount: Number(following) },
                    contentType: 'application/json',
                    success: function(data) { window.location.href = data.redirect },
                    error: function () {
                        $( "#invalid-link" ).text( "Unexpected Error. Please contact support if this persists. (2)" );
                        $( "#invalid-link" ).removeClass( "hide" );
                        $( "#invalid-link" ).addClass( "show" );
                    }
                }); 
            }
        }
    }, error: function () {
        $( "#invalid-link" ).text( "Unexpected Error. Please contact support if this persists. (1)" );
        $( "#invalid-link" ).removeClass( "hide" );
        $( "#invalid-link" ).addClass( "show" );
    }});
});

