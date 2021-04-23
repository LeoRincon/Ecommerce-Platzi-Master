const btnMenu = document.getElementById("icon-menu");
const menu = document.getElementById("menu");

const VisivilityMenu = () => {
  menu.classList.toggle("menu-visivility");
};

btnMenu.addEventListener("click", VisivilityMenu);
