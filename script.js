// ================================
// ANIME ART GARDEN - JAVASCRIPT
// ================================

// Current selected category
let currentCategory = "All";

// -------------------------------
// CATEGORY FILTER
// -------------------------------

const categoryButtons = document.querySelectorAll(".category");
const artCards = document.querySelectorAll(".art-card");

categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active from all buttons
        categoryButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Add active to clicked button
        button.classList.add("active");

        const selectedCategory = button.textContent.trim();
        currentCategory = selectedCategory;

        filterArtworks(selectedCategory);
    });

});


// -------------------------------
// FILTER FUNCTION
// -------------------------------

function filterArtworks(category) {

    let visibleCards = 0;

    artCards.forEach((card) => {

        const text = card.textContent.toLowerCase();

        // All button
        if (category === "All") {

            card.style.display = "";

            visibleCards++;
            return;
        }

        // Check category name inside card
        if (text.includes(category.toLowerCase())) {

            card.style.display = "";
            visibleCards++;

        } else {

            card.style.display = "none";
        }

    });

    showNoResults(visibleCards);
}


// -------------------------------
// NO RESULTS MESSAGE
// -------------------------------

function showNoResults(count) {

    let message = document.getElementById("noResults");

    // Create message automatically if it doesn't exist
    if (!message) {

        message = document.createElement("div");

        message.id = "noResults";

        message.innerHTML = `
            <div style="
                text-align:center;
                padding:50px 20px;
                color:#8b778f;
            ">
                <div style="font-size:45px;">🌸</div>
                <h3 style="
                    margin:10px 0;
                    font-family:serif;
                ">
                    No little artwork found
                </h3>
                <p>
                    Try another category ✨
                </p>
            </div>
        `;

        const grid = document.querySelector(".art-grid");

        if (grid) {
            grid.parentNode.insertBefore(message, grid.nextSibling);
        }
    }

    message.style.display = count === 0 ? "block" : "none";
}


// -------------------------------
// ARTWORK CLICK
// -------------------------------

artCards.forEach((card) => {

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {

        const titleElement = card.querySelector("h3");
        const descriptionElement = card.querySelector("p");
        const imageElement = card.querySelector(".art-image");

        const title = titleElement
            ? titleElement.textContent
            : "Anime Artwork";

        const description = descriptionElement
            ? descriptionElement.textContent
            : "A little piece of imagination.";

        const artwork = imageElement
            ? imageElement.innerHTML
            : "🌸";

        openArtwork(title, description, artwork);

    });

});


// -------------------------------
// ARTWORK MODAL
// -------------------------------

function openArtwork(title, description, artwork) {

    let modal = document.getElementById("artModal");

    // Create modal automatically
    if (!modal) {

        modal = document.createElement("div");

        modal.id = "artModal";

        modal.innerHTML = `
            <div id="modalOverlay"></div>

            <div class="art-modal-box">

                <button id="modalClose" aria-label="Close">
                    ×
                </button>

                <div class="modal-artwork" id="modalArt"></div>

                <div class="modal-content">

                    <span class="modal-tag">
                        ✦ ANIME ART ✦
                    </span>

                    <h2 id="modalTitle"></h2>

                    <p id="modalDescription"></p>

                    <button id="modalLike" class="modal-like">
                        ♡ Like
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(modal);

        addModalEvents();
    }

    document.getElementById("modalArt").innerHTML = artwork;
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";
}


// -------------------------------
// MODAL EVENTS
// -------------------------------

function addModalEvents() {

    const modal = document.getElementById("artModal");
    const closeButton = document.getElementById("modalClose");
    const overlay = document.getElementById("modalOverlay");
    const likeButton = document.getElementById("modalLike");

    closeButton.addEventListener("click", closeModal);

    overlay.addEventListener("click", closeModal);

    likeButton.addEventListener("click", () => {

        if (likeButton.classList.contains("liked")) {

            likeButton.classList.remove("liked");
            likeButton.innerHTML = "♡ Like";

        } else {

            likeButton.classList.add("liked");
            likeButton.innerHTML = "♥ Liked";

        }

    });

}


// -------------------------------
// CLOSE MODAL
// -------------------------------

function closeModal() {

    const modal = document.getElementById("artModal");

    if (modal) {
        modal.classList.remove("show");
    }

    document.body.style.overflow = "";
}


// ESC KEY CLOSE
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeModal();
    }

});


// -------------------------------
// SEARCH
// -------------------------------

function createSearch() {

    // If search already exists, don't create another
    if (document.getElementById("searchInput")) {
        return;
    }

    const gallery = document.querySelector(".gallery-section");

    if (!gallery) return;

    const categories = document.querySelector(".categories");

    const searchBox = document.createElement("div");

    searchBox.className = "search-box";

    searchBox.innerHTML = `
        <input
            type="text"
            id="searchInput"
            placeholder="Search artwork..."
            autocomplete="off"
        >

        <button id="clearSearch" type="button">
            ×
        </button>
    `;

    if (categories) {
        categories.parentNode.insertBefore(searchBox, categories);
    } else {
        gallery.prepend(searchBox);
    }

    const input = document.getElementById("searchInput");
    const clearButton = document.getElementById("clearSearch");

    // Typing search
    input.addEventListener("input", performSearch);

    // ENTER search
    input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            event.preventDefault();

            performSearch();

            // Small visual feedback
            input.blur();
        }

    });

    // Clear
    clearButton.addEventListener("click", () => {

        input.value = "";

        filterArtworks(currentCategory);

        input.focus();

    });

}


// -------------------------------
// SEARCH FUNCTION
// -------------------------------

function performSearch() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    const searchText = input.value.trim().toLowerCase();

    let visibleCards = 0;

    artCards.forEach((card) => {

        const cardText = card.textContent.toLowerCase();

        const matchesSearch =
            searchText === "" ||
            cardText.includes(searchText);

        const matchesCategory =
            currentCategory === "All" ||
            cardText.includes(currentCategory.toLowerCase());

        if (matchesSearch && matchesCategory) {

            card.style.display = "";
            visibleCards++;

        } else {

            card.style.display = "none";
        }

    });

    showNoResults(visibleCards);
}


// -------------------------------
// RANDOM ART
// -------------------------------

function createRandomButton() {

    if (document.getElementById("randomArtBtn")) {
        return;
    }

    const gallery = document.querySelector(".gallery-section");

    if (!gallery) return;

    const button = document.createElement("button");

    button.id = "randomArtBtn";

    button.className = "random-art-btn";

    button.innerHTML = "🎲 Surprise Me";

    const heading = gallery.querySelector(".section-heading");

    if (heading) {
        heading.appendChild(button);
    }

    button.addEventListener("click", randomArtwork);

}


// -------------------------------
// RANDOM ART FUNCTION
// -------------------------------

function randomArtwork() {

    const visibleCards = Array.from(artCards).filter((card) => {

        return card.style.display !== "none";

    });

    if (visibleCards.length === 0) {
        return;
    }

    const randomIndex =
        Math.floor(Math.random() * visibleCards.length);

    const card = visibleCards[randomIndex];

    card.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    setTimeout(() => {

        card.style.transform = "translateY(-12px) scale(1.03)";

        setTimeout(() => {

            card.style.transform = "";

            card.click();

        }, 500);

    }, 700);

}


// -------------------------------
// ADD BUTTONS
// -------------------------------

createSearch();
createRandomButton();


// -------------------------------
// INITIAL FILTER
// -------------------------------

filterArtworks("All");


// -------------------------------
// SMOOTH NAVIGATION
// -------------------------------

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// -------------------------------
// CONSOLE MESSAGE
// -------------------------------

console.log(
    "🌸 Anime Art Garden is ready!"
);
