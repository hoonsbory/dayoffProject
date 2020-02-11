import React, { Component } from 'react';
import ContactInfo from './ContactInfo';
import './contact.css';
import { Link , withRouter } from "react-router-dom"

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            contactData : []
        };

        this.handelChange = this.handelChange.bind(this);
    }

  refreshPage() {
    window.history.go(0);
}

handleKeyPress(e){
    if(e.keyCode === 0){ 
        // this.props.history.push("/productList/search?keyword="+this.state.keyword)
        
    }
}

 

    handelChange(e) {
        this.setState({
            keyword: e.target.value});
        //     ApiService.SearchProduct(this.keyword).then(res => {
        //         this.setState({contactData : res.data.result});
        // });
    }


    render() {
        let mapToConponents = null;
        if(this.state.contactData!==null){
         mapToConponents = (data) => {
            data.sort();
            data = data.filter(
                contact => {
                    return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
                }
                )
            return data.map((contactData, i) => {
                return (<ContactInfo contactData={contactData.categoryName} key={i}/>);
            });
        };
    }
        return (
            <div className= "Csearch_box">
                <input className="Csearch_input"    
                name ="keyword"
                placeholder="  Search"
                value={this.state.keyword}
                onChange={this.handelChange}
                onKeyPress={this.handleKeyPress.bind(this)}
                >
                </input>
                <Link className='Csearch_Link' to={"/productList/search?keyword="+this.state.keyword} ><img className='SearchImg' alt="searchImg" src='https://cdn.pixabay.com/photo/2016/03/31/19/14/magnifying-glass-1294834_960_720.png'></img></Link>

                <div>{mapToConponents(this.state.contactData)}</div>
            </div>
        );
    }
}

export default withRouter(Contact);