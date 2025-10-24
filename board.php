<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Board</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>

<div class="container mt-5">
        <div class="row" id="card-container">
           
        </div>
    </div>



    <button class="add-card-btn" id="add-card"><i class="fas fa-plus"></i></button>
    <button class="auto-arrange-btn" id="auto-arrange"><i class="fas fa-layer-group"></i></button>
    <button class="clean-btn" id="clean"><i class="fas fa-broom"></i></button>
	<button class="home-btn" id="back-to-boards" onclick="window.location.href='index.php'"><i class="fas fa-house"></i></button>
    <button class="menu-btn" id="menu-toggle"><i class="fas fa-bars"></i></button>

    <!-- Modals -->
    <div class="modal fade" id="cardSettingsModal" tabindex="-1" aria-labelledby="cardSettingsModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cardSettingsModalLabel">Edit Card Name</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="cardNameInput" class="form-label">Card Name</label>
                        <input type="text" class="form-control" id="cardNameInput">
                    </div>
                    <div class="mb-3">
                        <label for="cardTypeSelect" class="form-label">Select Card Type</label>
                        <select class="form-select" id="cardTypeSelect">
                            <option value="Statistika">Statistika</option>
                            <option value="Zemljevid">Zemljevid</option>
                            <option value="Zapiski">Zapiski</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="saveCardName">Save</button>
                </div>
            </div>
        </div>
    </div>
    <div class="card fixed-card" style="width:auto;">
        <div class="card-body">
            <h5 class="card-title" id="event-title">Naziv dogodka</h5>
            <p id="live-time" class="card-text" style="margin-bottom:-4px;">00:00:00</p>
            <p id="live-date" class="card-text">1. 1. 1970</p>
        </div>
    </div>

    <script>
        const boardId = new URLSearchParams(window.location.search).get('id');
		if (boardId) {
    $.get(`boards_handler.php?id=${boardId}`, function(board) {
        if (board && board.name) {
            $("#event-title").text(board.name);
        }
    });
}

    </script>
    <script src="js/main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
