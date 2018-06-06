import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import YouTubePlayer from 'youtube-player';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      endpoint: 'http://localhost:4001',
      color: 'black',
      currentTime: 0,
      stateChange: 1
    };

    this.socket = socketIOClient(this.state.endpoint);

    this.socket.on('toggle color auto', (col) => { // подписываемся на рассылку с бэка
      console.log('toggle color auto');
      this.setState({
        color: col
      });
    });

    this.socket.on('changeState', (data, time) => {
      console.log('changeState', data, time);
      const currentTime = Math.round(time * 1000) / 1000;

      // если разница больше 2 сек, то перематываем видео!
      if (Math.abs(this.state.currentTime - currentTime) > 2) {
        console.log('SEEK TO !!!');
        this.setState({
          currentTime
        });

        this.player.seekTo(currentTime, true);
      }

      if (this.state.stateChange !== data) {
        console.log('changeState !!!');

        this.setState({
          stateChange: data
        });

        switch (data) {
          case 1:
            this.player.playVideo();
            break;

          case 2:
            this.player.pauseVideo();
            break;

          default:
            break;
        }
      } else {
        console.log('not changeState =) ok ');
      }
    });

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.setPlayer();
  }

  render() {
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
      videoId: 'pgaEE27nsQw'
    });

    this.player.on('stateChange', ({ data }) => {
      console.log(data);
      this.player
        .getCurrentTime()
        .then((time) => {
          const roundedTime = Math.round(time * 1000) / 1000;
          console.log('then time', roundedTime);

          this.socket.emit('youtubeEvent', data, roundedTime);

          this.setState({
            stateChange: data,
            currentTime: roundedTime
          });
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
