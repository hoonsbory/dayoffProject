import React, { Component } from 'react';
import './cards.css'
import { Tiles2 } from '../../main/banner/Tiles2';
 class Display extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Left : 900,
        currentCard: 0,
        position: 0,
        cardStyle: {
          transform: 'translateX(0px)'
        },
        width: 220,
      };
    }
  
    componentDidMount() {
    }
    
    // func: click the slider buttons
    handleClick(type) {
      // get the card's margin-right
      let margin = window.getComputedStyle(document.getElementById("card")).marginRight;
      margin = JSON.parse(margin.replace(/px/i, '')); 
  
      const cardWidth = 231; // the card's width
      const cardMargin = margin; // the card's margin
      const cardNumber = (this.props.List.length-6); // the number of cards
      let currentCard = this.state.currentCard; // the index of the current card
      let position = this.state.position; // the position of the cards
  
      // slide cards
      if(type === 'next' && currentCard < cardNumber-1) {
        currentCard++;
        position -= (cardWidth+cardMargin);
        this.setState({
          Left : this.state.Left+234
        })
      } else if(type === 'prev' && currentCard > 0) {
        currentCard--;
        position += (cardWidth+cardMargin);
        this.setState({
          Left : this.state.Left-234
        })
      }
      this.setCard(currentCard, position);
    }
    
    setCard(currentCard, position) {
      this.setState({
        currentCard: currentCard,
        position: position,
        cardStyle: {
          transform: `translateX(${position}px)`
        }
      })
    }
  
    render() {
      return (
        <div className="cards-slider" style={{overflow : this.props.List.length===1 ? '' : 'hidden'}}>
          <div className="slider-btns">
            <button className="slider-btn btn-l" onClick={() => this.handleClick('prev')}>&lt;</button>
            <button className="slider-btn btn-r" onClick={() => this.handleClick('next')}>&gt;</button>
          </div>
          {/* <Cards cardStyle={this.state.cardStyle} cookieList={this.props.cookieList} /> */}
          <Tiles2 kind={this.props.kind} Left={this.state.Left} cardStyle={this.state.cardStyle} list={this.props.List}></Tiles2>
        </div>
      )
    }
  }
  export default Display;