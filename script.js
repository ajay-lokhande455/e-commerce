const newArrivals = document.querySelector('.card-item');

// Fetch data from API
window.addEventListener('load', async () => {
    try {
        const request = await fetch('https://dummyjson.com/products?limit=4');
        const response = await request.json();
        const productArray = response.products;
        showProducts(productArray)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
    
});


const showAll = document.querySelector('.show-all'); 
showAll.addEventListener('click', async () => {
    try {
        const productContainer = document.querySelector('.card-item'); // Assuming you have a container for products
        
        // Check if products are already shown
        if (showAll.innerHTML === "Hide all") {
            productContainer.innerHTML = ""; // Clear the product container
            showAll.innerHTML = "Show all"; // Update the button text
            return; // Exit the function
        }
        
        // Fetch and display products
        const request = await fetch('https://dummyjson.com/products?skip=4');
        const response = await request.json();
        
        const productArray = response.products;

        showProducts(productArray); // Function to display products

        showAll.innerHTML = "Hide all"; // Update the button text

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});



function showProducts(productArray) {
    
    for (let i = 0; i < productArray.length; i++) {

        // Create new card div element and add classes and content to it.
        const productDiv = document.createElement('div');
        productDiv.classList.add('card');

        // Create new item img and text element and add classes and content to it
        const itemImg = document.createElement('div');
        itemImg.classList.add('item-img');


        const imgLink = document.createElement('a');
        imgLink.setAttribute('href', `products/product.html?id=${i + 1}`);
        itemImg.appendChild(imgLink);
        // Create new image element and add source to it
        const img = document.createElement('img');
        img.src = productArray[i].thumbnail;
        imgLink.appendChild(img);

        // Create new div for text element 
        const itemText = document.createElement('div');
        itemText.classList.add('item-text');
        const title = document.createElement('p');
        title.textContent = productArray[i].title;

        const priceText = document.createElement('div');
        priceText.classList.add('pricing');
        const price = document.createElement('p');
        price.textContent = `$${productArray[i].price}`;
        const discount = document.createElement('p');
        discount.textContent = `$${productArray[i].discountPercentage}`; 
        const ratingPara = document.createElement("p");

    // to-do add 2.5 / 5 after start
    ratingPara.innerHTML = `<div
  class="rating"
  style="--rating: ${productArray[i].rating}"
  aria-label="Rating: ${productArray[i].rating} out of 5" >
  </div> `;

        priceText.append(price, discount);
        itemText.append(title, ratingPara, priceText) ; // Corrected here to use 'title'

        productDiv.append(itemImg, itemText)

        newArrivals.append(productDiv);
        console.log(productArray);
    }
}

