function searchBooks() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let books = document.querySelectorAll(".gallery-item");

    books.forEach(book => {
        let title = book.querySelector("h3").textContent.toLowerCase();
        if (title.includes(input)) {
            book.style.display = "flex";
        } else {
            book.style.display = "none";
        }
    });
}

let cartItems = [];

function updateCartDropdown() {
    const cartList = document.getElementById('cartItems');
    if (!cartList) return; // Prevent error if cartItems element doesn't exist
    cartList.innerHTML = ''; // Clear previous items

    if (cartItems.length === 0) {
        const emptyMsg = document.createElement('li');
        emptyMsg.textContent = 'Your cart is empty.';
        cartList.appendChild(emptyMsg);
    } else {
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            cartList.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Add-to-cart buttons (only if they exist)
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookTitle = this.parentElement.querySelector('h3').textContent;
            cartItems.push(bookTitle);

            // Update cart count
            const cartCount = document.getElementById('cartCount');
            if (cartCount) cartCount.textContent = cartItems.length;

            // Update cart dropdown
            updateCartDropdown();

            // Show popup for item added
            alert("Book added to cart!");
        });
    });

    // Cart button listeners (only if they exist)
    const cartButton = document.getElementById('cartButton');
    const cartDropdown = document.getElementById('cartDropdown');
    if (cartButton && cartDropdown) {
        cartButton.addEventListener('click', function() {
            cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', function(event) {
            if (!cartButton.contains(event.target) && !cartDropdown.contains(event.target)) {
                cartDropdown.style.display = 'none';
            }
        });
    }

    const checkoutButton = document.getElementById("checkoutButton");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            if (cartItems.length === 0) {
                alert("Your cart is empty!");
            } else {
                // Save cart to localStorage
                localStorage.setItem("lastCart", JSON.stringify(cartItems));
                alert("Thank you for your purchase!");
                // Reset the cart after checkout
                cartItems = [];
                updateCartDropdown();
                const cartCount = document.getElementById("cartCount");
                if (cartCount) cartCount.textContent = "0";
            }
        });
    }

    const clearCartButton = document.getElementById("clearCartButton");
    if (clearCartButton) {
        clearCartButton.addEventListener("click", () => {
            cartItems = [];
            updateCartDropdown();
            const cartCount = document.getElementById("cartCount");
            if (cartCount) cartCount.textContent = "0";
            alert("Cart cleared");
        });
    }

    // Feedback form
    const feedbackForm = document.getElementById("feedbackForm");
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            let missing = [];
            if (!name) missing.push("name");
            if (!email) missing.push("email");
            if (!message) missing.push("feedback");

            if (missing.length > 0) {
                alert("Please fill out the following field(s): " + missing.join(", "));
                return;
            }

            alert(
                "Thank you for your feedback!\n\n" +
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Feedback: " + message
            );

            this.reset();
        });
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
});

