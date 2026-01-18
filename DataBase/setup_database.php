<?php
$servername = "localhost";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS collage_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
if ($conn->query($sql) === TRUE) {
    echo "<div style='color: green; font-family: sans-serif; padding: 10px; border: 1px solid green; margin: 10px; border-radius: 5px;'>Database 'collage_db' created successfully (or already exists).</div>";
} else {
    echo "<div style='color: red; font-family: sans-serif; padding: 10px; border: 1px solid red; margin: 10px; border-radius: 5px;'>Error creating database: " . $conn->error . "</div>";
}

// Select database
$conn->select_db("collage_db");

// Create users table
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    last_page VARCHAR(255) DEFAULT NULL,
    completed_pages TEXT DEFAULT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";

if ($conn->query($sql) === TRUE) {
    echo "<div style='color: green; font-family: sans-serif; padding: 10px; border: 1px solid green; margin: 10px; border-radius: 5px;'>Table 'users' created successfully (or already exists).</div>";
} else {
    echo "<div style='color: red; font-family: sans-serif; padding: 10px; border: 1px solid red; margin: 10px; border-radius: 5px;'>Error creating table 'users': " . $conn->error . "</div>";
}

$conn->close();

echo "<div style='font-family: sans-serif; margin: 20px;'><a href='../index.php' style='background: #0d9488; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Go to Home Page</a></div>";
?>
