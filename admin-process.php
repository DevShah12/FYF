<?php
// FILE: admin-process.php
session_start();
require_once "db.php";

$error_message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    // Use Prepared Statement (Security Fix)
    $sql = "SELECT admin_id, password_hash FROM admins WHERE email = ?";
    
    if ($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $param_email);
        $param_email = $email;
        
        if (mysqli_stmt_execute($stmt)) {
            mysqli_stmt_store_result($stmt);
            
            if (mysqli_stmt_num_rows($stmt) == 1) {
                mysqli_stmt_bind_result($stmt, $admin_id, $hashed_password);
                
                if (mysqli_stmt_fetch($stmt)) {
                    if (password_verify($password, $hashed_password)) {
                        // Success: Set admin session and redirect
                        $_SESSION['admin_loggedin'] = true;
                        $_SESSION['admin_id'] = $admin_id;
                        
                        header("Location: admin-dashboard.html");
                        exit();
                    } else {
                        $error_message = "Incorrect password!";
                    }
                }
            } else {
                $error_message = "No admin found with that email address!";
            }
        }
        mysqli_stmt_close($stmt);
    }
    
    if (!empty($error_message)) {
        echo $error_message . " <a href='admin-login.php'>Go back to Admin Login</a>";
    }
}
mysqli_close($conn);
?>