// group all anchors, set animation time and count frames
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]'));
const animationTime = 1000;
const framesCount = 60;

anchors.forEach((item) => {
  // add event listener to each anchors
  item.addEventListener("click", (e) => {
    // set prevent default
    e.preventDefault();

    // for each anchors item set Y coord.
    const coordY =
      document.querySelector(item.getAttribute("href")).getBoundingClientRect()
        .top + window.pageYOffset;

    // set interval
    const scroller = setInterval(() => {
      // how much scroll for one tact
      const scrollBy = coordY / framesCount;

      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто
      if (
        scrollBy > window.pageYOffset - coordY &&
        window.innerHeight + window.pageYOffset < document.body.offsetHeight
      ) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
      // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});

window.addEventListener("scroll", () => {
  let scrollElem = document.getElementById("scrollToTop");
  if (pageYOffset > document.documentElement.clientHeight) {
    scrollElem.style.opacity = "1";
  } else {
    scrollElem.style.opacity = "0";
  }
});

let timeOut;
let goUp = () => {
  let top = Math.max(
    document.body.scrollTop,
    document.documentElement.scrollTop
  );
  if (top > 0) {
    window.scrollBy(0, -100);
    timeOut = setTimeout(goUp, 20);
  } else {
    clearTimeout(timeOut);
  }
};
