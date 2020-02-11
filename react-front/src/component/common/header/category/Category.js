import React, { Component } from 'react'
import './category.css';
import {Link} from 'react-router-dom';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
        keyword: '',
    };
}
componentDidMount() {
}

refreshPage() {
  window.history.go(0);
}

  render() {
    return (
      <div className='dropmenu' onClick={this.refreshPage}>
        <ul>
            <li className='category__item'><Link to={"/productList/category/BEST"}>BEST</Link></li>

            <li className='category__item'><Link to={"/productList/category/OUTER"}>OUTER</Link>
            <ul>
            <li><Link to={"/productList/category/블레이저"}>블레이저</Link></li>
            <li><Link to={"/productList/category/패딩"}>패딩</Link></li>
            <li><Link to={"/productList/category/재킷"}>재킷</Link></li>
            <li><Link to={"/productList/category/코트"}>코트</Link></li>
            <li><Link to={"/productList/category/가디건"}>가디건</Link></li>
            </ul>
            </li>

            <li className='category__item'><Link to={"/productList/category/TOP"}>TOP</Link>
            <ul>
            <li><Link to={"/productList/category/후드 & 맨투맨"}>후드 & 맨투맨</Link></li>
            <li><Link to={"/productList/category/티셔츠"}>티셔츠</Link></li>
            <li><Link to={"/productList/category/블라우스 & 셔츠"}>블라우스 & 셔츠</Link></li>
            <li><Link to={"/productList/category/니트"}>니트</Link></li>
            <li><Link to={"/productList/category/탑"}>탑</Link></li>
            </ul>
            </li>

            <li className='category__item'><Link to={"/productList/category/BOTTOM"}>BOTTOM</Link>
            <ul>
            <li><Link to={"/productList/category/스커트"}>스커트</Link></li>
            <li><Link to={"/productList/category/데님"}>데님</Link></li>
            <li><Link to={"/productList/category/슬랙스"}>슬랙스</Link></li>
            <li><Link to={"/productList/category/쇼츠"}>쇼츠</Link></li>
            </ul>
            </li>

            <li className='category__item'><Link to={"/productList/category/DRESS"}>DRESS</Link>
            <ul>
            <li><Link to={"/productList/category/원피스"}>원피스</Link></li>
            </ul>
            </li>

            <li className='category__item'><Link to={"/productList/category/ACC"}>ACC</Link>
            <ul>
            <li><Link to={"/productList/category/슈즈"}>슈즈</Link></li>
            <li><Link to={"/productList/category/가방"}>가방</Link></li>
            <li><Link to={"/productList/category/쥬얼리"}>쥬얼리</Link></li>
            <li><Link to={"/productList/category/벨트"}>벨트</Link></li>
            <li><Link to={"/productList/category/모자"}>모자</Link></li>
            <li><Link to={"/productList/category/양말"}>양말</Link></li>
            <li><Link to={"/productList/category/스카프"}>스카프</Link></li>
            <li><Link to={"/productList/category/헤어 액세서리"}>헤어 액세서리</Link></li>

            </ul>
            </li>
            <li style={{marginTop : '4px'}}>
              <Link to="/vision">A.I Search</Link>
            </li>
      
            </ul>
      </div>
    )
  }
}
