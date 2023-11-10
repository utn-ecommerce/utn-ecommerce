const modalContainerService = document.getElementById("modal-containe-service");
const modalOverlayService = document.getElementById("modal-overlay-service");

const cartBtnService = document.getElementById("cart-btn-service");
const cartCounterService = document.getElementById("cart-counter-service");


const displayCartservice = () => {
    modalContainerService.innerHTML = "";
    modalContainerService.style.display = "block";
    modalOverlayService.style.display = "block";
    //modal Header
    const modalHeaderService = document.createElement("div");

    const modalCloseService = document.createElement("div");
    modalCloseService.innerText = "❌";
    modalCloseService.className = "modal-close-service";
    modalHeaderService.append(modalCloseService);

    modalCloseService.addEventListener("click", () => {
        modalContainerService.style.display = "none";
        modalOverlayService.style.display = "none";
    })

    const modalTitleService = document.createElement("div");
    modalTitleService.innerText = "Carrito";
    modalTitleService.className = "modal-title-service";
    modalHeaderService.append(modalTitleService);

    modalContainerService.append(modalHeaderService);

    //modal Body
    if(cartservice.length > 0){

    cartService.forEach((service) => {
        const modalBodyService = document.createElement("div");
        modalBodyService.className = "modal-body-service";
        modalBodyService.innerHTML = `
        <div class = "service">
            <img class = "service-img" src="${service.img}" />
            <div class = "service-info">
                <h4>${service.serviceName}</h4>
            </div>
            <div class = "quantity-service">
                <span class = "quantity-btn-decrese-service">-</span>
                <span class = "quantity-input-service">${service.quanty-service}</span>
                <span class = "quantity-btn-increse-service">+</span>
            </div>
            <div class = "price">${service.price * service.quanty} $</div>
            <div class = "delete-service">❌</div>
        </div>
        `;

        modalContainerService.append(modalBodyService);

        const decrese = modalBodyService.querySelector(".quantity-btn-decrese-service");
        decrese.addEventListener("click", () => {
            if(service.quantyservice !== 1){
                service.quantyservice--;
                displayCartservice();
                displayCartCounterservice();

            }
        });

        const increse = modalBodyService.querySelector(".quantity-btn-increse-service");
        increse.addEventListener("click", () => {
            service.quanty++;
            displayCart();
            displayCartCounter();
        })


    
        //delete
    const deleteService = modalBodyService.querySelector(".delete-service");

    deleteService.addEventListener("click", ()=> {
        deleteService(service.id)
    })
});

    //modal footer
    const totalservice = cartservice.reduce((acc,el) => acc + el.price * el.quanty, 0);



    const modalFooterservice = document.createElement("div");
    modalFooterservice.className = "modal-footer";
    modalFooterservice.innerHTML = `
    <div class = "total-price">Total: ${totalservice}</div>
    <button class = "btn-primary" id="checkout-btn"> go to checkout</button> 
    <div id="button-checkout"></div>
    `; // boton que lleva al checkout y dispara el evento de mercadopago

    modalContainerService.append(modalFooter);

    //mp;
    const mercadopago = new MercadoPago("APP_USR-5edee690-9d67-4f22-b564-0bffaa7bf97a", {
        locale: "es-AR",
    }); //inicia una instancia de Mercado Pago

    const checkoutButtonservice = modalFooterservice.querySelector("#checkout-btn-service"); //capturamos el boton para el evento click y ejecutar

    checkoutButtonservice.addEventListener("click", function (){

        checkoutButtonservice.remove(); //remueve el boton checkout para evitar dobles comprar

        const orderDataservice = {
            quantity: 1,
            description: "compra de ecomerce",
            price: total,
        };

        fetch("http://localhost:8080/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDataservice),
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (preference) {
                createCheckoutButton(preference.id);
            })
            .catch(function () {
                alert("Unexpected error"); 
            });
    });
    
    function createCheckoutButton(preferenceId) {
        //Initialize the checkout
        const bricksBuilder = mercadopago.bricks();

        const renderComponent = async (bricksBuilder) => {
            //if (window.checkoutButton) checkoutButton.unmount();

            await bricksBuilder.create(
                "wallet",
                "button-checkout", // class/id where the payment button will be displayed
                {
                    initialization: {
                        preferenceId: preferenceId,
                    },
                    callbacks: {
                        onError: (error) => console.error(error),
                        onReady: () => {},
                    },
                }
            );

        };
        window.checkoutButton = renderComponent(bricksBuilder);
    }

}else{
    const modalText = document.createElement("h2");
    modalText.className = "modal-body";
    modalText.innerText = "No hay nada en tu carrito";
    modalContainer.append(modalText);
}    
};

cartBtnService.addEventListener("click", displayCart);

const deleteCartservice =(id) => {
    const foundId = cart.findIndex((element)=> element.id === id);
    cart.splice(foundId, 1);
    displayCart();
    displayCartCounter();
};

const displayCartCounter = ()=> {
    const cartLenght = cart.reduce((acc, el) => acc + el.quanty, 0);
    if (cartLenght > 0) {
        cartCounter.style.display = "block";
        cartCounter.innerText = cartLenght;
    }else{
        cartCounter.style.display = "none";
    }
    
    
};