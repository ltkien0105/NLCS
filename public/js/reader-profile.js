import {toast} from './general-function.js'
import {validate} from './general-function.js'

$("document").ready(function() {
    const posUsername = location.href.indexOf('?u=');
    const profile_username = location.href.slice(posUsername + 3);
    const changePasswordBtn = $(".change-pass-btn button");
    const changePassSubmitBtn = $('.box-add.edit.pass input[name="change-pass-submit"]');
    const issueBookLink = $(".issue");
    const readerInfoApplyBtn = $("input[name='profile_reader_submit']");
    var reader_data = {};

    issueBookLink.attr("href", `./reader-issue.html?u=${profile_username}`);

    $.ajax({
        url: "../controller/Profile.php",
        type: "post",
        data: {profileUsername: profile_username},
        success: function (data) {
            reader_data = JSON.parse(data);
            console.log(reader_data);
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

    changePasswordBtn.click(function(e) {
        e.preventDefault();
        $(".container").css("display", "flex");
        $(".box-add.edit").show();
    })

    const inputChangePass = $(".box-add.edit.pass input");
    inputChangePass.each(function(index) {
        $(this).focus(function() {
            $(this).parent().find("p").text("");
        })
        $(this).blur(function() {
            if($(this).val() == '') {
                $(this).parent().find("p").append("<ion-icon name='alert-circle-sharp'></ion-icon>This field is required!");
            } else { 
                if(validate($(this).attr("validate"), $(this).val())) {
                    $(this).parent().find("p").append(validate($(this).attr("validate"), $(this).val()));
                } else {
                    if(index == 3) {
                        if($(inputChangePass[2]).val() !== $(inputChangePass[3]).val()) {
                            $(this).parent().find("p").append("<ion-icon name='alert-circle-sharp'></ion-icon>Confirm password doesn't match");
                        } else {
                            $(this).parent().find("p").text("");
                        }
                    }
                }
            }
        })
    })
    changePassSubmitBtn.click(function(e) {
        e.preventDefault();

        if($('.box-add.edit.pass input[name="cur-pass"]').val() != reader_data[7]) {
            toast({
                title: 'Error',
                message: "Current password isn't correct",
                type: 'error'
            })
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
                        if(response === 'success'){
                            toast({
                                title: 'Success',
                                message: 'Change password successfully',
                                type: 'success'
                            })
                        } else {
                            toast({
                                title: 'Error',
                                message: 'Change password failed',
                                type: 'error'
                            })
                        }
                    }
                });
            } else {
                toast({
                    title: 'Error',
                    message: "Confirm password doesn't match",
                    type: 'error'
                })
            }
        }
    })

    const inputEditReader = $(".box-add.profile-box input");
    inputEditReader.each(function(index) {
        $(this).focus(function() {
            $(this).parent().find("p").text("");
        })
        $(this).blur(function() {
            if($(this).val() == '') {
                $(this).parent().find("p").append("<ion-icon name='alert-circle-sharp'></ion-icon>This field is required!");
            } else { 
                if(validate($(this).attr("validate"), $(this).val())) {
                    $(this).parent().find("p").append(validate($(this).attr("validate"), $(this).val()));
                }
            }
        })
    })

    readerInfoApplyBtn.click(function(e) {
        e.preventDefault();

        var isValid = true;
        $('.box-add.profile-box p').each(function() {
            if($(this).text() != '') {
                isValid = false;
            }
        })

        if(isValid) {
            $.ajax({
                url: '../controller/readers/Readers.php',
                type: 'post',
                data: {
                    edit_username: profile_username,
                    edit_fullname: $("input[name='fullname']").val(),
                    edit_gender: $("select[name='gender']").val(),
                    edit_email: $("input[name='email']").val(),
                    edit_address: $("input[name='address']").val(),
                    edit_phoneNumber: $("input[name='phonenumber']").val(),
                },
                success: function(response) {
                    console.log(response);
                    if(response === 'success') {
                        toast({
                            title: 'Success',
                            message: 'Edit information successfully, please reload page to see new information.',
                            type: 'success'
                        })
                    } else {
                        toast({
                            title: 'Error',
                            message: 'Edit information failed.',
                            type: 'error'
                        })
                    }
                }
            })
        }
    })
})