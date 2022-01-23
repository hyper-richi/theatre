const headerLogo = document.querySelector(".header__logo-link");
headerLogo.addEventListener("click", function (e) {
  e.preventDefault();
  scroll({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".js-scroll").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const menu = document.querySelector(".header__menu");
    menu.classList.remove("header__menu_active");
    document.querySelector(".header__toggle").style.display = "block";

    let href = this.getAttribute("href").substring(1);

    const scrollTarget = document.getElementById(href);

    let elementPosition = scrollTarget.getBoundingClientRect().top;

    let offsetPosition = elementPosition - 0;

    if (elementPosition === 0) {
      window.scrollBy({
        top: -window.pageYOffset,
        behavior: "smooth",
      });
    } else
      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
  });
});
