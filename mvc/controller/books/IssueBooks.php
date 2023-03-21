<?php
    include "../../model/DBConfig.php";
    $db = new Database();
    $db->connect();

    if(isset($_POST["add_issue_username"])) {
        $username = $_POST["add_issue_username"];;
        $id =  $_POST["add_issue_id"];
        $issueDate =  $_POST["add_issue_date"];
        $expiredDate =  $_POST["add_issue_expired"];
        $amount =  $_POST["add_issue_amount"];

        $issueDateFormat = str_replace('/', '-', $issueDate);
        $expiredDateFormat = str_replace('/', '-', $expiredDate);
        if($db->insertIssueBook($username, $id, date('Y-m-d', strtotime($issueDateFormat)), date('Y-m-d', strtotime($expiredDateFormat)), $amount)) {
            echo "success";
        }
    } elseif(isset($_POST['readerUsernameIssue'])) {
        $username = $_POST['readerUsernameIssue'];
        $id = $_POST['bookIdIssue'];
        $result = $db->getIssueBookByUsernameAndId($username, $id);
        echo json_encode($result);
    } elseif(isset($_POST['edit_issue_username'])) {
        $username = $_POST["edit_issue_username"];;
        $id =  $_POST["edit_issue_id"];
        $issueDate =  $_POST["edit_issue_date"];
        $expiredDate =  $_POST["edit_issue_expired"];
        $amount =  $_POST["edit_issue_amount"];
        $status = $_POST["edit_issue_status"];
        $issueDateFormat = str_replace('/', '-', $issueDate);
        $expiredDateFormat = str_replace('/', '-', $expiredDate);
        if($db->updateIssueBook($username, $id, date('Y-m-d', strtotime($issueDateFormat)), date('Y-m-d', strtotime($expiredDateFormat)), $amount, $status)) {
            echo "success";
        }
    } elseif(isset($_POST['readerUsernameDelete'])) {
        $username = $_POST['readerUsernameDelete'];
        $id = $_POST['bookIdDelete'];
        if($db->deleteIssueBookByBookId($username, $id)) {
            echo "success";
        }
    } elseif (isset($_POST['show_add_username'])) {
        $showUsername = $db->getReaderByUsername($_POST['show_add_username']);
        echo json_encode($showUsername);
    } elseif (isset($_POST['show_add_id'])) {
        $showId = $db->getBookById($_POST['show_add_id']);
        echo json_encode($showId);   
    }else {
        $table = "issue_books";
        $data = $db->getAllData($table);
        for($i = 0; $i < count($data); $i++) {
            $data[$i][2] = date('d/m/Y', strtotime($data[$i][2]));
            $data[$i]['issue_date'] = date('d/m/Y', strtotime($data[$i]['issue_date']));
            $data[$i][3] = date('d/m/Y', strtotime($data[$i][3]));
            $data[$i]['expired_date'] = date('d/m/Y', strtotime($data[$i]['expired_date']));
        }
        echo json_encode($data);
    }
?>