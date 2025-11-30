// Birthday Website JavaScript

// DOM Elements
const landingPage = document.getElementById("landing-page");
const birthdayPage = document.getElementById("birthday-page");
const cardPage = document.getElementById("card-page");
const candlesContainer = document.getElementById("candles-container");
const confettiContainer = document.getElementById("confetti-container");
const birthdayMusic = document.getElementById("birthday-music");
const landingCake = document.getElementById("landing-cake");

// Number of candles (age)
const numberOfCandles = 29;

// Music state
let musicStarted = false;

// Candle tracking
let candlesBlownOut = 0;
const candlesRemainingDisplay = document.getElementById("candles-remaining");

// Cake movement variables
let cakeAnimationId = null;
let cakeX = 0;
let cakeY = 0;
let cakeSpeedX = 2;
let cakeSpeedY = 2;
const cakeWidth = 200;
const cakeHeight = 200;

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  createCandles();
  createConfetti();
  initCakeMovement();
  updateCandlesRemainingDisplay();
});

// Update the candles remaining display
function updateCandlesRemainingDisplay() {
  const remaining = numberOfCandles - candlesBlownOut;
  if (candlesRemainingDisplay) {
    if (remaining === 0) {
      candlesRemainingDisplay.textContent = "All candles blown out!";
    } else if (remaining === 1) {
      candlesRemainingDisplay.textContent = "1 candle remaining";
    } else {
      candlesRemainingDisplay.textContent = remaining + " candles remaining";
    }
  }
}

// Navigate between pages
function goToPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show the target page
  const targetPage = document.getElementById(pageId);
  targetPage.classList.add("active");

  // Start music when entering birthday page for the first time
  if (pageId === "birthday-page" && !musicStarted) {
    startMusic();
  }
}

// Start the birthday music
function startMusic() {
  if (!musicStarted) {
    birthdayMusic.volume = 0.5;
    birthdayMusic
      .play()
      .then(() => {
        musicStarted = true;
      })
      .catch((error) => {
        console.log("Audio autoplay was prevented:", error);
        // Music will need user interaction to start in some browsers
      });
  }
}

// Create candles dynamically in circular arrangement
function createCandles() {
  const containerSize = 400; // matches .cake-topdown size
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;

  // Dynamically calculate ring distribution based on numberOfCandles
  const rings = calculateRings(numberOfCandles);

  let candleIndex = 0;

  rings.forEach((ring) => {
    for (let i = 0; i < ring.count; i++) {
      if (candleIndex >= numberOfCandles) return;

      const angle = (i / ring.count) * 2 * Math.PI - Math.PI / 2; // Start from top
      const x = centerX + ring.radius * Math.cos(angle) - 8; // -8 to center the 16px candle
      const y = centerY + ring.radius * Math.sin(angle) - 8;

      const candle = document.createElement("div");
      candle.className = "candle";
      candle.setAttribute("data-candle", candleIndex + 1);
      candle.style.left = x + "px";
      candle.style.top = y + "px";

      candle.addEventListener("click", function () {
        blowOutCandle(this);
      });

      candlesContainer.appendChild(candle);
      candleIndex++;
    }
  });
}

// Calculate ring distribution based on total candles
function calculateRings(total) {
  if (total <= 1) {
    return [{ count: total, radius: 0 }];
  } else if (total <= 6) {
    return [{ count: total, radius: 80 }];
  } else if (total <= 14) {
    // Inner ring + outer ring
    const inner = Math.floor(total / 3);
    const outer = total - inner;
    return [
      { count: outer, radius: 140 },
      { count: inner, radius: 60 },
    ];
  } else if (total <= 30) {
    // Three rings
    const inner = Math.min(3, Math.floor(total / 6));
    const middle = Math.min(10, Math.floor((total - inner) / 2));
    const outer = total - inner - middle;
    return [
      { count: outer, radius: 140 },
      { count: middle, radius: 90 },
      { count: inner, radius: 40 },
    ];
  } else {
    // Four rings for larger numbers
    const innermost = Math.min(3, Math.floor(total / 10));
    const inner = Math.min(8, Math.floor((total - innermost) / 4));
    const middle = Math.min(14, Math.floor((total - innermost - inner) / 2));
    const outer = total - innermost - inner - middle;
    return [
      { count: outer, radius: 170 },
      { count: middle, radius: 130 },
      { count: inner, radius: 80 },
      { count: innermost, radius: 30 },
    ];
  }
}

// Blow out a candle
function blowOutCandle(candle) {
  if (candle.classList.contains("blown-out")) return;

  // Add blown out class
  candle.classList.add("blown-out");

  // Add smoke effect
  const smoke = document.createElement("div");
  smoke.className = "smoke";
  candle.appendChild(smoke);

  // Remove smoke after animation
  setTimeout(() => {
    smoke.remove();
  }, 1000);

  // Update counter
  candlesBlownOut++;
  updateCandlesRemainingDisplay();

  // Check if all candles are blown out
  if (candlesBlownOut >= numberOfCandles) {
    // Short delay before going to card page
    setTimeout(() => {
      goToPage("card-page");
    }, 800);
  }
}

// Create confetti animation
function createConfetti() {
  const colors = [
    "#ff69b4",
    "#ffd700",
    "#00ff00",
    "#00bfff",
    "#ff6347",
    "#9370db",
    "#ff1493",
  ];
  const shapes = ["square", "circle"];

  // Create initial confetti
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      createConfettiPiece(colors, shapes);
    }, i * 100);
  }

  // Continue creating confetti
  setInterval(() => {
    createConfettiPiece(colors, shapes);
  }, 200);
}

function createConfettiPiece(colors, shapes) {
  const confetti = document.createElement("div");
  confetti.className = "confetti";

  const color = colors[Math.floor(Math.random() * colors.length)];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const size = Math.random() * 10 + 5;
  const left = Math.random() * 100;
  const duration = Math.random() * 3 + 2;
  const delay = Math.random() * 2;

  confetti.style.backgroundColor = color;
  confetti.style.left = left + "%";
  confetti.style.width = size + "px";
  confetti.style.height = size + "px";
  confetti.style.animationDuration = duration + "s";
  confetti.style.animationDelay = delay + "s";

  if (shape === "circle") {
    confetti.style.borderRadius = "50%";
  }

  confettiContainer.appendChild(confetti);

  // Remove confetti after animation
  setTimeout(
    () => {
      confetti.remove();
    },
    (duration + delay) * 1000,
  );
}

// Initialize cake movement on landing page (DVD screensaver style)
function initCakeMovement() {
  if (!landingCake) return;

  // Set initial position in center
  cakeX = window.innerWidth / 2 - cakeWidth / 2;
  cakeY = window.innerHeight / 2 - cakeHeight / 2;

  // Randomize initial direction
  cakeVelocityX = (Math.random() > 0.5 ? 1 : -1) * cakeSpeedX;
  cakeVelocityY = (Math.random() > 0.5 ? 1 : -1) * cakeSpeedY;

  landingCake.style.left = cakeX + "px";
  landingCake.style.top = cakeY + "px";

  // Start the animation loop
  animateCake();
}

// Animation loop for bouncing cake
function animateCake() {
  if (!landingCake || !landingPage.classList.contains("active")) {
    cakeAnimationId = requestAnimationFrame(animateCake);
    return;
  }

  // Update position
  cakeX += cakeVelocityX;
  cakeY += cakeVelocityY;

  // Get current viewport bounds
  const maxX = window.innerWidth - cakeWidth;
  const maxY = window.innerHeight - cakeHeight;

  // Bounce off right or left edge
  if (cakeX >= maxX) {
    cakeX = maxX;
    cakeVelocityX = -cakeVelocityX;
  } else if (cakeX <= 0) {
    cakeX = 0;
    cakeVelocityX = -cakeVelocityX;
  }

  // Bounce off bottom or top edge
  if (cakeY >= maxY) {
    cakeY = maxY;
    cakeVelocityY = -cakeVelocityY;
  } else if (cakeY <= 0) {
    cakeY = 0;
    cakeVelocityY = -cakeVelocityY;
  }

  // Apply new position
  landingCake.style.left = cakeX + "px";
  landingCake.style.top = cakeY + "px";

  // Continue animation
  cakeAnimationId = requestAnimationFrame(animateCake);
}

// Stop cake movement
function stopCakeMovement() {
  if (cakeAnimationId) {
    cancelAnimationFrame(cakeAnimationId);
    cakeAnimationId = null;
  }
}
