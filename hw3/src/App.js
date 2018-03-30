/* Structures:
 *
 * HTML Structure:
 *
 * # App
 * ## Nav
 * ### TotCnt
 * ### NavUl
 * #### NavLi
 * ## Content
 * ### TodoUl
 * #### TodoLi
 * #### TodoFooter
 *
 * Data Structure:
 *
 * # TodoData
 * ## TodoDataItem
 *
 */

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './App.css'

class TotCnt extends Component {
  render () {
    return (
      <div className="nav-tot-cnt">
        <span>{this.props.comple}</span>
        &nbsp;/&nbsp;
        <span>{this.props.tot}</span>
        &nbsp;items left in total.
      </div>
    )
  }
}

TotCnt.propTypes = {
  comple: PropTypes.number,
  tot: PropTypes.number
}

class NavLi extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isHovered: false
    }

    this.listenNavLiOnMouseEnter = this.listenNavLiOnMouseEnter.bind(this)
    this.listenNavLiOnMouseLeave = this.listenNavLiOnMouseLeave.bind(this)
  }

  listenNavLiOnMouseEnter () {
    this.setState({
      isHovered: true
    })
  }

  listenNavLiOnMouseLeave () {
    this.setState({
      isHovered: false
    })
  }

  render () {
    return (
      <li
        className={this.props.isActive ? 'active' : null}
        data-id={this.props.dataId}
        onMouseEnter={this.listenNavLiOnMouseEnter}
        onMouseLeave={this.listenNavLiOnMouseLeave}
      >
        <a
          onClick={this.props.listenNavLiClick}
        >
          {this.props.todoDataName}
        </a>
        <button
          className="list-remove"
          style={{display: this.state.isHovered ? 'block' : null}}
          onClick={this.props.listenNavLiBtnRemoveClick}
        >
          ×
        </button>
      </li>
    )
  }
}

NavLi.propTypes = {
  isActive: PropTypes.bool,
  todoDataName: PropTypes.string,
  dataId: PropTypes.number,
  listenNavLiClick: PropTypes.func,
  listenNavLiBtnRemoveClick: PropTypes.func
}

class NavUl extends Component {
  render () {
    let navLiList = []
    for (let i = 0; i < this.props.todoDataList.length; ++i) {
      if (this.props.todoDataList[i] !== undefined) {
        navLiList.push(
          <NavLi
            isActive={this.props.todoDataList[i].id === this.props.activeId}
            todoDataName={this.props.todoDataList[i].name}
            dataId={this.props.todoDataList[i].id}
            listenNavLiClick={this.props.listenNavLiClick}
            listenNavLiBtnRemoveClick={this.props.listenNavLiBtnRemoveClick}
            key={this.props.todoDataList[i].id}
          />
        )
      }
    }

    return (
      <ul>
        {navLiList}
        <li>
          <button
            id="nav-list-add"
            onClick={this.props.listenNavLiNewListClick}
          >
            ✚ New List
          </button>
        </li>
      </ul>
    )
  }
}

NavUl.propTypes = {
  activeId: PropTypes.number,
  todoDataList: PropTypes.array,
  listenNavLiClick: PropTypes.func,
  listenNavLiNewListClick: PropTypes.func,
  listenNavLiBtnRemoveClick: PropTypes.func
}

class Nav extends Component {
  render () {
    // count number of comple and tot
    let comple = 0
    let tot = 0
    for (let i = 0; i < this.props.todoDataList.length; ++i) {
      if (this.props.todoDataList[i] !== undefined) {
        for (let j = 0; j < this.props.todoDataList[i].list.length; ++j) {
          if (this.props.todoDataList[i].list[j] !== undefined) {
            ++tot
            if (!this.props.todoDataList[i].list[j].isChecked) {
              ++comple
            }
          }
        }
      }
    }

    return (
      <nav>
        <TotCnt
          comple={comple}
          tot={tot}
        />
        <NavUl
          activeId={this.props.activeId}
          todoDataList={this.props.todoDataList}
          listenNavLiClick={this.props.listenNavLiClick}
          listenNavLiNewListClick={this.props.listenNavLiNewListClick}
          listenNavLiBtnRemoveClick={this.props.listenNavLiBtnRemoveClick}
        />
      </nav>
    )
  }
}

Nav.propTypes = {
  activeId: PropTypes.number,
  todoDataList: PropTypes.array,
  listenNavLiClick: PropTypes.func,
  listenNavLiNewListClick: PropTypes.func,
  listenNavLiBtnRemoveClick: PropTypes.func
}

class TodoLi extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isHovered: false
    }

    this.listenNavLiOnMouseEnter = this.listenNavLiOnMouseEnter.bind(this)
    this.listenNavLiOnMouseLeave = this.listenNavLiOnMouseLeave.bind(this)
  }

  listenNavLiOnMouseEnter () {
    this.setState({
      isHovered: true
    })
  }

  listenNavLiOnMouseLeave () {
    this.setState({
      isHovered: false
    })
  }

  render () {
    return (
      <li
        className="todo-item"
        data-id={this.props.dataId}
        onMouseEnter={this.listenNavLiOnMouseEnter}
        onMouseLeave={this.listenNavLiOnMouseLeave}
      >
        <input
          type="checkbox"
          className="todo-check"
          checked={this.props.isChecked ? 'checked' : ''}
          onChange={this.props.listenContentTodoLiCheckChange}
        />
        <input
          type="text"
          className="todo-edit"
          value={this.props.todoDataItemName}
          onChange={this.props.listenContentTodoLiTextChange}
          onFocus={(e) => {e.target.select()}}
        />
        <button
          className="todo-remove"
          style={{display: this.state.isHovered ? 'block' : null}}
          onClick={this.props.listenContentTodoLiBtnRemoveClick}
        >
          ×
        </button>
      </li>
    )
  }
}

TodoLi.propTypes = {
  isChecked: PropTypes.bool,
  todoDataItemName: PropTypes.string,
  dataId: PropTypes.number,
  listenContentTodoLiCheckChange: PropTypes.func,
  listenContentTodoLiTextChange: PropTypes.func,
  listenContentTodoLiBtnRemoveClick: PropTypes.func
}

class TodoFooter extends Component {
  render () {
    return (
      <li className="todo-item footer">
        <div id="sum"><span>{this.props.itemHere}</span> items here.</div>
        <div id="filters">
          <button
            id="btn-all"
            className={this.props.todoFooterMode === 0 ? 'active' : null}
            data-id="0"
            onClick={this.props.toggleTodoFooterMode}
          >
            All
          </button>
          <button
            id="btn-active"
            className={this.props.todoFooterMode === 1 ? 'active' : null}
            data-id="1"
            onClick={this.props.toggleTodoFooterMode}
          >
            Active
          </button>
          <button
            id="btn-comple"
            className={this.props.todoFooterMode === 2 ? 'active' : null}
            data-id="2"
            onClick={this.props.toggleTodoFooterMode}
          >
            Completed
          </button>
        </div>
      </li>
    )
  }
}

TodoFooter.propTypes = {
  itemHere: PropTypes.number,
  todoFooterMode: PropTypes.number,
  toggleTodoFooterMode: PropTypes.func
}

class TodoUl extends Component {
  render () {
    let todoLiList = []
    for (let i = 0; i < this.props.todoDataItemList.length; ++i) {
      if (this.props.todoDataItemList[i] !== undefined) {
        if (this.props.todoFooterMode === 0 ||
          (this.props.todoFooterMode === 1 && this.props.todoDataItemList[i].isChecked === false) ||
          (this.props.todoFooterMode === 2 && this.props.todoDataItemList[i].isChecked === true)) {
          todoLiList.push(
            <TodoLi
              isChecked={this.props.todoDataItemList[i].isChecked}
              todoDataItemName={this.props.todoDataItemList[i].name}
              dataId={this.props.todoDataItemList[i].id}
              listenContentTodoLiCheckChange={this.props.listenContentTodoLiCheckChange}
              listenContentTodoLiTextChange={this.props.listenContentTodoLiTextChange}
              listenContentTodoLiBtnRemoveClick={this.props.listenContentTodoLiBtnRemoveClick}
              key={this.props.todoDataItemList[i].id}
            />
          )
        }
      }
    }

    return (
      <ul>
        <li className="todo-item">
          <form
            onSubmit={this.props.listenContentAddTodoChange}
          >
            <input
              type="text"
              id="todo-add"
              placeholder="Add a to-do"
            />
          </form>
        </li>
        {todoLiList}
        <TodoFooter
          itemHere={todoLiList.length}
          todoFooterMode={this.props.todoFooterMode}
          toggleTodoFooterMode={this.props.toggleTodoFooterMode}
        />
      </ul>
    )
  }
}

TodoUl.propTypes = {
  todoDataItemList: PropTypes.array,
  todoFooterMode: PropTypes.number,
  listenContentAddTodoChange: PropTypes.func,
  listenContentTodoLiCheckChange: PropTypes.func,
  listenContentTodoLiTextChange: PropTypes.func,
  listenContentTodoLiBtnRemoveClick: PropTypes.func,
  toggleTodoFooterMode: PropTypes.func
}

class Content extends Component {
  render () {
    return (
      <div id="todo">
        <h2>
          <input
            id="h2-input"
            type="text"
            value={this.props.todoDataName}
            onChange={this.props.listenContentH2Change}
            onFocus={(e) => {e.target.select()}}
          />
        </h2>
        <TodoUl
          todoDataItemList={this.props.todoDataItemList}
          todoFooterMode={this.props.todoFooterMode}
          listenContentAddTodoChange={this.props.listenContentAddTodoChange}
          listenContentTodoLiCheckChange={this.props.listenContentTodoLiCheckChange}
          listenContentTodoLiTextChange={this.props.listenContentTodoLiTextChange}
          listenContentTodoLiBtnRemoveClick={this.props.listenContentTodoLiBtnRemoveClick}
          toggleTodoFooterMode={this.props.toggleTodoFooterMode}
        />
      </div>
    )
  }
}

Content.propTypes = {
  todoDataName: PropTypes.string,
  todoDataItemList: PropTypes.array,
  todoFooterMode: PropTypes.number,
  listenContentH2Change: PropTypes.func,
  listenContentAddTodoChange: PropTypes.func,
  listenContentTodoLiCheckChange: PropTypes.func,
  listenContentTodoLiTextChange: PropTypes.func,
  listenContentTodoLiBtnRemoveClick: PropTypes.func,
  toggleTodoFooterMode: PropTypes.func
}

class TodoDataItem {
  constructor (id, isChecked, name) {
    this.id = id
    this.isChecked = isChecked
    this.name = name
  }
}

class TodoData {
  constructor (id, name, list) {
    this.id = id
    this.name = name
    this.list = list
  }
}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeId: 0,
      todoFooterMode: 0, // 0: all, 1: active, 2: completed
      todoDataList: [
        new TodoData(0, 'todo', [])
      ],
    }

    this.listenNavLiClick = this.listenNavLiClick.bind(this)
    this.listenNavLiNewListClick = this.listenNavLiNewListClick.bind(this)
    this.listenNavLiBtnRemoveClick = this.listenNavLiBtnRemoveClick.bind(this)
    this.listenContentH2Change = this.listenContentH2Change.bind(this)
    this.listenContentAddTodoChange = this.listenContentAddTodoChange.bind(this)
    this.listenContentTodoLiCheckChange = this.listenContentTodoLiCheckChange.bind(this)
    this.listenContentTodoLiTextChange = this.listenContentTodoLiTextChange.bind(this)
    this.listenContentTodoLiBtnRemoveClick = this.listenContentTodoLiBtnRemoveClick.bind(this)
    this.toggleTodoFooterMode = this.toggleTodoFooterMode.bind(this)
  }

  listenNavLiClick (e) {
    this.setState({
      activeId: parseInt(e.currentTarget.parentNode.dataset.id, 10),
      todoFooterMode: 0
    })
    document.getElementById('todo-add').focus()
  }

  listenNavLiNewListClick (e) {
    let newId = this.state.todoDataList.length
    this.setState({
      todoDataList: this.state.todoDataList.concat(
        [new TodoData(newId, 'new todo list', [])]
      ),
      activeId: newId,
      todoFooterMode: 0
    }, () => {
      document.getElementById('h2-input').focus()
    })
  }

  listenNavLiBtnRemoveClick (e) {
    const removeId = parseInt(e.currentTarget.parentNode.dataset.id, 10)
    const newTodoDataList = this.state.todoDataList.slice()
    delete newTodoDataList[removeId]

    // found the new active id
    let newActiveId = 0
    let found = 0
    for (let i = 0; i < newTodoDataList.length; ++i) {
      if (newTodoDataList[i] !== undefined) {
        newActiveId = i
        found = 1
        break
      }
    }

    if (found) {
      this.setState({
        activeId: newActiveId,
        todoDataList: newTodoDataList,
        todoFooterMode: 0
      })
    } else {
      this.setState({
        activeId: undefined,
        todoDataList: newTodoDataList,
        todoFooterMode: 0
      })
    }
  }

  listenContentH2Change (e) {
    if (this.state.activeId !== undefined) {
      const newTodoDataList = this.state.todoDataList.slice()
      newTodoDataList[this.state.activeId].name = e.target.value
      this.setState({
        todoDataList: newTodoDataList
      })
    }
  }

  listenContentAddTodoChange (e) {
    e.preventDefault()

    if (this.state.activeId !== undefined) {
      const newTodoDataList = this.state.todoDataList.slice()
      const newTodoDataItemId = newTodoDataList[this.state.activeId].list.length
      newTodoDataList[this.state.activeId].list.push(
        new TodoDataItem(newTodoDataItemId, false, e.target[0].value)
      )
      this.setState({
        todoDataList: newTodoDataList
      })

      e.target[0].value = ''
    }
  }

  listenContentTodoLiCheckChange (e) {
    const newTodoDataList = this.state.todoDataList.slice()
    const changeId = e.target.parentNode.dataset.id
    newTodoDataList[this.state.activeId].list[changeId].isChecked = e.target.checked
    this.setState({
      todoDataList: newTodoDataList
    })
  }

  listenContentTodoLiTextChange (e) {
    const newTodoDataList = this.state.todoDataList.slice()
    const changeId = e.target.parentNode.dataset.id
    newTodoDataList[this.state.activeId].list[changeId].name = e.target.value
    this.setState({
      todoDataList: newTodoDataList
    })
  }

  listenContentTodoLiBtnRemoveClick (e) {
    let removeId = parseInt(e.currentTarget.parentNode.dataset.id, 10)
    const newTodoDataList = this.state.todoDataList.slice()
    delete newTodoDataList[this.state.activeId].list[removeId]
    this.setState({
      todoDataList: newTodoDataList
    })
  }

  toggleTodoFooterMode (e) {
    const newMode = parseInt(e.target.dataset.id, 10)
    this.setState({
      todoFooterMode: newMode
    })
  }

  render () {
    let thisTodoDataName = ''
    let thisTodoDataList = []
    if (this.state.activeId !== undefined) {
      thisTodoDataName = this.state.todoDataList[this.state.activeId].name
      thisTodoDataList = this.state.todoDataList[this.state.activeId].list
    }

    return (
      <div>
        <Nav
          activeId={this.state.activeId}
          todoDataList={this.state.todoDataList}
          listenNavLiClick={this.listenNavLiClick}
          listenNavLiNewListClick={this.listenNavLiNewListClick}
          listenNavLiBtnRemoveClick={this.listenNavLiBtnRemoveClick}
        />
        <Content
          todoDataName={thisTodoDataName}
          todoDataItemList={thisTodoDataList}
          todoFooterMode={this.state.todoFooterMode}
          listenContentH2Change={this.listenContentH2Change}
          listenContentAddTodoChange={this.listenContentAddTodoChange}
          listenContentTodoLiCheckChange={this.listenContentTodoLiCheckChange}
          listenContentTodoLiTextChange={this.listenContentTodoLiTextChange}
          listenContentTodoLiBtnRemoveClick={this.listenContentTodoLiBtnRemoveClick}
          toggleTodoFooterMode={this.toggleTodoFooterMode}
        />
      </div>
    )
  }
}

export default App;
