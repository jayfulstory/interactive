class Character {
  constructor({ xPos, speed }) {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = `
          <div class="character-face-con character-head">
            <div class="character-face character-head-face face-front"></div>
            <div class="character-face character-head-face face-back"></div>
          </div>
          <div class="character-face-con character-torso">
            <div class="character-face character-torso-face face-front"></div>
            <div class="character-face character-torso-face face-back"></div>
          </div>
          <div class="character-face-con character-arm character-arm-right">
            <div class="character-face character-arm-face face-front"></div>
            <div class="character-face character-arm-face face-back"></div>
          </div>
          <div class="character-face-con character-arm character-arm-left">
            <div class="character-face character-arm-face face-front"></div>
            <div class="character-face character-arm-face face-back"></div>
          </div>
          <div class="character-face-con character-leg character-leg-right">
            <div class="character-face character-leg-face face-front"></div>
            <div class="character-face character-leg-face face-back"></div>
          </div>
          <div class="character-face-con character-leg character-leg-left">
            <div class="character-face character-leg-face face-front"></div>
            <div class="character-face character-leg-face face-back"></div>
          </div>
  `;
    document.querySelector('.stage').appendChild(this.mainElem);
    this.mainElem.style.left = `${xPos}%`;
    // 스크롤중인지아닌지
    this.scrollState = false;
    // 마지막 스크롤위치
    this.lastScrollTop;
    this.xPos = xPos;
    this.speed = speed;
    this.direction;
    this.runningState = false;
    this.rafId;
    this.init();
    console.log(speed);
  }
  // ES6
  init() {
    const self = this;
    window.addEventListener('scroll', () => {
      clearTimeout(self.scrollState);

      if (!self.scrollState) {
        self.mainElem.classList.add('running');
      }
      self.scrollState = setTimeout(() => {
        self.scrollState = false;
        self.mainElem.classList.remove('running');
      }, 200);
      if (self.lastScrollTop > scrollY) {
        self.mainElem.dataset.direction = 'backward';
      } else {
        self.mainElem.dataset.direction = 'forward';
      }
      // console.log(`이전위치 ${self.lastScrollTop}`);
      // console.log(`현재위치 ${scrollY}`);
      self.lastScrollTop = scrollY;
    });
    window.addEventListener('keydown', e => {
      if (self.runningState) return;
      if (e.key === 'ArrowLeft') {
        self.direction = 'left';
        self.mainElem.dataset.direction = 'left';
        self.mainElem.classList.add('running');
        self.run();
        self.runningState = true;
      } else if (e.key === 'ArrowRight') {
        self.direction = 'right';
        self.mainElem.dataset.direction = 'right';
        self.mainElem.classList.add('running');
        self.run();
        self.runningState = true;
      }

      window.addEventListener('keyup', () => {
        self.mainElem.classList.remove('running');
        cancelAnimationFrame(this.rafId);
        self.runningState = false;
      });
    });
  }
  run() {
    const self = this;
    if (self.direction === 'left') {
      self.xPos -= self.speed;
    } else if (self.direction === 'right') {
      self.xPos += self.speed;
    }
    if (self.xPos < 2) {
      self.xPos = 2;
    }
    if (self.xPos > 88) {
      self.xPos = 88;
    }
    self.mainElem.style.left = `${self.xPos}%`;
    self.rafId = requestAnimationFrame(self.run.bind(self));
  }
  // run(self) {
  //   if (self.direction === 'left') {
  //     self.xPos -= self.speed;
  //   } else if (self.direction === 'right') {
  //     self.xPos += self.speed;
  //   }
  //   self.mainElem.style.left = `${self.xPos}%`;
  //   requestAnimationFrame(() => {
  //     self.run(self);
  //   });
  // }
}
// self.xPos -= self.speed;

//   ES5
// Character.prototype.init = function () {
//   const self = this;
//   window.addEventListener('scroll', () => {
//     self.mainElem.classList.add('running');
//   });
// };
