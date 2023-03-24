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
        'new_book' => $db->getNewBooks(),
        'new_book_date_chart' => $db->getInforLast('books', 'date', 'book_create_time')[0],
        'new_book_issue_date_chart' => $db->getInforLast('issue_books', 'date', 'issue_date')[0],
        'new_reader_date_chart' => $db->getInforLast('accounts', 'date', 'create_time')[0],
        'expired_date_chart' => $db->getExpired('date')[0],
        'new_book_month_chart' => $db->getInforLast('books', 'month', 'book_create_time')[0],
        'new_book_issue_month_chart' => $db->getInforLast('issue_books', 'month', 'issue_date')[0],
        'new_reader_month_chart' => $db->getInforLast('accounts', 'month', 'create_time')[0],
        'expired_month_chart' => $db->getExpired('month')[0],
        'new_book_month_chart' => $db->getInforLast('books', 'month', 'book_create_time')[0],
        'new_book_issue_month_chart' => $db->getInforLast('issue_books', 'month', 'issue_date')[0],
        'new_reader_month_chart' => $db->getInforLast('accounts', 'month', 'create_time')[0],
        'expired_month_chart' => $db->getExpired('month')[0],
        'new_book_week_chart' => $db->getInforLast('books', 'week', 'book_create_time')[0],
        'new_book_issue_week_chart' => $db->getInforLast('issue_books', 'week', 'issue_date')[0],
        'new_reader_week_chart' => $db->getInforLast('accounts', 'week', 'create_time')[0],
        'expired_week_chart' => $db->getExpired('week')[0],
    );

    echo json_encode($dashboardInfo);
?>