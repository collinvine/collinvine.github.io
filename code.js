// /-------------Switch hero image ----------/

const getImgEl = document.querySelector('.landing__image');

const allSpans = document.querySelectorAll('.landing__intro > p > span')

const switchImg = function(ele) {
  const getImgId = ele.target.id;
  getImgEl.src = `img/${getImgId}.jpg`;
  console.log(getImgId, getImgEl.src);
};

allSpans.forEach(el => el.addEventListener('click', switchImg));
