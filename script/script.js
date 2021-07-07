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

      // if px scroll for 1 tact > length to element 
      // and bottom do not reached
      if (
        scrollBy > window.pageYOffset - coordY &&
        window.innerHeight + window.pageYOffset < document.body.offsetHeight
      ) {
        // then scroll to px = 1tact
        window.scrollBy(0, scrollBy);
      } else {
        // else reached to elem and go out from interval
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
      //time of interval 
    }, animationTime / framesCount);
  });
});
//hide button arrow up when top is reached
window.addEventListener("scroll", () => {
  let scrollElem = document.getElementById("scrollToTop");
  if (pageYOffset > document.documentElement.clientHeight) {
    scrollElem.style.opacity = "1";
  } else {
    scrollElem.style.opacity = "0";
  }
});
//scroll to top of page
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
