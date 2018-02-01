class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  
  ownClickHandler(event) {
    if (this.searchBar) {
      this.props.searchHandler(this.query);
      this.searchBar.value = '';
    }
  }
  
  ownKeyUpHandler(event) {
    this.query = event.target.value;
    this.searchBar = event.target;
    this.props.searchHandler(this.query);
    if (event.key === 'Enter') {
      event.target.value = '';
    }
  }
  
  render() {
    return (
      <div className="search-bar form-inline">
        <input className="form-control" type="text" onKeyUp={this.ownKeyUpHandler.bind(this)} />
        <button className="btn hidden-sm-down" onClick={this.ownClickHandler.bind(this)}>
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div> 
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;
