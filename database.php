<?php
try {
    $db = new PDO('sqlite:boards.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $db->exec("CREATE TABLE IF NOT EXISTS boards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )");

    $db->exec("CREATE TABLE IF NOT EXISTS cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        board_id INTEGER NOT NULL,
        card_id TEXT NOT NULL,
        top INTEGER NOT NULL,
        left_pos INTEGER NOT NULL,
        width INTEGER NOT NULL,
        height INTEGER NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        type TEXT NOT NULL,
        is_locked BOOLEAN NOT NULL,
        FOREIGN KEY (board_id) REFERENCES boards(id)
    )");
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>