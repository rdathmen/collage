<?php
include "db_conn.php";

echo "Checking database columns...<br>";

// 1. Add last_page column
$check = $conn->query("SHOW COLUMNS FROM users LIKE 'last_page'");
if ($check->num_rows == 0) {
    $sql = "ALTER TABLE users ADD last_page VARCHAR(255) DEFAULT NULL";
    if ($conn->query($sql) === TRUE) {
        echo "✅ Added 'last_page' column.<br>";
    } else {
        echo "❌ Error adding 'last_page': " . $conn->error . "<br>";
    }
} else {
     echo "ℹ️ 'last_page' column already exists.<br>";
}

// 2. Add completed_pages column
$check = $conn->query("SHOW COLUMNS FROM users LIKE 'completed_pages'");
if ($check->num_rows == 0) {
    $sql = "ALTER TABLE users ADD completed_pages TEXT DEFAULT NULL";
    if ($conn->query($sql) === TRUE) {
        echo "✅ Added 'completed_pages' column.<br>";
    } else {
        echo "❌ Error adding 'completed_pages': " . $conn->error . "<br>";
    }
} else {
     echo "ℹ️ 'completed_pages' column already exists.<br>";
}

echo "Done.";
?>
