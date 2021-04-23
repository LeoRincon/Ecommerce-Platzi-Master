// const btnMenu = document.getElementById("icon-menu");
// const menu = document.getElementById("menu");

// const VisivilityMenu = () => {
//   menu.classList.toggle("menu-visivility");
// };

// btnMenu.addEventListener("click", VisivilityMenu);

const miconMenu = document.getElementById("icon-menu");

const openCloseMenu = () => {
  miconMenu.classList.toggle("menu-active");
};

miconMenu.addEventListener("click", openCloseMenu);
