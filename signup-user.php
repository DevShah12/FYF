<?php
// FILE: signup-user.php
session_start();
require_once "db.php"; 

$error_message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get and sanitize input
    $name = trim($_POST['name']);
    $phone = trim($_POST['phone']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm-password'];

    // Basic Server-Side Validation
    if ($password !== $confirm_password) {
        $error_message = "Passwords do not match!";
    } elseif (strlen($password) < 8) {
        $error_message = "Password must be at least 8 characters.";
    }

    // Check if email already exists using Prepared Statement (Security Fix)
    if (empty($error_message)) {
        $sql_check = "SELECT user_id FROM users WHERE email = ?";
        if ($stmt_check = mysqli_prepare($conn, $sql_check)) {
            mysqli_stmt_bind_param($stmt_check, "s", $param_email);
            $param_email = $email;
            if (mysqli_stmt_execute($stmt_check)) {
                mysqli_stmt_store_result($stmt_check);
                if (mysqli_stmt_num_rows($stmt_check) > 0) {
                    $error_message = "This email address is already registered.";
                }
            }
            mysqli_stmt_close($stmt_check);
        }
    }

    // If no errors, proceed with secure insertion
    if (empty($error_message)) {
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        
        $sql_insert = "INSERT INTO users (name, phone, email, password_hash) VALUES (?, ?, ?, ?)";
        
        if ($stmt_insert = mysqli_prepare($conn, $sql_insert)) {
            mysqli_stmt_bind_param($stmt_insert, "ssss", $name, $phone, $email, $password_hash);
            
            if (mysqli_stmt_execute($stmt_insert)) {
                header("Location: index.html?status=signup_success");
                exit();
            } else {
                $error_message = "Error: Could not register user. " . mysqli_error($conn);
            }
            mysqli_stmt_close($stmt_insert);
        }
    }
    
    if (!empty($error_message)) {
        // Simple error output for now, redirect back to the form
        echo $error_message . " <a href='login-signup.php'>Go back to Signup</a>"; 
    }
}
mysqli_close($conn);
?>