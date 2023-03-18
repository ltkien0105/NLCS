$("document").ready(function() {
    const posUsername = location.href.indexOf('?u=');
    const profile_username = location.href.slice(posUsername + 3);
    const changePassBtn = $(".change-pass-btn button");
    const changePassSubmitBtn = $('.box-add.edit.pass input[name="change-pass-submit"]');

    var reader_data = {};
    $.ajax({
        url: "../controller/Profile.php",
        type: "post",
        data: {profileUsername: profile_username},
        success: function (data) {
            reader_data = JSON.parse(data);
            $('.box-add.profile-box input[name="username"]').val(reader_data[0]);
            $('.box-add.profile-box input[name="fullname"]').val(reader_data[1]);
            $('.box-add.profile-box select[name="gender"]').val(reader_data[2]);
            $('.box-add.profile-box input[name="email"]').val(reader_data[3]);
            $('.box-add.profile-box input[name="address"]').val(reader_data[4]);
            $('.box-add.profile-box input[name="phonenumber"]').val(
                reader_data[5]
            );
        },
    });

    // hide Modal when clicking outside of modal container
    $(".container").click(function() {
        $(".container").hide();
    });

    //Don't hide modal when clicking inside modal container
    $(".box-add").click(function (e) {
        e.stopPropagation();
    });

    changePassBtn.click(function(e) {
        e.preventDefault();
        $(".container").css("display", "flex");
        $(".box-add.edit").show();
    })

    changePassSubmitBtn.click(function(e) {
        e.preventDefault();

        if($('.box-add.edit.pass input[name="cur-pass"]').val() != reader_data[7]) {
            alert("Current password is not correct!");
        } else {
            if($('.box-add.edit.pass input[name="new-pass"]').val()
                == $('.box-add.edit.pass input[name="confirm-pass"]').val()) {
                $.ajax({
                    url: "../controller/Profile.php",
                    type: "post",
                    data: {
                        usernameChange: profile_username,
                        new_pass: $('.box-add.edit.pass input[name="new-pass"]').val()
                    },
                    success: function(response) {
                        alert(response);
                    }
                });
            } else {
                alert("Confirm password doesn't match!")
            }
        }
    })
})