// Gerenciamento de tema
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    this.applyTheme()
    this.bindEvents()
  }

  bindEvents() {
    const themeToggle = document.getElementById("themeToggle")
    themeToggle.addEventListener("click", () => {
      this.toggleTheme()
    })
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light"
    this.applyTheme()
    localStorage.setItem("theme", this.theme)
  }

  applyTheme() {
    if (this.theme === "dark") {
      document.body.classList.add("dark-theme")
      document.getElementById("themeToggle").textContent = "☀️"
    } else {
      document.body.classList.remove("dark-theme")
      document.getElementById("themeToggle").textContent = "🌙"
    }
  }
}

// Registro do Service Worker para PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registrado: ", registration)
      })
      .catch((registrationError) => {
        console.log("Falha no registro do SW: ", registrationError)
      })
  })
}

// Inicializar gerenciador de tema
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager()
})

// Prevenir zoom em duplo toque (iOS Safari)
let lastTouchEnd = 0
document.addEventListener(
  "touchend",
  (event) => {
    const now = new Date().getTime()
    if (now - lastTouchEnd <= 300) {
      event.preventDefault()
    }
    lastTouchEnd = now
  },
  false,
)

// Feedback háptico para dispositivos suportados
function hapticFeedback() {
  if (navigator.vibrate) {
    navigator.vibrate(10)
  }
}

// Adicionar feedback háptico aos botões
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", hapticFeedback)
  })
})
