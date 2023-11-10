const shopContent = document.getElementById("shopContent");
const cart = []; //este es nuestro carrito, un array vacío

productos.forEach((product) =>{
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.productName}</h3>
    <p>${product.price} $</p>
    `;
    shopContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";

    content.append(buyButton);

    buyButton.addEventListener("click", ()=>{
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);
        if (repeat) {
            cart.map((prod) => {
                if (prod.id === product.id){
                    prod.quanty++;
                    displayCartCounter();
                }
            });            
        }else{
            cart.push({
                id: product.id,
                productName: product.productName,
                price: product.price,
                quanty: product.quanty,
                img: product.img,
            });
            displayCartCounter();
        }
        //console.log(cart)
    });
});
const shopContentservice = document.getElementById("shopContentservice");
const cartservicie = []; //este es nuestro carrito, un array vacío

service.forEach((service) =>{
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${service.img}">
    <h3>${service.serviceName}</h3>
    <p>${service.price} $</p>
    `;
    shopContent.append(content);

    const buyButtonservice = document.createElement("button");
    buyButtonservice.innerText = "Comprar";

    content.append(buyButtonservice);

    buyButtonservice.addEventListener("click", ()=>{
        const repeat = cartservicie.some((repeat) => repeat.id === service.id);
        if (repeat) {
            cartservicie.map((serv) => {
                if (serv.id === service.id){
                    serv.quanty++;
                    displayCartCounter();
                }
            });            
        }else{
            cartservice.push({
                id: service.id,
                serviceName: service.serviceName,
                price: service.price,
                quanty: service.quanty,
                img: service.img,
            });
            displayCartCounter();
        }
        //console.log(cart)
    });
});