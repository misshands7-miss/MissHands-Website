// ================================
// MISSHANDS PRODUCTS
// ================================

const products = [
    {
        id: 1,
        name: "Pretty Beaded Bracelet",
        price: 99,
        category: "Bracelets",
        image: "images/bracelet4.jpeg"
    },

    {
        id: 2,
        name: "Cloudy Blue Keychain",
        price: 79,
        category: "Keychains",
        image: "images/cloudy-blue-keychain.jpeg"
    },

    {
        id: 3,
        name: "Green Single Phone Charm",
        price: 89,
        category: "Phone Charms",
        type: "Single",
        image: "images/green-phonecharm.jpeg"
    },

    {
        id: 4,
        name: "Pink Double Phone Charm",
        price: 89,
        category: "Phone Charms",
        type: "Double",
        image: "images/pink-phonecharm.jpeg"
    }
];


// ================================
// CART
// ================================

let cart = [];


// ================================
// PRODUCT DISPLAY
// ================================

function createProductCard(product) {
    return `
        <div class="product-card">

            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                >
            </div>

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-price">
                    ₹${product.price}
                </p>

                <button
                    class="add-to-cart"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        </div>
    `;
}


// ================================
// DISPLAY ALL PRODUCTS
// ================================

function displayAllProducts() {

    const phoneCharms =
        document.getElementById("phone-charm-products");

    const bracelets =
        document.getElementById("bracelet-products");

    const keychains =
        document.getElementById("keychain-products");


    if (phoneCharms) {
        phoneCharms.innerHTML = products
            .filter(product => product.category === "Phone Charms")
            .map(createProductCard)
            .join("");
    }


    if (bracelets) {
        bracelets.innerHTML = products
            .filter(product => product.category === "Bracelets")
            .map(createProductCard)
            .join("");
    }


    if (keychains) {
        keychains.innerHTML = products
            .filter(product => product.category === "Keychains")
            .map(createProductCard)
            .join("");
    }
}


// ================================
// PHONE CHARM FILTER
// ONLY SINGLE + DOUBLE
// ================================

function filterProducts(type) {

    const container =
        document.getElementById("phone-charm-products");

    if (!container) {
        return;
    }


    const filteredProducts =
        products.filter(product =>
            product.category === "Phone Charms" &&
            product.type === type
        );


    container.innerHTML =
        filteredProducts
            .map(createProductCard)
            .join("");
}


// ================================
// SHOW CATEGORY
// ================================

function showCategory(category) {

    const phoneSection =
        document.getElementById("phone-charms-section");

    const braceletSection =
        document.getElementById("bracelets-section");

    const keychainSection =
        document.getElementById("keychains-section");


    if (phoneSection) {
        phoneSection.style.display =
            category === "Phone Charms"
                ? "block"
                : "none";
    }


    if (braceletSection) {
        braceletSection.style.display =
            category === "Bracelets"
                ? "block"
                : "none";
    }


    if (keychainSection) {
        keychainSection.style.display =
            category === "Keychains"
                ? "block"
                : "none";
    }


    if (category === "Phone Charms") {

        const phoneContainer =
            document.getElementById("phone-charm-products");

        if (phoneContainer) {
            phoneContainer.innerHTML = `
                <div class="empty-category-message">
                    <p>Choose a style ✨</p>
                </div>
            `;
        }
    }


    const shopSection =
        document.getElementById("shop");

    if (shopSection) {
        shopSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// ================================
// CART — ADD
// ================================

function addToCart(productId) {

    const product =
        products.find(
            product => product.id === productId
        );


    if (!product) {
        return;
    }


    const existingProduct =
        cart.find(
            item => item.id === productId
        );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }


    updateCart();


    alert(
        `${product.name} added to your cart! 💜`
    );
}


// ================================
// UPDATE CART
// ================================

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>Your cart is empty 🪻</p>
        `;

    } else {

        cart.forEach((item, index) => {

            const cartItem =
                document.createElement("div");

            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>

                </div>


                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${index})"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>


                <button
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            `;


            cartItems.appendChild(cartItem);
        });
    }


    const totalItems =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    if (cartCount) {
        cartCount.textContent =
            totalItems;
    }


    const totalPrice =
        cart.reduce(
            (sum, item) =>
                sum +
                (item.price * item.quantity),
            0
        );


    if (cartTotal) {
        cartTotal.textContent =
            `₹${totalPrice}`;
    }
}


// ================================
// INCREASE QUANTITY
// ================================

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity += 1;

    updateCart();
}


// ================================
// DECREASE QUANTITY
// ================================

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity -= 1;


    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }


    updateCart();
}


// ================================
// REMOVE FROM CART
// ================================

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);

    updateCart();
}


// ================================
// OPEN CART
// ================================

function openCart() {

    const cartOverlay =
        document.getElementById("cart-overlay");


    if (cartOverlay) {

        cartOverlay.classList.add(
            "active"
        );

        updateCart();
    }
}


// ================================
// CLOSE CART
// ================================

function closeCart() {

    const cartOverlay =
        document.getElementById("cart-overlay");


    if (cartOverlay) {

        cartOverlay.classList.remove(
            "active"
        );
    }
}


// ================================
// WEB3FORMS ORDER
// ================================

const orderForm =
    document.getElementById("order-form");


if (orderForm) {

    orderForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty 🪻"
                );

                return;
            }


            const orderDetails =
                cart.map(item =>
                    `${item.name} - ₹${item.price} × ${item.quantity}`
                ).join("\n");


            const orderMessage =
                document.getElementById(
                    "order-message"
                );


            if (orderMessage) {

                orderMessage.value =
                    `MissHands Order\n\n` +
                    `${orderDetails}\n\n` +
                    `Total: ₹${cart.reduce(
                        (sum, item) =>
                            sum +
                            item.price *
                            item.quantity,
                        0
                    )}`;
            }


            const submitButton =
                orderForm.querySelector(
                    "button[type='submit']"
                );


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Sending Order... 💜";
            }


            const formData =
                new FormData(orderForm);


            try {

                const response =
                    await fetch(
                        "https://api.web3forms.com/submit",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const result =
                    await response.json();


                if (result.success) {

                    alert(
                        "Your order has been sent successfully! 💜✨"
                    );


                    orderForm.reset();

                    cart = [];

                    updateCart();

                    closeCart();

                } else {

                    alert(
                        "Something went wrong. Please try again. 🪻"
                    );
                }

            } catch (error) {

                alert(
                    "Unable to send the order right now. Please try again."
                );
            }


            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Place Order 💌";
            }

        }
    );
}


// ================================
// START WEBSITE
// ================================

displayAllProducts();
updateCart();