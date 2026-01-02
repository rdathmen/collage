<?php
include "../DataBase/db_conn.php";

$replacements = [
    'الألدهيدات_والكيتونات.html' => 'aldehydes_and_ketones.html',
    'الألكاينات.html' => 'alkynes.html',
    'الألكينات.html' => 'alkenes.html',
    'الأمينات.html' => 'amines.html',
    'الالكانات.html' => 'alkanes.html',
    'الايثرات.html' => 'ethers.html',
    'الكحولات.html' => 'alcohols.html',
    'النترو_مركبات.html' => 'nitro_compounds.html',
    'من_نحن.html' => 'about_us.html',
    'هاليدات_الاكيل.html' => 'alkyl_halides.html'
];

// 1. Update last_page column
foreach ($replacements as $arabic => $english) {
    $sql = "UPDATE users SET last_page = '$english' WHERE last_page = '$arabic'";
    if ($conn->query($sql) === TRUE) {
        $affected = $conn->affected_rows;
        if ($affected > 0) echo "Updated $affected rows for last_page: $arabic -> $english\n";
    } else {
        echo "Error updating last_page: " . $conn->error . "\n";
    }
}

// 2. Update completed_pages column (JSON array)
// We need to fetch all users, decode JSON, replace, encode, and update.
// A simple string replace on the column might be risky but since these strings are unique enough, maybe safe?
// Safer to fetch and update.

$sql = "SELECT id, completed_pages FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $id = $row['id'];
        $pages = json_decode($row['completed_pages'], true);
        
        if (is_array($pages)) {
            $updatedResult = false;
            foreach ($pages as $key => $page) {
                if (isset($replacements[$page])) {
                    $pages[$key] = $replacements[$page];
                    $updatedResult = true;
                }
            }
            
            if ($updatedResult) {
                $newJson = json_encode($pages, JSON_UNESCAPED_UNICODE);
                $updateSql = "UPDATE users SET completed_pages = '$newJson' WHERE id = $id";
                if ($conn->query($updateSql) === TRUE) {
                    echo "Updated completed_pages for user $id\n";
                } else {
                    echo "Error updating user $id: " . $conn->error . "\n";
                }
            }
        }
    }
} else {
    echo "No users found.\n";
}

$conn->close();
echo "Database update finished.\n";
?>
