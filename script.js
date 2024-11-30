const newArrivals = document.querySelector('.card-item');

// Fetch data from API
window.addEventListener('load', async () => {
    try {
        const request = await fetch('https://dummyjson.com/products?limit=8');
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

        const request = await fetch('https://dummyjson.com/products?skip=8');
        const response = await request.json();
        
        const productArray = response.products;

        showProducts(productArray); 

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
        imgLink.setAttribute('href', `product.html?id=${i + 1}`);
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

        priceText.append(price, discount);
        itemText.append(title, priceText) ; // Corrected here to use 'title'

        productDiv.append(itemImg, itemText)

        newArrivals.append(productDiv);
        console.log(productArray);
    }
}


/*         <div class="card" id="product">
                <div class="item-img">
                    <img src="assets/t-shirt.png" alt="">
                </div>
                <div class="item-text">
                    <p>T-shirt with Tape Details</p>
                    <p>$120</p>
                </div>
            </div> */