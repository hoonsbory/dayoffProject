import React, { Component } from 'react';

class ContactInfo extends Component {
    render() {
        return (
            <div>
                {this.props.contactData.id} {this.props.contactData.name} {this.props.contactData.subName}
            </div>
        );
    }
}

export default ContactInfo;