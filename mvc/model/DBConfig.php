<?php
    class Database {
        private $hostname = 'localhost';
        private $username = 'root';
        private $pass = '';
        private $dbname = 'nlcs_db';

        private $conn = NULL;
        private $result = NULL;

        public function connect() {
            $this->conn = new mysqli($this->hostname, $this->username, $this->pass, $this->dbname);
            if(!$this->conn) {
                echo "Fail connect";
                exit();
            } else {
                mysqli_set_charset($this->conn, 'utf8');
            }
            return $this->conn;
        }

        //Execute query code
        public function execute($sql) {
            $this->result = $this->conn->query($sql);
            return $this->result;
        }

        //Get data
        public function getData() {
            if($this->result) {
                $data = mysqli_fetch_array($this->result);
            } else {
                $data = 0;
            }
            return $data;
        }

        //Get data by id
        public function getReaderByUsername($username) {
            $sql = "SELECT * FROM readers WHERE reader_username='$username'";
            $this->execute($sql);
            if($this->count_num_rows() != 0) {
                $data = mysqli_fetch_array($this->result);
            } else {
                $data = 0;
            }
            return $data;
        }

        //Count record number
        public function count_num_rows() {
            if($this->result) {
                $num = mysqli_num_rows($this->result);
            } else {
                $num = 0;
            }

            return $num;
        }

        //Get all data
        public function getAllData($table) {
            $sql = "SELECT * FROM $table";
            $this->execute($sql);
            if($this->count_num_rows() == 0) {
                $data = 0;
            } else {
                while ($datas = $this->getData()) {
                    $data[] = $datas;
                }
            }
            return $data;
        }


        // ------------ Readers ------------
        //Add reader's data
        public function insertReader($username, $fullname, $gender, $email, $address, $phonenumber) {
            $sql = "INSERT INTO readers
             VALUE('$username', '$fullname', '$gender', '$email', '$address', '$phonenumber')";
            return $this->execute($sql);
        }
        
        //Update reader's data
        public function updateReader($username, $fullname, $gender, $email, $address, $phonenumber) {
            $sql = "UPDATE readers SET reader_fullname='$fullname', reader_gender='$gender',
                    reader_email='$email', reader_address='$address', reader_phonenumber='$phonenumber' 
                    WHERE reader_username='$username'";
            return $this->execute($sql);
        }

        //Delete reader
        public function deleteReader($username) {
            $sql = "DELETE FROM readers WHERE reader_username = '$username'";
            return $this->execute($sql);
        }

        //Get Reader's Count
        public function getCountReaders() {
            $sql = "SELECT count(reader_username) as count_reader FROM readers";
            $this->execute($sql);
            if($this->count_num_rows() != 0) {
                $data = mysqli_fetch_array($this->result);
            } else {
                $data = 0;
            }
            return $data;
        }

        //Get new reader
        public function getNewReaders() {
            $sql = "SELECT reader_username, reader_fullname, reader_phonenumber 
                    FROM readers r INNER JOIN accounts a ON r.reader_username = a.username
                    ORDER BY create_time DESC LIMIT 10";
            $this->execute($sql);
            if($this->count_num_rows() == 0) {
                $data = 0;
            } else {
                while ($datas = $this->getData()) {
                    $data[] = $datas;
                }
            }
            return $data;
        }
        // ------------ Books ------------
        //Add book's data
        public function insertBook($name, $author, $publisher, $category, $total_amount, $book_create_time = 'now()') {
            $sql = "INSERT INTO books(book_name, book_author, book_publisher, book_category, book_total_amount, book_remaining_amount, book_create_time)
             VALUE('$name', '$author', '$publisher', '$category', '$total_amount', '$total_amount', $book_create_time)";
            return $this->execute($sql);
        }
        
        //Update book's data
        public function updateBook($id, $name, $author, $publisher, $category, $amount_added) {
            $sql = "UPDATE books SET book_name='$name', book_author='$author',
                    book_publisher='$publisher', book_category='$category', book_total_amount=book_total_amount+$amount_added,
                    book_remaining_amount=book_remaining_amount+$amount_added
                    WHERE book_id='$id'";
            return $this->execute($sql);
        }

        //Delete book
        public function deleteBook($id) {
            $sql = "DELETE FROM books WHERE book_id = '$id'";
            return $this->execute($sql);
        }

        //Get book by id
        public function getBookById($id) {
            $sql = "SELECT * FROM books WHERE book_id='$id'";
            $this->execute($sql);
            if($this->count_num_rows() != 0) {
                $data = mysqli_fetch_array($this->result);
            } else {
                $data = 0;
            }
            return $data;
        }

        //Search book
        public function searchBook($id = '', $name = '', $author = '', $publisher = '', $category = '', $total_amount= '') {
            $sql = "SELECT * FROM books WHERE ((book_id LIKE '%$id%') AND (book_name LIKE '%$name%') 
                                            AND (book_author LIKE '%$author%') AND (book_publisher LIKE '%$publisher%') 
                                            AND (book_category LIKE '%$category%') AND (book_total_amount LIKE '%$total_amount%'))";
            $this->execute($sql);
            if($this->count_num_rows() == 0) {
                $data = 0;
            } else {
                while ($datas = $this->getData()) {
                    $data[] = $datas;
                }
            }
            return $data;
        }

        //Get Books's Count
        public function getCountBooks() {
            $sql = "SELECT count(book_id) as count_book FROM books";
            $this->execute($sql);
            if($this->count_num_rows() != 0) {
                $data = mysqli_fetch_array($this->result);
            } else {
                $data = 0;
            }
            return $data;
        }

        //Get new book
        public function getNewBooks() {
            $sql = "SELECT book_id, book_name, book_author 
                    FROM books
                    ORDER BY book_create_time DESC LIMIT 10";
            $this->execute($sql);
            if($this->count_num_rows() == 0) {
                $data = 0;
            } else {
                while ($datas = $this->getData()) {
                    $data[] = $datas;
                }
            }
            return $data;
        }

        public function getRemainingBook($id) {
            $sql = "SELECT book_remaining_amount FROM books WHERE book_id='$id'";
            $this->execute($sql);
            if($this->count_num_rows() != 0) {
                $data = mysqli_fetch_array($this->result);
            } else {
                $data = 0;
            }
            return $data;
        }

        // ------------ Issue Books ------------
        //Add issue book's data
        public function insertIssueBook($reader_username, $book_id, $issue_date, $expired_date, $amount, $status='borrowing') {
            $sql = "INSERT INTO issue_books(reader_username, book_id, issue_date, expired_date, amount, issue_status)
             VALUE('$reader_username', '$book_id', '$issue_date', '$expired_date', '$amount', '$status')";
            return $this->execute($sql);
        }
        
        // Update issue book's data
        public function updateIssueBook($reader_username, $book_id, $issue_date, $expired_date, $amount, $status) {
            $sql = "UPDATE issue_books SET reader_username='$reader_username', book_id='$book_id',
                    issue_date='$issue_date', expired_date='$expired_date', amount='$amount',
                    issue_status='$status'
                    WHERE reader_username='$reader_username' AND book_id='$book_id'";
            return $this->execute($sql);
        }

        //Delete issue book
        public function deleteIssueBookByBookId($username, $id) {
            $sql = "DELETE FROM issue_books WHERE reader_username='$username' AND book_id='$id'";
            return $this->execute($sql);
        }

        public function deleteIssueBookByUsername($username) {
            $sql = "DELETE FROM issue_books WHERE reader_username = '$username'";
            return $this->execute($sql);
        }

        //Get book by id
        public function getIssueBookByUsernameAndId($username, $id) {
            $sql = "SELECT * FROM issue_books WHERE reader_username = '$username' AND book_id='$id'";
            $this->execute($sql);
            if($this->count_num_rows() != 0) {
                $data = mysqli_fetch_array($this->result);
            } else {
                $data = 0;
            }
            return $data;
        }

        //Get Books's Count
        public function getCountIssueBooks() {
            $sql = "SELECT count(reader_username) as count_issue_book FROM issue_books";
            $this->execute($sql);
            if($this->count_num_rows() != 0) {
                $data = mysqli_fetch_array($this->result);
            } else {
                $data = 0;
            }
            return $data;
        }

        public function isIssue($username, $book_id) {
            $sql = "";
            if($username == "") {
                $sql = "SELECT book_id FROM issue_books WHERE book_id='$book_id'";
            } elseif($book_id == "") {
                $sql = "SELECT reader_username FROM issue_books WHERE reader_username='$username'";
            } else {
                $sql = "SELECT reader_username, book_id FROM issue_books WHERE reader_username='$username' AND book_id='$book_id'";
            }
            $this->execute($sql);
            if($this->count_num_rows() != 0) {
                return true;
            } else {
                return false;
            }
        }

        public function getExpired($period) {
            $sql = '';
            if($period == "date") {
                $sql = "SELECT count(*) FROM issue_books 
                        WHERE issue_status = 'Expired' AND date(expired_date) = date(now() - interval 1 day);";
            } elseif($period == "month"){
                $sql = "SELECT count(*) FROM issue_books 
                    WHERE issue_status = 'Expired' AND month(expired_date) = month(now() - interval 1 month);";
            } elseif($period == "week") {
                $sql = "SELECT count(*) FROM issue_books 
                    WHERE issue_status = 'Expired' AND yearweek(expired_date) = yearweek(now() - interval 1 week);";
            }
            $this->execute($sql);
            if($this->count_num_rows() != 0) {
                $data = mysqli_fetch_array($this->result);
            } else {
                $data = 0;
            }
            return $data;
        }

        // ------------ Accounts ------------
        public function insertAccount($username, $password, $role="reader", $create_time = 'now()') {
            $sql = "INSERT INTO accounts VALUES('$username', '$password', '$role', $create_time)";
            return $this->execute($sql);
        }

        public function getAccount() {
            $sql = "SELECT * FROM accounts";
            return $this->execute($sql);
        }

        public function deleteAccount($username) {
            $sql = "DELETE FROM accounts WHERE username = '$username'";
            return $this->execute($sql);
        }

        public function getCountAccountCreateToday() {
            $sql = "SELECT COUNT(create_time) as count_reader_create_today FROM accounts WHERE DATE(create_time) = curdate()";
            $this->execute($sql);
            if($this->count_num_rows() != 0) {
                $data = mysqli_fetch_array($this->result);
            } else {
                $data = 0;
            }
            return $data;
        }

        //Profile
        public function getProfile($username) {
            $sql = "SELECT *
                    FROM readers r INNER JOIN accounts a ON r.reader_username = a.username
                    WHERE a.username = '$username'";
            $this->execute($sql);
            if($this->count_num_rows() != 0) {
                $data = mysqli_fetch_array($this->result);
            } else {
                $data = 0;
            }
            return $data;
        }

        public function updateProfile($username, $column, $value) {
            $sql = "UPDATE readers SET $column='$value' WHERE reader_username='$username'";
            return $this->execute($sql);
        }

        public function updatePassword($username, $column, $value) {
            $sql = "UPDATE accounts SET $column='$value' WHERE username='$username'";
            return $this->execute($sql);
        }

        public function getIssueOfReader($username) {
            $sql = "SELECT i.book_id, book_name, issue_date, expired_date, amount, issue_status
                    FROM issue_books i INNER JOIN books b ON i.book_id = b.book_id
                    WHERE reader_username = '$username'";

            $this->execute($sql);
            if($this->count_num_rows() == 0) {
                $data = 0;
            } else {
                while ($datas = $this->getData()) {
                    $data[] = $datas;
                }
            }
            return $data;
        }

        //Dashboard
        public function getInforLast($table, $period, $column) {
            $sql = "";
            if($period == "date") {
                $sql = "SELECT count(*) FROM {$table} WHERE date({$column}) = date(now() - interval 1 day)";
            } elseif($period == "week") {
                $sql = "SELECT count(*) FROM {$table} WHERE yearweek({$column}) = yearweek(now() - interval 1 week)";
            } elseif($period == "month") {
                $sql = "SELECT count(*) FROM {$table} WHERE year({$column}) = year(now() - interval 1 month) AND month({$column}) = month(now() - interval 1 month);";
            }
            $this->execute($sql);
            if($this->count_num_rows() != 0) {
                $data = mysqli_fetch_array($this->result);
            } else {
                $data = 0;
            }
            return $data;
        }
    }
?>