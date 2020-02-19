import React, { Component } from 'react';
import Display from '../productDetail/product/Display'
class visionList extends Component {
    state = {
      };
     
     
    
      render() {
        // const detail = "/product/"
        // const {list,recommendlist} = this.props;
        // if( list!=null){
        //  result1 = list.map(
        //           (data1,index) => (<div className="listDiv"><Link to={detail+data1.productId}><img className="imglist" width="200px" height="250px" alt="" src={"https://storage.googleapis.com/bit-jaehoon/"+data1.productThumbnailName}></img><p>{data1.productName}</p></Link></div>)
        //           )}
                  
        // if(recommendlist !=null){
        //      resultRecommend = recommendlist.map(
        // (data,index) => (<div className="listDiv"><Link to={detail+data.productId}><img className="imglist" width="200px" height="250px" alt="" src={"https://storage.googleapis.com/bit-jaehoon/"+data.productThumbnailName}></img><p>{data.productName}</p></Link></div>)
        //            )}          
        return (
         <div className="visionsList"> 
	{this.props.empty ? <h2>찾으시는 <strong>{this.props.empty}</strong>은(는) 저희 쇼핑몰에는 없습니다. 대신 이런 상품은 어떨까요?</h2> : ""}
	{this.props.bestList?  <div className="imgbox">
          <Display kind="vision" List={this.props.bestList}></Display>
	</div> : ""}

           {this.props.list ?  <div className="imgbox">
            <h1>상품검색 결과</h1>
            <hr></hr>
           {/* <Display cookieList={this.props.list}></Display>  */}
           <Display kind="vision" List={this.props.list}></Display>
          </div> : ""}
          {this.props.recommendlist ?  <div className="imgbox">
            <h2>일치하는 상품이 없습니다</h2>
            <h2>유사한 카테고리 상품추천- <strong>{this.props.category}</strong></h2>
            <hr></hr>
            <Display kind="vision" List={this.props.recommendlist}></Display> 
          </div> : ''}
          
          </div>
         )

    }
}

export default visionList;