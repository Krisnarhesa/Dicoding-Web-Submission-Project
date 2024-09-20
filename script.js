function toggleMenu() {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("active");
}

const backgrounds = ["images/background.jpg", "images/background2.jpg"];
function changeBackground() {
  const index = Math.floor(Math.random() * backgrounds.length);
  document.querySelector(".home").style.backgroundImage =
    "url(" + backgrounds[index] + ")";
}
setInterval(changeBackground, 5000);

document.addEventListener("DOMContentLoaded", function () {
  changeBackground();
});

window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

const topPageButton = document.querySelector(".top-page");
topPageButton.style.display = "none";
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    topPageButton.style.display = "block";
    setTimeout(() => topPageButton.classList.add("show"), 10);
  } else {
    topPageButton.classList.remove("show");
    setTimeout(() => {
      if (!topPageButton.classList.contains("show")) {
        topPageButton.style.display = "none";
      }
    }, 300);
  }
});

function smoothScrollToTop(duration) {
  const start = window.scrollY;
  const startTime = performance.now();

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easing = 0.5 - Math.cos(progress * Math.PI) / 2;

    window.scrollTo(0, start * (1 - easing));

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

topPageButton.addEventListener("click", function () {
  smoothScrollToTop(1000);
});

const silentSoundDiv = document.getElementById("silentSoundDiv");
const silentIcon = document.getElementById("silentIcon");
const unsilentIcon = document.getElementById("unsilentIcon");
const audioPlayer = document.getElementById("audioPlayer");

function updateIcon() {
  if (audioPlayer.muted) {
    silentIcon.style.display = "block";
    unsilentIcon.style.display = "none";
  } else {
    silentIcon.style.display = "none";
    unsilentIcon.style.display = "block";
  }
}

audioPlayer.addEventListener("play", () => {
  silentSoundDiv.style.display = "flex";
  updateIcon();
});

silentSoundDiv.addEventListener("click", () => {
  audioPlayer.muted = !audioPlayer.muted;
  updateIcon();
});

if (!audioPlayer.paused) {
  silentSoundDiv.style.display = "flex";
  updateIcon();
}
