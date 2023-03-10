<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/css/login.css">
    <title>Login Form</title>
</head>
    <body>
        <!-- Begin: Sign in -->
        <div class="box sign-in">
            <div class="form">
                <form action="">
                    <h2>Sign In</h2>
                    <div class="inputBox">
                        <input type="text" required="required">
                        <span>Username</span>
                        <i></i>
                    </div>
                    <div class="inputBox">
                        <input type="password" required="required">
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div class="links">
                        <a href="#">Forgot password?</a>
                        <button class="to-signup">Sign Up</button>
                    </div>
                    <div class = "submit">
                        <input class="login-btn" type="submit" value="Login">
                        <span></span>
                    </div>
                </form>
            </div>
        </div>
        <!-- End: Sign in -->

        <!-- Begin: Sign up -->
        <div class="box sign-up">
            <div class="form">
                <form action="" method="POST">
                    <h2>Sign Up</h2>
                    <div class="all-input">
                        <div class="inputBox">
                            <input type="text" required="required">
                            <span>Username</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input type="text" required="required">
                            <span>Full Name</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input type="email" required="required">
                            <span>Email</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input type="text" required="required">
                            <span>Phone number</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input type="text" required="required">
                            <span>Address</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input type="password" required="required">
                            <span>Password</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input type="password" required="required">
                            <span>Confirm Password</span>
                            <i></i>
                        </div>
                    </div>
                    <div class="submit">
                        <input class="login-btn" type="submit" value="Sign Up">
                        <span></span>
                    </div>
                    <div class="had-account">
                        Already account?
                        <button class="back-login">Login</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- End: Sign up -->
    </body>
</html>

<script src="../../public/js/login.js"></script>