const products = localStorage.getItem('cart-product').split(',');
console.log(products);
const cartLeft = document.querySelector('.cart-products');
const cartRight = document.querySelector('.order-summary-sect');

let totalPrice = 0;
let totalDiscount = 0;
let summaryTotal = 0;
window.addEventListener('load', async () => {
    let leftCartInnerHtml = "";
   
    for (let i = 1; i < products.length; i++) {
        const request = await fetch(`https://dummyjson.com/products/${products[i]}`);
        const product = await request.json();

        totalPrice += product.price;
        totalDiscount += product.price * 0.2;

        summaryTotal = totalPrice - totalDiscount;

        leftCartInnerHtml = leftCartInnerHtml + `
        <div>
        <div class="product-cart flex" id="product-${product.id}">
            <img src="${product.thumbnail}" alt="">
            <div class="product-details flex">
                <div>
                    <h2>${product.title}</h2>
                    <p>Price: $${product.price}</p>
                    <p>Return Policy: ${product.returnPolicy}</p>
                </div>
                <div class="remove-product">
                    <img onclick="removeProduct(${product.id})" src="/assets/remove.svg" alt="">
                </div>
            </div>
        </div>
        <hr>
        <div>
        `;
    
        cartRight.innerHTML =`
         <div class="order-summary">
          <h2>Order Summary</h2>
          <div class="summary-item">
              <span>Subtotal</span>
              <span>$${totalPrice.toFixed(2)}</span>
          </div>
          <div class="summary-item discount">
              <span>Discount (-20%)</span>
              <span>-$${totalDiscount.toFixed(2)}</span>
          </div>
          <hr />
          <div class="summary-item total">
              <span>Total</span>
              <span>$${summaryTotal.toFixed(2)}</span>
          </div>
          <div class="promo-code">
              <input type="text" id="promo-input" placeholder="Add promo code" />
              <button id="apply-promo">Apply</button>
          </div>
          <button class="checkout-btn">Go to Checkout →</button>
      </div>
      `
    }
    cartLeft.innerHTML = leftCartInnerHtml;
});

async function removeProduct(id) {
    try {

        // Send DELETE request to the API
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        });
        

        if (response.ok) {
            // Remove product ID from localStorage
            const updatedProducts = products.filter(productId => productId != id);
            localStorage.setItem('cart-product', updatedProducts.join(','));
         
            // Remove product element from the DOM
            const productElement = document.getElementById(`product-${id}`);

            console.log();
            
            if (productElement) {
                productElement.remove();
        }
        
            console.log(`Product with ID ${id} removed successfully.`);
        } else {
            console.error(`Failed to remove product with ID ${id}`);
        }
    } catch (error) {
        console.error(`Error removing product: ${error}`);
    }  

}