var k = 0;
var itemsInCart = 0;

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready();
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName("remove");
    
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }
    
    var increaseValue = document.getElementsByClassName("increaseValue")
    for (var i = 0; i < increaseValue.length; i++) {
        var button = increaseValue[i];
        button.addEventListener('click', increaseQuantity)
    }
    
    var decreaseValue = document.getElementsByClassName("decreaseValue")
    for (var i = 0; i < decreaseValue.length; i++) {
        var button = decreaseValue[i];
        button.addEventListener('click', decreaseQuantity)
    }
    
    var addToCartButtons = document.getElementsByClassName("shop-item-button");
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
    
    document.getElementsByClassName('btn-checkout')[0].addEventListener('click',checkoutClicked);
    
    document.getElementsByClassName('btn-clear-cart')[0].addEventListener('click',clearCartClicked);
    
    updateCartTotal();
}

function clearCartClicked() {
    itemsInCart = 0;
    alert("Your Cart will be cleared!");
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }

    updateCartTotal();
}
function checkoutClicked() {
    alert("Thank you for your purchase");
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function updateCartTotal() {
    var total = 0;
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-item");
    for (var i = 0; i < cartRows.length; i++) {
        var currRow = cartRows[i];
        var priceElement = currRow.getElementsByClassName("price")[0];
        var quantityElement = currRow.getElementsByClassName("quantity")[0];
        var everyItemTotal = currRow.getElementsByClassName("curr-item-total")[0];
        var price = parseFloat(priceElement.innerText);
        var quantity = quantityElement.value;
        everyItemTotal.innerHTML = price*quantity;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    var productTotalAmount = document.getElementById('productTotalAmount');
    productTotalAmount.innerHTML = total + '.00';

    var shippingCharges = document.getElementById('shippingCharges');
    if (total>=500) {
        shippingCharges.innerHTML = 0 +'.00';
    }else {
        shippingCharges.innerHTML = 50 +'.00';
    }

    let discount = document.getElementById('discount');
    if (k==1) {
        let productAmount = document.getElementById('productTotalAmount');
        temp = parseInt(productAmount.innerText);
        discount.innerHTML = temp/5 + '.00';
    }

    var finalCartAmount = document.getElementById('finalTotalAmount');
    var finalAmount = parseInt(total) + parseInt(shippingCharges.innerHTML) - parseInt(discount.innerHTML);
    finalCartAmount.innerHTML = finalAmount + ".00";

    var badgeNav = document.getElementById('no-of-items-nav');
    var badgeHead = document.getElementById('no-of-items-head');
    badgeNav.innerText = itemsInCart;
    badgeHead.innerText = itemsInCart;
}

function removeCartItem(event) {
    itemsInCart--;
    var buttonClicked = event.target;
    var removed = buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('cart-item-title');
    console.log(removed);
    var removedTitle = removed.innerText;
    console.log(removedTitle);
    buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    updateCartTotal();
}

function increaseQuantity(event) {
    var buttonClicked = event.target;
    var parent = buttonClicked.parentElement.parentElement.parentElement;
    var quantityElement = parent.getElementsByClassName("quantity")[0];
    var quantity = quantityElement.value;
    quantityElement.value = parseInt(quantity) + 1;
    if (parseInt(quantity) >= 5) {
        quantityElement.value = 5;
        alert("You cannot take more than 5 products");
    }
    Color(quantityElement);
    updateCartTotal();
}

function decreaseQuantity(event) {
    var buttonClicked = event.target;
    var parent = buttonClicked.parentElement.parentElement.parentElement;
    var quantityElement = parent.getElementsByClassName("quantity")[0];
    var quantity = quantityElement.value;
    quantityElement.value = parseInt(quantity) - 1;
    if ((parseInt(quantity) - 1) <= 0) {
        quantityElement.value = 1;
        alert("Minimum 1 product needs to be chosen");
    }
    Color(quantityElement);
    updateCartTotal();
}

function Color(element) {
    if (element.value == 1) {
        element.style.color = 'blue';
    }
    else if (element.value == 5) {
        element.style.color = 'red';
    }
    else {
        element.style.color = 'black';
    }
}

function addToCartClicked(event) {
    itemsInCart++;
    var button = event.target;
    var shopItem = button.parentElement.parentElement.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    var button = shopItem.getElementsByClassName("shop-item-button")[0];
    addItemToCart(title, price, imageSrc, button);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc, button) {
    var cartRow = document.createElement('div');
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-item-title");
    var btn = button;

    for(var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title) {
            alert("This item is already added");
            return;
        }
    }
    var cartRowContents = `
    <div class="cart-item shadow">
        <div class="card p-4">

            <div class="row">

                <!-- Cart Images div -->
                <div class="col-md-5 col-11 mx-auto bg-light d-flex
            justify-content-center align-items-center shadow product_image">
                    <img src="${imageSrc}" alt="cart img" class="img-fluid">
                </div>

                <!-- Cart product details -->
                <div class="col-md-7 col-11 mx-auto px-4 mt-2">
                    <div class="row">
                        <!-- product name -->
                        <div class="col-6 card_title">
                            <h1 class="mb-4 product_name cart-item-title">${title}</h1>
                            <p>Fresh&nbsp; ${title}</p>
                            <p>Price per piece - <span class="price">${price}</span></p>
                        </div>

                        <!-- quantity increment decrement -->
                        <div class="col-6">
                            <ul class="pagination justify-content-end set_quantity">
                                <li class="page-item">
                                    <button class="page-link decreaseValue">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </li>
                                <li class="page-item">
                                    <input type="text" name="" class="page-link quantity" value="1"
                                        disabled>
                                </li>
                                <li class="page-item">
                                    <button class="page-link increaseValue">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- remove move and price -->
                    <div class="row">
                        <div class="col-8 d-flex justify-content-between remove_wish">
                            <button class="btn-sm btn-outline-danger remove"><i
                                    class="fas fa-trash"></i>&nbsp; REMOVE ITEM</button>
                            <!-- <p><i class="fas fa-heart"></i>Move to wish list</p> -->
                        </div>
                        <div class="col-4 d-flex justify-content-end price_money">
                            <h3>&#8377;<span class="curr-item-total">0.00</span></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    btn.style.backgroundColor = 'green';
    btn.innerText = "Added";
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("remove")[0].addEventListener('click',removeCartItem);
    cartRow.getElementsByClassName("increaseValue")[0].addEventListener('click',increaseQuantity);
    cartRow.getElementsByClassName("decreaseValue")[0].addEventListener('click',decreaseQuantity);

}

const discount_code = () => {
    let errorThrow = document.getElementById('errorThrow');
    if (k==1) {
        errorThrow.innerHTML = "Code Already Applied";
    }
    else if (discountCode.value === 'Delicious' && k == 0) {
        let productAmount = document.getElementById('productTotalAmount');
        let discount = document.getElementById('discount');
        temp = parseInt(productAmount.innerText);
        discount.innerHTML = temp/5 + '.00';
        errorThrow.innerHTML = "Hurray! code is valid";
        k = 1;
        updateCartTotal();
    } else {
        errorThrow.innerHTML = "Try Again! Valid code is Delicious";
    }
}