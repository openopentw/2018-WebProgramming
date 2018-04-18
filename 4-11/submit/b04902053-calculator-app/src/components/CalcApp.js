import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOp: 0, // num: 0, op: 1
      op: 3,
      lastNum: 0,
      num: 0,
      displayNum: 0,
      afterEqual: 0
    };
  }

  addNum(n) {
    if (this.state.afterEqual === 1) {
      this.setState({
        num: n,
        displayNum: n,
        afterEqual: 0
      })
    } else {
      const newNum = this.state.num * 10 + n
      this.setState({
        num: newNum,
        displayNum: newNum
      })
    }
    if (this.state.numOp === 1) {
      this.setState({
        numOp: 0
      })
    }
  }

  calcOp(op) {
    if (this.state.numOp === 0) {
      const lastOp = this.state.op
      let newLastNum = 0
      if (lastOp === 0) {        // /
        newLastNum = Math.floor(this.state.lastNum / this.state.num)
      } else if (lastOp === 1) { // *
        newLastNum = this.state.lastNum * this.state.num
      } else if (lastOp === 2) { // -
        newLastNum = this.state.lastNum - this.state.num
      } else if (lastOp === 3) { // +
        newLastNum = this.state.lastNum + this.state.num
      } else { //lastOp === 4    // =
        console.log('BUG!')
      }

      if (op !== 4) {
        this.setState({
          numOp: 1,
          op: op,
          lastNum: newLastNum,
          num: 0,
          displayNum: newLastNum,
          afterEqual: 0
        })
      } else {
        this.setState({
          numOp: 0,
          op: 3,
          lastNum: 0,
          num: newLastNum,
          displayNum: newLastNum,
          afterEqual: 1
        })
      }
    } else { // numOp === 1
      if (op !== 4) {
        this.setState({
          op: op,
          afterEqual: 0
        })
      } else {
        const num = this.state.displayNum
        this.setState({
          numOp: 0,
          op: 3,
          lastNum: 0,
          num: num,
          displayNum: num,
          afterEqual: 1
        })
      }
    }
  }

  resetState() {
    this.setState({
      numOp: 0,
      op: 3,
      lastNum: 0,
      num: 0,
      displayNum: 0
    })
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.displayNum}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState.bind(this)} children={'AC'} />
            <CalcButton onClick={this.showNotImplemented.bind(this)} children={'+/-'} />
            <CalcButton onClick={this.showNotImplemented.bind(this)} children={'%'} />
            <CalcButton className="calc-operator" children='÷' onClick={() => this.calcOp(0)} />
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" children={'7'} onClick={() => this.addNum(7)} />
            <CalcButton className="calc-number" children={'8'} onClick={() => this.addNum(8)} />
            <CalcButton className="calc-number" children={'9'} onClick={() => this.addNum(9)} />
            <CalcButton className="calc-operator" children='x' onClick={() => this.calcOp(1)} />
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" children={'4'} onClick={() => this.addNum(4)} />
            <CalcButton className="calc-number" children={'5'} onClick={() => this.addNum(5)} />
            <CalcButton className="calc-number" children={'6'} onClick={() => this.addNum(6)} />
            <CalcButton className="calc-operator" children='-' onClick={() => this.calcOp(2)} />
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" children={'1'} onClick={() => this.addNum(1)} />
            <CalcButton className="calc-number" children={'2'} onClick={() => this.addNum(2)} />
            <CalcButton className="calc-number" children={'3'} onClick={() => this.addNum(3)} />
            <CalcButton className="calc-operator" children='+' onClick={() => this.calcOp(3)} />
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number bigger-btn" children={'0'} onClick={() => this.addNum(0)} />
            <CalcButton className="calc-number" children={'.'} />
            <CalcButton className="calc-operator" children='=' onClick={() => this.calcOp(4)} />
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
