import React, { Component } from 'react'
import ApiService_ from "../pay/service/ApiService_";
import InputMask from 'react-input-mask';
import DaumPostcode from 'react-daum-postcode';
import{InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap';
class ListCartComponent extends Component {
    

    constructor(props) {
        super(props)
        this.state = {
            carts: [],
            message: null,
            url: null,
            name: '',
            location: '',
            postalCode: '',
            phone: '',
            userId: '',
            selectValue: "",
            checked:false,
            checked_:false,
            service:"1",
            total:"",
    grade:"",
     user:[],
     totalPay:"",
     discount:"",
     showPopup: false,
     location2:"",
     emoney:"",
     useEmoney:"",
     real:"",
     calctotalpay:"",
     cemoney:"",
     cdemoney:"0",
     transpay:"",
     totallocation:""
            
        }
        // this.use=this.use.bind(this);
        this.reloadCartList = this.reloadCartList.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        
        
    }
    
   
    componentDidMount() {
      window.scrollTo(0, 0);
        this.reloadCartList(); 
               
    }

    togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup  
        });  
         }  

    handleAddress = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        let postcode=data.zonecode;
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        this.setState({location:data.address});
        this.setState({postalCode:data.postcode})

        this.togglePopup();
   

      }
    
  
   
  
   
    reloadCartList() {

        ApiService_.fetchUserLevel(localStorage.getItem("userId"))
            .then((res) => {
               // console.log(res.data)
                
                this.setState({user: res.data})
                this.setState({grade:res.data.grade.level})
                this.setState({emoney:res.data.totalEmoney})
                this.setState({cemoney:res.data.totalEmoney})
    let cartlist=this.props.location.state.cartList
        this.setState({carts:this.props.location.state.cartList});
        let sum=0;
        for (let i = 0; i < cartlist.length; i++)
                {
                      sum += cartlist[i].totalPrice;
                }
        let s=Math.round(Math.ceil(sum)/10)*10;
            this.setState({total:s});
            let discountprice=0;
            if(this.state.grade==='브론즈'){
                discountprice=Math.ceil(sum*0.99);
            
            }
            if(this.state.grade==='실버'){
                discountprice=Math.ceil(sum*0.98);
                
            }
            if(this.state.grade==='골드'){
                discountprice=Math.ceil(sum*0.97);
            }
            if(this.state.grade==='플래티넘'){
                discountprice=Math.ceil(sum*0.96);
            }
            this.setState({totalPay:Math.round(Math.ceil(discountprice)/10)*10})
            this.setState({calctotalpay:this.state.totalPay})
            let d=this.state.total-this.state.totalPay;
            this.setState({discount:d})
              this.setState({transpay:this.state.totalPay})
            });
           

    }
    handleDropdownChange(e) {
        this.setState({ selectValue: e.target.value });
        
      }

    // startOrder=(e)=>{
    //     ApiService_.order(this.state.carts).then(res=>{
    //         this.props.history.push('/order');
    //     });
    // }
    // startKakaopay=(e)=>{
    //     ApiService_.kakaopay().then(res=>{
    //         this.props.history.push('/kakaoPay');
    //     });
    // }
    use(){
      const c=this.state.cemoney
      this.setState({transpay:this.state.calctotalpay-this.state.useEmoney})
      let real=this.state.calctotalpay-this.state.useEmoney;
      this.setState({real:real})
      let re=c-this.state.useEmoney;
      this.setState({emoney:re})
      this.setState({cdemoney:this.state.useEmoney})
      
      
  }
    onChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value });
    }
    //   start2Kakaopay=(e)=>{
    //       let params = new URLSearchParams();
    //       params.append('a',this.state.name);
    //       let deliever_ = {name: this.state.name, location: this.state.location, postalCode: this.state.postalCode, phone: this.state.phone};
    //       this.setState({deliever:deliever_})
 
    //     ApiService_.kakaopay(this.state.carts).then((res)=>{
    //         this.props.history.push(res.data)
    //         window.location.assign(res.data);
    //     });
    // }

       handleChange = (e) => {
         const { target: {service} } = e;
         this.setState({ service });
 
       };
    
    start2Kakaopay=(e)=>{
        // let params = new URLSearchParams();
        // params.append('name',this.state.name);
        // params.append('location',this.state.location);
        // params.append('postalCode',this.state.postalCode);
        // params.append('phone',this.state.phone);
        // params.append('carts',this.state.carts)
        let loc=this.state.location+" "+this.state.location2

        let deliever_ = {name: this.state.name, location: loc, postalCode: this.state.postalCode, phone: this.state.phone};
        

      ApiService_.kakaopay(this.state.carts, deliever_,this.state.selectValue,this.state.checked,this.state.store,this.state.service,this.state.discount,this.state.transpay,this.state.emoney,this.state.useEmoney,localStorage.getItem("userId")).then((res)=>{
          this.props.history.push(res.data)
          window.location.assign(res.data);
      });
      
  }
  
 
    render() {      
   
  
        return (
        
                
                <div className="payinfo" style={{paddingTop : "255px"}}>
                    <h2>{this.state.selectValue}</h2>
                    <div>
                      <div className="w"></div>
                <h4 className="titlea">ORDER</h4>
                </div>
                
                <table className="n-table" >
                <colgroup>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
           </colgroup>
                <thead>
                        <tr>
                            <th>상품정보</th>
                            <th>색상</th>
                            <th>사이즈</th>
                            <th>수량</th>
                            <th>상품금액</th>
                            <th>주문금액</th>
                            {/* <th>id</th>
                            <th>userId</th>
                           this.setState({real:real})  <th>productId</th>
                            <th>name</th> */}
                        </tr>
                    </thead>
                     
                    <tbody >
                  {  this.state.carts.map(
            cart =>
                        <tr key={cart.id}>
    <td ><div style={{ wordBreak: "break-all" }}><img height="100px"width="100px" alt="productImg" src={"https://storage.googleapis.com/bit-jaehoon/"+cart.productThumbnailName}></img></div>{cart.name}</td>
                            <td>{cart.color}</td>
                            <td>{cart.size}</td>
                            <td>{cart.quantity}</td>
                            <td><div>{cart.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div></td>
                            <td>{cart.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                            {/* <td>{cart.id}</td>
                            <td>{cart.userId}</td>
                            <td>{cart.productId}</td>
                            <td>{cart.name}</td> */}
                        </tr>
                            
                )
        }
                    </tbody> 
                    {/* <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>id</th>
                            <th>productId</th>
                            <th>color</th>
                            <th>size</th>
                            <th>quantity</th>
                            <th>cartDate</th>
                            <th>price</th>
                            <th>userId</th>
                        </tr>
                    </thead>
                     
                    <tbody>
                  {  this.state.carts.map(
            cart =>
                        <tr key={cart.id}>
                            <td>{cart.productId}</td>
                            <td>{cart.color}</td>
                            <td>{cart.size}</td>
                            <td>{cart.quantity}</td>
                            <td>{cart.cartDate}</td>
                            <td>{cart.price}</td>
                            <td>{cart.userId}</td>
                        </tr>
                )
        }
                    </tbody>  */}
                </table>
                
    <h4 className="right">총주문금액{this.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h4>
    
  

    {/* <Popup trigger={<button> 우편번호</button>} position="right center">
<DaumPostcode
        onComplete={this.handleAddress}
/> 
: null  
} 
  </Popup> */}
 {/* <div>
     <button onClick={this.togglePopup.bind(this)}> 우편번호</button>  
 {this.state.showPopup ?  
 <DaumPostcode
         onComplete={this.handleAddress}
 /> 
 : null  
 }  </div>  */}
  
  <div className="q"></div>  
    
<form>
<div>
  <input type="radio" name="service" value="1" onChange={this.onChange} defaultChecked={true}/>배송서비스
  <input type="radio" name="service" value="0"  onChange={this.onChange} />매장픽업서비스


  </div>


</form>
               
      

{this.state.service==="1"&&<div>
                <h4 className="text-center">배송지 정보</h4>
                
<div className="receive"></div>
                    <div>
                    <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>받으시는 분</InputGroupText>
        </InputGroupAddon>
        <input type="text" placeholder="name" name="name" className="a" value={this.state.name} onChange={this.onChange}/>
      </InputGroup>
      <br />
                    </div>
                    <div>
                    <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>우편번호</InputGroupText>
        </InputGroupAddon>
       < input placeholder="postalCode" name="postalCode" className="b" value={this.state.postalCode} onChange={this.onChange}/>
       <button className="c" color="secondary" onClick={this.togglePopup.bind(this)}> 우편번호검색</button>  
 {this.state.showPopup ?  
 <DaumPostcode
         onComplete={this.handleAddress}
 /> 

 : null  
 } 
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>주소</InputGroupText>
        </InputGroupAddon>
        <input placeholder="location" name="location" className="d" value={this.state.location} onChange={this.onChange}/>
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>상세주소</InputGroupText>
        </InputGroupAddon>
        <input placeholder="상세주소" className="e" name="location2"  value={this.state.location2} onChange={this.onChange}/>
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>phone</InputGroupText>
        </InputGroupAddon>
        <InputMask mask="999-9999-9999"  className="f" maskChar={null}  name="phone" value={this.state.phone} onChange={this.onChange}/>
      </InputGroup>
      <br />
      </div> 
      </div>}
     
{this.state.service==="0"&&<div>
  <h4 className="text-center">매장픽업</h4>
<div className="receive"></div>
  
                <div>
                <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>매장선택</InputGroupText>
        </InputGroupAddon>
        <input placeholder="매장선택" name="selectValue" className="i" value={this.state.selectValue} onChange={this.onChange}/>
        <select id="dropdown" className="h" onChange={this.handleDropdownChange}>
              <option value="매장선택">매장선택</option>
              <option value="강남점">강남점</option>
              <option value="역삼점">역삼점</option>
              <option value="선릉점">선릉점</option>
            </select>
      </InputGroup>
  

          </div>
          </div>}
          <div className="m" ></div>
          <h4 className="text-center">결제예정금액</h4>
          <div className="receive"></div>
<div>


<table className="n-table" >
                <colgroup>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
           </colgroup>
                <thead>
                        <tr>
                            <th>총주문금액</th>
                            <th>회원할인금액</th>
                            <th>적립금 할인금액</th>
                            <th>총결제금액</th>
                        </tr>
                    </thead>
                     
                    <tbody>
                            <td><div>{this.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div></td>
                            <td><div>{this.state.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div></td>
                            <td><div>{this.state.cdemoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div></td>
                            <td><div>{this.state.transpay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div></td>                       
                    </tbody> </table>


</div>
<div className="k"></div>
<InputGroup className="n">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>적립금할인</InputGroupText>
        </InputGroupAddon>
        <input placeholder="useEmoney" name="useEmoney" className="f" value={this.state.useEmoney} onChange={this.onChange}/> 
        <button className="c" onClick={this.use.bind(this)}>사용</button> <h5 className="o">적립금:{this.state.emoney}원</h5>
</InputGroup>
      <br />
<div className="q">
          
                <center><button className="p" onClick={this.start2Kakaopay}> 결제하기</button></center>
                </div>

                <div className="q"></div>
                
          </div>
          
          
        );
    }

}

export default ListCartComponent;