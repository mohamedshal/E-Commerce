const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

function handleClose(){
    nav.style.cssText = "right:-300px";
}
function handleOpen() {
    nav.style.cssText = "right:0";
}
bar.onclick = (event) => {
    handleOpen()
    event.stopPropagation();

};
document.body.onclick = (event) => {
    if(event.target !== bar && !nav.contains(event.target)){
        handleClose();
    }
}
close.onclick = () => {
    handleClose();
}
// Product

let addButton = document.getElementById("add");
let table  = document.querySelector("#cart table tbody");
let banItems = document.querySelectorAll("#cart table tbody .baat");
let tableTrs = document.querySelectorAll("#cart table tbody tr");
let MainImg = document.getElementById("MainImg");
let smallImgs = document.querySelectorAll(".theImage");
let price = document.getElementById("price");
let quantity = document.getElementById("quantity");
// src image
smallImgs.forEach((smallImg) => {
    smallImg.onclick = () => {
        MainImg.src = smallImg.src;
    }
});

let dataProduct = [];
let storedData = localStorage.getItem("datapro");

if (storedData !== null) {
    dataProduct = JSON.parse(storedData);
} else {
    dataProduct = [];
}
// add
if(window.location.href.endsWith('cart.html')){
    addButton.onclick = function() {
        if(quantity.value <= 0) {
            quantity.value = 0;
        }else{
            let newPrice = parseFloat(price.innerHTML.replace('$', '')) * +quantity.value;
            let product = {
                image: MainImg.src,
                text: "Cartoon Astronaut T-Shirts",
                price: price.innerHTML,
                quantity: quantity.value,
                subtotal: `$${newPrice}.00`,
                cartTotal: newPrice,
            }
            // Add the new product to the array
            dataProduct.push(product);
            // Save the updated array back to localStorage
            localStorage.setItem("datapro", JSON.stringify(dataProduct));
            // Optional: Output the updated array to the console
            createProduct();
        }
    }
    function createProduct() {
        let content = "";
        let total = 0;
        for(let i = 0;i<dataProduct.length;i++){
            content += `<tr>
                        <td><div class="baat" onclick="deleteProduct(${i})"><i class="far fa-times-circle"></i></div></td>
                        <td><img class="proImage" src=${dataProduct[i].image} alt=""></td>
                        <td id="title">${dataProduct[i].text}</td>
                        <td class="price">${dataProduct[i].price}</td>
                        <td><input type="number" class="quantity" value=${dataProduct[i].quantity} min="0"></td>
                        <td class="subtotal">${dataProduct[i].subtotal}</td> 
                    </tr>`
            total += dataProduct[i].cartTotal;
            localStorage.setItem("total-cart", total);
        }
        const theTotalCart = localStorage.getItem("total-cart");
        if(theTotalCart){
            let cartTotals = document.querySelectorAll(".cart-totals");
            if(cartTotals){
                cartTotals.forEach((cart) => {
                cart.innerHTML = `$ ${total}`;
            });
            }
        }
        table.innerHTML = content;
    }
    createProduct();  
    
//  delete a product
function deleteProduct(i) {
    dataProduct.splice(i,1);
    localStorage.setItem("datapro", JSON.stringify(dataProduct));
    createProduct();
}
}
// load
let loader = document.querySelector(".loader");
window.onload = function() {
    loader.style.display = "none";
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page name
    // Handle the logic for shop.html
    if (currentPage === 'shop.html') {
        let products = document.querySelectorAll(".pros");
        let productModels = document.querySelectorAll(".pros img");
        
        for (let i = 0; i < products.length; i++) {
            products[i].onclick = () => {
                let source = "";
                for (let j = 0; j < productModels.length; j++) {
                    if (i === j) {
                        source = productModels[j].src;
                    }
                }
                // Save the source to localStorage
                localStorage.setItem('productImageSrc', source);
                // Redirect to cart.html
                pagination("cart.html");
            }
        }
    }
    // Handle the logic for cart.html
    if (currentPage === 'cart.html') {
        // Retrieve the image source from localStorage
        const storedImageSrc = localStorage.getItem('productImageSrc');
        if (storedImageSrc) {
            if (MainImg) {
                // Set the retrieved image source
                MainImg.src = storedImageSrc;
            }
        }
        document.querySelector(".restart").onclick = () => {
            localStorage.clear();
            pagination("cart.html");
        }
    }
};
function pagination(url){
    window.location.href = url;
}