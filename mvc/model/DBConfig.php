<?php
    class Database {
        private $hostname = 'localhost';
        private $username = 'root';
        private $pass = '';
        private $dbname = 'nlcs';

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
            $sql = "INSERT INTO readers(reader_username, reader_fullname, reader_gender, reader_email, reader_address, reader_phonenumber)
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

        // ------------ Books ------------
        //Add book's data
        public function insertBook($name, $author, $publisher, $category, $total_amount) {
            $sql = "INSERT INTO books(book_name, book_author, book_publisher, book_category, book_total_amount, book_remaining_amount)
             VALUE('$name', '$author', '$publisher', '$category', '$total_amount', '$total_amount')";
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

        // ------------ Issue Books ------------
        //Add issue book's data
        public function insertIssueBook($reader_username, $book_id, $issue_date, $expired_date, $amount, $status='borrowing') {
            $sql = "INSERT INTO issue_books(reader_username, book_id, issue_date, expired_date, amount, status)
             VALUE('$reader_username', '$book_id', '$issue_date', '$expired_date', '$amount', '$status')";
            return $this->execute($sql);
        }
        
        //Update issue book's data
        // public function updateIssueBook($reader_username, $book_id, $issue_date, $expired_date, $amount, $status) {
        //     $sql = "UPDATE issue_books SET book_name='$name', book_author='$author',
        //             book_publisher='$publisher', book_category='$category', book_total_amount=book_total_amount+$amount_added,
        //             book_remaining_amount=book_remaining_amount+$amount_added
        //             WHERE book_id='$id'";
        //     return $this->execute($sql);
        // }

        //Delete issue book
        public function deleteIssueBookByBookId($id) {
            $sql = "DELETE FROM issue_books WHERE book_id = $id";
            return $this->execute($sql);
        }

        public function deleteIssueBookByUsername($username) {
            $sql = "DELETE FROM issue_books WHERE reader_username = '$username'";
            return $this->execute($sql);
        }

        // ------------ Accounts ------------
        public function insertAccount($username, $password, $role="reader") {
            $sql = "INSERT INTO accounts VALUES('$username', '$password', '$role')";
            return $this->execute($sql);
        }

        public function getAccount() {
            $sql = 'SELECT * FROM accounts';
            return $this->execute($sql);
        }

        public function deleteAccount($username) {
            $sql = "DELETE FROM accounts WHERE username = '$username'";
            return $this->execute($sql);
        }
    }

?>