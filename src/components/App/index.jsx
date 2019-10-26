import React, { Component } from 'react';
import Layout from '../Layout';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: 0,
      result: '',
      inputArray: []
    };
  }

  resultCalculation = array => {
    while (array.length !== 1) {
      if (array.indexOf('*') >= 0) {
        array = this.calculate('*', array);
      } else if (array.indexOf('/') >= 0) {
        array = this.calculate('/', array);
      } else if (array.indexOf('-') >= 0) {
        array = this.calculate('-', array);
      } else if ('+') {
        array = this.calculate('+', array);
      }
    }
    let resultCalculated = array[0];
    if (resultCalculated === -Infinity) {
      resultCalculated = Infinity;
    }
    this.setState({
      inputArray: [],
      inputValue: '' + resultCalculated,
      result: resultCalculated
    });
  };

  calculate = (op, array) => {
    // calculates entered data present as Array and saves the result in it

    let temp = 0;
    switch (op) {
      case '*':
        temp =
          parseFloat(array[array.indexOf(op) - 1]) *
          parseFloat(array[array.indexOf(op) + 1]);
        temp = Math.round(temp * 100000000) / 100000000;
        break;
      case '/':
        temp =
          parseFloat(array[array.indexOf(op) - 1]) /
          parseFloat(array[array.indexOf(op) + 1]);
        temp = Math.round(temp * 100000000) / 100000000;
        break;
      case '+':
        temp =
          parseFloat(array[array.indexOf(op) - 1]) +
          parseFloat(array[array.indexOf(op) + 1]);
        temp = Math.round(temp * 100000000) / 100000000;
        break;
      case '-':
        temp =
          parseFloat(array[array.indexOf(op) - 1]) -
          parseFloat(array[array.indexOf(op) + 1]);
        temp = Math.round(temp * 100000000) / 100000000;
        break;
      default:
        break;
    }

    const retArr = array
      .slice(0, array.indexOf(op) - 1)
      .concat(temp)
      .concat(array.slice(array.indexOf(op) + 2, array.length));
    return retArr;
  };

  filterInput = value => {
    let numArray = [];
    let havePoint = -1;
    let haveSign = '';
    if (value[0] === '-' || value[0] === '+') {
      haveSign = value[0];
    }
    if (value.indexOf('.') > -1) {
      havePoint = '' + (value.indexOf('.') - 1);
    }
    value = value.replace(/\D/g, '');
    value = haveSign + value;
    for (let i in value) {
      numArray.push(value[i]);
      if (i === havePoint) {
        numArray.push('.');
      }
    }
    value = numArray.join('');

    // No multiple zeroes upfront

    if (value.indexOf('.') < 0) {
      value = '' + parseFloat(value);
    }
    this.setState({ inputValue: value });
  };

  checkNumber = value => {
    // Returns true if a number with (+/-) sign and single dot in it

    return /^[+-]?(?=.)\d*(?:\.)?(?:\d+)?$/.test(value);
  };

  checkOperator = value => {
    // returns true for (+ or - or * or /)

    return /^[+\-*/]{1}$/.test(value);
  };

  handleNumber = value => {
    const { inputValue, inputArray } = this.state;

    if (this.checkOperator(inputValue)) {
      // if operator is present in display

      if (inputValue === '-') {
        if (this.checkNumber(inputArray[inputArray.length - 1])) {
          this.setState({ inputArray: [...inputArray, inputValue] });
          if (value === '.') {
            this.filterInput('0.');
          } else {
            this.filterInput(value);
          }
        } else {
          if (value === '.') {
            value = '0.';
          }
          this.filterInput(inputValue + value);
        }
      } else {
        if (this.checkNumber(inputArray[inputArray.length - 1])) {
          this.setState({ inputArray: [...inputArray, inputValue] });
          if (value === '.') {
            this.filterInput('0.');
          } else {
            this.filterInput(value);
          }
        } else if (this.checkOperator(inputArray[inputArray.length - 1])) {
          const newArr = inputArray
            .slice(0, inputArray.length - 1)
            .concat(inputValue);
          this.setState({ inputArray: newArr, inputValue: value });
        } else {
          this.filterInput(value);
        }
      }
    } else {
      // if numbers(with sign & point) are entered without any operator

      if (!inputValue && value === '.') {
        this.filterInput('0.');
      } else {
        this.filterInput(inputValue + value);
      }
    }
  };

  handleOperator = value => {
    const { inputValue, inputArray, result } = this.state;

    if (inputValue) {
      if (this.checkOperator(inputValue)) {
        this.setState({ inputValue: value });
      } else if (this.checkNumber(inputValue)) {
        if (result !== '') {
          this.setState({
            inputArray: [inputValue],
            inputValue: value,
            result: ''
          });
        } else {
          if (!this.checkNumber(inputArray[inputArray.length - 1])) {
            if (inputValue === '0.') {
              this.setState({
                inputArray: [...inputArray, '0'],
                inputValue: value
              });
            } else {
              this.setState({
                inputArray: [...inputArray, inputValue],
                inputValue: value
              });
            }
          }
        }
      }
    }
  };

  handleButtonInput = value => {
    const { inputValue, inputArray } = this.state;
    switch (value) {
      case 'C':
        // Clears all data

        this.setState({
          inputValue: 0,
          inputArray: [],
          result: ''
        });
        break;
      case 'd':
        // Deletes last input
        
        let input;
        if (inputValue === 0 && inputArray.length === 0) {
          input = 0;
        } else {
          input = inputValue.split('');
          input.splice(input.length - 1, 1);
          input = input.join('');
          if (input === '') {
            input = '0';
          }
        }
        this.setState({ inputValue: input });
        break;
      case '%':
        // Calculate percentage

        if (this.checkNumber(inputValue)) {
          let value = parseFloat(inputValue);
          value = value / 100;
          value = '' + value;
          this.setState({ inputValue: value });
        }
        break;
      case '=':
        // Calculate ultimate result
        if (
          this.checkNumber(inputValue) &&
          this.checkOperator(inputArray[inputArray.length - 1])
        ) {
          const newArr =
            inputValue === '0.'
              ? [...inputArray, '0']
              : [...inputArray, inputValue];
          this.setState({ inputArray: newArr });

          this.resultCalculation(newArr);
        }
        break;

      case '-':
        if (!inputValue) {
          this.setState({ inputValue: '-' });
        } else {
          if (this.checkNumber(inputValue)) {
            this.handleOperator(value);
          } else if (this.checkOperator(inputValue)) {
            if (this.checkNumber(inputArray[inputArray.length - 1])) {
              this.setState({
                inputArray: [...inputArray, inputValue],
                inputValue: value
              });
            } else {
              this.handleOperator(value);
            }
          }
        }
        break;
      case '+':
      case '*':
      case '/':
        // Operator inputs handler

        this.handleOperator(value);
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '.':
      case '9':
        // Number inputs handler
        this.handleNumber(value);

        break;
      default:
        break;
    }
  };

  firstDotInput = (inputValue, value) => {
    return !inputValue && value === '.';
  };

  render() {
    const { inputValue, inputArray } = this.state;
    return (
      <div>
        <Layout
          handleButtonInput={this.handleButtonInput}
          inputValue={inputValue}
          inputArray={inputArray}
        />
      </div>
    );
  }
}

export default App;
