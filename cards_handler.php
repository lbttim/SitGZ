<?php
include 'database.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $board_id = $_GET['board_id'];
    $stmt = $db->prepare("SELECT * FROM cards WHERE board_id = ?");
    $stmt->execute([$board_id]);
    $cards = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($cards);
}

if ($method === 'POST') {
    $board_id = $_GET['board_id'];
    $cards = json_decode(file_get_contents('php://input'), true);

    $db->prepare("DELETE FROM cards WHERE board_id = ?")->execute([$board_id]);

    $stmt = $db->prepare("INSERT INTO cards (board_id, card_id, top, left_pos, width, height, title, content, type, is_locked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    foreach ($cards as $card) {
        $stmt->execute([
            $board_id,
            $card['card_id'],
            $card['top'],
            $card['left_pos'],
            $card['width'],
            $card['height'],
            $card['title'],
            $card['content'],
            $card['type'],
            $card['is_locked']
        ]);
    }
    echo json_encode(['message' => 'Cards saved successfully']);
}
?>