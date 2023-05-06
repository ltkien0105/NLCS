import {toast} from "./general-function.js"
import {validate} from "./general-function.js"

$("document").ready(function () {
    const loginLink = $(".back-login");
    const signUpLink = $(".to-signup");
    const loginBox = $(".box.sign-in");
    const signupBox = $(".box.sign-up");
    const forgetBox = $(".box.forget");
    const loginBtn = $("#login-btn");
    const signupBtn = $("#signup-btn");
    const forgetSubmitBtn = $("#forget-submit-btn");
    const username = $("input[name='username']");
    const password = $("input[name='password']");
    const signUpUsername = $("input[name='signup-username']");
    const signUpPassword = $("input[name='signup-password']");
    const signUpFullname = $("input[name='signup-fullname']");
    const gender = $("#gender");
    const signUpEmail = $("input[name='signup-email']");
    const signUpPhonenumber = $("input[name='signup-phonenumber']");
    const signUpAddress = $("input[name='signup-address']");
    const confirmPassword = $("input[name='confirm-password']");
    const forgetBtn = $("#forget-btn");
    const cancelBtn = $(".cancel button");

    signUpLink.click(function (e) {
        e.preventDefault();
        loginBox.css("display", "none");
        forgetBox.css("display", "none");
        signupBox.css("display", "block");
    });

    loginLink.click(function (e) {
        e.preventDefault();
        forgetBox.css("display", "none");
        signupBox.css("display", "none");
        loginBox.css("display", "block");
    });

    username.keypress(function (event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode == "13") {
            event.preventDefault();
            loginBtn.click();
        }
    });

    password.keypress(function (event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode == "13") {
            event.preventDefault();
            loginBtn.click();
        }
    });

    loginBtn.click(function (e) {
        e.preventDefault();

        var values = {
            username: username.val(),
            password: password.val(),
        };

        $.ajax({
            url: "./mvc/controller/Login.php",
            type: "post",
            data: values,
            success: function (data) {
                if(data != '') {
                    location.href = data + `?u=${values["username"]}`;
                } else {
                    toast({
                        title: 'Error',
                        message: 'Username or password is incorrect',
                        type: 'error'
                    })
                } 
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            },
        });
    });

    const inputSignUp = $(".box.sign-up .all-input input");
    inputSignUp.each(function(index) {
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
                    if(index == 6) {
                        if($(inputSignUp[5]).val() !== $(inputSignUp[6]).val()) {
                            $(this).parent().find("p").append("<ion-icon name='alert-circle-sharp'></ion-icon>Confirm password doesn't match");
                        } else {
                            $(this).parent().find("p").text("");
                        }
                    }
                }
            }
        })
    })   

    signupBtn.click(function (e) {
        e.preventDefault();

        var values = {
            signUpUsername: signUpUsername.val(),
            signUpPassword: signUpPassword.val(),
            signUpFullname: signUpFullname.val(),
            gender: gender.val(),
            signUpEmail: signUpEmail.val(),
            signUpPhonenumber: signUpPhonenumber.val(),
            signUpAddress: signUpAddress.val(),
        };

        var isValid = true;
        $('.box.sign-up p').each(function() {
            if($(this).text() != '') {
                isValid = false;
            }
        }) 

        if(isValid) {
            if (signUpPassword.val() == confirmPassword.val()) {
                $.ajax({
                    url: "./mvc/controller/SignUp.php",
                    type: "post",
                    data: values,
                    success: function (response) {
                        if (response == "success") {
                            toast({
                                title: "Success",
                                message:
                                    "Sign up successfully with, please sign in to continue.",
                                type: "success",
                            });
                        } 
                        if (response.includes("Duplicate entry")){
                            toast({
                                title: "Error",
                                message: "Username already exists",
                                type: "error",
                            });
                        }
                    },
                });
            } else {
                toast({
                    title: "Error",
                    message: "Confirm password doesn't match",
                    type: "error",
                });
            }
        } else {
            toast({
                title: "Warning",
                message: `Please fill all fields or check format of them`,
                type: "warning",
            });
        }
    });

    forgetBtn.click(function(e) {
        e.preventDefault();
        signupBox.css("display", "none");
        loginBox.css("display", "none");
        forgetBox.css("display", "block");
    })

    cancelBtn.click(function(e) {
        e.preventDefault();
        signupBox.css("display", "none");
        forgetBox.css("display", "none");
        loginBox.css("display", "block");
    })

    const inputForget = $(".box.forget .inputBox input");

    inputForget.each(function(index) {
        $(this).focus(function() {
            $(this).parent().find("p").text("");
        })
        $(this).blur(function() {
            console.log($(this).val());
            if($(this).val() == '') {
                $(this).parent().find("p").append("<ion-icon name='alert-circle-sharp'></ion-icon>This field is required!");
            } else { 
                if(validate($(this).attr("validate"), $(this).val())) {
                    $(this).parent().find("p").append(validate($(this).attr("validate"), $(this).val()));
                } else {
                    if(index == 2) {
                        if($(inputForget[1]).val() !== $(inputForget[2]).val()) {
                            $(this).parent().find("p").append("<ion-icon name='alert-circle-sharp'></ion-icon>Confirm password doesn't match");
                        } else {
                            $(this).parent().find("p").text("");
                        }
                    }
                }
            }
        })
    })

    const forgetUsername = $("#forget-username").val();
    const forgetNewPass = $("#forget-new-password").val();
    const forgetConfirmPass = $("#forget-confirm-password").val();

    forgetSubmitBtn.click(function (e) {
        e.preventDefault();

        var values = {
            forget_username: forgetUsername,
            new_password: forgetNewPass,
        };

        var isValid = true;
        $('.box.forget p').each(function() {
            if($(this).text() != '') {
                isValid = false;
            }
        }) 

        if(isValid) {
            if (forgetNewPass == forgetConfirmPass) {
                $.ajax({
                    url: "./mvc/controller/Forget.php",
                    type: "post",
                    data: values,
                    success: function (response) {
                        console.log(response);
                        if (response == "success") {
                            toast({
                                title: "Success",
                                message:
                                    "Restore password successfully",
                                type: "success",
                            });
                        } else {
                            toast({
                                title: "Error",
                                message: "Restore password failed",
                                type: "error",
                            });
                        }
                    },
                });
            } else {
                toast({
                    title: "Error",
                    message: "Confirm password doesn't match",
                    type: "error",
                });
            }
        } else {
            toast({
                title: "Warning",
                message: `Please fill all fields or check format of them`,
                type: "warning",
            });
        }
    });

});
