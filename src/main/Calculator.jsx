import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) { //função utilizada para receber o segundo item do array
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '=' //Usado para identificar que  o usuário clicou no igual
            const currentOperation = this.state.operation //utilizo para pegar uma possível segunda operação

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) //realizando a operação
            } catch(e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0 //zerando o indice um após a operação

            this.setState({
                displayValue: values[0], //armazenando a operação no display
                operation: equals ? null : operation, //Se a operação for a final com equals então nulo, se uma outra operação então prossegue
                current: equals ? 0 : 1, //se o usuario colocou equals então segue o 0, se não segue o segundo valor
                clearDisplay: !equals, //se for diferente de equals ele limpa o display
                values //para passar o s valores
            })
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) { //regra utilizada para não colocar duas virgulas no número
            return 
        }

        const clearDisplay = this.state.displayValue === '0' //regra para não carregar o Zero inicial para o número
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') { //se for diferente de ponto
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
                
            </div>
        )
    }
}