class Calculator {
  constructor() {
    this.expression = "6000/2+3227*2"
    this.result = "12,454"
    this.shouldResetDisplay = false
    this.angleMode = "deg"

    this.expressionElement = document.getElementById("expression")
    this.resultElement = document.getElementById("result")

    this.init()
  }

  init() {
    this.bindEvents()
    this.updateDisplay()
  }

  bindEvents() {
    const buttons = document.querySelectorAll(".btn")
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const action = e.target.dataset.action
        this.handleInput(action)
      })
    })

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      this.handleKeyboard(e)
    })
  }

  handleKeyboard(e) {
    const key = e.key

    if (key >= "0" && key <= "9") {
      this.handleInput(key)
    } else if (["+", "-", "*", "/"].includes(key)) {
      this.handleInput(key)
    } else if (key === "Enter" || key === "=") {
      this.handleInput("=")
    } else if (key === "Escape") {
      this.handleInput("ac")
    } else if (key === "Backspace") {
      this.handleInput("ci")
    } else if (key === ".") {
      this.handleInput(".")
    }
  }

  handleInput(action) {
    switch (action) {
      case "ac":
        this.clear()
        break
      case "ci":
        this.clearInput()
        break
      case "=":
        this.calculate()
        break
      case "+":
      case "-":
      case "*":
      case "/":
        this.handleOperator(action)
        break
      case ".":
        this.handleDecimal()
        break
      case "sin":
        this.handleFunction("sin")
        break
      case "deg":
        this.toggleAngleMode()
        break
      case "e":
        this.handleConstant("e")
        break
      case "μ":
        this.handleConstant("μ")
        break
      default:
        if (!isNaN(action)) {
          this.handleNumber(action)
        }
    }

    this.updateDisplay()
  }

  handleNumber(num) {
    if (this.shouldResetDisplay) {
      this.expression = ""
      this.result = "0"
      this.shouldResetDisplay = false
    }

    if (this.result === "0" || this.result === "12,454") {
      this.result = num
    } else {
      this.result += num
    }

    if (this.expression === "6000/2+3227*2") {
      this.expression = num
    } else {
      this.expression = this.expression.replace(/[0-9.]+$/, "") + this.result
    }
  }

  handleOperator(operator) {
    if (this.shouldResetDisplay) {
      this.shouldResetDisplay = false
    }

    if (this.expression && !this.isLastCharOperator()) {
      this.calculate()
    }

    this.expression += operator
    this.result = "0"
  }

  handleDecimal() {
    if (this.shouldResetDisplay) {
      this.expression = ""
      this.result = "0"
      this.shouldResetDisplay = false
    }

    if (!this.result.includes(".")) {
      this.result += "."
      this.expression = this.expression.replace(/[0-9.]+$/, "") + this.result
    }
  }

  handleFunction(func) {
    const currentValue = Number.parseFloat(this.result.replace(",", "."))
    let result

    switch (func) {
      case "sin":
        const angle = this.angleMode === "deg" ? (currentValue * Math.PI) / 180 : currentValue
        result = Math.sin(angle)
        break
    }

    this.result = this.formatNumber(result)
    this.expression = `${func}(${currentValue})`
    this.shouldResetDisplay = true
  }

  handleConstant(constant) {
    switch (constant) {
      case "e":
        this.result = this.formatNumber(Math.E)
        this.expression = "e"
        break
      case "μ":
        this.result = "0,000001"
        this.expression = "μ"
        break
    }
    this.shouldResetDisplay = true
  }

  toggleAngleMode() {
    this.angleMode = this.angleMode === "deg" ? "rad" : "deg"
    // Poderia atualizar o texto do botão aqui se necessário
  }

  calculate() {
    if (!this.expression) return

    try {
      // Substituir vírgulas por pontos para cálculos
      const expr = this.expression.replace(/,/g, ".")

      // Avaliar a expressão
      const result = Function('"use strict"; return (' + expr + ")")()

      this.result = this.formatNumber(result)
      this.shouldResetDisplay = true
    } catch (error) {
      this.result = "Erro"
      this.shouldResetDisplay = true
    }
  }

  clear() {
    this.expression = ""
    this.result = "0"
    this.shouldResetDisplay = false
  }

  clearInput() {
    if (this.result.length > 1) {
      this.result = this.result.slice(0, -1)
      this.expression = this.expression.slice(0, -1)
    } else {
      this.result = "0"
      this.expression = this.expression.replace(/[0-9.]+$/, "")
    }
  }

  isLastCharOperator() {
    const lastChar = this.expression.slice(-1)
    return ["+", "-", "*", "/"].includes(lastChar)
  }

  formatNumber(num) {
    if (isNaN(num) || !isFinite(num)) return "Erro"

    // Formatar com vírgulas para milhares (padrão brasileiro)
    const formatted = Number.parseFloat(num.toFixed(10))
      .toString()
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    return formatted
  }

  updateDisplay() {
    this.expressionElement.textContent = this.expression || ""
    this.resultElement.textContent = this.expression ? `=${this.result}` : this.result
  }
}

// Inicializar calculadora quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new Calculator()
})
