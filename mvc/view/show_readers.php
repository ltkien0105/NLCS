<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/css/dashboard.css">
    <link rel="stylesheet" href="../../public/css/show_customers.css">
    <title>Customer</title>
</head>
    <body>
        <?php
            include "../controller/readers/Readers.php";
        ?>
        <div>
            <div class="main">
                <!-- Begin: Sidebar -->
                <div class="sidebar">
                    <div class="top-sidebar">
                        <div class="logo">
                            <img src="../../public/assets/img/library-black-text.png" alt="">
                        </div>
                        <button class="close-btn">
                            <ion-icon name="close-sharp"></ion-icon>
                        </button>
                    </div>
                    <div class="content-sidebar">
                        <a href="./dashboard.html" class="dashboard">
                            <ion-icon name="apps-sharp"></ion-icon>
                            <h3>Dashboard</h3>
                        </a>

                        <a href="#" class="readers active">
                            <ion-icon name="person-sharp"></ion-icon>
                            <h3>Readers</h3>
                        </a>

                        <a href="#" class="books">
                            <ion-icon name="library-sharp"></ion-icon>
                            <h3>Books</h3>
                        </a>

                        <a href="#" class="reports">
                            <ion-icon name="bar-chart-sharp"></ion-icon>
                            <h3>Reports</h3>
                        </a>

                        <a href="../index.html" class="logout">
                            <ion-icon name="log-out-sharp"></ion-icon>
                            <h3>Log out</h3>
                        </a>
                    </div>
                </div>
                <!-- End: Sidebar -->

                <!-- Begin: Customer -->
                <aside>
                    <h2 class="title-text">Customers</h2>
                    <!-- Begin: Search Box -->
                    <div class="search-box">
                        <form action="" class="search-form">
                            <div class="all-input">
                                <div class="input-info">
                                    <label for="">ID</label>
                                    <input type="text">
                                </div>
        
                                <div class="input-info">
                                    <label for="">Full Name</label>
                                    <input type="text">
                                </div>
        
                                <div class="input-info">
                                    <label for="">Address</label>
                                    <input type="text">
                                </div>
        
                                <div class="input-info">
                                    <label for="">Email</label>
                                    <input type="email">
                                </div>

                                <div class="input-info">
                                    <label for="">Age</label>
                                    <input type="text">
                                </div>

                                <div class="input-info">
                                    <label for="">Date of birth</label>
                                    <input type="text">
                                </div>

                                <div class="apply-btn">
                                    <input type="submit" value="Apply">
                                    <ion-icon name="checkmark-sharp"></ion-icon>
                                </div>
                            </div>

                            <div class="all-button">
                                <button class="add-btn">
                                    <ion-icon name="add-circle-outline"></ion-icon>
                                    Add Customer
                                </button>
                                <button class="export-btn">
                                    <ion-icon name="share-sharp"></ion-icon>
                                    Export
                                </button>
                            </div>
                        </form>
                    </div>
                    <!-- End: Search Box -->

                    <!-- Begin: Table -->
                    <div class="table-cus">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Full Name</th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Phone Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                    $stt = 1;
                                    if($data==0) return;
                                    forEach($data as $value) {
                                ?>
                                <tr>
                                    <td><?php echo $stt?></td>
                                    <td><?php echo $value['reader_fullname']?></td>
                                    <td><?php echo $value['reader_gender']?></td>
                                    <td><?php echo $value['reader_email']?></td>
                                    <td><?php echo $value['reader_address']?></td>
                                    <td><?php echo $value['reader_phonenumber']?></td>
                                    <td>
                                        <a class="edit-btn" href="./edit_user.php?controller=users&action=edit&id=<?php echo $value['reader_username']?>">Edit</a>
                                        <a class="delete-btn" href="./delete_user.php?controller=users&action=delete&id=<?php echo $value['reader_username']?>">Delete</a>
                                    </td>
                                </tr>
                                <?php
                                        $stt++;
                                    }
                                ?>
                            </tbody>
                        </table>
                        <a href="">Show All</a>
                    </div>
                    <!-- End: Table -->
                </aside>
            </div>
        </div>
        <!-- Begin: Modal -->
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
            </div>
        </div>
        <!-- End: Modal -->
    </body>
</html>

<!-- Add icon source -->
<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

<!-- Logic -->
<script src='../../public/js/show_customer.js'></script>