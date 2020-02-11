/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import './contents.css';
export default class ContentsHeader extends Component {

  render() {
    const { title, contents } = this.props;
    return (
      <div className="PContentsHeader_box">
        <a className="PContentsHeader_aa">{title}</a> <span>{contents}</span>
      </div>
    )
  }
}
