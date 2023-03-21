import { toast } from "./general-function.js";

$("document").ready(function () {
    const backLogin = $(".back-login");
    const toSignUpBtn = $(".to-signup");
    const signinBox = $(".box.sign-in");
    const signupBox = $(".box.sign-up");
    const loginBtn = $("#login-btn");
    const signupBtn = $("#signup-btn");
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

    toSignUpBtn.click(function (e) {
        e.preventDefault();
        signinBox.css("display", "none");
        signupBox.css("display", "block");
    });

    backLogin.click(function (e) {
        e.preventDefault();
        signinBox.css("display", "block");
        signupBox.css("display", "none");
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
                location.href = data + `?u=${values["username"]}`;
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            },
        });
    });

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
                                "Sign up successfully, please sign in to continue.",
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
    });
});
