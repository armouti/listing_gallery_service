import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './components/Gallery.jsx';
import Lightbox from './components/Lightbox.jsx';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      view: 'header',
      mainPicture: [],
      picture1: [],
      picture2: [],
      picture3: [],
      picture4: [],
      pictures: []
    }
    this.onPhotoPress = this.onPhotoPress.bind(this)
    this.onClosePress = this.onClosePress.bind(this)
  }

  grabPhotos() {
    fetch('/listings')
      .then(res => {
        console.log(res, 'this is the response on clientside')
        return res.json();
      })
      .then(result => {
        console.log(result, 'this is the final result on clientside')
        this.setState({
          mainPicture: result[0].urls[0],
          picture1: result[0].urls[1],
          picture2: result[0].urls[2],
          picture3: result[0].urls[3],
          picture4: result[0].urls[4],
          pictures: result[0].urls
        })
      })
  }


  onPhotoPress() {
    this.setState({
      view: 'lightbox'
    })
  }

  onClosePress() {
    this.setState({
      view: 'header'
    })
  }

  componentWillMount() {
    this.grabPhotos();
  }

  renderView() {
    if (this.state.view === 'header') {
      return (<Gallery props={this.state} press={this.onPhotoPress}/>)
    } else if (this.state.view === 'lightbox') {
      return (<Lightbox props={this.state} close={this.onClosePress}/>)
    }
  }

  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));