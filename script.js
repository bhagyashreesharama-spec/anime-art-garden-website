/* =========================================================
   ANIME ART GARDEN
   Complete JavaScript
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const categoryButtons = document.querySelectorAll(".category");
const artCards = document.querySelectorAll(".art-card");

const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

const randomArtBtn = document.getElementById("randomArtBtn");
const randomHeroBtn = document.getElementById("randomHeroBtn");

const noResults = document.getElementById("noResults");
const resetGallery = document.getElementById("resetGallery");

const artModal = document.getElementById("artModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const modalArt = document.getElementById("modalArt");
const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalLike = document.getElementById("modalLike");


/* =========================================================
   CURRENT FILTER
========================================================= */

let currentFilter = "All";
let currentModalCard = null;


/* =========================================================
   CATEGORY FILTER
========================================================= */

function filterGallery() {

    const searchText = searchInput.value
        .trim()
        .toLowerCase();

    let visibleCards = 0;

    artCards.forEach(card => {

        const categories = card.dataset.category
            .toLowerCase()
            .split(" ");

        const title = card.dataset.title
            .toLowerCase();

        const description = card.dataset.description
            .toLowerCase();

        const matchesCategory =
            currentFilter === "All" ||
            categories.includes(currentFilter.toLowerCase());

        const matchesSearch =
            searchText === "" ||
            title.includes(searchText) ||
            description.includes(searchText) ||
            categories.some(category =>
                category.includes(searchText)
            );

        if (matchesCategory && matchesSearch) {

            card.classList.remove("hidden");

            visibleCards++;

        } else {

            card.classList.add("hidden");

        }

    });


    /* No result message */

    if (visibleCards === 0) {

        noResults.classList.add("show");

    } else {

        noResults.classList.remove("show");

    }


    /* Clear button */

    if (searchText !== "") {

        clearSearch.style.display = "block";

    } else {

        clearSearch.style.display = "none";

    }

}


/* =========================================================
   CATEGORY BUTTON CLICK
========================================================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        filterGallery();

    });

});


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener("input", () => {

    filterGallery();

});


/* =========================================================
   CLEAR SEARCH
========================================================= */

clearSearch.addEventListener("click", () => {

    searchInput.value = "";

    filterGallery();

    searchInput.focus();

});


/* =========================================================
   RESET GALLERY
========================================================= */

function resetGalleryView() {

    currentFilter = "All";

    categoryButtons.forEach(button => {

        button.classList.remove("active");

        if (button.dataset.filter === "All") {
            button.classList.add("active");
        }

    });

    searchInput.value = "";

    filterGallery();

}


resetGallery.addEventListener("click", resetGalleryView);


/* =========================================================
   OPEN ART MODAL
========================================================= */

function openArtModal(card) {

    currentModalCard = card;


    /* Copy artwork scene */

    const scene = card.querySelector(".art-scene");

    modalArt.innerHTML = "";

    if (scene) {

        const clonedScene = scene.cloneNode(true);

        clonedScene.classList.add("modal-scene");

        modalArt.appendChild(clonedScene);

    }


    /* Artwork information */

    const title = card.dataset.title || "Artwork";

    const description =
        card.dataset.description ||
        "A little piece of imagination.";


    const tag =
        card.querySelector(".art-tag")?.textContent ||
        "ARTWORK";


    modalTitle.textContent = title;

    modalDescription.textContent = description;

    modalTag.textContent = tag;


    /* Match like state */

    const likeButton =
        card.querySelector(".like-button");

    if (likeButton?.classList.contains("liked")) {

        modalLike.classList.add("liked");

        modalLike.textContent =
            "♥ Liked artwork";

    } else {

        modalLike.classList.remove("liked");

        modalLike.textContent =
            "♡ Like this artwork";

    }


    artModal.classList.add("show");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   CLOSE ART MODAL
========================================================= */

function closeArtModal() {

    artModal.classList.remove("show");

    document.body.style.overflow = "";

    currentModalCard = null;

}


modalClose.addEventListener(
    "click",
    closeArtModal
);


modalOverlay.addEventListener(
    "click",
    closeArtModal
);


/* =========================================================
   ESC KEY TO CLOSE MODAL
========================================================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        artModal.classList.contains("show")
    ) {

        closeArtModal();

    }

});


/* =========================================================
   ART CARD CLICK
========================================================= */

artCards.forEach(card => {

    card.addEventListener("click", event => {

        /*
           Agar user heart button par click kare,
           modal open nahi hoga.
        */

        if (
            event.target.closest(".like-button")
        ) {

            return;

        }

        openArtModal(card);

    });

});


/* =========================================================
   LIKE BUTTONS
========================================================= */

const likeButtons =
    document.querySelectorAll(".like-button");


likeButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();

        button.classList.toggle("liked");


        if (button.classList.contains("liked")) {

            button.textContent = "♥";

        } else {

            button.textContent = "♡";

        }


        /*
           Agar modal currently isi artwork ka hai,
           modal ka button bhi update karo.
        */

        const card =
            button.closest(".art-card");


        if (currentModalCard === card) {

            updateModalLike(button);

        }

    });

});


/* =========================================================
   UPDATE MODAL LIKE
========================================================= */

function updateModalLike(button) {

    if (button.classList.contains("liked")) {

        modalLike.classList.add("liked");

        modalLike.textContent =
            "♥ Liked artwork";

    } else {

        modalLike.classList.remove("liked");

        modalLike.textContent =
            "♡ Like this artwork";

    }

}


/* =========================================================
   MODAL LIKE BUTTON
========================================================= */

modalLike.addEventListener("click", () => {

    if (!currentModalCard) {
        return;
    }


    const cardLikeButton =
        currentModalCard.querySelector(".like-button");


    if (!cardLikeButton) {
        return;
    }


    cardLikeButton.classList.toggle("liked");


    if (
        cardLikeButton.classList.contains("liked")
    ) {

        cardLikeButton.textContent = "♥";

    } else {

        cardLikeButton.textContent = "♡";

    }


    updateModalLike(cardLikeButton);

});


/* =========================================================
   RANDOM ART
========================================================= */

function openRandomArt() {

    const visibleCards =
        Array.from(artCards).filter(card => {

            return !card.classList.contains("hidden");

        });


    /*
       Agar current filter mein artwork nahi hai,
       kuch random choose nahi karenge.
    */

    if (visibleCards.length === 0) {

        return;

    }


    const randomIndex =
        Math.floor(
            Math.random() * visibleCards.length
        );


    const randomCard =
        visibleCards[randomIndex];


    openArtModal(randomCard);

}


/* =========================================================
   RANDOM ART BUTTON
========================================================= */

randomArtBtn.addEventListener(
    "click",
    openRandomArt
);


/* =========================================================
   HERO "SURPRISE ME"
========================================================= */

randomHeroBtn.addEventListener(
    "click",
    () => {

        /*
           Gallery tak smoothly le jao
        */

        document
            .getElementById("gallery")
            .scrollIntoView({
                behavior: "smooth"
            });


        /*
           Thoda delay taaki scroll ke baad
           random artwork open ho
        */

        setTimeout(() => {

            openRandomArt();

        }, 650);

    }
);


/* =========================================================
   INITIAL GALLERY
========================================================= */

filterGallery();


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "🌸 Anime Art Garden loaded successfully!"
);
