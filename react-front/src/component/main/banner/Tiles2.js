import React, { Component } from 'react';
import './banner2.scss';
import { Link } from 'react-router-dom'




export class Tiles2 extends Component {
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
                position : "unset",
                
                
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
            <div className="card" id="card" style={this.props.cardStyle}>
                {this.props.list.map(product => 
                 <Tile kind={this.props.kind} Left={this.props.Left} history={this.props.history} changeFunc={this.stateChange} changeBtn={changeBtn} change={change} product={product} key={this.props.kind+product.productId}/>)}
            </div>
        );
    }
}


class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            // mouseOver: false,
        };
        // Bind properties to class instance
        this._clickHandler = this._clickHandler.bind(this);
        // this._mouseEnter = this._mouseEnter.bind(this);
        // this._mouseLeave = this._mouseLeave.bind(this);
        this.changeFalse = this.changeFalse.bind(this)
    }

            // Event handlers to modify state values
            // _mouseEnter(e) {
            //     e.preventDefault();
            //     if (this.state.mouseOver === false) {
            //         this.setState({
            //             mouseOver: true
            //         })
            //     }
            // }
            // _mouseLeave(e) {
            //     e.preventDefault();
            //     if (this.state.mouseOver === true) {
            //         this.setState({
            //             mouseOver: false
            //         })
            //     }
            // }
            _clickHandler(e) {
                e.preventDefault();
                this.props.changeFunc()
                if (this.state.open === false) {
                    this.setState({
                        open: true
                    });
                } else {
                    let id = this.props.product.productId
                    let kind = this.props.kind
                    document.getElementById(kind+id).onclick = function(){
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
                let id = this.props.product.productId
                let kind = this.props.kind
                document.getElementById(kind+id).onclick = function(){
                    window.location.href = "/product/"+ id;
                }
            }
    render() {

        let tileStyle = {};
        let position = this.props.Left+'px'
        // When tile clicked
        if (this.state.open) {
            let id = this.props.product.productId
            let kind = this.props.kind

            document.getElementById(kind+id).onclick = function(){
                document.getElementById(kind+"btn"+id).click();
            }
            tileStyle = {
                
                width: '710px',
                height: '595px',
                position: 'absolute',
                top: '0%',
                left: position,
                margin: '0',
                boxShadow: '0 0 40px 5px rgba(0, 0, 0, 0.3)',
                transform: 'translateX(-50%)',
                zIndex : '1',            
            };
        } else {
            tileStyle = {
                width: '220px',
                height: '80%',
            
            };
        }

       
               
        return (
            <div  className='TotalTilejh' >
                <div id="Total"className="tilejh" style={this.props.change}>
                    {/* <Link to={"/product/"+this.props.product.id}> */}
                    <img className="tileImg"
                        // src={"https://storage.googleapis.com/bit-jaehoon/"+product.productThumbnailName}
                        src={"https://storage.googleapis.com/bit-jaehoon/"+ this.props.product.productThumbnailName}
                        id={this.props.kind+this.props.product.productId}
                        style={tileStyle}
                        alt="tileImg"
                    />
                    <Link to={"/product/"+this.props.product.productId}>
                <p className="title">{this.props.product.productName}</p>
                <p className="price">{this.props.product.price}원</p>
                </Link>
                    {/* </Link> */}
                    <img alt="change" id={this.props.kind+"btn"+this.props.product.productId} style={this.props.changeBtn} onClick={this._clickHandler} className='jhBtn' src='/images/enlargement.png'></img>
                </div>
            </div>
        )
    }
}
