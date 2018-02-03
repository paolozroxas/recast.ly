class Chat extends React.Component {
  //props include:
  //messages = {username: , text: , roomname: }
  //video = the current video playing
  constructor (props) {
    super(props);
    this.state = {messages: [{
      username: 'william',
      text: 'hello world',
      roomname: 'el salvador'
    }]};
    console.log(this.props);
    this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/';
    
    setInterval(this.fetch.bind(this, this.fetchHandle.bind(this)), 1000);
  }
  
  keyHandler(event) {
    this.msgBar = event.target;
    var msg = event.target.value;
    if (event.key === 'Enter') {
      this.clickHandler();
    }
  }
  
  clickHandler() {
    if (this.msgBar && this.msgBar.value !== '') {
      var msg = this.msgBar.value;
      var message = {
        username: 'Anonymous',
        roomname: this.props.videoId,
        text: msg
      };
      this.send(message);
      this.msgBar.value = '';
      this.fetch(this.fetchHandle.bind(this));
    }
  }
  
  send(message) {
    $.ajax({
      url: this.server + 'messages',
      type: 'POST',
      data: JSON.stringify(message),
      datatype: 'json',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
    
  }
    
  fetchHandle (messages) {
    this.setState({messages: messages});
  }


  fetch (callback) {
    var room = this.props.videoId !== '' ? '?where={"roomname":"' + this.props.videoId + '"}' : '';
    $.ajax({
      url: this.server + 'messages' + room,
      type: 'GET',
      data: 'order=-createdAt',
      datatype: 'json',
      success: function (data) {
        callback(data.results);
      },
      error: function (data) {
        console.error('chatterbox: Failed to get', data);
      }
    });
  }
  
  
  render() {
    var messages = this.state.messages;
    messages = messages.map((message, index) => (
      <ChatMessage message={message} key={index} />
    ));
    return (
      <div className="chat">
        <div className="msg-send">
          <input type="text" className="msg-bar" placeholder="Post a comment..." onKeyUp={this.keyHandler.bind(this)}/>
          <button className="msg-btn" onClick={this.clickHandler.bind(this)}>Send</button>
        </div>
        <div className="msg-feed">
          {messages}
        </div>
      </div>
    );
  } 
}