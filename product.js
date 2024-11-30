window.addEventListener('load', async () => {
    try {
        // Extract query parameters from the URL
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');

        // Fetch product data from the API
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        const product = await response.json();

        // Select the element where product details will be displayed
        const productDetails = document.querySelector('.product-detail');

        // Render the product details into the DOM
        productDetails.innerHTML = `
            <div class="product-img">
                <img src="${product.thumbnail}" alt="${product.title}" />
            </div>
            <div class="text-content">
                <div class="title">
                    <h2>${product.title}</h2>
                </div>
                <div class="rating">
                    <p>Rating: ${product.rating}</p>
                </div>
                <div class="pricing">
                    <p>Price: $${product.price}</p>
                    <p>Discount: ${product.discountPercentage}%</p>
                </div>
                <div class="description">
                    <p>${product.description}</p>
                </div>
                <hr />
                <div class="product-size">
                    <p>Choose Size</p>
                    <button class="small">Small</button>
                    <button class="medium">Medium</button>
                    <button class="large">Large</button>
                    <button class="x-large">X-large</button>
                </div>
                <hr />
                <div class="add-to-card">
                    <button>Add to Cart</button>
                </div>
            </div>`;
    } catch (error) {
        console.error("An error occurred:", error);
    }
});
