<?php
include 'database.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        $stmt = $db->prepare("SELECT * FROM boards WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $board = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($board);
    } else {
        $stmt = $db->query("SELECT * FROM boards");
        $boards = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($boards);
    }
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $db->prepare("INSERT INTO boards (name) VALUES (?)");
    $stmt->execute([$data['name']]);
    $data['id'] = $db->lastInsertId();
    echo json_encode($data);
}

if ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $db->prepare("UPDATE boards SET name = ? WHERE id = ?");
    $stmt->execute([$data['name'], $data['id']]);
    echo json_encode($data);
}

if ($method === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $db->prepare("DELETE FROM boards WHERE id = ?");
    $stmt->execute([$data['id']]);
    echo json_encode(['message' => 'Board deleted successfully']);
}
?>