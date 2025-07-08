let display = document.getElementById('display')
        let currentInput = '0'
        let operator = null
        let previousInput = null
        let waitingForNewInput = false

        function updateDisplay() {
            if (currentInput.length > 12) {
                display.textContent = parseFloat(currentInput).toExponential(6)
            } else {
                display.textContent = currentInput
            }
        }

        function inputNumber(num) {
            if (waitingForNewInput) {
                currentInput = num
                waitingForNewInput = false
            } else {
                currentInput = currentInput === '0' ? num : currentInput + num
            }
            updateDisplay()
            clearActiveOperator()
        }

        function inputDecimal() {
            if (waitingForNewInput) {
                currentInput = '0.'
                waitingForNewInput = false
            } else if (currentInput.indexOf('.') === -1) {
                currentInput += '.'
            }
            updateDisplay()
        }

        function inputOperator(op) {
            if (previousInput !== null && operator !== null && !waitingForNewInput) {
                calculate()
            }
            
            previousInput = currentInput
            operator = op
            waitingForNewInput = true
            clearActiveOperator()
            let operatorButtons = document.querySelectorAll('.operator')
            operatorButtons.forEach(btn => {
                if ((op === '+' && btn.textContent === '+') ||
                    (op === '-' && btn.textContent === '−') ||
                    (op === '*' && btn.textContent === '×') ||
                    (op === '/' && btn.textContent === '÷') ||
                    (op === '%' && btn.textContent === '%') ||
                    (op === '^' && btn.textContent === 'x^y')) {
                    btn.classList.add('active')
                }
            })
        }

        function clearActiveOperator() {
            document.querySelectorAll('.operator').forEach(btn => {
                btn.classList.remove('active')
            })
        }

        function calculate() {
            if (operator === null || previousInput === null) 
                return
            
            let prev = parseFloat(previousInput)
            let current = parseFloat(currentInput)
            let result
            
            try {
                switch (operator) {
                    case '+':
                        result = prev + current
                        break
                    case '-':
                        result = prev - current
                        break
                    case '*':
                        result = prev * current
                        break
                    case '/':
                        if (current === 0) {
                            throw new Error('Cannot divide by zero')
                        }
                        result = prev / current
                        break
                    case '%':
                        result = prev % current
                        break
                    case '^':
                        result = Math.pow(prev, current)
                        break
                    default:
                        return
                }
                currentInput = result.toString()
                if (currentInput.length > 12) {
                    currentInput = result.toExponential(6)
                }
                
            } catch (error) {
                currentInput = 'Error'
                display.classList.add('error')
                setTimeout(() => {
                    display.classList.remove('error')
                    clearDisplay()
                }, 2000)
            }
            
            operator = null
            previousInput = null
            waitingForNewInput = true
            updateDisplay()
            clearActiveOperator()
        }

        function clearDisplay() {
            currentInput = '0'
            operator = null
            previousInput = null
            waitingForNewInput = false
            updateDisplay()
            clearActiveOperator()
        }

        function clearEntry() {
            currentInput = '0'
            updateDisplay()
        }
           updateDisplay()

     