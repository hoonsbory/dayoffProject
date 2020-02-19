import React, { Component } from 'react';
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import '../common/css/crop.css'
import VisionList from './visionList'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
class visionCrop extends Component {

    state = {
        result: null,
        filename: null,
        filetype: null,
        src: null,
        error: null,
        list : null
        
      };
     
      aaaa() {
        document.getElementById("severalProductLoading").style.visibility = "visible";

        axios.post('/crop', {
          result : this.state.result
          
        })
        .then(response => { 
          this.setState({
            list : response.data.list,
            recommendlist : response.data.recommend,
            empty : response.data.empty,
            category : response.data.category,
            bestList : response.data.bestList
          })
          document.getElementById("severalProductLoading").style.visibility = "hidden";

        })
        .catch(error => {
            console.log(error.response)
        });
        
      }
      
      onChange = value => {
        this.setState(value);
        document.getElementById("searchbutton").disabled = false;
      };



    render() {
        return (
            <div>
              <div className="pageTitle2">
              <div>인공지능 상품검색</div>
              <br></br>
            </div>
           <br></br>
           <br></br>
           <div className="visionbody">
                 <DropNCrop onChange={this.onChange} value={this.state} />
                 <div className="info"><h3>인공지능으로 똑똑하게!</h3>
          <br></br>
          SNS나 인터넷에서 봤던 옷들을 보다 쉽게 저희 쇼핑몰에서 찾을 수 있습니다.
          원하는 사진을 업로드 후 특정 부위를 잘라 검색할 수 있습니다. 
          <br></br>
          일치하는 상품이 없더라도 똑똑한 인공지능이 해당 제품의 카테고리를
          분석하여 같은 종류의 의류들을 추천해줍니다.


          {/* {this.state.result ? <div className="previewDiv"> */}
          <div className="buttonDiv">
             <Button className="buttonVision" onClick={() => window.location.reload(false)}>다시하기</Button>
          <br></br>
          <Button style={{display : 'inline'}} className="buttonVision" id="searchbutton"  onClick={this.aaaa.bind(this)}>검색하기</Button>
          <div style={{visibility : 'hidden', display : 'inline'}} className="loading pt-4" id="severalProductLoading"><img alt="loading" src="/images/loading25.gif"></img></div>
          
          </div>
          {/* </div> : ""} */}
          </div>
          
          </div>
          <div style={{width : '93%', margin: 'auto'}}>
          <VisionList bestList={this.state.bestList} category={this.state.category} empty={this.state.empty} recommendlist={this.state.recommendlist} list={this.state.list}></VisionList>
          </div>
            </div>
        );
    }
}

export default visionCrop;