//(function () {
  const menuOpen = document.querySelector(".header__toggle");
  const menu = document.querySelector(".header__wrapper");
  const menuClose = document.querySelector(".header__nav-close");

  menuOpen.addEventListener("click", () => {
    menu.classList.add("header__wrapper_active");
    menuOpen.style.display = "none";
   // console.log(1);
  });

  menuClose.addEventListener("click", () => {
        console.log(menu);

    menu.classList.remove("header__wrapper_active");
    menuOpen.style.display = "block";
    //console.log(1);
  });
//})();
