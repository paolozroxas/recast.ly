var searchYouTube = (options, callback) => {
  //options should look like:
  //{query: , max: , key: }
  //callback is function on finish
  
  var q = options.query.split(' ').join('+');
  options.max = options.max || 5;
  var baseURL = 'https://www.googleapis.com/youtube/v3';
  fetch(`${baseURL}/search?part=snippet&q=${q}&type=video&maxResults=${options.max}&videoEmbeddable=true&key=${options.key}`)
    .then((data) => data.json())
    .then((data) => {
      console.log(data.items);
      callback(data.items);
    });
};

window.searchYouTube = searchYouTube;
