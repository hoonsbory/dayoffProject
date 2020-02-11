import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./mySlick.css";

export default class CenterMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount(){
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }


  render() {
      const images=this.props.images;
      const baseUrl="https://storage.googleapis.com/bit-jaehoon/";
      const imageDiv=images.map(i=><div  key={i.id} id={i.id}><img alt="slideImg" src={baseUrl+i.name}></img></div>);
    return (
      <div>
        <Slider
        asNavFor={this.state.nav2}
        ref={slider => (this.slider1 = slider)}
        arrows={false}
        swipeToSlide={true}
        focusOnSelect={true}
        // initialSlide={0}
        className="largeSlide"
        >
          {imageDiv}
        </Slider>
        <Slider
          centerPadding="0px"
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          initialSlide={0}
          slidesToShow={images.length > 9?9:images.length}
          infinite= {true}
          swipeToSlide={true}
          focusOnSelect={true}
          centerMode={true}
          className="slick-thumb"
          >
          {imageDiv}
        </Slider>
      </div>
    );
  }
}