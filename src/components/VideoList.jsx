class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPage: 1
    };
    this.pageQty = Math.ceil(props.videos.length / 5);
  }
  
  backHandler(event) {
    if (this.state.currPage > 1) {
      this.setState({currPage: this.state.currPage - 1});
    }
  }
  
  forwardHandler(event) {
    if (this.state.currPage < this.pageQty) {
      this.setState({currPage: this.state.currPage + 1});
    }
  }
  
  render() {
    this.pageQty = Math.ceil(this.props.videos.length / 5);
    var currVidIdx = (this.state.currPage - 1) * 5;
    var videos = this.props.videos.slice(currVidIdx, currVidIdx + 5);
    videos = videos.map((video, index) => (
      <VideoListEntry video={video} key={index} videoClickHandler={this.props.videoClickHandler} /> 
    ));
    return (
      <div className="video-list">
        {videos}
        <span> Page {this.state.currPage} of {this.pageQty}</span>
        <span>
          <button className="forward-btn" onClick={this.forwardHandler.bind(this)} >&gt;</button>
          <button className="back-btn" onClick={this.backHandler.bind(this)}>&lt;</button>
        </span>
      </div>
    );
  }
} 

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoList.propTypes = {
  videos: React.PropTypes.array.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
window.VideoList = VideoList;
