<?php
// FILE: db.php
// Database Connection Configuration

$host = "localhost";
$user = "root";  // Default MySQL username
$pass = "";      // Default MySQL password (blank)
$db = "fyf_db";  // **Must match the database name you created**

$conn = mysqli_connect($host, $user, $pass, $db);

if(!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}
?>