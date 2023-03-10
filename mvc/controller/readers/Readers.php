<?php
    include "../model/DBConfig.php";
    $db = new Database();
    $db->connect();

    if(isset($_GET['action'])) {
        $action = $_GET['action'];
    } else {
        $action = '';
    }

    switch ($action) {
        case 'add': {
            //Add users to database
            if(isset($_POST['add_reader_submit'])) {
                $username = $_POST['username'];
                $fullname =  $_POST["fullname"];
                $gender =  $_POST["gender"];
                $email =  $_POST["email"];
                $address =  $_POST["address"];
                $phonenumber =  $_POST["phonenumber"];
                if($db->insertReader($username, $fullname, $gender, $email, $address, $phonenumber)) {
                    echo '<p class="noti-text">Add successfully!</p>';
                }
            }
            break;
        }

        case 'edit': {
            if(isset($_GET['username'])) {
                $username = $_GET['username'];
                $table = 'readers';
                $dataById = $db->getReaderByUsername($username);

                if(isset($_POST['edit_reader_submit'])) {
                    $username = $_POST['username'];
                    $fullname =  $_POST["fullname"];
                    $gender =  $_POST["gender"];
                    $email =  $_POST["email"];
                    $address =  $_POST["address"];
                    $phonenumber =  $_POST["phonenumber"];
                    if($db->updateReader($username, $fullname, $gender, $email, $address, $phonenumber)) {
                        header('location: ./show_readers.php?controller=users&action=list');
                    }
                }
            }
            break;
        }

        case 'delete': {
            if(isset($_GET['username'])) {
                $username = $_GET['username'];
                $table = 'readers';
                if($db->deleteReader($username)) {
                    header('location: ./show_readers.php?controller=users&action=list');
                }
            } else {
                header('location: ./show_readers.php?controller=users&action=list');
            }
            break;
        }

        case 'list': {
            $table = "users";
            $data = $db->getAllData($table);
            if(isset($_GET['id'])) {
                if($_GET['id'] == 'add') {
                    if(isset($_POST['add_reader_submit'])) {
                        $username = $_POST['username'];
                        $fullname =  $_POST["fullname"];
                        $gender =  $_POST["gender"];
                        $email =  $_POST["email"];
                        $address =  $_POST["address"];
                        $phonenumber =  $_POST["phonenumber"];
                        if($db->insertReader($username, $fullname, $gender, $email, $address, $phonenumber)) {
                            echo '<p class="noti-text">Add successfully!</p>';
                            header('location: ./show_readers.php?controller=users&action=list');
                        }
                    }
                }
            }
            break;
        }
    }
?>