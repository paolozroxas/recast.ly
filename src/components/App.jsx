class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: this.props.videos,
      video: this.props.videos[0]
    };
  }

  videoClickHandler(event) {
    //find a cleaner way to get video index
    var videoIndex = parseInt(event.dispatchMarker.charAt(12));
    this.setState({video: this.state.videos[videoIndex]});
    
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><Search /></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div><VideoPlayer video={this.state.video}/></div>
          </div>
          <div className="col-md-5">
            <div><VideoList videos={this.state.videos} videoClickHandler={this.videoClickHandler.bind(this)} /></div>
          </div>
        </div>
      </div>
    );
  }

}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
ReactDOM.render(<App videos={window.exampleVideoData}/>, document.getElementById('app'));
