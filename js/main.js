$(function() {
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
    function saveCardData() {
        let cardData = [];
        $(".draggable").each(function() {
            let id = $(this).attr("id");
            let position = $(this).position();
            let width = $(this).outerWidth();
            let height = $(this).outerHeight();
            let title = $(this).find(".card-title").text();
            let text = $(this).find(".card-text").text();
            let type = $(this).attr("data-type") || "Statistika";
            let isLocked = $(this).hasClass("locked");  // Save the lock status

            cardData.push({
                id: id,
                top: position.top,
                left: position.left,
                width: width,
                height: height,
                title: title,
                text: text,
                type: type,
                isLocked: isLocked  // Include the lock status in saved data
            });
        });
        localStorage.setItem("cards", JSON.stringify(cardData));
    }

    function loadCardData() {
        let storedData = localStorage.getItem("cards");
        if (storedData) {
            let cardData = JSON.parse(storedData);
            $("#card-container").empty(); 

            cardData.forEach(card => {
                let newCard = $(`
                    <div id="${card.id}" class="card draggable p-3" style="position:absolute; top:${card.top}px; left:${card.left}px;" data-type="${card.type}">
                        <div class="options-menu">
                            <button class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">⋮</button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item card-settings" href="#">Card Settings</a></li>
								<li><a class="dropdown-item lock-card" href="#">${card.isLocked ? 'Unlock' : 'Lock'}</a></li> <!-- Lock/Unlock option -->
                                <li><a class="dropdown-item move-top" href="#">Move on top</a></li>
                                <li><a class="dropdown-item move-bottom" href="#">Move to bottom</a></li>
                                <li><a class="dropdown-item delete-card" href="#">Delete card</a></li>
                                
                            </ul>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${card.title}</h5>
                            <p class="card-text">${card.text}</p>
                        </div>
                    </div>
                `);
                $("#card-container").append(newCard);

                newCard.css({ width: card.width + "px", height: card.height + "px" });

                // If locked, don't make it draggable/resizable
                if (card.isLocked) {
                    newCard.addClass("locked");
                } else {
                    newCard.draggable({ containment: "window", stop: saveCardData })
                        .resizable({ minWidth: 180, minHeight: 150, handles: "n, e, s, w, ne, se, sw, nw", stop: saveCardData });
                }
            });
        }
    }
	
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

    // Lock/Unlock Card Action
    $(document).on("click", ".lock-card", function() {
        const card = $(this).closest(".card");
        toggleLock(card);
    });

    // Apply draggable & resizable to existing cards
    $(".draggable").draggable({
        containment: "window",
        stop: saveCardData
    }).resizable({
        minWidth: 180,
        minHeight: 150,
		handles: "n, e, s, w, ne, se, sw, nw",
        stop: saveCardData
    });

    let cardCount = 1;
	
	$("#clean").click(function() {
    $("#card-container").empty(); // Remove all cards
	});


    // Add new cards dynamically and save them
    $("#add-card").click(function() {
        cardCount++;
        let newCard = $(`
            <div id="card${cardCount}" class="card draggable p-3" style="width: 18rem; height: auto; top:50px; left:50px; position:absolute;" data-type="Statistika">
                <div class="options-menu">
                    <button class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">⋮</button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item card-settings" href="#">Card Settings</a></li>
						<li><a class="dropdown-item lock-card" href="#">Lock</a></li> <!-- Lock/Unlock option -->
                        <li><a class="dropdown-item move-top" href="#">Move on top</a></li>
                        <li><a class="dropdown-item move-bottom" href="#">Move to bottom</a></li>
                        <li><a class="dropdown-item delete-card" href="#">Delete card</a></li>
                    </ul>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Card ${cardCount}</h5>
                    <p class="card-text">This is a new draggable and resizable card.</p>
                </div>
            </div>
        `);
        $("#card-container").append(newCard);
        newCard.draggable({ containment: "window", stop: saveCardData })
               .resizable({ minWidth: 180, minHeight: 150, handles: "n, e, s, w, ne, se, sw, nw", stop: saveCardData });
        saveCardData();
    });
	
            // Move Card to Top
            $(document).on("click", ".move-top", function() {
                let card = $(this).closest(".card");
                card.appendTo("#card-container");
				saveCardData();
            });

            // Move Card to Bottom
            $(document).on("click", ".move-bottom", function() {
                let card = $(this).closest(".card");
                card.prependTo("#card-container");
				saveCardData();
            });

    // Delete card and update localStorage
    $(document).on("click", ".delete-card", function() {
        $(this).closest(".card").remove();
        saveCardData();
    });
	
	let savedEventTitle = localStorage.getItem("eventTitle");

    // If a saved event title exists, use it as the document title
    if (savedEventTitle) {
        document.title = savedEventTitle;
        $("#event-title").text(savedEventTitle); // Set the event title in the UI
    } else {
        // Use the default value if no saved event title exists
        document.title = "Nov dogodek";
        $("#event-title").text("Nov dogodek");
    }

    $(document).on("click", "#event-title", function() {
        let eventTitle = $(this).text(); // Get the current event title
        $("#eventTitleInput").val(eventTitle); // Set the value in the input field

        // Save changes on modal save
        $("#saveEventTitle").off().on("click", function() {
            let newEventTitle = $("#eventTitleInput").val();
            $("#event-title").text(newEventTitle); // Update the event title
            document.title = newEventTitle; // Update the document title

            // Save the new event title to localStorage
            localStorage.setItem("eventTitle", newEventTitle);

            $("#editEventModal").modal("hide");
        });

        $("#editEventModal").modal("show");
    });
$("#auto-arrange").click(function() {
    let margin = 10; // Space between cards
    let container = $("#card-container");
    let containerWidth = container.width();
    let containerHeight = $(window).height(); // Full screen height
    let cards = container.find(".card").toArray();
    
    let cardWidth = cards[0]?.offsetWidth + margin; // Get card width
    let numCols = Math.floor(containerWidth / cardWidth); // Max fit columns

    if (numCols < 1) numCols = 1; // Ensure at least 1 column

    let colWidth = containerWidth / numCols; // Force full width
    let columns = Array.from({ length: numCols }, () => ({ x: 0, y: margin }));

    let remainingCards = [];

    cards.forEach((card, index) => {
        let $card = $(card);
        let cardHeight = $card.outerHeight();

        let colIndex = index % numCols; // Fill columns evenly
        let col = columns[colIndex];

        // If a column exceeds screen height, stop arranging & center remaining
        if (col.y + cardHeight > containerHeight) {
            remainingCards.push($card);
            return;
        }

        // Position card
        $card.css({
            "width": colWidth - margin + "px", // Ensure full column usage
            "top": col.y + "px",
            "left": colIndex * colWidth + "px",
            "position": "absolute"
        });

        // Move down in the column
        col.y += cardHeight + margin;
    });

    // Center remaining cards if screen is full
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
});




	
	function updateTimeAndDate() {
                let now = new Date();
                let time = now.toLocaleTimeString();
                let date = now.toLocaleDateString();

                $("#live-time").text(time);
                $("#live-date").text(date);
            }

            // Update time and date every second
            setInterval(updateTimeAndDate, 1000);

    // Open Modal for Card Settings
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

    // Load saved cards when the page loads
    loadCardData();
});