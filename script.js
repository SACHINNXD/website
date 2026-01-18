/* ================= NAV ================= */
function toggleNav() {
    sideNav.classList.toggle("active");
    overlay.classList.toggle("active");
    hamburger.classList.toggle("active");
}

/* ================= SEARCH ================= */
function toggleSearch() {
    if (typeof searchBar !== "undefined") {
        searchBar.classList.toggle("active");
    }
}

function handleSearch(e) {
    if (e.key === "Enter") {
        const q = e.target.value.trim();
        if (!q) return;
        window.location.href = "result.html?q=" + encodeURIComponent(q);
    }
}

/* ================= PRODUCT MODAL ================= */
let currentProduct = {};

function openProduct(name, price) {
    currentProduct = { id: Date.now(), name, price };
    modalName.innerText = name;
    modalPrice.innerText = "₹" + price;
    productOverlay.classList.add("active");
}

function closeProduct() {
    productOverlay.classList.remove("active");
}

function selectSize(el) {
    document.querySelectorAll(".size").forEach(s =>
        s.classList.remove("active")
    );
    el.classList.add("active");
}

/* ================= CART ================= */
function addToCart(id, name, price) {
    saveToCart(id, name, price);
}

function addToCartFromModal() {
    saveToCart(
        currentProduct.id,
        currentProduct.name,
        currentProduct.price
    );
}

function saveToCart(id, name, price) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const size =
        document.querySelector(".size.active")?.innerText || "M";

    const found = cart.find(p => p.id === id && p.size === size);

    if (found) {
        found.quantity++;
    } else {
        cart.push({
            id,
            name,
            description: "Premium menswear",
            size,
            price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showToast();
}

/* ================= TOAST ================= */
function showToast() {
    if (typeof toast === "undefined") return;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
}

/* ================= PROFILE REDIRECT ================= */
function goToProfile() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        window.location.href = "profile.html";
    } else {
        window.location.href = "login.html";
    }
}

/* ================= PROFILE ICON IMAGE (HOME + RESULT) ================= */
(function () {
    const email = localStorage.getItem("loggedInUser");
    if (!email) return;

    const photo = localStorage.getItem("profilePhoto_" + email);
    if (!photo) return;

    // find profile svg (second icon)
    const profileLink = document.querySelector(
        '.top-icons a[onclick="goToProfile()"]'
    );

    if (!profileLink) return;

    profileLink.innerHTML = `
        <img src="${photo}"
             style="
                width:20px;
                height:20px;
                border-radius:50%;
                object-fit:cover;
             ">
    `;
})();
