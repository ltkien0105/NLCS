$("document").ready(function () {
  const backLogin = $(".back-login");
  const toSignUpBtn = $(".to-signup");
  const signinBox = $(".box.sign-in");
  const signupBox = $(".box.sign-up");
  const loginBtn = $(".login-btn");
  const signupBtn = $(".login-btn.signup");
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

  toSignUpBtn.click(function () {
    signinBox.css("display", "none");
    signupBox.css("display", "block");
  });

  backLogin.click(function () {
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
        location.href = data;
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

    if (signUpFullname.val() !== confirmPassword.val()) {
      $.ajax({
        url: "./mvc/controller/SignUp.php",
        type: "post",
        data: values,
        success: function (data) {
          console.log(data);
        },
        error: function (xhr, status, error) {
          console.log(xhr);
          console.log(status);
          console.log(error);
        },
      });
    } else {
      alert("Confirm password doesn't match");
    }
  });
});
