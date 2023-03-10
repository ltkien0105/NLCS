$('document').ready(function() {
    const backLogin = $('.back-login');
    const toSignUpBtn = $('.to-signup');
    const signinBox = $('.box.sign-in');
    const signupBox = $('.box.sign-up');
    const loginBtn = $('.login-btn');
    const signupBtn = $('.login-btn.signup');
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

    toSignUpBtn.click(function() {
        signinBox.css('display', 'none');
        signupBox.css('display', 'block');
    })

    backLogin.click(function() {
        signinBox.css('display', 'block');
        signupBox.css('display', 'none');
    })

    loginBtn.click(function(e) {
        e.preventDefault();

        var values = {
            username: username.val(),
            password: password.val()
        }

        $.ajax({
            url: './mvc/controller/Login.php',
            type: 'POST',
            data: values,
            success: function(result) {
                console.log(result);
            },
            error: function(xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        })
    })
})