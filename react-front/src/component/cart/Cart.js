import React from 'react';
import { Link } from 'react-router-dom';



const Cart = (props) => (

    <tr>
        
 <td><input type="checkbox" style={{"transform":"scale(1.5)"}} className="checkGroup" name="check" onChange={props.onChange} value={props.id}></input></td>
    
    <td>
    {/* <Link style={{textDecorationLine: 'none'}} to={"/product/" + props.productId}><div style={{  wordBreak: "break-all" ,textAlign:"left",paddingLeft:"30px"}}> <p>{props.name}</p></div> */}
  
{/* </Link> */}
    <div className="infoDiv">
        <Link to={"/product/"+props.productId}><img height="120px"width="120px" alt="productImage" src={props.productImage} alt="image"></img></Link>
        <ul style={{left : '157px'}} className="nameColor">
           <li>
        <Link style={{fontSize : '20px', fontWeight : '200', color : 'black'}} className="info1" to={"/product/"+props.productId}>{props.name}</Link>
          </li> 
        </ul>
    </div>
    </td>
    <td>{props.color} </td>
    <td>{props.size} </td>
    <td>{props.quantity} </td>
    <td>{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </td>
    <td>{props.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </td> 
            
    </tr>
);

export default Cart;