import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import YouTube from 'react-youtube';
import YouTubePlayer from 'youtube-player';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      endpoint: 'http://localhost:4001',
      color: 'black',
      playVideo: false
    };

    this.socket = socketIOClient(this.state.endpoint);

    this.socket.on('toggle color auto', (col) => { // подписываемся на рассылку с бэка
      console.log('toggle color auto');
      this.setState({
        color: col
      });
    });

    this.socket.on('youtubeStart', () => {
      console.log('youtubeStart');

      this.player
        .playVideo();
    });

    this.socket.on('youtubePause', () => {
      console.log('youtubePause');

      this.player
        .pauseVideo();
    });

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.setPlayer();
  }

  render() {
    console.log('render');
    return (
      <div>
        <div id="player-1" />
        <h1 style={{ background: this.state.color }}>Hello App HELLO NIKITA уууууууу</h1>
        <button onClick={this.onClick}>Click to change color from black to RED!</button>
      </div>
    );
  }

  setPlayer() {
    this.player = YouTubePlayer('player-1', {
      videoId: 'M7lc1UVf-VE'
    });

    this.player.on('stateChange', (event) => {
      console.log(event);
      this.player
        .getCurrentTime()
        .then((time) => {
          console.log('then thime', Math.round(time));
          this.socket.emit('youtubeEvent', event.data, Math.round(time));
        });
    });
  }

  onClick() {
    console.log('click');
    this.setState({
      color: 'white'
    });
    // this.socket.emit('toggle color auto');
  }
}
