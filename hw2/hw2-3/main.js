class Navbar {
  constructor (list) {
    this.list = list
    this.activeId = 0

    this.ulNavNode = document.getElementById('nav-list')
  }

  // public members

  init (id = 0) {
    this.ulNavNode.innerHTML = ''
    for (let i = 0; i < this.list.length; ++i) {
      let itemNode = this.appendItemNode(i, this.list[i].title)
      this.listenItemClick(itemNode)
    }
    this.ulNavNode.childNodes[id].childNodes[0].className = 'active'
  }

  // private members

  appendItemNode (id, title) {
    let itemNode = document.createElement('LI')
    itemNode.innerHTML = '<a href="#" data-id="' + id + '">' + title + '</a>'
    this.ulNavNode.appendChild(itemNode)
    return itemNode
  }

  // listeners

  listenItemClick (item) {
    item.addEventListener('click', function (e) {
      let items = this.ulNavNode.childNodes
      for (let i = 0; i < items.length; ++i) {
        items[i].childNodes[0].className = ''
      }
      e.target.className = 'active'

      let id = e.target.getAttribute('data-id')
      this.list[id].init()
    }.bind(this))
  }
}

class Todo {
  constructor (id, title, list) {
    this.id = id
    this.title = title
    this.list = list
    this.mode = 'all'

    this.todoListNode = document.getElementById('todo-list')
    this.todoAddNode = document.getElementById('todo-add')
    this.itenCntNode = document.getElementById('todo-cnt')
  }

  // Public members

  init (filter = 'all') {
    this.removeAllItemNodes()
    for (let i = 0; i < this.list.length; ++i) {
      if (filter === 'all' && this.list[i] !== undefined) {
        this.appendItemNode(i, this.list[i].checked, this.list[i].item)
      } else if (filter === 'active' && this.list[i] !== undefined && !this.list[i].checked) {
        this.appendItemNode(i, this.list[i].checked, this.list[i].item)
      } else if (filter === 'comple' && this.list[i] !== undefined && this.list[i].checked) {
        this.appendItemNode(i, this.list[i].checked, this.list[i].item)
      }
    }

    this.listenAddNodeChange()
    this.todoAddNode.focus()
    this.listenFooterBtnClick()
    this.updateItemCount()
    this.mode = filter
    document.getElementById('btn-' + filter).className = 'active'
  }

  // Private members

  appendItemNode (id, checked, item) {
    let itemNode = document.createElement('LI')
    itemNode.className = 'todo-item'
    itemNode.setAttribute('data-id', id)
    if (checked) {
      itemNode.innerHTML = '<input type="checkbox" class="todo-check" checked="checked">'
    } else { // not checked
      itemNode.innerHTML = '<input type="checkbox" class="todo-check">'
    }
    itemNode.innerHTML += '<input type="text" class="todo-edit" value="' + item + '">' +
                          '<button class="todo-remove">×</button>'

    this.todoListNode.insertBefore(itemNode, this.todoListNode.childNodes[this.todoListNode.childNodes.length - 1])

    this.listenItemNodeChange(itemNode)
    this.listenRmvBtnClick(itemNode)
    this.listenItemNodeHover(itemNode)
    return itemNode
  }

  removeAllItemNodes () {
    this.todoListNode.innerHTML = '<li class="todo-item"><input type="text" id="todo-add" placeholder="Add a to-do"></li>'
    this.todoListNode.innerHTML += '<li class="todo-item footer"><div class="sum"><span id="todo-cnt">0</span> items here</div><div id="filters"><button id="btn-all" class="active">All</button><button id="btn-active">Active</button><button id="btn-comple">Completed</button></div></li>'
    this.todoAddNode = document.getElementById('todo-add')
    this.itenCntNode = document.getElementById('todo-cnt')

    let filterNodes = document.getElementById('filters').childNodes
    for (let i = 0; i < filterNodes.length; ++i) {
      filterNodes[i].className = ''
    }
  }

  updateItemCount () {
    this.itenCntNode.innerHTML = this.todoListNode.childNodes.length - 2
  }

  // Listeners for items

  listenAddNodeChange () {
    this.todoAddNode.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        this.list.push({checked: false, item: e.target.value})
        this.init(this.mode)
      }
    }.bind(this))
  }

  listenRmvBtnClick (itemNode) {
    itemNode.childNodes[2].addEventListener('click', function (e) {
      let target = e.target
      let id = target.parentNode.getAttribute('data-id')
      delete this.list[id]
      target.parentNode.remove()
      this.updateItemCount()
    }.bind(this))
  }

  listenItemNodeHover (itemNode) {
    itemNode.addEventListener('mouseenter', function (e) {
      e.target.childNodes[2].style.display = 'block'
    })
    itemNode.addEventListener('mouseleave', function (e) {
      e.target.childNodes[2].style.display = 'none'
    })
  }

  listenItemNodeChange (itemNode) {
    itemNode.childNodes[0].addEventListener('change', function (e) {
      let target = e.target
      let id = target.parentNode.getAttribute('data-id')
      this.list[id].checked = target.checked
      this.init(this.mode)
    }.bind(this))

    itemNode.childNodes[1].addEventListener('change', function (e) {
      let target = e.target
      let id = target.parentNode.getAttribute('data-id')
      this.list[id].item = target.value
    }.bind(this))
  }

  listenFooterBtnClick () {
    let filterNodes = document.getElementById('filters').childNodes
    // all
    filterNodes[0].addEventListener('click', function (e) {
      this.init('all')
    }.bind(this))
    // active
    filterNodes[1].addEventListener('click', function (e) {
      this.init('active')
    }.bind(this))
    // completed
    filterNodes[2].addEventListener('click', function (e) {
      this.init('comple')
    }.bind(this))
  }
}

let todoList = []

let todo0 = new Todo(0, 'todos', [])
todoList.push(todo0)
let todo1 = new Todo(1, 'todossss', [{checked: true, item: 'aaa'}, {checked: false, item: 'bbb'}])
todoList.push(todo1)

todoList[0].init()

let navbar = new Navbar(todoList)

navbar.init()
