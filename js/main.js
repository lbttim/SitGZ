$(function() {
    function loadCardData(boardId) {
        if (!boardId) return;
        $.get(`cards_handler.php?board_id=${boardId}`, function(cards) {
            $('#card-container').empty();
            cards.forEach(card => {
                let newCard = $(`
                    <div id="${card.card_id}" class="card draggable p-3" style="position:absolute; top:${card.top}px; left:${card.left_pos}px;" data-type="${card.type}">
                        <div class="options-menu">
                            <button class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">⋮</button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item card-settings" href="#">Card Settings</a></li>
                                <li><a class="dropdown-item lock-card" href="#">${card.is_locked ? 'Unlock' : 'Lock'}</a></li>
                                <li><a class="dropdown-item move-top" href="#">Move on top</a></li>
                                <li><a class="dropdown-item move-bottom" href="#">Move to bottom</a></li>
                                <li><a class="dropdown-item delete-card" href="#">Delete card</a></li>
                            </ul>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${card.title}</h5>
                            <p class="card-text">${card.content}</p>
                        </div>
                    </div>
                `);
                $('#card-container').append(newCard);
                newCard.css({ width: card.width + "px", height: card.height + "px" });
                if (card.is_locked) {
                    newCard.addClass("locked");
                } else {
                    newCard.draggable({ containment: "window", stop: saveCardData }).resizable({ minWidth: 180, minHeight: 150, handles: "n, e, s, w, ne, se, sw, nw", stop: saveCardData });
                }
            });
        });
    }

    function saveCardData() {
        if (!boardId) return;
        let cardData = [];
        $(".draggable").each(function() {
            let position = $(this).position();
            cardData.push({
                card_id: $(this).attr("id"),
                top: position.top,
                left_pos: position.left,
                width: $(this).outerWidth(),
                height: $(this).outerHeight(),
                title: $(this).find(".card-title").text(),
                content: $(this).find(".card-text").text(),
                type: $(this).attr("data-type") || "Statistika",
                is_locked: $(this).hasClass("locked")
            });
        });

        $.ajax({
            url: `cards_handler.php?board_id=${boardId}`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(cardData)
        });
    }

    $("#add-card").click(function() {
        if (!boardId) {
            alert("Please select a board first.");
            return;
        }
        let cardId = "card" + Date.now();
        let newCard = $(`
            <div id="${cardId}" class="card draggable p-3" style="width: 18rem; height: auto; top:50px; left:50px; position:absolute;" data-type="Statistika">
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
                    <h5 class="card-title">New Card</h5>
                    <p class="card-text">This is a new card.</p>
                </div>
            </div>
        `);
        $("#card-container").append(newCard);
        newCard.draggable({ containment: "window", stop: saveCardData }).resizable({ minWidth: 180, minHeight: 150, handles: "n, e, s, w, ne, se, sw, nw", stop: saveCardData });
        saveCardData();
    });

    $(document).on("click", ".delete-card", function() {
        $(this).closest(".card").remove();
        saveCardData();
    });
	$('#menu-toggle').click(function() {
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$(this).html('<i class="fas fa-arrow-left"></i>');
			$('#add-card, #auto-arrange, #clean').fadeIn();
		} else {
			$(this).html('<i class="fas fa-bars"></i>');
			$('#add-card, #auto-arrange, #clean').fadeOut();
		}
	});
	function toggleLock(card) {
		const isLocked = card.hasClass("locked");

		if (isLocked) {
			card.removeClass("locked");
			card.find(".lock-card").text("Lock");
			card.draggable({ containment: "window", stop: saveCardData })
				.resizable({ minWidth: 180, minHeight: 150, handles: "n, e, s, w, ne, se, sw, nw", stop: saveCardData });
		} else {
			card.addClass("locked");
			card.find(".lock-card").text("Unlock");
			card.draggable("destroy").resizable("destroy");
		}
		saveCardData();
	}

	$(document).on("click", ".lock-card", function() {
		const card = $(this).closest(".card");
		toggleLock(card);
	});
	$("#clean").click(function() {
		$("#card-container").empty();
		saveCardData();
	});
	$(document).on("click", ".move-top", function() {
		let card = $(this).closest(".card");
		card.appendTo("#card-container");
		saveCardData();
	});
	$(document).on("click", ".move-bottom", function() {
		let card = $(this).closest(".card");
		card.prependTo("#card-container");
		saveCardData();
	});
	$("#auto-arrange").click(function() {
		let margin = 10;
		let container = $("#card-container");
		let containerWidth = container.width();
		let containerHeight = $(window).height();
		let cards = container.find(".card").toArray();

		let cardWidth = cards[0]?.offsetWidth + margin;
		let numCols = Math.floor(containerWidth / cardWidth);

		if (numCols < 1) numCols = 1;

		let colWidth = containerWidth / numCols;
		let columns = Array.from({ length: numCols }, () => ({ x: 0, y: margin }));

		let remainingCards = [];

		cards.forEach((card, index) => {
			let $card = $(card);
			let cardHeight = $card.outerHeight();

			let colIndex = index % numCols;
			let col = columns[colIndex];

			if (col.y + cardHeight > containerHeight) {
				remainingCards.push($card);
				return;
			}

			$card.css({
				"width": colWidth - margin + "px",
				"top": col.y + "px",
				"left": colIndex * colWidth + "px",
				"position": "absolute"
			});

			col.y += cardHeight + margin;
		});

		if (remainingCards.length > 0) {
			let centerX = (containerWidth - remainingCards[0].outerWidth()) / 2;
			let centerY = (containerHeight - remainingCards.length * (remainingCards[0].outerHeight() + margin)) / 2;

			remainingCards.forEach((card, index) => {
				$(card).css({
					"top": (centerY + index * (card.outerHeight() + margin)) + "px",
					"left": centerX + "px",
					"position": "absolute"
				});
			});
		}
		saveCardData();
	});
	function updateTimeAndDate() {
		let now = new Date();
		let time = now.toLocaleTimeString();
		let date = now.toLocaleDateString();

		$("#live-time").text(time);
		$("#live-date").text(date);
	}
	setInterval(updateTimeAndDate, 1000);
	$(document).on("click", ".card-settings", function() {
		let card = $(this).closest(".card");
		let cardTitle = card.find(".card-title").text();
		let cardText = card.find(".card-text").text();
		let cardType = card.attr("data-type") || "Statistika";

		$("#cardNameInput").val(cardTitle);
		$("#cardTypeSelect").val(cardType);

		$("#saveCardName").off().on("click", function() {
			let newCardName = $("#cardNameInput").val();
			let selectedCardType = $("#cardTypeSelect").val();

			card.find(".card-title").text(newCardName);
			card.attr("data-type", selectedCardType);
			saveCardData();
			$("#cardSettingsModal").modal("hide");
		});

		$("#cardSettingsModal").modal("show");
	});

    loadCardData(boardId);
});
