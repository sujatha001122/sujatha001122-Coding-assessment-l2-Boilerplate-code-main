let selectedColor = null;

function selectColor(colorBox) {
    selectedColor = colorBox.dataset.color;

    const allColorBoxes = document.querySelectorAll('.color-option');
    allColorBoxes.forEach(box => {
        const existingTickMark = box.querySelector('.tick-mark');
        if (existingTickMark) {
            box.removeChild(existingTickMark);
        }
    });

    const tickMark = document.createElement('div');
    tickMark.classList.add('tick-mark');
    colorBox.style.position = 'relative'; 
    colorBox.appendChild(tickMark);
}

function addToCart() {
   
    if (!selectedColor) {
        alert("Please select a color.");
        return;
    }

    
    const selectedSizeInput = document.querySelector('input[name="size"]:checked');
    if (!selectedSizeInput) {
        alert("Please select a size.");
        return;
    }
    const selectedSize = selectedSizeInput.value;

    
    const quantity = document.getElementById('quantity-display').value;

    
    const product = {
        title: document.getElementById('product-title').innerText,
        price: document.getElementById('product-price').innerText,
        selectedColor: selectedColor,
        selectedSize: selectedSize,
        quantity: quantity
    };

    updateAddToCartMessage(product);
}

function updateAddToCartMessage(product) {
    const message = `${product.title} with Color ${product.selectedColor} and Size ${product.selectedSize} Quantity ${product.quantity} add to cart`;

    const addToCartMessage = document.getElementById('add-to-cart-message');
    addToCartMessage.textContent = message;
    addToCartMessage.style.display = 'block';
}

function incrementQuantity() {
    const quantityInput = document.getElementById('quantity-display');
    let quantity = parseInt(quantityInput.value);
    quantity++;
    quantityInput.value = quantity;
}
function decrementQuantity() {
    const quantityInput = document.getElementById('quantity-display');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
    }
}
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
    .then(response => response.json())
    .then(data => {
        const product = data.product;

        document.getElementById('product-title').innerText = product.title;
        document.getElementById('product-description').innerHTML = product.description;
        document.getElementById('product-price').innerText = ` ${product.price}`;
        document.getElementById('compare-at-price').innerText = ` ${product.compare_at_price}`;
        document.getElementById('product-vendor').innerText = `${product.vendor}`;

        // const productImagesContainer = document.querySelector('.product-images');
        // product.images.forEach(image => {
        //     const img = document.createElement('img');
        //     img.src = image.src;
        //     productImagesContainer.appendChild(img);
        // });

       
        const colorOptionsContainer = document.getElementById('color-selector');
        product.options.forEach(option => {
    
            if (option.name === 'Color') {
                option.values.forEach(colorObj => {
                    const colorName = Object.keys(colorObj)[0];
                    const colorValue = colorObj[colorName];
                    const colorBox = document.createElement('div');
                    colorBox.classList.add('color-option');
                    colorBox.dataset.color = colorName;
                    colorBox.style.backgroundColor = colorValue;
            colorBox.style.position = 'relative';  

            colorBox.onclick = function() {
                selectColor(colorBox);
            };

            colorOptionsContainer.appendChild(colorBox);
        });
    }
});

        const sizeOptionsContainer = document.getElementById('size-selector');
        product.options[1].values.forEach(size => {
            const sizeRadio = document.createElement('input');
            sizeRadio.type = 'radio';
            sizeRadio.name = 'size';
            sizeRadio.value = size;
            const sizeLabel = document.createElement('label');
            sizeLabel.innerHTML = size;
            sizeOptionsContainer.appendChild(sizeRadio);
            sizeOptionsContainer.appendChild(sizeLabel);
            sizeOptionsContainer.appendChild(document.createElement('br'));
        });

        
        const price = parseFloat(product.price.replace('$', ''));
        const compareAtPrice = parseFloat(product.compare_at_price.replace('$', ''));
        const discountPercentage = Math.round(((compareAtPrice - price) / compareAtPrice) * 100);

        
        const discountElement = document.getElementById('discount');
        discountElement.innerHTML = `${discountPercentage}% Off `;

    
        if (discountPercentage > 0) {
            const discountedPrice = `<span class="discounted">${product.price}</span>`;
            document.getElementById('product-price').innerHTML = discountedPrice;
            document.getElementById('compare-at-price').innerHTML = `<s>${product.compare_at_price}</s>`;
        } else {
            document.getElementById('product-price').innerText = product.price;
            document.getElementById('compare-at-price').innerText = product.compare_at_price;
        }
    })
    .catch(error => console.error('Error fetching data:', error));


document.getElementById('increment-btn').addEventListener('click', incrementQuantity);
document.getElementById('decrement-btn').addEventListener('click', decrementQuantity);


document.getElementById('add-to-cart-button').addEventListener('click', addToCart);

document.getElementById('add-to-cart-button').addEventListener('click', function() {
    var message = document.getElementById('add-to-cart-message');
    message.style.display = 'block'; 
});



// <--- local images--->
document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('main-image');
    const thumbnailsContainer = document.querySelector('.thumbnail-images');

   
    const imageUrls = [
        "https://tarroitaly.us/wp-content/uploads/2023/01/laura-chouette-XbBNOeToVmg-unsplash-OK.jpg",
        "https://images.unsplash.com/photo-1598626431046-c7978e636c14?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1598626430994-7514b6981e81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWxlZ2FudCUyMHdvbWFufGVufDB8MXwwfHx8MA%3D%3D&w=1000&q=80",
        "https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1583846539095-4dd7d202b00f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    
    mainImage.src = imageUrls[0];

    
    imageUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('thumbnail-image');
        img.onclick = function() {
            mainImage.src = this.src; 
        };
        thumbnailsContainer.appendChild(img);
    });
});

