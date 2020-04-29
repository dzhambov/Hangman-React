import React, { Component } from 'react';
import { randomTeam } from './Words.js'

class Hangman extends Component {
  static defaultProps = {
    maxIncorrect: 6,
  }

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: randomTeam()
    }
  }

  handleGuess = g => {
    let letter = g.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
    }));
  }

  guessedWord() {
    return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : "_"));
  }


  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      < button
        class='btn btn-lg btn-primary m-2'
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button >
    ));
  }

  render() {
    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameStat = this.generateButtons();

    if (isWinner) {
      gameStat = "You Won!!!"
    }
    if (gameOver) {
      gameStat = "You Lost!!!"
    }

    return (
      <div className="Hangman container">
        <h1 className='text-center'>Hangman</h1>
        <div className='float-right'>Wrong Guess: {this.state.mistake} of {this.props.maxWrong}</div>
        <div className="text-center">
          <p>Guess the NBA team!</p>
          <p>
            {!gameOver ? this.guessedWord() : this.state.answer}
          </p>
          <p>{gameStat}</p>
          <button className='btn btn-info' onClick={this.resetButton}>Reset</button>
        </div>
      </div >
    )
  }
}

export default Hangman;