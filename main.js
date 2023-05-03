(function () {
  const stage = document.querySelector('.stage');
  const house = document.querySelector('.house');
  const progress = document.querySelector('.progress-bar');
  const selectCharacterElem = document.querySelector('.select-character');
  const mousePos = { x: 0, y: 0 };
  let maxScrollValue;
  function resizeHandler() {
    maxScrollValue = document.body.scrollHeight - innerHeight;
  }
  window.addEventListener('scroll', () => {
    house.style.transform = `translateZ(${
      (window.scrollY / maxScrollValue) * 1080 - 500
    }vw)`;
    progress.style.width = `${(window.scrollY / maxScrollValue) * 100}%`;
  });
  window.addEventListener('mousemove', e => {
    mousePos.x = -1 + (e.clientX / innerWidth) * 2;
    mousePos.y = +1 - (e.clientY / innerHeight) * 2;
    stage.style.transform = `rotateX(${mousePos.y * 5}deg)
    rotateY(${mousePos.x * 5}deg)`;
  });

  window.addEventListener('resize', resizeHandler);

  stage.addEventListener('click', e => {
    new Character({
      xPos: (e.clientX / innerWidth) * 100,
      speed: Math.random(),
    });
  });

  selectCharacterElem.addEventListener('click', e => {
    const value = e.target.dataset.char;
    document.body.dataset.char = value;
  });
  resizeHandler();
})();
