import React, { Component } from 'react';
import Display from './Display'
class productCookie extends Component {
    state = {
       
    }

    
  

    render() {
        // if(cookieList){
        //  result = cookieList.map(
        //     (data1,index) => (<div className="listDiv"><Link to={detail+data1.productId}><img className="imglist" width="200px" height="250px" alt="" src={"https://storage.googleapis.com/bit-jaehoon/"+data1.productThumbnailName}></img><p>{data1.productName}</p></Link></div>)
        // )
        // }
        return (
            <div style={{width:"93%", margin:"auto"}} >
                <h2>최근 본 상품</h2>

                <hr style={{borderTop : "1px solid black"}}></hr>
                {/* <Slider heading="Example Slider" slides={cookieList} />    */}
            {this.props.cookieList ? <Display kind="cookie" List={this.props.cookieList}></Display> : ''}
            </div>
        );
    }
}

export default productCookie;