$(function() {
    let currentBoardId = null;

    function loadBoards() {
        $.get('boards_handler.php', function(boards) {
            $('#board-list').empty();
            boards.forEach(board => {
                $('#board-list').append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <a href="board.php?id=${board.id}">${board.name}</a>
                        <div>
                            <button class="btn btn-warning btn-sm rename-board" data-id="${board.id}" data-name="${board.name}">Rename</button>
                            <button class="btn btn-danger btn-sm delete-board" data-id="${board.id}">Delete</button>
                        </div>
                    </li>
                `);
            });
        });
    }

    $('#create-board').click(function() {
        $('#createBoardModal').modal('show');
    });

    $('#save-new-board').click(function() {
        let boardName = $('#new-board-name').val();
        if (boardName) {
            $.ajax({
                url: 'boards_handler.php',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ name: boardName }),
                success: function() {
                    loadBoards();
                    $('#createBoardModal').modal('hide');
                    $('#new-board-name').val('');
                }
            });
        }
    });

    $(document).on('click', '.rename-board', function() {
        currentBoardId = $(this).data('id');
        let currentName = $(this).data('name');
        $('#rename-board-name').val(currentName);
        $('#renameBoardModal').modal('show');
    });

    $('#save-rename-board').click(function() {
        let newBoardName = $('#rename-board-name').val();
        if (newBoardName) {
            $.ajax({
                url: 'boards_handler.php',
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ id: currentBoardId, name: newBoardName }),
                success: function() {
                    loadBoards();
                    $('#renameBoardModal').modal('hide');
                }
            });
        }
    });

    $(document).on('click', '.delete-board', function() {
        currentBoardId = $(this).data('id');
        if (confirm("Are you sure you want to delete this board and all its cards?")) {
            $.ajax({
                url: 'boards_handler.php',
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ id: currentBoardId }),
                success: function() {
                    loadBoards();
                }
            });
        }
    });

    loadBoards();
});
