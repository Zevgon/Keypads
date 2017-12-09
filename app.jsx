/* eslint-disable no-extend-native */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

Array.prototype.sample = function () {
  const randIdx = Math.floor(Math.random() * this.length);
  return this[randIdx];
};

const columns = [
  [
    'o',
    'a',
    'y',
    'lightning',
    'staff',
    'h',
    'backwards_c',
  ],
  [
    'backwards_e',
    'o',
    'backwards_c',
    'spiral',
    'empty_star',
    'h',
    'question',
  ],
  [
    'copyright',
    'butt',
    'spiral',
    'zh',
    'half_three',
    'y',
    'empty_star',
  ],
  [
    'russian_b',
    'paragraph',
    'b',
    'staff',
    'zh',
    'question',
    'smiley',
  ],
  [
    'trident',
    'smiley',
    'b',
    'c',
    'paragraph',
    'full_three',
    'full_star',
  ],
  [
    'russian_b',
    'backwards_e',
    'railroad',
    'ash',
    'trident',
    'russian_i',
    'omega',
  ],
];

function shuffle(array) {
  array = [...array];
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex > 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// display: flex;
//     justify-content: space-between;
//     width: 344px;
//     flex-wrap: wrap;

const pictureWrapperStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '344px',
  flexWrap: 'wrap',
  margin: '0 auto',
};

const buttonStyle = {
  marginBottom: '7px',
  outline: 'none',
};

const highlighted = {
  border: '2px solid red',
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      running: false,
      clickedPictures: new Set(),
      lost: false,
    };
    this.start = this.start.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getButtonStyle = this.getButtonStyle.bind(this);
  }

  getPictures() {
    const colIdx = Math.floor(Math.random() * columns.length);
    const column = columns[colIdx];
    let numLeft = 4;
    const res = [];
    column.forEach((picture, idx) => {
      if (Math.random() <= numLeft / (column.length - idx)) {
        res.push(picture);
        numLeft -= 1;
      }
    });
    return [shuffle(res), res];
  }

  getButtonStyle(picture) {
    let ret = buttonStyle;
    if (this.state.clickedPictures.has(picture)) {
      ret = Object.assign({}, ret, highlighted);
    }
    return ret;
  }

  start() {
    const [pictures, answer] = this.getPictures();
    this.setState({
      running: true,
      lost: false,
      won: false,
      pictures,
      answer,
      clickedPictures: new Set(),
    });
  }

  handleWin() {
    this.setState({
      won: true,
      lost: false,
      running: false,
    });
  }

  handleClick(e, picture) {
    e.preventDefault();
    if (!this.state.running) return;
    if (picture !== this.state.answer[this.state.clickedPictures.size]) {
      this.setState({
        running: false,
        lost: true,
      });
    }
    const newClickedPictures = new Set(this.state.clickedPictures);
    newClickedPictures.add(picture);
    if (newClickedPictures.size === this.state.answer.length) {
      this.handleWin();
    } else {
      this.setState({ clickedPictures: newClickedPictures });
    }
  }

  render() {
    return (
      <div style={pictureWrapperStyle}>
        {this.state.running && this.state.pictures.map(picture => (
          <button
            onClick={e => this.handleClick(e, picture)}
            key={picture}
            style={this.getButtonStyle(picture)}
          >
            <img
              alt="stuff"
              src={`./images/${picture}.png`}
            />
          </button>
        ))}
        {!this.state.running &&
          <button onClick={this.start}>Start</button>
        }
        {this.state.lost &&
          <div>Oops, you lost. Dumbo.</div>
        }
        {this.state.won &&
          <div>Yay you win!!</div>
        }
      </div>
    );
  }
}
