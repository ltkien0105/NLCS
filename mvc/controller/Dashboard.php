<?php
    include '../model/DBConfig.php';
    $db = new Database();
    $db->connect();
    
    $dashboardInfo = (object) array(
        'count_book' => $db->getCountBooks()[0],
        'count_reader' => $db->getCountReaders()[0],
        'count_issue_book' => $db->getCountIssueBooks()[0],
        'count_reader_create_today' => $db->getCountAccountCreateToday()[0],
        'new_reader' => $db->getNewReaders(),
        'new_book' => $db->getNewBooks()
    );
    echo json_encode($dashboardInfo);
?>