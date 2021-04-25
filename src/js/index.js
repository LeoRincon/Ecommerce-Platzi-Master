const iconMenu = document.getElementById("icon-menu");
const items = document.getElementById("items");
const footerCar = document.getElementById("footer-car");
const menu = document.getElementById("menu");
const mount = document.getElementById("mount-products");
const templateProduct = document.getElementById("container-products").content;
const templateFooterCar = document.getElementById("template-footer--car")
  .content;
const templateCar = document.getElementById("template-car").content;

const fragment = document.createDocumentFragment();
const car = {};

// ******************* Code Menu

const openCloseMenu = () => {
  iconMenu.classList.toggle("menu-active");
  menu.classList.toggle("menu-list--active");
};

iconMenu.addEventListener("click", openCloseMenu);

// ******************* Code call to the Api

document.addEventListener("DOMContentLoaded", (e) => {
  console.log(e);
  fetchData();
});

mount.addEventListener("click", (e) => {
  addCar(e);
});

const fetchData = async () => {
  try {
    const answer = await fetch(
      "https://my.api.mockaroo.com/api_ecommerce.json?key=9a562940"
    );
    // debugger;
    const data = await answer.json();
    // console.log(data);
    paintProducts(data);
  } catch (error) {
    console.log(error);
  }
};

const paintProducts = (data) => {
  // console.log(data);
  data.forEach((product) => {
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

const addCar = (e) => {
  // console.log(e.target);
  // console.log(e.target.classList.contains("fovorite-car--car"));
  if (e.target.classList.contains("fovorite-car--car")) {
    setCar(e.target.parentElement.parentElement);
  }
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

const paintCar = () => {
  console.log(car);
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
};
