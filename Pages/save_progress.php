<?php
session_start();
include "../DataBase/db_conn.php";

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit();
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['current_page'])) {
    $current_page = mysqli_real_escape_string($conn, $data['current_page']); // Use clean input
    
    // Get current progress
    $sql = "SELECT completed_pages FROM users WHERE id='$user_id'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    
    $completed_pages = [];
    if (!empty($row['completed_pages'])) {
        $completed_pages = json_decode($row['completed_pages'], true);
        if (!is_array($completed_pages)) { // Handle legacy or corrupted data
             $completed_pages = [];
        }
    }
    
    // Add current page if not exists
    if (!in_array($current_page, $completed_pages)) {
        $completed_pages[] = $current_page;
    }
    
    $completed_json = json_encode($completed_pages);
    
    // Update DB
    $update_sql = "UPDATE users SET last_page='$current_page', completed_pages='$completed_json' WHERE id='$user_id'";
    if (mysqli_query($conn, $update_sql)) {
        echo json_encode(['status' => 'success', 'progress' => count($completed_pages)]);
    } else {
        echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No page data provided']);
}
?>
