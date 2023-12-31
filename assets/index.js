
const productsContainer = document.querySelector('.products__container');
const showMore = document.querySelector('.btn-more');
const categoriesDiv = document.querySelector('.List-categories');
const categoryList = document.querySelectorAll('.category');
const menuIcon= document.querySelector('.menu-icon');
const navbarMenu = document.querySelector('.navbar__menu');
const cartIcon = document.querySelector('.cart-icon');
const cartMenu = document.querySelector('.cart');
const overlay = document.querySelector('.overlay');
const cartContent = document.querySelector('.cart-container');
const totalcontent = document.querySelector('.total');
const bubbleCart = document.querySelector('.cart-bubble')
const buttonBuy = document.querySelector('.buy');
const buttonDelete = document.querySelector('.delete');
const offerContainer = document.querySelector('.products-offer__container');

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('mensaje');



// local Storage cart 


let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}


// funciones render products

const createProductTemplate = (product) => {
    const { id, name, price, cardImg, category } = product;
    
    if (category.includes('offer')) {
        const precioOriginal = parseFloat(price);
        const descuento = precioOriginal * 0.15;
        const precioConDescuento = (precioOriginal - descuento).toFixed(3);

        return `
        <div class="container__card">
            <div class="card--content">
                <div class="card--img">
                    <img src="${cardImg}" alt="${name}">
                </div>
                <div class="card--text">
                    <h5>${name}</h5>
                    <div class="price-offer">
                        <p>$ ${precioOriginal.toFixed(3)}</p>
                        <span>$ ${precioConDescuento}</span>
                    </div>
                </div>
                <button class="card--btn"
                    data-id='${id}'
                    data-name='${name}'
                    data-price='${precioConDescuento}'
                    data-img='${cardImg}'>
                    Comprar
                </button>
            </div>
        </div>
        `;
    } else {
        
        return `
        <div class="container__card">
            <div class="card--content">
                <div class="card--img">
                    <img src="${cardImg}" alt="${name}">
                </div>
                <div class="card--text">
                    <h5>${name}</h5>
                    <p>$ ${price}</p>
                </div>
                <button class="card--btn"
                    data-id='${id}'
                    data-name='${name}'
                    data-price='${price}'
                    data-img='${cardImg}'>
                    Comprar
                </button>
            </div>
        </div>
        `;
    }
};



const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
    .map(createProductTemplate) 
    .join('')
}




// mostrar mas productos evento click 

const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    const { products, currentProductsIndex, productsLimit } = appState;
    renderProducts(products[currentProductsIndex]);
    if(currentProductsIndex === productsLimit - 1) {
        showMore.classList.add('hidden');
    }
}

// filtros


const filter = ({ target }) => {
    if(!filterBtnPress(target)) 
    return;
    changeFilter(target);
    renderProductsfilter();
}

const filterBtnPress = (element) => {
    return (
    element.classList.contains('category') 
    && !element.classList.contains('active')
    );
}


// cambiar filtro a activo 

const changeFilter = (element) => {
    appState.activeFilter = element.dataset.category;
    changeBtnActive(appState.activeFilter);
    setBtnShowMore(appState.activeFilter);
}

const changeBtnActive = (filter) => {
    const categories = [...categoryList];
    categories.forEach((btn) => {
        if(btn.dataset.category !== filter) {
            btn.classList.remove('active');
            return;
        }
        btn.classList.add('active');
    })
}
setBtnShowMore = () => {
    if(!appState.activeFilter) {
        showMore.classList.remove('hidden');
        return;
    }
    showMore.classList.add('hidden');
}

// mostrar productos filtrados 


renderProductsfilter = () => {
    const { activeFilter, currentProductsIndex, products } = appState;
    productsContainer.innerHTML = '';

    if (!activeFilter) {
        appState.currentProductsIndex = 0;
        renderProducts(products[currentProductsIndex]);
        return;
    }

    let filteredProducts = [];

    if (activeFilter === 'digital' || activeFilter === 'smartwatch') {
        filteredProducts = productsData.filter(
            (product) => product.category.includes(activeFilter)
        );
    } else {
        filteredProducts = productsData.filter(
            (product) => product.category === activeFilter
        );
    }

    renderProducts(filteredProducts);
}




// menu hamburguesa 

const menuToggle = () => {
    navbarMenu.classList.toggle('show-menu');
    if(cartMenu.classList.contains('show-cart')){ 
        cartMenu.classList.remove('show-cart');
        return;
    }
    overlay.classList.toggle('show-overlay');
}

// abrir menu cart 
const cartToggle = () => {
    cartMenu.classList.toggle('show-cart');
    if(navbarMenu.classList.contains('show-menu')){ 
        navbarMenu.classList.remove('show-menu');
        return;
    }
    overlay.classList.toggle('show-overlay');
}

// efectos overlay 
const overlayClick = () => {
    navbarMenu.classList.remove('show-menu');
    cartMenu.classList.remove('show-cart');
    overlay.classList.toggle('show-overlay');
}

// cerra menu al clickear los links 

const closeMenu = (e) => {
    if(!e.target.classList.contains('nav-link')) 
    return;
    navbarMenu.classList.remove('show-menu');
    overlay.classList.remove('show-overlay');
}

// cerrar ventanas al scrollear 
const closeOnScroll = () => {
    navbarMenu.classList.remove('show-menu');
    cartMenu.classList.remove('show-cart');
    overlay.classList.remove('show-overlay');
}



// logica cart y render productos en cart 

const createProductData = (product) => {
    const { id, name, price, img } = product
    return { id, name, price, cardImg: img };
}   

const createCartProduct = (product) => {
    cart = [...cart, {...product, quantity: 1}]
}

const cartProductExist = (product) => {
    return cart.some((item) => item.id === product.id);
}

const addProduct = (e) => {
    if (!e.target.classList.contains('card--btn')) return;
    const product = createProductData(e.target.dataset);

    if (cartProductExist(product)) {
        addUnit(product);
    } else {
        createCartProduct(product);
    }

    updateCart(); 
};

const updateCart = () => {
    cartTotal();
    saveCart();
    renderCart();
    renderCartBubble();
    disableBtn(buttonBuy);
    disableBtn(buttonDelete);
};



const renderCart = () => {
    if (!cart.length) {
        cartContent.innerHTML = `<p class="cart-msg-empty">Carrito vacio</p>`;
        return;
    }
    cartContent.innerHTML = cart.map(createCartProductTemplate).join('');
};

const createCartProductTemplate = (product) => {
    const { id, name, price, cardImg, quantity } = product;

    return `
    <div class="cart-item">
        <div class="cart-img">
            <img src="${cardImg}" alt="${name}" />
        </div>
        <div class="item-info">
            <h3 class="item-title">${name}</h3>
            <span class="item-price"> $ ${price}</span>
        </div>
        <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div>
    `;
};


const addUnit = (product) => {
    cart = cart.map((cartProduct) => {
      return cartProduct.id === product.id
        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
        : cartProduct
    })
}

// total de cart 

const cartTotal = () => {
    const total = cart.reduce((acc, cur) => 
    acc + Number(cur.price) * cur.quantity, 0)

    totalcontent.textContent = `${total.toFixed(3)} pesos`;
}


// logica cart bubble 

const renderCartBubble = () => {
    bubbleCart.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
}
  
const showCartBubble = () => {
    bubbleCart.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
}

// boton mas y menos cart 

const handleQuantity = (e) => {
    if(e.target.classList.contains('down')) {
        handleMinusBtnEvent(e.target.dataset.id)
    } else if (e.target.classList.contains('up')) {
            handlePlusBtnEvent(e.target.dataset.id)
    }
    updateCart();
}

const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    if(existingCartProduct.quantity === 1){
        removeProductFromCart(existingCartProduct);
        return;
    }
    substractProductUnit(existingCartProduct);
}
  
const removeProductFromCart = (product) => {
    cart = cart.filter((prod) => prod.id !== product.id);
}
  
const substractProductUnit = (product) => {
        cart = cart.map((prod) => {
        return prod.id === product.id
        ? { ...prod, quantity: Number(product.quantity) - 1 }
        : prod;
    })
}
  
const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    addUnit(existingCartProduct);
}

// botones caomprar y vaciar carrito 
const resetCart = () => {
    cart = [];
    updateCart();
}

const deleteCart = () => {
    if(window.confirm('¿Quieres vaciar el carrito?')) {
        resetCart();
        alert('Carrito vacio')
    }
}

const completeBuy = () => {
    if(window.confirm('¿Desea confirmar su compra?')) {
        resetCart();
        alert('Pedido realizado')
    }
}

const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.remove('disable');
    } else {
        btn.classList.add('disable');
    }
}

// logica filtrado y render productos destacados ofertas

const ProductosDestacados = () => {
    const productsOffer = productsData.filter(producto => producto.category.includes('offer'));

    if (productsOffer.length === 0) {
        offerContainer.innerHTML = '<p>No hay productos destacados disponibles</p>';
        return;
    }

    const renderProductsOffer = productsOffer.map(producto => {
        const precioOriginal = parseFloat(producto.price);
        const descuento = precioOriginal * 0.15;
        const precioConDescuento = (precioOriginal - descuento).toFixed(2);

        return `
            <div class="products-offer-card">
            <div class="offer-badge">15% off</div>
            <div class="offer-img-contain">
            <img src="${producto.cardImg}" alt="${producto.name}" />
            </div>
            <h5>${producto.name}</h5>
            <div class="price-offer">
                <p>$ ${precioOriginal.toFixed(2)}</p>
                <span>$ ${precioConDescuento}</span>
            </div>
            <button class="card--btn"
                data-id='${producto.id}'
                data-name='${producto.name}'
                data-price='${precioConDescuento}'
                data-img='${producto.cardImg}'>
                Comprar
            </button>
        </div>
        `;
    }).join('');

    offerContainer.innerHTML = renderProductsOffer;

    const buttonsBuy = document.querySelectorAll('.products-offer-card .card--btn');
    buttonsBuy.forEach(button => {
        button.addEventListener('click', addToCart);
    });
};

const addToCart = (e) => {
    const product = {
        id: e.target.dataset.id,
        name: e.target.dataset.name,
        price: e.target.dataset.price,
        cardImg: e.target.dataset.img,
    };

    if (cartProductExist(product)) {
        addUnit(product);
    } else {
        createCartProduct(product);
    }

    updateCart();
};

ProductosDestacados();




// validacion de formulario en seccion contacto  


const isEmpty = (input) => {
    return !input.value.trim().length;
}
  
const isEmailValid = (input) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(input.value.trim());
}
  
const showError = (input, msg) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector("label + input, textarea");
    error.style.display = 'block';
    error.textContent = msg;
}
  
const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector("label + input, textarea");
    error.textContent = '';
}
  
const checkName = (input) => {
    if (isEmpty(input)) {
      showError(input, "Este campo es obligatorio");
      return false;
    }
    showSuccess(input);
    return true;
}
  
const checkEmail = (input) => {
    if (isEmpty(input)) {
      showError(input, "Este campo es obligatorio");
      return false;
    }
  
    if (!isEmailValid(input)) {
      showError(input, "El email no es válido");
      return false;
    }
  
    showSuccess(input);
    return true;
}
  
const checkMessage = (input) => {
    if (isEmpty(input)) {
      showError(input, "Este campo es obligatorio");
      return false;
    }
    showSuccess(input);
    return true;
}
  
const validateForm = (e) => {
    e.preventDefault();
  
    const isNameValid = checkName(nameInput);
    const isEmailValid = checkEmail(emailInput);
    const isMessageValid = checkMessage(messageInput);
  
    const isValidForm = isNameValid && isEmailValid && isMessageValid;
  
    if (!isValidForm) {
      alert('Por favor, complete todos los campos obligatorios.');
    } else {
      alert('Formulario válido, puedes enviar la consulta');
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';  
    }
  }
  



const init = () => {

    renderProducts(appState.products[appState.currentProductsIndex]);
    showMore.addEventListener('click', showMoreProducts);
    categoriesDiv.addEventListener('click', filter);
    menuIcon.addEventListener('click', menuToggle);
    cartIcon.addEventListener('click', cartToggle);
    overlay.addEventListener('click', overlayClick);
    navbarMenu.addEventListener('click', closeMenu);
    window.addEventListener('scroll', closeOnScroll);  
    window.addEventListener('DOMContentLoaded', renderCart);
    window.addEventListener('DOMContentLoaded', cartTotal);
    productsContainer.addEventListener('click', addProduct);
    window.addEventListener('DOMContentLoaded', showCartBubble);
    cartContent.addEventListener('click', handleQuantity);
    buttonBuy.addEventListener('click', completeBuy);
    buttonDelete.addEventListener('click', deleteCart);
    disableBtn(buttonBuy);
    disableBtn(buttonDelete);
    
    contactForm.addEventListener('submit', validateForm);
    nameInput.addEventListener('input', () => checkName(nameInput));
    emailInput.addEventListener('input', () => checkEmail(emailInput));
    messageInput.addEventListener('input', () => checkMessage(messageInput));
  
};

init();





