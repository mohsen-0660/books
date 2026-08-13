
function toggleLanguage(button) {

    const group = button.closest(".sidebar-group");

    if (!group) {
        return;
    }

    group.classList.toggle("open");
}


function toggleMobileSidebar() {

    document.body.classList.toggle(
        "mobile-sidebar-open"
    );
}


function closeMobileSidebar() {

    document.body.classList.remove(
        "mobile-sidebar-open"
    );
}


function showTab(button, tabId) {

    const container =
        button.closest(".content-section");

    if (!container) {
        return;
    }

    const buttons =
        container.querySelectorAll(".content-tab");

    buttons.forEach(function(btn) {
        btn.classList.remove("active");
    });

    const contents =
        container.querySelectorAll(".tab-content");

    contents.forEach(function(content) {
        content.classList.remove("active");
    });

    button.classList.add("active");

    const target =
        container.querySelector("#" + tabId);

    if (target) {
        target.classList.add("active");
    }
}


let selectedLanguage = "همه";


let sortField = "code";
let sortDirection = "asc";


function searchBooks() {

    const input =
        document.getElementById("bookSearch");

    const cards =
        document.querySelectorAll(".book-card");

    if (!input) {
        return;
    }

    const search =
        input.value.trim().toLowerCase();

    cards.forEach(function(card) {

        const text =
            card.innerText.toLowerCase();

        const language =
            card.dataset.language;

        const matchesSearch =
            text.includes(search);

        const matchesLanguage =
            selectedLanguage === "همه"
            ||
            language === selectedLanguage;

        card.style.display =
            matchesSearch && matchesLanguage
            ? ""
            : "none";
    });
}


function sortBooks() {

    const grid =
        document.getElementById("booksGrid");

    if (!grid) {
        return;
    }

    const cards =
        Array.from(
            grid.querySelectorAll(".book-card")
        );

    cards.sort(function(a,b) {

        let av;
        let bv;

        if (sortField === "code") {

            av = Number(a.dataset.code);
            bv = Number(b.dataset.code);

        } else if (sortField === "name") {

            av = a.dataset.name;
            bv = b.dataset.name;

        } else if (sortField === "author") {

            av = a.dataset.author;
            bv = b.dataset.author;

        } else if (sortField === "language") {

            av = a.dataset.language;
            bv = b.dataset.language;

        } else if (sortField === "copies") {

            av = Number(a.dataset.copies);
            bv = Number(b.dataset.copies);
        }

        let result = 0;

        if (av < bv) {
            result = -1;
        } else if (av > bv) {
            result = 1;
        }

        return sortDirection === "asc"
            ? result
            : -result;
    });

    cards.forEach(function(card) {
        grid.appendChild(card);
    });
}


function changeSort() {

    const select =
        document.getElementById("sortField");

    if (!select) {
        return;
    }

    sortField = select.value;

    sortBooks();
}


function toggleSortDirection() {

    const button =
        document.getElementById("sortDirection");

    if (!button) {
        return;
    }

    if (sortDirection === "asc") {

        sortDirection = "desc";

        button.innerHTML = "⬇ نزولی";

    } else {

        sortDirection = "asc";

        button.innerHTML = "⬆ صعودی";
    }

    sortBooks();
}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        const buttons =
            document.querySelectorAll(
                ".language-button"
            );

        buttons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    buttons.forEach(
                        function(btn) {
                            btn.classList.remove("active");
                        }
                    );

                    this.classList.add("active");

                    selectedLanguage =
                        this.dataset.language;

                    searchBooks();
                }
            );
        });


        const current =
            document.getElementById(
                "currentBookInSidebar"
            );

        if (current) {

            setTimeout(
                function() {

                    current.scrollIntoView({
                        block: "center",
                        inline: "nearest",
                        behavior: "smooth"
                    });

                },
                300
            );
        }


        const cover =
            document.querySelector(".book-cover");

        const lightbox =
            document.getElementById("imageLightbox");

        const lightboxImage =
            document.getElementById("lightboxImage");


        if (
            cover &&
            lightbox &&
            lightboxImage
        ) {

            cover.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();
                    event.stopPropagation();

                    lightboxImage.src =
                        cover.currentSrc ||
                        cover.src;

                    lightbox.classList.add("show");

                    document.body.style.overflow =
                        "hidden";
                }
            );


            lightbox.addEventListener(
                "click",
                function() {

                    lightbox.classList.remove("show");

                    lightboxImage.src = "";

                    document.body.style.overflow = "";
                }
            );
        }


        const requestButton =
            document.querySelector(
                ".book-request-button"
            );

        if (requestButton) {

            requestButton.addEventListener(
                "click",
                function() {

                    const target =
                        document.getElementById(
                            "requestBook"
                        );

                    if (target) {

                        setTimeout(
                            function() {

                                target.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });

                            },
                            50
                        );
                    }
                }
            );
        }


        sortBooks();
    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            const lightbox =
                document.getElementById(
                    "imageLightbox"
                );

            if (lightbox) {

                lightbox.classList.remove("show");

                const lightboxImage =
                    document.getElementById(
                        "lightboxImage"
                    );

                if (lightboxImage) {
                    lightboxImage.src = "";
                }

                document.body.style.overflow = "";
            }

            closeMobileSidebar();
        }
    }
);
