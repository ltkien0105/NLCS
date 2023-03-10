const backLogin = document.querySelector('.back-login');
const toSignUpBtn = document.querySelector('.to-signup');
const signinBox = document.querySelector('.box.sign-in');
const signupBox = document.querySelector('.box.sign-up');

toSignUpBtn.onclick = function(e) {
    signinBox.style.display = "none";
    signupBox.style.display = "block";
}

backLogin.onclick = function() {
    signinBox.style.display = "block";
    signupBox.style.display = "none";
}