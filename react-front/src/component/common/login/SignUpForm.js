import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import { Button, ButtonToolbar, Form, Row, Col } from 'react-bootstrap';
import "./userForm.css";

class SignUpForm extends Component {


    render() {
        
        const { name, phone, birth, sex, height, weight } = this.props.users;
        const { error, onChange, onClick, button } = this.props;
        return (
            <div className="SignUpForm">
                {/* <Container> */}
                <Form.Group as={Row} className="p-3 m-auto justify-content-center">
                    <Form.Label column sm="3">
                        이름*
                </Form.Label>
                    <Col sm="6">
                        <Form.Control type="input" name="name" value={name} onChange={onChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="p-3 m-auto justify-content-center">
                    <Form.Label column sm="3">
                        연락처*
                </Form.Label>
                    <Col sm="6">
                        <InputMask className="inputMask" mask="999-9999-9999" maskChar={null} name="phone" value={phone} onChange={onChange} placeholder="010-0000-0000" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="p-3 m-auto justify-content-center">
                    <Form.Label column sm="3">
                        생일*
                </Form.Label>
                    <Col sm="6">
                        <InputMask className="inputMask" mask="9999-99-99" maskChar={null} name="birth" value={birth} onChange={onChange} placeholder="1990-01-01" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="p-3 m-auto justify-content-center">
                    <Form.Label column sm="3">
                        성별*
                </Form.Label>
                    <Col sm="6">
                        <Form>
                            <Form.Check inline
                                type='radio'
                                name="sex" value="f" defaultChecked={sex === 'f'} onChange={onChange}
                                id="여자"
                                label="여자"
                                />

                            <Form.Check inline
                                type='radio'
                                name="sex" value="m" defaultChecked={sex === 'm'} onChange={onChange}
                                id="남자"
                                label="남자"
                                />
                        </Form>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="p-3 m-auto justify-content-center">
                    <Form.Label column sm="3">
                        키
                </Form.Label>
                    <Col sm="6">
                        <Form.Control type="input" name="height" className="placeholderAlignRight" value={height} onChange={onChange} placeholder="cm" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="p-3 m-auto justify-content-center">
                    <Form.Label column sm="3">
                        몸무게
                </Form.Label>
                    <Col sm="6">
                        <Form.Control type="input" name="weight" className="placeholderAlignRight" value={weight} onChange={onChange} placeholder="kg" />
                    </Col>
                </Form.Group>
                <div className="error pt-4">{error}</div>
                <ButtonToolbar className="justify-content-center pt-4 mt-4 pb-4 mb-4">
                    <Button variant="outline-dark" onClick={onClick}>{button}</Button>
                </ButtonToolbar>
                    {/* </Container> */}
            </div>

        );
    }
}

export default SignUpForm;

