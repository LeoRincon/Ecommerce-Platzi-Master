const iconMenu = document.getElementById("icon-menu");
const menu = document.getElementById("menu");
const mount = document.getElementById("mount-products");
const templateProduct = document.getElementById("container-products").content;
const fragment = document.createDocumentFragment();
const Car = {};

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
  const product = {
    id: obj.querySelector(".fovorite-car--car").dataset.id,
  };
  console.log(product);
};
