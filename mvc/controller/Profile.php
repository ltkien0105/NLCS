<?php
    include "../model/DBConfig.php";
    $db = new Database();
    $db->connect();

    if(isset($_POST["new_pass"])) {
        $username = $_POST["usernameChange"];
        $newPass = $_POST["new_pass"];
        if($db->updateAccount($username, "password", $newPass)) {
            echo "success";
        }
    } elseif(isset($_POST["issueUsername"])) {
        $username = $_POST["issueUsername"];
        $result = $db->getIssueOfReader($username);

        for($i = 0; $i < count($result); $i++) {
            $result[$i][2] = date('d/m/Y', strtotime($result[$i][2]));
            $result[$i]['issue_date'] = date('d/m/Y', strtotime($result[$i]['issue_date']));
            $result[$i][3] = date('d/m/Y', strtotime($result[$i][3]));
            $result[$i]['expired_date'] = date('d/m/Y', strtotime($result[$i]['expired_date']));
        }

        echo json_encode($result);
    } elseif(isset($_POST['profileUsername'])) {
        $username = $_POST['profileUsername'];
        $result = $db->getProfile($username);
        echo json_encode($result);
    }
?>