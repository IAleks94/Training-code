"use strice";
let changeImg = event => {
  let target = event.target.closest("a");
  if (!target)  return;
  event.preventDefault();
  let litlHref = target.href;
  largeImg.src = litlHref;
};
thumbs.addEventListener("click", changeImg);
