import React, { Component } from 'react'

export default class LiveChat extends Component {


state = {
  chatLog: [['Daniel','holi'],['Luis','papu']]
}


  render() {

    const { chatLog } = this.state

    console.log(chatLog)

    const chatHistory = chatLog.map((value) => 
    <div> {value} </div>
  )

    return (
      <div>
        {chatHistory}
      </div>
    )
  }
}
