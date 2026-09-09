const buttons = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".art-card");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        // Active button change
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const selectedCategory = button.textContent.trim();

        cards.forEach(card => {
            const category = card.dataset.category;

            if (selectedCategory === "All" || category === selectedCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
