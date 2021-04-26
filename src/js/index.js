const iconMenu = document.getElementById("icon-menu");
//items del carrito
const items = document.getElementById("items");
const itemsFavorite = document.getElementById("items-favorites");
const footerCar = document.getElementById("footer-car");
// debugger;
const menu = document.getElementById("menu");
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

// console.log(category1);

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

// category1.addEventListener("click", (e) => {
//   openCloseMenu();
//   // activeTable();
//   // console.log(e);
//   // fetchData();
//   // if (localStorage.getItem("car")) {
//   //   car = JSON.parse(localStorage.getItem("car"));
//   //   paintCar();
//   // }
//   if (tableCar.classList.contains("table-active")) {
//     tableCar.classList.remove("table-active");
//   }
// });

const fetchData = async () => {
  try {
    const answer = await fetch(
      // "https://my.api.mockaroo.com/api_ecommerce.json?key=9a562940"
      "../api.json"
    );
    // debugger;
    data = await answer.json();
    // // console.log(data);
    // const data = localStorage.setItem("product", JSON.stringify(data));
    // paintProducts(data);
    // console.log(data);

    // return data;
  } catch (error) {
    console.log(error);
  }
};

category1.addEventListener("click", (e) => {
  openCloseMenu();
  // activeTable();
  // console.log(e);
  // fetchData();
  // if (localStorage.getItem("car")) {
  //   car = JSON.parse(localStorage.getItem("car"));
  //   paintCar();
  // }
  paintProducts(data);
  if (tableCar.classList.contains("table-active")) {
    tableCar.classList.remove("table-active");
  }
});
//******************** Code paint product in the DOM */
const paintProducts = (data) => {
  // console.log(data);
  // if (localStorage.getItem("product")) {
  //   data = JSON.parse(localStorage.getItem("product"));
  // }
  data.forEach((product) => {
    // debugger;
    // console.log(product);
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

itemsFavorite.addEventListener("click", (e) => {
  btnDeleteFavorite(e);
});

const addProduct = (e) => {
  // console.log(e.target);
  // console.log(e.target.classList.contains("fovorite-car--car"));
  if (e.target.classList.contains("fovorite-car--car")) {
    setCar(e.target.parentElement.parentElement);
    // console.log(e.target.parentElement.parentElement);
  }
  if (e.target.classList.contains("fovorite-car--favorite")) {
    setFavorite(e.target.parentElement.parentElement);
    // console.log(e.target.parentElement.parentElement);
  }
  // console.log(e.target);

  e.stopPropagation();
};

const setCar = (obj) => {
  // console.log(obj);
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
  // console.log(car);
  paintCar();
};

const setFavorite = (obje) => {
  // console.log(obje);
  const productoFavorite = {
    id: obje.querySelector(".fovorite-car--car").dataset.id,
    make: obje.querySelector("h4").textContent,
    model: obje.querySelector("h5").textContent,
    price: obje.querySelector("span").textContent,
    amount: 1,
  };

  if (favorite.hasOwnProperty(productoFavorite.id)) {
    // productoFavorite.amount = favorite[productoFavorite.id].amount + 1;
  }
  favorite[productoFavorite.id] = { ...productoFavorite };
  // console.log(car);
  console.log(productoFavorite);
  paintFavorite();
};

const paintCar = () => {
  // console.log(car);
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
    // debugger;

    const clone = templateCar.cloneNode(true);
    fragment.appendChild(clone);
  });

  items.appendChild(fragment);

  paintFooterCar();

  localStorage.setItem("car", JSON.stringify(car));
};

const paintFavorite = () => {
  console.log(favorite);
  itemsFavorite.innerHTML = "";
  Object.values(favorite).forEach((product) => {
    templateFavorite.querySelector("th").textContent = product.id;
    templateFavorite.querySelectorAll("td")[0].textContent = product.make;
    templateFavorite.querySelectorAll("td")[1].textContent = product.model;
    templateFavorite.querySelectorAll("td")[2].textContent = product.price;
    templateFavorite.querySelectorAll("td")[3].textContent = product.amount;
    templateFavorite.querySelector(".btn-delete--favorite").dataset.id =
      product.id;
    // templateFavorite.querySelector(".restar").dataset.id = product.id;
    // templateFavorite.querySelector("span").textContent =
    //   product.amount * product.price;
    // debugger;

    const clone = templateFavorite.cloneNode(true);
    fragment.appendChild(clone);
  });

  itemsFavorite.appendChild(fragment);

  // paintFooterCar();

  localStorage.setItem("favorite", JSON.stringify(favorite));
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
  // console.log(totalAmount);
  // console.log(totalPrice);
  templateFooterCar.querySelectorAll("td")[0].textContent = totalAmount;
  templateFooterCar.querySelector("span").textContent = totalPrice;

  const clone = templateFooterCar.cloneNode(true);
  fragment.appendChild(clone);
  footerCar.appendChild(fragment);
  const emptyCar = document.getElementById("empty-car");
  // debugger;

  emptyCar.addEventListener("click", () => {
    car = {};
    paintCar();
  });
};

const btnAmount = (e) => {
  // console.log(e.target);
  if (e.target.classList.contains("btn-add")) {
    // console.log(car[e.target.dataset.id]);
    const producto = car[e.target.dataset.id];
    producto.amount++;
    car[e.target.dataset.id] = { ...producto };
    paintCar();
  }

  if (e.target.classList.contains("btn-subtract")) {
    // console.log(car[e.target.dataset.id]);
    const producto = car[e.target.dataset.id];
    producto.amount--;
    if (producto.amount === 0) {
      delete car[e.target.dataset.id];
    }
    // car[e.target.dataset.id] = { ...producto };
    paintCar();
  }

  e.stopPropagation();
};

const btnDeleteFavorite = (e) => {
  // console.log(e.target.parentElement.parentElement);
  if (e.target.classList.contains("btn-delete--favorite")) {
    delete favorite[e.target.dataset.id];
    // console.log(element);
    paintFavorite();
  }
  e.stopPropagation();
  // console.log(e.target.classList.contains("btn-delete--favorite"));
};

//********************* Code Favorite */
