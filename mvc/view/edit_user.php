<?php
    include "../controller/users/Users.php";
?> 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/css/add_user.css">
    <title>Edit user</title>
</head>
<body>
    <div class="container">
        <div class="box-add">
            <h2>Edit User</h2>
            <form action="" method="POST">
                <div class="all-input">
                    <div class="input-box">
                        <label for="">Full name</label>
                        <input type="text" name="fullname" value="<?php echo $dataById['reader_fullname']?>">
                    </div>
                    <div class="input-box">
                        <label for="">Gender</label>
                        <div class="select-box">
                            <select name="gender">
                                <option value="" disabled selected>Select</option>
                                <option value="Male" <?php if($dataById['reader_gender']=='Male') echo "selected=\"selected\""?>>Male</option>
                                <option value="Female" <?php if($dataById['reader_gender']=='Female') echo "selected=\"selected\""?>>Female</option>
                                <option value="Other" <?php if($dataById['reader_gender']=='Other') echo "selected=\"selected\""?>>Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-box">
                        <label for="">Email</label>
                        <input type="text" name="email" value="<?php echo $dataById['reader_email']?>">
                    </div>
                    <div class="input-box">
                        <label for="">Address</label>
                        <input type="text" name="address" value="<?php echo $dataById['reader_address']?>">
                    </div>
                    <div class="input-box">
                        <label for="">Phone number</label>
                        <input type="text" name="phonenumber" value="<?php echo $dataById['reader_phonenumber']?>">
                    </div>
                    <div class="submit-btn">
                        <input type="submit" value="Edit" name="edit_reader_submit">
                    </div>
                </div>
            </form>
        </div>
    </div>
</body>
</html>