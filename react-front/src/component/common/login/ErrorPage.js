import React, { Component } from 'react';
import "./errorPage.css";

class ErrorPage extends Component {
    render() {
        return (
            <div className="ErrorPage">
                <div>
                    <img alt="error" src="/images/error.svg"/>
                관리자 권한이 필요한 페이지입니다.
                </div>
            </div>
        );
    }
}

export default ErrorPage;