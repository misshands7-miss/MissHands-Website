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
        name: "Green Phone Charm",
        price: 89,
        category: "Phone Charms",
        image: "images/green-phonecharm.jpeg"
    },

    {
        id: 4,
        name: "Pink Phone Charm",
        price: 89,
        category: "Phone Charms",
        image: "images/pink-phonecharm.jpeg"
    }
];


// ================================
// CART
// ================================

let cart = [];


// ================================
// DISPLAY PRODUCTS
// ================================

const productContainer =
    document.getElementById("product-container");

function displayProducts() {

    productContainer.innerHTML = "";

    products.forEach(product => {

        const productCard =
            document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
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
        `;

        productContainer.appendChild(productCard);

    });

}


// ================================
// ADD TO CART
// ================================

function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    if (!product) {
        return;
    }

    const existingProduct = cart.find(
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

    const orderMessage =
        document.getElementById("order-message");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>Your cart is empty 🪻</p>
        `;

    } else {

        cart.forEach((item, index) => {

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";

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


    // ================================
    // CART COUNT
    // ================================

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartCount.textContent = totalItems;


    // ================================
    // CART TOTAL
    // ================================

    const totalPrice = cart.reduce(
        (sum, item) =>
            sum + (item.price * item.quantity),
        0
    );

    cartTotal.textContent =
        `₹${totalPrice}`;


    // ================================
    // ORDER MESSAGE
    // ================================

    if (orderMessage) {

        if (cart.length === 0) {

            orderMessage.value =
                "Your cart is empty.";

        } else {

            let message =
                "New MissHands Order\n\n";

            cart.forEach(item => {

                message +=
                    `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;

            });

            message +=
                `\nTotal: ₹${totalPrice}`;

            orderMessage.value = message;

        }

    }

}


// ================================
// INCREASE QUANTITY
// ================================

function increaseQuantity(index) {

    cart[index].quantity += 1;

    updateCart();

}


// ================================
// DECREASE QUANTITY
// ================================

function decreaseQuantity(index) {

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

    cart.splice(index, 1);

    updateCart();

}


// ================================
// OPEN CART
// ================================

function openCart() {

    const cartOverlay =
        document.getElementById("cart-overlay");

    cartOverlay.classList.add("active");

    updateCart();

}


// ================================
// CLOSE CART
// ================================

function closeCart() {

    const cartOverlay =
        document.getElementById("cart-overlay");

    cartOverlay.classList.remove("active");

}


// ================================
// WEB3FORMS ORDER SUBMISSION
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


            const submitButton =
                orderForm.querySelector(
                    "button[type='submit']"
                );


            submitButton.disabled = true;

            submitButton.textContent =
                "Sending Order... 💜";


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


            submitButton.disabled = false;

            submitButton.textContent =
                "Place Order 💌";

        }
    );

}


// ================================
// START WEBSITE
// ================================

displayProducts();

updateCart();