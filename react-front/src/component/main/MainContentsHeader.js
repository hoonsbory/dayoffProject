/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import './MainContents.css';
export default class MainContentsHeader extends Component {

  render() {
    const { title, contents } = this.props;
    return (
      
      <div className="MContentsHeader_box">
        <a className="MContentsHeader_aa">{title}</a> <span>{contents}</span>
        </div>
     
    )
  }
}
