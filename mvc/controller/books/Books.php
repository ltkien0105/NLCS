<?php
    include "../../model/DBConfig.php";
    $db = new Database();
    $db->connect();

    if(isset($_POST['add_book_name'])) {
        $name = $_POST['add_book_name'];;
        $author =  $_POST["add_book_author"];
        $publisher =  $_POST["add_book_publisher"];
        $category =  $_POST["add_book_category"];
        $totalAmount =  $_POST["add_book_total_amount"];
        if($db->insertBook($name, $author, $publisher, $category, $totalAmount)) {
            echo "Add successfully!";  
        }
    } elseif(isset($_POST['bookIdEdit'])) {
        $id = $_POST['bookIdEdit'];
        $result = $db->getBookById($id);
        echo json_encode($result);
    } elseif(isset($_POST['edit_book_id'])) {
        $id = $_POST['edit_book_id'];
        $name = $_POST['edit_book_name'];
        $author =  $_POST["edit_book_author"];
        $publisher =  $_POST["edit_book_publisher"];
        $category =  $_POST["edit_book_category"];
        $amount_added =  $_POST["edit_book_amount_added"];
        if($db->updateBook($id, $name, $author, $publisher, $category, $amount_added)) {
            echo "Success";
        }
    } elseif(isset($_POST['bookIdDelete'])) {
        $id = $_POST['bookIdDelete'];
        $db->deleteIssueBookByBookId($id);
        $db->deleteBook($id);
    } else {
        $table = "books";
        $data = $db->getAllData($table);
        echo json_encode($data);
    }
?>