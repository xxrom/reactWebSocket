import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import YouTubePlayer from 'youtube-player';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoint: 'http://localhost:4001',
      currentTime: 0,
      stateChange: 1,
      videoId: 'pgaEE27nsQw'
    };

    this.socket = socketIOClient(this.state.endpoint);

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

    this.getVideoInput = this.getVideoInput.bind(this);
    this.setPlayer = this.setPlayer.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  componentDidMount() {
    this.setPlayer(this.state.videoId);
  }

  render() {
    return (
      <div className="main">
        <div className="player">
          <div id="player-1" />
          {this.getVideoInput()}
        </div>
      </div>
    );
  }

  setPlayer(videoId) {
    this.player = YouTubePlayer('player-1', {
      videoId
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

  getVideoInput() {
    return (
      <div className="input-wrapper">
        <div
          className="input-wrapper__title"
        >Current Video Id
        </div>
        <input
          className="input-wrapper__input"
          onChange={this.onChangeInput}
          value={this.state.videoId}
        />
      </div>
    );
  }

  onChangeInput(event) {
    console.log(event.target.value);
    this.setState({
      videoId: event.target.value
    });

    this.player.loadVideoById(event.target.value);
    this.player.pauseVideo();
  }
}
