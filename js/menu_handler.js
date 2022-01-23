  const menuOpen = document.querySelector(".header__toggle");
  const menu = document.querySelector(".header__menu");
  const menuClose = document.querySelector(".header__nav_close");

  menuOpen.addEventListener("click", () => {
    menu.classList.add("header__menu_active");
    menuOpen.style.display = "none";
  });

  menuClose.addEventListener("click", () => {
    menu.classList.remove("header__menu_active");
    menuOpen.style.display = "block";
  });
