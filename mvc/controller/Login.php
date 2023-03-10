<?php
    include '../model/DBConfig.php';
    $db = new Database();
    $db->connect();
    
    if(isset($_POST['username'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $data = $db->getAccount()->fetch_assoc();
        print_r($data);
        while($row = $data) {
            echo $row['username'];
        }
    } else {
        echo "conga";
    }
?>