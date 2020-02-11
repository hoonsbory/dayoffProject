import React from 'react';
import './Review.css';
import BeautyStars from 'beauty-stars';
import SlideToggle from 'react-slide-toggle';
const Review = props => (
    <SlideToggle
      collapsed
      onExpanding={() => {
        const item = document
          .getElementsByClassName("ProductSlideToggle toggle_EXPANDED")
          .item(0);
        if (item) item.click();
      }}
      render={({ toggle, setCollapsibleElement, toggleState }) => (
      <React.Fragment>
          <tr
            className={
              "toggleReview" +
              toggleState
            }
            onClick={toggle}
            style={{"border-bottom":"1px solid black","margin":"auto"}}
          >
       
       
            {/* <div className="title1"> */}
          <td style={{"padding":"10px","border-right":"1px solid black"}}>{props.id}</td>
          <td style={{"padding":"10px","border-right":"1px solid black"}}>{props.title}</td>
           <td style={{"padding":"10px","border-right":"1px solid black"}}>{props.user}</td> 
           <td style={{"padding":"10px","border-right":"1px solid black"}}>{props.date}</td> 
           <td className="stars"><BeautyStars
          value={props.rating}
          size={"15px"}
          inactiveColor={"gray"}
          
         
        /></td> 
          </tr>
          <tr className="reviewContent" ref={setCollapsibleElement}>
            <td colSpan={5}>
              <div style={{"textAlign":"left","padding":"15px"}}>
           <span style={{"padding-left":"10px"}}>키:{props.height}  cm</span> 
           <span style={{"padding-left":"20px"}}>몸무게:{props.weight}  kg</span> 
           </div>
            <article className="content">{props.content}</article>
            </td>
          </tr>
        </React.Fragment>
      )}
    />
 
);
export default Review;