const iconMenu = document.getElementById("icon-menu");
//items del carrito
const items = document.getElementById("items");
const itemsFavorite = document.getElementById("items-favorites");
const footerCar = document.getElementById("footer-car");
const menu = document.getElementById("menu");
const searchProduct = document.getElementById("search");
const mount = document.getElementById("mount-products");
const templateProduct = document.getElementById("container-products").content;
const templateFooterCar = document.getElementById("template-footer--car")
  .content;
const templateCar = document.getElementById("template-car").content;
const templateFavorite = document.getElementById("template-favorite").content;
const category1 = document.getElementById("item-category1");
const tableCar = document.querySelector(".table-car");
const tableFavorite = document.querySelector(".table-favorite");
const btnCart = document.querySelector(".navbar--car");
const btnFavorite = document.querySelector(".navbar--favorite");

const fragment = document.createDocumentFragment();

let car = {};
let data;
let favorite = {};

// ******************* Code Menu

const openCloseMenu = () => {
  iconMenu.classList.toggle("menu-active");
  menu.classList.toggle("menu-list--active");
};

iconMenu.addEventListener("click", openCloseMenu);

//**************** Code Visivility table */

const activeTableCar = () => {
  mount.innerHTML = "";
  tableCar.classList.toggle("table-active");
  if (tableFavorite.classList.contains("table-favorite--active")) {
    tableFavorite.classList.remove("table-favorite--active");
  }
  if (!tableCar.classList.contains("table-active")) {
    paintProducts(data);
  }
};

const activeTableFavorite = () => {
  mount.innerHTML = "";
  tableFavorite.classList.toggle("table-favorite--active");
  if (tableCar.classList.contains("table-active")) {
    tableCar.classList.remove("table-active");
  }
  if (!tableFavorite.classList.contains("table-favorite--active")) {
    paintProducts(data);
  }
};

btnCart.addEventListener("click", activeTableCar);
btnFavorite.addEventListener("click", activeTableFavorite);

// ******************* Code call to the Api

document.addEventListener("DOMContentLoaded", (e) => {
  fetchData();
  if (localStorage.getItem("car")) {
    car = JSON.parse(localStorage.getItem("car"));
    paintCar();
  }
  if (localStorage.getItem("favorite")) {
    favorite = JSON.parse(localStorage.getItem("favorite"));
    paintFavorite();
  }
});

const fetchData = async () => {
  try {
    const answer = await fetch(
      "https://my.api.mockaroo.com/api_ecommerce.json?key=9a562940"
    );
    data = await answer.json();
  } catch (error) {
    console.log(error);
  }
};

category1.addEventListener("click", (e) => {
  openCloseMenu();
  if (tableFavorite.classList.contains("table-favorite--active")) {
    tableFavorite.classList.remove("table-favorite--active");
  }
  paintProducts(data);
  if (tableCar.classList.contains("table-active")) {
    tableCar.classList.remove("table-active");
  }
});
//******************** Code paint product in the DOM */

const paintProducts = (data) => {
  data.forEach((product) => {
    templateProduct.querySelector("img").setAttribute("src", product.img);
    templateProduct.querySelector("h4").textContent = product.make;
    templateProduct.querySelector("h5").textContent = product.model;
    templateProduct.querySelector("span").textContent = product.price;
    templateProduct.querySelector(".fovorite-car--car").dataset.id = product.id;

    const clone = templateProduct.cloneNode(true);
    fragment.appendChild(clone);
  });
  mount.appendChild(fragment);
};

//********************* Code Cart */

mount.addEventListener("click", (e) => {
  addProduct(e);
});

items.addEventListener("click", (e) => {
  btnAmount(e);
});

// Add product to the cart
const addProduct = (e) => {
  if (e.target.classList.contains("fovorite-car--car")) {
    setCar(e.target.parentElement.parentElement);
  }
  if (e.target.classList.contains("fovorite-car--favorite")) {
    setFavorite(e.target.parentElement.parentElement);
  }

  e.stopPropagation();
};

const setCar = (obj) => {
  const producto = {
    id: obj.querySelector(".fovorite-car--car").dataset.id,
    make: obj.querySelector("h4").textContent,
    model: obj.querySelector("h5").textContent,
    price: obj.querySelector("span").textContent,
    amount: 1,
  };

  if (car.hasOwnProperty(producto.id)) {
    producto.amount = car[producto.id].amount + 1;
  }
  car[producto.id] = { ...producto };
  paintCar();
};

const paintCar = () => {
  items.innerHTML = "";
  Object.values(car).forEach((producto) => {
    templateCar.querySelector("th").textContent = producto.id;
    templateCar.querySelectorAll("td")[0].textContent = producto.make;
    templateCar.querySelectorAll("td")[1].textContent = producto.model;
    templateCar.querySelectorAll("td")[2].textContent = producto.price;
    templateCar.querySelectorAll("td")[3].textContent = producto.amount;
    templateCar.querySelector(".btn-add").dataset.id = producto.id;
    templateCar.querySelector(".btn-subtract").dataset.id = producto.id;
    templateCar.querySelector("span").textContent =
      producto.amount * producto.price;

    const clone = templateCar.cloneNode(true);
    fragment.appendChild(clone);
  });

  items.appendChild(fragment);

  paintFooterCar();

  localStorage.setItem("car", JSON.stringify(car));
};

const paintFooterCar = () => {
  footerCar.innerHTML = "";
  if (Object.keys(car).length === 0) {
    footerCar.innerHTML = `<th scope="row" colspan="5">Carrito vacío</th>`;
    return;
  }

  const totalAmount = Object.values(car).reduce(
    (accumulator, { amount }) => accumulator + amount,
    0
  );

  const totalPrice = Object.values(car).reduce(
    (accumulator, { amount, price }) => accumulator + amount * price,
    0
  );
  templateFooterCar.querySelectorAll("td")[0].textContent = totalAmount;
  templateFooterCar.querySelector("span").textContent = totalPrice;

  const clone = templateFooterCar.cloneNode(true);
  fragment.appendChild(clone);
  footerCar.appendChild(fragment);
  const emptyCar = document.getElementById("empty-car");

  emptyCar.addEventListener("click", () => {
    car = {};
    paintCar();
  });
};

const btnAmount = (e) => {
  if (e.target.classList.contains("btn-add")) {
    const producto = car[e.target.dataset.id];
    producto.amount++;
    car[e.target.dataset.id] = { ...producto };
    paintCar();
  }

  if (e.target.classList.contains("btn-subtract")) {
    const producto = car[e.target.dataset.id];
    producto.amount--;
    if (producto.amount === 0) {
      delete car[e.target.dataset.id];
    }
    paintCar();
  }

  e.stopPropagation();
};

//********************* Code Favorite */

itemsFavorite.addEventListener("click", (e) => {
  btnDeleteFavorite(e);
});

const setFavorite = (obje) => {
  const productoFavorite = {
    id: obje.querySelector(".fovorite-car--car").dataset.id,
    make: obje.querySelector("h4").textContent,
    model: obje.querySelector("h5").textContent,
    price: obje.querySelector("span").textContent,
    amount: 1,
  };

  // if (favorite.hasOwnProperty(productoFavorite.id)) {
  // }

  favorite[productoFavorite.id] = { ...productoFavorite };
  paintFavorite();
};

const paintFavorite = () => {
  itemsFavorite.innerHTML = "";
  Object.values(favorite).forEach((product) => {
    templateFavorite.querySelector("th").textContent = product.id;
    templateFavorite.querySelectorAll("td")[0].textContent = product.make;
    templateFavorite.querySelectorAll("td")[1].textContent = product.model;
    templateFavorite.querySelectorAll("td")[2].textContent = product.price;
    templateFavorite.querySelectorAll("td")[3].textContent = product.amount;
    templateFavorite.querySelector(".btn-delete--favorite").dataset.id =
      product.id;

    const clone = templateFavorite.cloneNode(true);
    fragment.appendChild(clone);
  });

  itemsFavorite.appendChild(fragment);

  localStorage.setItem("favorite", JSON.stringify(favorite));
};

const btnDeleteFavorite = (e) => {
  if (e.target.classList.contains("btn-delete--favorite")) {
    delete favorite[e.target.dataset.id];
    paintFavorite();
  }
  e.stopPropagation();
};

//******************** Code of Search */

function buscar(data, filter) {
  const filtrado = data.filter((producto) => {
    const { make, model } = producto;
    return `${make} ${model}`.toUpperCase().includes(filter.toUpperCase());
  });
  mount.innerHTML = "";
  paintProducts(filtrado);
}

searchProduct.addEventListener("keyup", (e) => {
  e.preventDefault();
  const filter = searchProduct.value;
  if (e.key === "Enter") {
    if (searchProduct.value === "") {
      mount.innerHTML = "";
      paintProducts(data);
    } else {
      buscar(data, filter);
    }
  }
});

//***************************** Code filter for category */

menu.addEventListener("click", (e) => {
  if (e.target.classList.contains("category")) {
    const filter = e.target.innerHTML;
    buscar(data, filter);
  }
  if (e.target.classList.contains("item-subcategory")) {
    const filter = e.target.innerHTML;
    buscar(data, filter);
  }
});
