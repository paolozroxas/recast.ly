class App extends React.Component {
  
  // data: {
  //       q: keyword,
  //       key: window.YOUTUBE_API_KEY,
  //       type: 'video',
  //       part: 'snippet',
  //       maxResults: 5,
  //       videoEmbeddable: true
  //     }

  constructor(props) {
    super(props);
    this.state = {
      videos: this.props.videos,
      video: this.props.videos[0]
    };
  }
  
  searchYoutube(q) {
    q = q.split(' ').join('+');
    var baseURL = 'https://www.googleapis.com/youtube/v3';
    fetch(`${baseURL}/search?part=snippet&q=${q}&type=video&maxResults=5&videoEmbeddable=true&key=${window.YOUTUBE_API_KEY}`)
      .then((data) => data.json())
      .then((data) => {
        this.setState({videos: data.items});
        this.setState({video: data.items[0]});
    });
  }

  videoClickHandler(event) {
    //find a cleaner way to get video index
    var videoIndex = parseInt(event.dispatchMarker.charAt(12));
    this.setState({video: this.state.videos[videoIndex]});
  }
  
  searchKeyHandler(event) {
    if (event.key === 'Enter') {
      this.searchClickHandler(event);
    }
  }
  
  searchClickHandler(event) {
    this.searchYoutube($('.form-control').val());
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><Search searchHandler={{click: this.searchClickHandler.bind(this), key: this.searchKeyHandler.bind(this)}}/></div>
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
