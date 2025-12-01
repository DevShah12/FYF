<?php
// FILE: login-user.php
session_start();
require_once "db.php";

$error_message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    // Use Prepared Statement (Security Fix)
    $sql = "SELECT user_id, password_hash, role FROM users WHERE email = ?";
    
    if ($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $param_email);
        $param_email = $email;
        
        if (mysqli_stmt_execute($stmt)) {
            mysqli_stmt_store_result($stmt);
            
            if (mysqli_stmt_num_rows($stmt) == 1) {
                mysqli_stmt_bind_result($stmt, $user_id, $hashed_password, $role);
                
                if (mysqli_stmt_fetch($stmt)) {
                    if (password_verify($password, $hashed_password)) {
                        // Success: Set session variables
                        $_SESSION['loggedin'] = true;
                        $_SESSION['user_id'] = $user_id;
                        $_SESSION['role'] = $role;

                        if ($role == 'admin') {
                            header("Location: admin-dashboard.html"); 
                        } else {
                            header("Location: index.html");
                        }
                        exit();
                    } else {
                        $error_message = "Incorrect password!";
                    }
                }
            } else {
                $error_message = "No user found with that email address!";
            }
        }
        mysqli_stmt_close($stmt);
    }
    
    if (!empty($error_message)) {
        echo $error_message . " <a href='login-signup.php'>Go back to Login</a>";
    }
}
mysqli_close($conn);
?>