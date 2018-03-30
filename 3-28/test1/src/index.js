import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const schoolRecord =
{
  name: 'Ric',
  records: [
    {subject: 'Math', score: 100},
    {subject: 'Chinese', score: 87},
    {subject: 'English', score: 78}
  ]
}

class Caption extends Component {
  render () {
    return <caption>{this.props.name}&apos;s score</caption>
  }
}

class Subject extends Component {
  render () {
    return (
      <tr>
        <td>{this.props.subject}</td>
        <td>{this.props.score}</td>
      </tr>
    )
  }
}

class SubjectList extends Component {
  render () {
    let rows = []
    for (let i = 0; i < this.props.subjectList.length; ++i) {
      rows.push(
        <Subject
          subject={this.props.subjectList[i].subject}
          score={this.props.subjectList[i].score}
        />
      )
    }

    return <tbody>{rows}</tbody>
  }
}

class ScoreCard extends Component {
  render () {
    return (
      <table>
        <Caption name={this.props.scoreCard.name}/>
        <thead>
          <tr>
            <th>subject</th>
            <th>score</th>
          </tr>
        </thead>
        <SubjectList subjectList={this.props.scoreCard.records}></SubjectList>
      </table>
    )
  }
}

ReactDOM.render(
  <ScoreCard scoreCard={schoolRecord} />,
  document.getElementById('root')
)
