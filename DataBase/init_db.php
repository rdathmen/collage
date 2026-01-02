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
$sql = "CREATE DATABASE IF NOT EXISTS collage_db";
if ($conn->query($sql) === TRUE) {
    echo "Database 'collage_db' created successfully (or already exists).<br>";
} else {
    echo "Error creating database: " . $conn->error . "<br>";
}

// Select database
$conn->select_db("collage_db");

// Create table
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Table 'users' created successfully (or already exists).<br>";
} else {
    echo "Error creating table: " . $conn->error . "<br>";
}

$conn->close();

echo "<hr>";
echo "<h3>تم إعداد قاعدة البيانات بنجاح!</h3>";
echo "<a href='../index.php'>الذهاب إلى الصفحة الرئيسية</a>";
?>
