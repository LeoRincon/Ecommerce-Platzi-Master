const iconMenu = document.getElementById("icon-menu");
const menu = document.getElementById("menu");
const mount = document.getElementById("mount");
const templateProduct = document.getElementById("container-products").content;
const fragment = document.createDocumentFragment();

// ******************* Code Menu

const openCloseMenu = () => {
  iconMenu.classList.toggle("menu-active");
  menu.classList.toggle("menu-list--active");
};

iconMenu.addEventListener("click", openCloseMenu);

// ******************* Code cal to the Api

const fetchData = async () => {
  try {
    const answer = await fetch(
      "https://my.api.mockaroo.com/api_ecommerce.json?key=9a562940"
    );
    // debugger;
    const data = await answer.json();
    // console.log(data);
    addProducts(data);
  } catch (error) {
    console.log(error);
  }
};

const addProducts = (data) => {
  console.log(data);
};
