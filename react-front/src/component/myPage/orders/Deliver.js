import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Deliver extends Component {
    openPopup(url){
        window.open(url,"name","width=700px, height=500px, left=500px ,top=200px")
      }
    render() {
        const delivery = "http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.postal?sid1="
        return (
            <div>
                <Button className="jaehoon" variant="outline-dark" onClick={()=>this.openPopup.bind(this)(delivery+this.props.invoice)}>배송조회</Button>
            </div>
        );
    }
}

export default Deliver;