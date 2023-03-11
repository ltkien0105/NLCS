<?php
    include "../../model/DBConfig.php";
    $db = new Database();
    $db->connect();

    if(isset($_POST['add_username'])) {
        $username = $_POST['add_username'];
        $password = $_POST['add_password'];;
        $fullname =  $_POST["add_fullname"];
        $gender =  $_POST["add_gender"];
        $email =  $_POST["add_email"];
        $address =  $_POST["add_address"];
        $phonenumber =  $_POST["add_phoneNumber"];
        if($db->insertAccount($username, $password)) {
            if($db->insertReader($username, $fullname, $gender, $email, $address, $phonenumber)) {
                echo "Add successfully!";
            }   
        }
    } elseif(isset($_POST['usernameEdit'])) {
        $username = $_POST['usernameEdit'];
        $result = $db->getReaderByUsername($username);
        echo json_encode($result);
    } elseif(isset($_POST['edit_username'])) {
        $username = $_POST['edit_username'];
        $fullname =  $_POST["edit_fullname"];
        $gender =  $_POST["edit_gender"];
        $email =  $_POST["edit_email"];
        $address =  $_POST["edit_address"];
        $phonenumber =  $_POST["edit_phoneNumber"];
        if($db->updateReader($username, $fullname, $gender, $email, $address, $phonenumber)) {
            echo "Success";
        }
    } elseif(isset($_POST['usernameDelete'])) {
        $username = $_POST['usernameDelete'];
        $db->deleteIssueBookByUsername($username);
        $db->deleteReader($username);
        $db->deleteAccount($username);
    } else {
        $table = "readers";
        $data = $db->getAllData($table);
        echo json_encode($data);
    }

    // switch ($action) {
    //     case 'add': {
    //         //Add users to database
    //         if(isset($_POST['add_reader_submit'])) {
    //             $username = $_POST['username'];
    //             $fullname =  $_POST["fullname"];
    //             $gender =  $_POST["gender"];
    //             $email =  $_POST["email"];
    //             $address =  $_POST["address"];
    //             $phonenumber =  $_POST["phonenumber"];
    //             if($db->insertReader($username, $fullname, $gender, $email, $address, $phonenumber)) {
    //                 echo '<p class="noti-text">Add successfully!</p>';
    //             }
    //         }
    //         break;
    //     }

    //     case 'edit': {
    //         if(isset($_GET['username'])) {
    //             $username = $_GET['username'];
    //             $table = 'readers';
    //             $dataById = $db->getReaderByUsername($username);

    //             if(isset($_POST['edit_reader_submit'])) {
    //                 $username = $_POST['username'];
    //                 $fullname =  $_POST["fullname"];
    //                 $gender =  $_POST["gender"];
    //                 $email =  $_POST["email"];
    //                 $address =  $_POST["address"];
    //                 $phonenumber =  $_POST["phonenumber"];
    //                 if($db->updateReader($username, $fullname, $gender, $email, $address, $phonenumber)) {
    //                     header('location: ./show_readers.php?controller=users&action=list');
    //                 }
    //             }
    //         }
    //         break;
    //     }

    //     case 'delete': {
    //         if(isset($_GET['username'])) {
    //             $username = $_GET['username'];
    //             $table = 'readers';
    //             if($db->deleteReader($username)) {
    //                 header('location: ./show_readers.php?controller=users&action=list');
    //             }
    //         } else {
    //             header('location: ./show_readers.php?controller=users&action=list');
    //         }
    //         break;
    //     }

    //     case 'list': {
    //         $table = "readers";
    //         $data = $db->getAllData($table);
    //         // if(isset($_GET['id'])) {
    //         //     if($_GET['id'] == 'add') {
    //         //         if(isset($_POST['add_reader_submit'])) {
    //         //             $username = $_POST['username'];
    //         //             $fullname =  $_POST["fullname"];
    //         //             $gender =  $_POST["gender"];
    //         //             $email =  $_POST["email"];
    //         //             $address =  $_POST["address"];
    //         //             $phonenumber =  $_POST["phonenumber"];
    //         //             if($db->insertReader($username, $fullname, $gender, $email, $address, $phonenumber)) {
    //         //                 echo '<p class="noti-text">Add successfully!</p>';
    //         //                 header('location: ./show_readers.php?controller=users&action=list');
    //         //             }
    //         //         }
    //         //     }
    //         // }
    //         echo $data;
    //         break;
    //     }
    // }
?>