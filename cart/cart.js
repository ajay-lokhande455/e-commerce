const products = localStorage.getItem('cart-product').split(',');
console.log(products);
const cartLeft = document.querySelector('.cart-products');

window.addEventListener('load', async () => {
    let leftCartInnerHtml = "";
    for (let i = 0; i < products.length; i++) {
        const request = await fetch(`https://dummyjson.com/products/${products[i]}`);
        const product = await request.json();

        leftCartInnerHtml = leftCartInnerHtml + `
        <div class="product-cart flex" id="product-${product.id}">
            <img src="${product.thumbnail}" alt="">
            <div class="product-details flex">
                <div>
                    <h3>${product.title}</h3>
                    <p>Price: $${product.price}</p>
                </div>
                <div class="remove-product">
                    <img onclick="removeProduct(${product.id})" src="/assets/remove.svg" alt="">
                </div>
            </div>
        </div>
        <hr>`;
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
