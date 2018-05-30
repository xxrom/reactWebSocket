import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      endpoint: 'http://localhost:4001',
      color: 'black'
    };

    this.socket = socketIOClient(this.state.endpoint);
    this.socket.on('toggle color auto', (col) => { // подписываемся на рассылку с бэка
      console.log('toggle color auto');
      this.setState({ color: col });
    });
  }
  render() {
    return (
      <div>
        <h1 style={{ background: this.state.color }}>Hello App HELLO NIKITA уууууууу</h1>
        <button onClick={this.onClick}>Click to change color from black to RED!</button>
      </div>

    );
  }

  onClick() {
    console.log('click');
    this.socket.emit('toggle color auto');

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
