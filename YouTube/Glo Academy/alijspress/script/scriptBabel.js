"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

document.addEventListener("DOMContentLoaded", function () {
  var search = document.querySelector(".search");
  var cartBtm = document.getElementById("cart");
  var wishlistBtn = document.getElementById("wishlist");
  var cart = document.querySelector(".cart");
  var goodsWrapper = document.querySelector(".goods-wrapper");
  var category = document.querySelector(".category");
  var cardCounter = cartBtm.querySelector('.counter');
  var wishlistCounter = wishlistBtn.querySelector('.counter');
  var cartWrapper = document.querySelector('.cart-wrapper');
  var wishlist = [];
  var goodsBasket = {}; // Запрос на сервер

  var getGoods = function getGoods(Creater, filter) {
    goodsWrapper.append(createSpinner());
    return fetch("db/db.json").then(function (response) {
      return response.json();
    }).then(filter).then(Creater);
  }; //создание карточек товара для основного экрана


  var createCardGoods = function createCardGoods(id, title, price, img) {
    var card = document.createElement("div");
    card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
    card.innerHTML = "<div class=\"card\">\n                        <div class=\"card-img-wrapper\">\n                            <img class=\"card-img-top\" src=\"".concat(img, "\" alt=\"").concat(title, "\">\n                            <button class=\"card-add-wishlist ").concat(wishlist.includes(id) ? 'active' : ' ', "\"\n                            data-goods-id=\"").concat(id, "\"></button>\n                        </div>\n                        <div class=\"card-body justify-content-between\">\n                            <a href=\"#\" class=\"card-title\">").concat(title, "</a>\n                            <div class=\"card-price\">").concat(price, " \u20BD</div>\n                            <div>\n                               <button class=\"card-add-cart\"\n                               data-goods-id=\"").concat(id, "\">\n                               \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</button>\n                            </div>\n                        </div>\n                    </div>");
    return card;
  }; //добавление товара на экран


  var renderCard = function renderCard(items) {
    goodsWrapper.textContent = "";

    if (items.length) {
      items.forEach(function (_ref) {
        var id = _ref.id,
            title = _ref.title,
            price = _ref.price,
            imgMin = _ref.imgMin;
        goodsWrapper.append(createCardGoods(id, title, price, imgMin));
      });
    } else {
      goodsWrapper.textContent = 'Извините мы не нащли товаров по вашему запросу!';
    }
  }; //создание товара для карзины


  var createCardGoodsBasket = function createCardGoodsBasket(id, title, price, img) {
    var card = document.createElement("div");
    card.className = 'goods';
    card.innerHTML = "<div class=\"goods-img-wrapper\">\n                    <img class=\"goods-img\" src=\"".concat(img, "\" alt=\"").concat(title, "\">\n                    </div>\n                    \n                    <div class=\"goods-description\">\n                      <h2 class=\"goods-title\">").concat(title, "</h2>\n                      <p class=\"goods-price\">").concat(price, " \u20BD</p>\n                     </div>\n\n                    <div class=\"goods-price-count\">\n                      <div class=\"goods-trigger\">\n                        <button class=\"goods-add-wishlist ").concat(wishlist.includes(id) ? 'active' : ' ', "\"\n                         data-goods-id=\"").concat(id, "\"></button>\n                        <button class=\"goods-delete\" data-goods-id=\"").concat(id, "></button>\n                       </div>\n                       <div class=\"goods-count\">").concat(goodsBasket[id], "</div>\n                      </div>");
    return card;
  }; //добавление товара в  корзину


  var renderBasket = function renderBasket(items) {
    cartWrapper.textContent = "";

    if (items.length) {
      items.forEach(function (_ref2) {
        var id = _ref2.id,
            title = _ref2.title,
            price = _ref2.price,
            imgMin = _ref2.imgMin;
        cartWrapper.append(createCardGoodsBasket(id, title, price, imgMin));
      });
    } else {
      cartWrapper.innerHTML = '<div id="cart-empty">Ваша корзина пока пуста</div>';
    }
  };

  var createSpinner = function createSpinner() {
    var spinner = document.createElement("object");
    spinner.type = "image/svg+xml";
    spinner.data = "img/Gear-0.2s-200px.svg";
    return spinner;
  }; //калькуляция


  var checkCounter = function checkCounter() {
    wishlistCounter.textContent = wishlist.length;
    cardCounter.textContent = Object.keys(goodsBasket).length;
  };

  var calcTotalPrice = function calcTotalPrice(goods) {
    var sum = goods.reduce(function (accum, item) {
      return accum + item.price * goodsBasket[item.id];
    }, 0); // let sum = 0;
    // for (let item of goods) {
    //   sum += item.price * goodsBasket[item.id];
    // }

    cart.querySelector('.cart-total>span').textContent = sum.toFixed(2);
  }; //Фильтры


  var showCardBasket = function showCardBasket(goods) {
    var basketGoods = goods.filter(function (item) {
      return goodsBasket.hasOwnProperty(item.id);
    });
    calcTotalPrice(basketGoods);
    return basketGoods;
  };

  var randomSort = function randomSort(item) {
    return item.sort(function () {
      return Math.random() - 0.5;
    });
  };

  var showWishlist = function showWishlist() {
    getGoods(renderCard, function (goods) {
      return goods.filter(function (item) {
        return wishlist.includes(item.id);
      });
    });
  }; //Работа с хранилищем


  var getCookie = function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  var cookieQuery = function cookieQuery(get) {
    if (get) {
      if (getCookie('goodsBasket')) {
        var cooks = JSON.parse(getCookie('goodsBasket'));
        Object.assign(goodsBasket, cooks);
        checkCounter();
      }
    } else {
      document.cookie = "goodsBasket=".concat(JSON.stringify(goodsBasket), "; max-age=86400e3;");
    }
  };

  var storageQuery = function storageQuery(get) {
    if (get) {
      if (localStorage.getItem('wishlist')) {
        var wishlistStorage = JSON.parse(localStorage.getItem('wishlist'));
        wishlist.push.apply(wishlist, _toConsumableArray(wishlistStorage));
      }

      checkCounter();
    } else {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  };

  var closeCart = function closeCart(evt) {
    var target = evt.target;
    var closeBtn = target.classList.contains("cart-close");
    var key = evt.key;

    if (key === "Escape" || target === cart || closeBtn) {
      cart.style.display = "";
      document.removeEventListener("keydown", closeCart);
    }
  };

  var openCart = function openCart(evt) {
    var target = evt.target;

    if (target.tagName == "A") {
      evt.preventDefault();
    }

    cart.style.display = "flex";
    cartWrapper.textContent = "";
    document.addEventListener("keydown", closeCart);
    cartWrapper.append(createSpinner(), "Спинер не отображаеться, нам жаль подождите");
    getGoods(renderBasket, showCardBasket);
    cartWrapper.querySelector("object").remove();
    goodsWrapper.querySelector("object").remove();
  };

  var choiceCategory = function choiceCategory(evt) {
    evt.preventDefault();
    var target = evt.target;

    if (target.classList.contains("category-item")) {
      var categoryHtml = target.dataset.category;
      getGoods(renderCard, function (goods) {
        return goods.filter(function (item) {
          return item.category.includes(categoryHtml);
        });
      });
    }
  };

  var searchGoods = function searchGoods(evt) {
    evt.preventDefault();
    var input = evt.target.elements.searchGoods;
    var inputValue = input.value.trim();

    if (inputValue !== '') {
      var serchString = new RegExp(inputValue, 'i');
      getGoods(renderCard, function (goods) {
        return goods.filter(function (item) {
          return serchString.test(item.title);
        });
      });
    } else {
      search.classList.add('error');
      setTimeout(function () {
        search.classList.remove('error');
      }, 2000);
    }

    input.value = '';
  };

  var toggleWishlist = function toggleWishlist(id, elem) {
    if (wishlist.includes(id)) {
      wishlist.splice(wishlist.indexOf(id), 1);
      elem.classList.remove('active');
    } else {
      wishlist.push(id);
      elem.classList.add('active');
    }

    checkCounter();
    storageQuery();
  };

  var addBasket = function addBasket(id) {
    if (goodsBasket[id]) {
      goodsBasket[id] += 1;
    } else {
      goodsBasket[id] = 1;
    }

    checkCounter();
    cookieQuery();
  };

  var removeGoods = function removeGoods(id) {
    delete goodsBasket[id];
    checkCounter();
    cookieQuery();
    getGoods(renderBasket, showCardBasket);
  }; // Хэндлеры


  var handlerGoods = function handlerGoods(event) {
    var target = event.target;

    if (target.classList.contains('card-add-wishlist')) {
      toggleWishlist(target.dataset.goodsId, target);
    }

    if (target.classList.contains('card-add-cart')) {
      addBasket(target.dataset.goodsId);
    }
  };

  var handlerBasket = function handlerBasket(evt) {
    var target = evt.target;

    if (target.classList.contains('goods-add-wishlist')) {
      toggleWishlist(target.dataset.goodsId, target);
    }

    if (target.classList.contains('goods-delete')) {
      removeGoods(target.dataset.goodsId);
    }
  }; //инициализация


  {
    getGoods(renderCard, randomSort);
    storageQuery(true);
    cookieQuery(true);
    cartBtm.addEventListener("click", openCart);
    cart.addEventListener("click", closeCart);
    category.addEventListener("click", choiceCategory);
    search.addEventListener('submit', searchGoods);
    goodsWrapper.addEventListener('click', handlerGoods);
    wishlistBtn.addEventListener('click', showWishlist);
    cartWrapper.addEventListener('click', handlerBasket);
  }
});