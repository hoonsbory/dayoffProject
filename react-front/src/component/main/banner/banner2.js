import React, { Component } from 'react';
import './banner2.scss';
import Axios from 'axios';



class banner2 extends Component {
    state = {
        product : []
    }


    test1() {
        Axios.get('/TopBannerList').then(res=>{
          const product =res.data;
          this.setState({ product });
        });
    }
    
    componentDidMount(){
        this.test1();
    }

    render() {
        return (
                <div className="tileDiv">
            <div className="MContentsHeader_box">
             <a className="MContentsHeader_aa">BEST 4</a> 
             </div>
            <div className='Banners'>
            <Tiles list={this.state.product}/>
            </div>
            </div>
            );
    }
}
export class Tiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            change : false
        };
        // Bind properties to class instance
        this.stateChange = this.stateChange.bind(this);

    }

   
    

    stateChange(){
        if (this.state.change === false) {
            this.setState({
                change: true
            });
        } else {
            this.setState({
                change: false
            });
        }
    }
    render() {
        
    
        let change = {};
        let changeBtn = {};
        if(this.state.change){
            change = {
                position : "unset"
            }
            changeBtn = {
                display : "none"
            }
        }   
        else{
            change = {
                position : "relative"

            }
            changeBtn = {
                // display : "block"
            }
        }
        // Create tile for each item in data array
        // Pass data to each tile and assign a key
        return (
            <div className="tiles">
                {this.props.list.map(product => 
                 <Tile history={this.props.history} changeFunc={this.stateChange} changeBtn={changeBtn} change={change} product={product} key={product.id}/>)}
            </div>
        );
    }
}


class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            mouseOver: false,
        };
        // Bind properties to class instance
        this._clickHandler = this._clickHandler.bind(this);
        this._mouseEnter = this._mouseEnter.bind(this);
        this._mouseLeave = this._mouseLeave.bind(this);
        this.changeFalse = this.changeFalse.bind(this)
    }

            // Event handlers to modify state values
            _mouseEnter(e) {
                e.preventDefault();
                if (this.state.mouseOver === false) {
                    this.setState({
                        mouseOver: true
                    })
                }
            }
            _mouseLeave(e) {
                e.preventDefault();
                if (this.state.mouseOver === true) {
                    this.setState({
                        mouseOver: false
                    })
                }
            }
            _clickHandler(e) {
                e.preventDefault();
                this.props.changeFunc()
                if (this.state.open === false) {
                    this.setState({
                        open: true
                    });
                } else {
                    let id = this.props.product.id
                    document.getElementById(this.props.product.id).onclick = function(){
                        window.location.href = "/product/"+ id;
                    }
                    this.setState({
                        open: false
                    });

                }
            }
            changeFalse() { 
               
                this.setState({
                    open : false
                })
            }    
    
            componentDidMount(){
                let id = this.props.product.id
                document.getElementById(id).onclick = function(){
                    window.location.href = "/product/"+ id;
                }
            }
    render() {


        let tileStyle = {};
        // When tile clicked
        if (this.state.open) {
            let id = this.props.product.id
            document.getElementById(this.props.product.id).onclick = function(){
                document.getElementById("tileBtn"+id).click();
            }
            tileStyle = {
               width: '710px',
                height: '595px',
                position: 'absolute',
                left: '50%',
                margin: '0',
		top: '0%',
                boxShadow: '0 0 40px 5px rgba(0, 0, 0, 0.3)',
                transform: 'translateX(-50%)'
            };
        } else {
            tileStyle = {
                zIndex : '499',
                width: '100%',
                height: '100%',
                
            };
        }

       
               
        return (
            <div  className='TotalTile' >
                <div id="Total"className="tile" style={this.props.change}>
                    {/* <Link to={"/product/"+this.props.product.id}> */}
                    <img
                        alt="tileImg"
                        onMouseEnter={this._mouseEnter}
                        onMouseLeave={this._mouseLeave}
                        // src={"https://storage.googleapis.com/bit-jaehoon/"+product.productThumbnailName}
                        src={"https://storage.googleapis.com/bit-jaehoon/"+ this.props.product.productThumbnailName}
                        id={this.props.product.id}
                        style={tileStyle}
                    />
                    {/* </Link> */}
                    <img alt="change" id={"tileBtn"+this.props.product.id} style={this.props.changeBtn} onClick={this._clickHandler} className='titititi' src='/images/enlargement.png'></img>
                </div>
            </div>
        )
    }
}

export default banner2;