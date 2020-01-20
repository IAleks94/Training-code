"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const search = document.querySelector(".search");
  const cartBtm = document.getElementById("cart");
  const wishlistBtn = document.getElementById("wishlist");
  const cart = document.querySelector(".cart");
  const goodsWrapper = document.querySelector(".goods-wrapper");
  const category = document.querySelector(".category");
  const cardCounter = cartBtm.querySelector(".counter");
  const wishlistCounter = wishlistBtn.querySelector(".counter");
  const cartWrapper = document.querySelector(".cart-wrapper");

  const wishlist = [];
  
  const goodsBasket = {};

  //Создаем спинер 
  const createSpinner = () => {
    const spinner = document.createElement("object");
    spinner.type = "image/svg+xml";
    spinner.data = "img/Gear-0.2s-200px.svg";
    return spinner;
  };

  // Запрос на сервер
  const getGoods = (Creater, filter) => {
    goodsWrapper.append(createSpinner());
    return fetch("db/db.json")
      .then(response => response.json())
      .then(filter)
      .then(Creater);
  };
  //создание карточек товаrра для основного экрана
  const createCardGoods = (id, title, price, img) => {
    const card = document.createElement("div");

    card.className = "card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3";
    card.innerHTML = `<div class="card">
                        <div class="card-img-wrapper">
                            <img class="card-img-top" src="${img}" alt="${title}">
                            <button class="card-add-wishlist ${
                              wishlist.includes(id) ? "active" : " "
                            }"
                            data-goods-id="${id}"></button>
                        </div>
                        <div class="card-body justify-content-between">
                            <a href="#" class="card-title">${title}</a>
                            <div class="card-price">${price} ₽</div>
                            <div>
                               <button class="card-add-cart"
                               data-goods-id="${id}">
                               Добавить в корзину</button>
                            </div>
                        </div>
                    </div>`;
    return card;
  };

  //добавление товара на экран

  const renderCard = items => {
    goodsWrapper.textContent = "";

    if (items.length) {
      items.forEach(({ id, title, price, imgMin }) => {
        goodsWrapper.append(createCardGoods(id, title, price, imgMin));
      });
    } else {
      goodsWrapper.textContent =
        "Извините мы не нащли товаров по вашему запросу!";
    }
  };

  //создание товара для карзины

  const createCardGoodsBasket = (id, title, price, img) => {
    const card = document.createElement("div");

    card.className = "goods";
    card.innerHTML = `<div class="goods-img-wrapper">
                    <img class="goods-img" src="${img}" alt="${title}">
                    </div>
                    
                    <div class="goods-description">
                      <h2 class="goods-title">${title}</h2>
                      <p class="goods-price">${price} ₽</p>
                     </div>

                    <div class="goods-price-count">
                      <div class="goods-trigger">
                        <button class="goods-add-wishlist ${
                          wishlist.includes(id) ? "active" : ""}"
                         data-goods-id="${id}"></button>
                        <button class="goods-delete" data-goods-id="${id}"></button>
                  </div>
                   <div class="goods-count">${goodsBasket[id]}</div>
                  </div>`;
    return card;
  };
  //добавление товара в  корзину
  const renderBasket = items => {
    cartWrapper.textContent = "";

    if (items.length) {
      items.forEach(({ id, title, price, imgMin }) => {
        cartWrapper.append(createCardGoodsBasket(id, title, price, imgMin));
      });
    } else {
      cartWrapper.innerHTML =
        '<div id="cart-empty">Ваша корзина пока пуста</div>';
    }
  };

 
  //калькуляция
  const checkCounter = () => {
    wishlistCounter.textContent = wishlist.length;
    cardCounter.textContent = Object.keys(goodsBasket).length;
  };

  const calcTotalPrice = goods => {
    let sum = goods.reduce((accum, item) => {
      return accum + item.price * goodsBasket[item.id];
    }, 0);

    // let sum = 0;
    // for (let item of goods) {
    //   sum += item.price * goodsBasket[item.id];
    // }
    cart.querySelector(".cart-total>span").textContent = sum.toFixed(2);
  };

  //Фильтры
  const showCardBasket = goods => {
    const basketGoods = goods.filter(item =>
      goodsBasket.hasOwnProperty(item.id)
    );
    calcTotalPrice(basketGoods);
    return basketGoods;
  };

  const randomSort = item => item.sort(() => Math.random() - 0.5);

  const showWishlist = () => {
    getGoods(renderCard, goods =>
      goods.filter(item => wishlist.includes(item.id))
    );
  };

  //Работа с хранилищем
  const getCookie = name => {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const cookieQuery = get => {
    if (get) {
      if (getCookie("goodsBasket")) {
        let cooks = JSON.parse(getCookie("goodsBasket"));
        Object.assign(goodsBasket, cooks);

        checkCounter();
      }
    } else {
      document.cookie = `goodsBasket=${JSON.stringify(
        goodsBasket
      )}; max-age=86400e3;`;
    }
  };

  const storageQuery = get => {
    if (get) {
      if (localStorage.getItem("wishlist")) {
        const wishlistStorage = JSON.parse(localStorage.getItem("wishlist"));
        wishlist.push(...wishlistStorage);
      }
      checkCounter();
    } else {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  };

  const closeCart = evt => {
    const target = evt.target;
    const closeBtn = target.classList.contains("cart-close");
    let key = evt.key;
    if (key === "Escape" || target === cart || closeBtn) {
      cart.style.display = "";
      document.removeEventListener("keydown", closeCart);
    }
  };

  const openCart = evt => {
    let target = evt.target;
    if (target.tagName == "A") {
      evt.preventDefault();
    }
    cart.style.display = "flex";
    cartWrapper.textContent = "";
    document.addEventListener("keydown", closeCart);

    cartWrapper.append(
      createSpinner(),
      "Спинер не отображаеться, нам жаль подождите"
    );

    getGoods(renderBasket, showCardBasket);

    cartWrapper.querySelector("object").remove();
    goodsWrapper.querySelector("object").remove();
  };

  const choiceCategory = evt => {
    evt.preventDefault();
    const target = evt.target;

    if (target.classList.contains("category-item")) {
      const categoryHtml = target.dataset.category;
      getGoods(renderCard, goods =>
        goods.filter(item => item.category.includes(categoryHtml))
      );
    }
  };

  const searchGoods = evt => {
    evt.preventDefault();

    const input = evt.target.elements.searchGoods;
    const inputValue = input.value.trim();
    if (inputValue !== "") {
      const serchString = new RegExp(inputValue, "i");
      getGoods(renderCard, goods =>
        goods.filter(item => serchString.test(item.title))
      );
    } else {
      search.classList.add("error");
      setTimeout(() => {
        search.classList.remove("error");
      }, 2000);
    }
    input.value = "";
  };

  const toggleWishlist = (id, elem) => {
    if (wishlist.includes(id)) {
      wishlist.splice(wishlist.indexOf(id), 1);
      elem.classList.remove("active");
    } else {
      wishlist.push(id);
      elem.classList.add("active");
    }
    checkCounter();
    storageQuery();
  };

  const addBasket = id => {
    if (goodsBasket[id]) {
      goodsBasket[id] += 1;
    } else {
      goodsBasket[id] = 1;
    }
    checkCounter();
    cookieQuery();
  };

  const removeGoods = id => {
    delete goodsBasket[id];
    checkCounter();
    cookieQuery();
    getGoods(renderBasket, showCardBasket);
  };

  // Хэндлеры
  const handlerGoods = event => {
    const target = event.target;

    if (target.classList.contains("card-add-wishlist")) {
      toggleWishlist(target.dataset.goodsId, target);
    }

    if (target.classList.contains("card-add-cart")) {
      addBasket(target.dataset.goodsId);
    }
  };

  const handlerBasket = evt => {
    const target = evt.target;
    
    if (target.classList.contains("goods-add-wishlist")) {
      toggleWishlist(target.dataset.goodsId, target);
    }
    if (target.classList.contains("goods-delete")) {
      removeGoods(target.dataset.goodsId);
    }
  };

  //инициализация
  {
    getGoods(renderCard, randomSort);
    storageQuery(true);
    cookieQuery(true);

    cartBtm.addEventListener("click", openCart);
    cart.addEventListener("click", closeCart);
    category.addEventListener("click", choiceCategory);
    search.addEventListener("submit", searchGoods);
    goodsWrapper.addEventListener("click", handlerGoods);
    wishlistBtn.addEventListener("click", showWishlist);
    cartWrapper.addEventListener("click", handlerBasket);
  }
});
