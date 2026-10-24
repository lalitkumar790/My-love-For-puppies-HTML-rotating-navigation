(() => {
  "use strict";

  const page = document.getElementById("page");
  const openButton = document.getElementById("open");
  const closeButton = document.getElementById("close");
  const navigation = document.getElementById("site-navigation");
  const stage = document.getElementById("puppy-stage");
  const puppyButton = document.getElementById("puppy-character");
  const message = document.getElementById("puppy-message");
  const petButton = document.getElementById("pet-button");
  const treatButton = document.getElementById("treat-button");
  const fetchButton = document.getElementById("fetch-button");
  const fetchBall = document.getElementById("fetch-ball");
  const fetchYard = document.getElementById("fetch-yard");
  const fetchPuppy = document.getElementById("fetch-puppy");
  const gameStatus = document.getElementById("game-status");
  const treatCount = document.getElementById("treat-count");
  const fetchCount = document.getElementById("fetch-count");
  const happinessValue = document.getElementById("happiness-value");
  const nameInput = document.getElementById("puppy-name");
  const nameLabel = document.getElementById("puppy-name-label");
  const renameButton = document.getElementById("rename-button");
  const toast = document.getElementById("toast");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const state = {
    name: "Biscuit",
    mood: "curious",
    treats: 0,
    fetches: 0,
    happiness: 100,
    busy: false,
    toastTimeout: null,
    messageTimeout: null,
    idleTimeout: null
  };

  const messages = {
    idle: ["Hey! Got a treat for me?", "I heard something! Was that you?", "Life is better with belly rubs.", "I am 90% fluff and 10% mischief."],
    happy: ["BEST. DAY. EVER!", "Tail wag activated!", "You're my favorite human.", "If I could hug you, I would."],
    pet: ["Ohhh, right behind the ears!", "More cuddles, please.", "This is my happy face.", "You have excellent petting skills."],
    treat: ["Crunch crunch... delicious!", "I knew you were the best.", "Can I have one more?", "Five stars. Excellent snack."],
    fetch: ["I'll get it!", "Did you see how fast I was?", "Ball acquired. Returning with pride."]
  };

  function randomMessage(type) {
    const options = messages[type] || messages.idle;
    return options[Math.floor(Math.random() * options.length)];
  }

  function say(text, duration = 2600) {
    message.textContent = text;
    window.clearTimeout(state.messageTimeout);
    state.messageTimeout = window.setTimeout(() => {
      if (!state.busy) message.textContent = randomMessage("idle");
    }, duration);
  }

  function react(className, mood, text, duration = 1250) {
    if (state.busy && className !== "is-eating") return;
    stage.classList.remove("is-happy", "is-petting", "is-eating", "is-sleepy");
    void stage.offsetWidth;
    stage.classList.add(className);
    state.mood = mood;
    say(text);
    window.clearTimeout(state.idleTimeout);
    state.idleTimeout = window.setTimeout(() => {
      stage.classList.remove(className);
      state.mood = "curious";
    }, duration);
  }

  function updateStats() {
    treatCount.textContent = String(state.treats);
    fetchCount.textContent = String(state.fetches);
    happinessValue.textContent = state.happiness + "%";
  }

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add("is-visible");
    window.clearTimeout(state.toastTimeout);
    state.toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  function setNavigation(isOpen) {
    page.classList.toggle("show-nav", isOpen);
    openButton.setAttribute("aria-expanded", String(isOpen));
    navigation.inert = !isOpen;
    if (isOpen) {
      closeButton.focus({ preventScroll: true });
    } else if (document.activeElement === closeButton) {
      openButton.focus({ preventScroll: true });
    }
  }

  openButton.addEventListener("click", () => setNavigation(true));
  closeButton.addEventListener("click", () => setNavigation(false));

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setNavigation(false));
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && page.classList.contains("show-nav")) setNavigation(false);
  });

  petButton.addEventListener("click", () => {
    if (state.busy) return;
    react("is-petting", "loved", randomMessage("pet"), 1500);
    state.happiness = Math.min(100, state.happiness + 3);
    updateStats();
  });

  treatButton.addEventListener("click", () => {
    if (state.busy) return;
    state.treats += 1;
    state.happiness = Math.min(100, state.happiness + 5);
    react("is-eating", "delighted", randomMessage("treat"), 1400);
    updateStats();
    showToast("Treat delivered. Tail wag guaranteed. 🦴");
  });

  puppyButton.addEventListener("click", () => {
    if (state.busy) return;
    react("is-happy", "excited", randomMessage("happy"), 1300);
    state.happiness = Math.min(100, state.happiness + 2);
    updateStats();
  });

  function playFetch() {
    if (state.busy) {
      showToast("One fetch at a time — Biscuit has four paws, not eight!");
      return;
    }

    state.busy = true;
    fetchButton.disabled = true;
    fetchBall.disabled = true;
    fetchYard.classList.remove("is-running", "is-returning", "is-celebrating");
    const puppyRect = fetchPuppy.getBoundingClientRect();
    const ballRect = fetchBall.getBoundingClientRect();
    const travel = Math.max(0, ballRect.left + ballRect.width / 2 - (puppyRect.left + puppyRect.width / 2));
    fetchYard.style.setProperty("--run-distance", travel + "px");
    gameStatus.textContent = state.name + " is on the case!";
    say(randomMessage("fetch"), 3500);
    fetchYard.classList.add("is-running");

    const runDuration = reducedMotion.matches ? 50 : 900;
    window.setTimeout(() => {
      fetchYard.classList.remove("is-running");
      fetchYard.classList.add("is-returning");
      gameStatus.textContent = "Ball found! Bringing it right back…";
      const returnDuration = reducedMotion.matches ? 50 : 900;

      window.setTimeout(() => {
        fetchYard.classList.remove("is-returning");
        fetchYard.classList.add("is-celebrating");
        state.fetches += 1;
        state.happiness = Math.min(100, state.happiness + 8);
        updateStats();
        gameStatus.textContent = "A perfect fetch. " + state.name + " is very proud.";
        say("Ball acquired. Returning with pride!", 2000);

        window.setTimeout(() => {
          fetchYard.classList.remove("is-celebrating");
          state.busy = false;
          fetchButton.disabled = false;
          fetchBall.disabled = false;
          gameStatus.textContent = "Ready for another round?";
          message.textContent = randomMessage("idle");
        }, reducedMotion.matches ? 50 : 650);
      }, returnDuration);
    }, runDuration);
  }

  fetchButton.addEventListener("click", playFetch);
  fetchBall.addEventListener("click", playFetch);

  renameButton.addEventListener("click", () => {
    const newName = nameInput.value.trim().replace(/\s+/g, " ").slice(0, 18);
    if (!newName) {
      showToast("Type a nickname first. Biscuit is listening!");
      nameInput.focus();
      return;
    }
    state.name = newName;
    nameLabel.textContent = newName;
    nameInput.value = "";
    try {
      window.localStorage.setItem("puppy-playground-name", newName);
    } catch (_) { /* The experience works without storage. */ }
    say("A new name! I love it. Hi, I'm " + newName + "!");
    showToast("Hello, " + newName + "! 🐾");
  });

  try {
    const savedName = window.localStorage.getItem("puppy-playground-name");
    if (savedName && savedName.trim()) {
      state.name = savedName.trim().slice(0, 18);
      nameLabel.textContent = state.name;
    }
  } catch (_) { /* Private browsing or disabled storage is fine. */ }

  // Keep the original rotating navigation keyboard-friendly and functional on touch devices.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) fetchYard.style.removeProperty("--run-distance");
  }, { passive: true });

  updateStats();
})();
