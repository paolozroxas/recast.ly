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
    this.searchYouTube = this.props.searchYouTube;
    var options = {
      query: 'rick roll',
      max: 5,
      key: window.YOUTUBE_API_KEY
    };
    this.searchYouTube(options, this.searchYouTubeHandler.bind(this));
  }
  
  searchYouTubeHandler(data) {
    this.setState({videos: data, video: data[0]});
  }

  videoClickHandler(video) {
    this.setState({video: video});
  }
  
  searchHandler(query) {
    var options = {
      query: query,
      max: 5,
      key: window.YOUTUBE_API_KEY
    };
    window.searchYouTube(options, this.searchYouTubeHandler.bind(this));
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><Search searchHandler={this.searchHandler.bind(this)}/></div>
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
ReactDOM.render(<App videos={[{
  id: {
    videoId: '000001'
  },
  snippet: {
    title: 'Loading...',
    description: 'Loading...',
    thumbnails: {
      default: {
        url: '',
      }
    }
  }
}]} searchYouTube={window.searchYouTube} />, document.getElementById('app'));
