const imageEl = document.querySelector('.landing__image');
const allSpans = document.querySelectorAll('.landing__intro > div > p > span');
const emojiEl = document.querySelector('#point');

// /-------------Switch hero image ----------/
const switchImg = function(ele) {
  const getImgId = ele.target.id;
  imageEl.src = `img/${getImgId}.jpg`;
};

allSpans.forEach(el => el.addEventListener('click', switchImg));

// /-------------Switch emoji ----------/

const switchEmoji = function() {
  if (window.innerWidth < 940) {
    emojiEl.innerHTML = "☝️";
  } else {
    emojiEl.innerHTML = "👈";
  }
}

window.addEventListener('resize', switchEmoji);
window.onload = switchEmoji;