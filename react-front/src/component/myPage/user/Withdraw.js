import React, { Component } from 'react';
import axios from 'axios';
import { Button, ButtonToolbar, Form, Row, Col, Container } from 'react-bootstrap';

class Withdraw extends Component {

    state = {
        code: [],
        selectedCode: '',
        error: ''
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getCode();
    }

    async getCode() {
        const response = await axios.get('/withdraw');
        this.setState({
            code: response.data
        })
    }

    withdraw = async () => {
        const code = this.state.code[this.state.selectedCode];
        if (code) {

            sessionStorage.removeItem("userId");
            const response = await axios.post('/withdrawProcess',code);
            this.props.history.push('/');
        } else {
            this.setState({
                error: '탈퇴 사유를 선택해주세요.'
            });
        }
    }

    handleSelect = (e) => {
        this.setState({
            selectedCode: e.target.value
        })

    }

    render() {
        const { code } = this.state;
        const { handleSelect, withdraw } = this;
        const codeOp = code.map((c, index) => (<Form.Check className="p-2" key={c.code} type="radio" value={index} name="code" id={c.content} label={c.content} onChange={handleSelect}/>))
        return (
            <div className="Withdraw">
                <div className="pageTitle">
                            <div>회원 탈퇴</div>
                </div>
                <Container>
                    <div className="withdrawInfo">
                    <div>
                        회원 탈퇴 후에는 회원님의 모든 정보가 삭제됩니다.
                    </div>
                    <div>
                        탈퇴하시려면 아래의 탈퇴 사유를 선택해주세요.
                    </div>
                    </div>
                <Form.Group as={Row} className="withdrawCode w-75 p-3 m-auto">
                    <Form.Label column sm="3">
                        탈퇴 사유
                    </Form.Label>
                    <Col sm="6">
                        <Form>
                            {codeOp}
                        </Form>
                    </Col>
                </Form.Group>
                <div className="mb-4"></div>
                <div className="error pt-4">{this.state.error}</div>
                <ButtonToolbar className="justify-content-center pt-4 mt-4 pb-4 mb-4">
                    <Button variant="outline-dark" onClick={withdraw}>탈퇴하기</Button>
                </ButtonToolbar>
                </Container>
            </div>

        );
    }

}

export default Withdraw;

