<?php 
// Basic PHP page for rendering the draggable and resizable cards
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Draggable & Resizable Cards</title>
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
            <!-- Initial Single Card -->
            <div id="card1" class="card draggable p-3" style="width: 18rem; top:50px; left:50px;">
                <div class="options-menu">
                    <button class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">⋮</button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item card-settings" href="#">Card Settings</a></li>
						<li><a class="dropdown-item lock-card" href="#">Lock</a></li>
                        <li><a class="dropdown-item move-top" href="#">Move on top</a></li>
                        <li><a class="dropdown-item move-bottom" href="#">Move to bottom</a></li>
                        <li><a class="dropdown-item delete-card" href="#">Delete card</a></li>
                    </ul>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Card 1</h5>
                    <p class="card-text">This is a draggable and resizable card.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Card Button -->
    <button class="add-card-btn" id="add-card"><i class="fas fa-plus"></i></button>
	<button class="auto-arrange-btn" id="auto-arrange"><i class="fas fa-layer-group"></i></button>
	<button class="clean-btn" id="clean"><i class="fas fa-broom"></i></button>
    <button class="menu-btn" id="menu-toggle"><i class="fas fa-bars"></i></button>


    <!-- Modal for Card Settings -->
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

    <!-- Modal for Editing Event Title -->
    <div class="modal fade" id="editEventModal" tabindex="-1" aria-labelledby="editEventModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editEventModalLabel">Edit Event Title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="eventTitleInput" class="form-label">Event Title</label>
                        <input type="text" class="form-control" id="eventTitleInput">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="saveEventTitle">Save</button>
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


       

    <!-- Bootstrap JS for Modal functionality -->
	<script src="js/main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
