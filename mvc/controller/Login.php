<?php
    include '../model/DBConfig.php';
    $db = new Database();
    $db->connect();
    
    if(isset($_POST['username'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        while($row = $db->getAccount()->fetch_assoc()) {
            if($username == $row['username'] && $password == $row['password'] && $row['role'] == 'librarian') {
                echo './mvc/view/dashboard.html';
            } else if($username == $row['username'] && $password == $row['password'] && $row['role'] == 'reader') {
                echo './mvc/view/user-profile.html';
            }
        }
    } else {
        echo "Can't send data to database";
    }
?>