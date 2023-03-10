<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/css/add_user.css">
    <title>Add user</title>
</head>
<body>
    <div class="container">
        <div class="box-add">
            <h2>Add User</h2>
            <form action="" method="POST">
                <div class="all-input">
                    <div class="input-box">
                        <label for="">Full name</label>
                        <input type="text" name="fullname">
                    </div>
                    <div class="input-box">
                        <label for="">Gender</label>
                        <div class="select-box">
                            <select name="gender">
                                <option value="" disabled selected>Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-box">
                        <label for="">Email</label>
                        <input type="text" name="email">
                    </div>
                    <div class="input-box">
                        <label for="">Address</label>
                        <input type="text" name="address">
                    </div>
                    <div class="input-box">
                        <label for="">Phone number</label>
                        <input type="text" name="phonenumber">
                    </div>
                    <div class="submit-btn">
                        <input type="submit" value="Submit" name="add_reader_submit">
                    </div>
                </div>
            </form>
            <?php
                include "../controller/users/Users.php";
            ?>
        </div>
    </div>
</body>
</html>