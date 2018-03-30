import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Counter extends Component {
  constructor (props) {
    super(props)
    this.state = {num: 100}

    this.incNum = this.incNum.bind(this)
    this.decNum = this.decNum.bind(this)
  }

  incNum () {
    this.setState({num: this.state.num + 1})
  }

  decNum () {
    this.setState({num: this.state.num - 1})
  }

  render () {
    return (
      <div>
        <h2>{this.state.num}</h2>
        <button onClick={this.incNum}>+</button>
        <button onClick={this.decNum}>-</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
)
