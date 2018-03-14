let data = {
  0: [
    {
      author: '第 1 人留言',
      text: '第一則留言第一則留言第一則留言'
    },
    {
      author: '第 2 人留言',
      text: '第二則留言第二則留言第二則留言'
    },
    {
      author: '第 3 人留言',
      text: '第三則留言第三則留言第三則留言'
    },
    {
      author: '第 4 人留言',
      text: '第四則留言第四則留言第四則留言'
    }
  ],
  1: [
    {
      author: '第 1 人留言',
      text: '第一則留言第一則留言第一則留言'
    },
    {
      author: '第 2 人留言',
      text: '第二則留言第二則留言第二則留言'
    }
  ],
  2: [
    {
      author: '第 1 人留言',
      text: '第一則留言第一則留言第一則留言'
    },
    {
      author: '第 2 人留言',
      text: '第二則留言第二則留言第二則留言'
    },
    {
      author: '第 3 人留言',
      text: '第三則留言第三則留言第三則留言'
    },
    {
      author: '第 4 人留言',
      text: '第四則留言第四則留言第四則留言'
    },
    {
      author: '第 5 人留言',
      text: '第五則留言第五則留言第五則留言'
    },
    {
      author: '第 6 人留言',
      text: '第六則留言第六則留言第六則留言'
    },
    {
      author: '第 7 人留言',
      text: '第七則留言第七則留言第七則留言'
    },
    {
      author: '第 8 人留言',
      text: '第八則留言第八則留言第八則留言'
    }
  ],
  3: [
    {
      author: '第 1 人留言',
      text: '第一則留言第一則留言第一則留言'
    },
    {
      author: '第 2 人留言',
      text: '第二則留言第二則留言第二則留言'
    },
    {
      author: '第 3 人留言',
      text: '第三則留言第三則留言第三則留言'
    },
    {
      author: '第 4 人留言',
      text: '第四則留言第四則留言第四則留言'
    },
    {
      author: '第 5 人留言',
      text: '第五則留言第五則留言第五則留言'
    },
    {
      author: '第 6 人留言',
      text: '第六則留言第六則留言第六則留言'
    },
    {
      author: '第 7 人留言',
      text: '第七則留言第七則留言第七則留言'
    }
  ],
  4: [
    {
      author: '第 1 人留言',
      text: '第一則留言第一則留言第一則留言'
    },
    {
      author: '第 2 人留言',
      text: '第二則留言第二則留言第二則留言'
    }
  ]
}

function createReplyNode (author, text) {
  let Reply = document.createElement('DIV')
  Reply.className = 'reply'
  Reply.innerHTML = '<div class="author">' + author + '</div>' +
                    '<div class="text">' + text + '</div>'
  return Reply
}

function updateReplies (repliesNode, receiveData) {
  let lastReplyNode = repliesNode.childNodes[1]
  for (let i = 2; i < repliesNode.childNodes.length; ++i) {
    if (repliesNode.childNodes[i].className === 'reply') {
      lastReplyNode = repliesNode.childNodes[i]
    }
  }

  for (let i = 0; i < receiveData.length; ++i) {
    let newReplyNode = createReplyNode(receiveData[i].author, receiveData[i].text)
    lastReplyNode = repliesNode.insertBefore(newReplyNode, lastReplyNode.nextSibling)
  }
}

function showReplies (sectionNode) {
  // let nodeBtnShowReplies = sectionNode.childNodes[1].childNodes[3]
  let replies = sectionNode.childNodes[3]
  if (sectionNode.getAttribute('data-reply-done') === '0') {
    let sectionId = sectionNode.getAttribute('data-section-id')
    updateReplies(replies, data[sectionId])
    sectionNode.setAttribute('data-reply-done', '1')
  }
  replies.style.display = 'block'
}

let btnShowReplies = document.querySelectorAll('button.show-reply')
for (let i = 0; i < btnShowReplies.length; ++i) {
  btnShowReplies[i].addEventListener('click', function () {
    // hide all replies
    let replies = document.querySelectorAll('.replies')
    for (let j = 0; j < replies.length; ++j) {
      replies[j].style.display = 'none'
    }

    let thisSection = this.parentNode.parentNode
    showReplies(thisSection)
  })
}

let btnHideReplies = document.querySelectorAll('button.hide-reply')
for (let i = 0; i < btnHideReplies.length; ++i) {
  btnHideReplies[i].addEventListener('click', function () {
    this.parentNode.style.display = 'none'
    this.parentNode.parentNode.childNodes[1].childNodes[3].style.display = 'block'
  })
}

let btnSubmitReplies = document.querySelectorAll('form.form-reply')
for (let i = 0; i < btnSubmitReplies.length; ++i) {
  btnSubmitReplies[i].addEventListener('submit', function (e) {
    e.preventDefault() // stop form from submitting
    let replyText = this.childNodes[1].value
    console.log(replyText)
    updateReplies(this.parentNode, [{author: '我', text: replyText}])
    this.childNodes[1].value = ''
    return false
  })
}
