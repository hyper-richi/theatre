const headerLogo = document.querySelector(".header__logo-link");
headerLogo.addEventListener("click", function (e) {
  e.preventDefault();
  scroll({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll(".js-scroll").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const menu = document.querySelector(".header__wrapper");
    menu.classList.remove("header__wrapper_active");
    document.querySelector(".header__toggle").style.display = "block";

    let href = this.getAttribute("href").substring(1);

    const scrollTarget = document.getElementById(href);

    //const topOffset = document.querySelector('.header').offsetHeight;
    // console.log(document.querySelector('.header').offsetHeight);

    // const topOffset = 0; // если не нужен отступ сверху

    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - 0;

    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});
