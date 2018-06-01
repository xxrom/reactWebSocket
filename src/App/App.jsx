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
        color: col,
        playVideo: !this.state.playVideo
      });
    });

    this.socket.on('onPauseYouTube', () => {
      console.log('onPauseYouTube');
      // this.onPauseYouTube();
    });
    this.socket.on('onPlayYouTube', () => {
      console.log('onPlayYouTube');
      // this.onPlayYouTube();
    });

    // const opts = {
    //   height: '390',
    //   width: '640',
    //   playerVars: { // https://developers.google.com/youtube/player_parameters
    //     autoplay: 1,
    //     start: 10,
    //     end: 20
    //   }
    // };

    // this.player = (<YouTube
    //   videoId="2g811Eo7K8U"
    //   opts={opts}
    //   onReady={this.onReadyYouTube}
    //   onPlay={this.onPlayYouTube}
    //   onPause={this.onPauseYouTube}
    // />);

    // const div = document.createElement('div');
    // div.id = 'player-1';
    // document.body.appendChild(div);
    // this.player = YouTubePlayer('player-1', {
    //   videoId: 'M7lc1UVf-VE'
    // });
    // this.player
    // // Play video is a Promise.
    // // 'playVideo' is queued and will execute as soon as player is ready.
    //   .playVideo()
    //   .then(() => {
    //     console.log('Starting to play player1. It will take some time to buffer video before it starts playing.');
    //   });

    // this.getYouTubeVideo = this.getYouTubeVideo.bind(this);
    // this.onReadyYouTube = this.onReadyYouTube.bind(this);
    // this.onPlayYouTube = this.onPlayYouTube.bind(this);
    // this.onPauseYouTube = this.onPauseYouTube.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.player = YouTubePlayer('player-1', {
      videoId: 'M7lc1UVf-VE'
    });
    this.player
    // Play video is a Promise.
    // 'playVideo' is queued and will execute as soon as player is ready.
      .playVideo()
      .then(() => {
        console.log('Starting to play player1. It will take some time to buffer video before it starts playing.');
      });
  }

  render() {
    return (
      <div>
        <div id="player-1" />
        <h1 style={{ background: this.state.color }}>Hello App HELLO NIKITA уууууууу</h1>
        <button onClick={this.onClick}>Click to change color from black to RED!</button>
        {this.getYouTubeVideo(this.state)}
      </div>
    );
  }


  getYouTubeVideo({ playVideo = false }) {
    return this.player;
  }

  onReadyYouTube(event) {
    console.log('onReadyYouTube');
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    // this.player = event.target;
  }

  // onPlayYouTube() {
  //   console.log('onPlayYouTube');
  //   this.socket.emit('onPlayYouTube');
  // }
  // onPauseYouTube() {
  //   console.log('onPauseYouTube');
  //   this.socket.emit('onPauseYouTube');
  // }

  onClick() {
    console.log('click');
    this.socket.emit('toggle color auto');
    this.player.stopVideo();

    // this emits an event to the socket (your server) with an argument of 'red'
    // you can make the argument any color you would like, or any kind of data you want to send.

    // this.socket.emit(
    //   'toggle color', // тут указываем id евента
    //   'tobi', // первый параметр, который отошлем на сервер
    //   (data) => {
    //     // второй параметр, функция callback, который передадим на бэк и вызовем
    //     console.log(`from server data: ${data}`); // data will be 'woot'
    //     this.setState({ color: data });
    //   }
    // );
    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
  }
}
