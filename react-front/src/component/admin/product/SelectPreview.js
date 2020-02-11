import React, { Component } from 'react';

class SelectPreview extends Component {
    static defaultProps = {
        selects: []
    }

    render() {
        const { selects, deleteName, name, onClick } = this.props;
        const selectsPreview = selects.map((s, index) => ( <div key={index} name={deleteName} value={index} onClick={onClick}>{s[name]} <span name={deleteName} value={index} style={{color:'#e03131'}}>&times;</span></div> ));
        return (
            <div className="SelectPreview">{selectsPreview}</div>
        );
    }
}

export default SelectPreview;