// const btnMenu = document.getElementById("icon-menu");
// const menu = document.getElementById("menu");

// const VisivilityMenu = () => {
//   menu.classList.toggle("menu-visivility");
// };

// btnMenu.addEventListener("click", VisivilityMenu);

const iconMenu = document.getElementById("icon-menu");
const menu = document.getElementById("menu");

const openCloseMenu = () => {
  iconMenu.classList.toggle("menu-active");
  menu.classList.toggle("menu-list--active");
};

iconMenu.addEventListener("click", openCloseMenu);
