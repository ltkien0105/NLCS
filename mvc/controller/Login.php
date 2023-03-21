<?php
    include '../model/DBConfig.php';
    $db = new Database();
    $db->connect();
    
    if(isset($_POST['username'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $data = $db->getAllData('accounts');
        for($i = 0; $i < count($data); $i++) {
            if($username == $data[$i]['username'] && $password == $data[$i]['password'] && $data[$i]['role'] == 'librarian') {
                echo './mvc/view/dashboard.html';
            } else if($username == $data[$i]['username'] && $password == $data[$i]['password'] && $data[$i]['role'] == 'reader') {
                echo "./mvc/view/reader-profile.html";
            }
        }
    } else {
        echo "Can't send data to database";
    }
?>