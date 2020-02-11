import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

class OrderType extends Component {
    static defaultProps = {
        info: null
    }


    onClick = () => {
        window.open("http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.postal?sid1=" + this.props.info.invoice, '', 'width=700px, height=500px, left=500px ,top=200px');
    }
    render() {
        const { info } = this.props;
        if (info.deliverId) {
            const { invoice, deliverName, deliverLocation, deliverPostalCode, deliverPhone } = info;
            return (
                <div className="OrderType orderDeliver">
                    <div className="tableTitle">배송 정보</div>
                    <Table bordered>

                        <tbody>

                            <tr>
                                <th>수령인</th><td>{deliverName}</td>
                            </tr>
                            <tr>
                                <th>배송지</th><td style={{maxWidth:"0%", wordBreak:"break-all" }}>{deliverLocation}</td>
                            </tr>
                            <tr>
                                <th>우편번호</th><td>{deliverPostalCode}</td>
                            </tr>
                            <tr>
                                <th>연락처</th><td>{deliverPhone}</td>
                            </tr>
                            <tr>
                                <th>송장번호</th><td>우체국택배 {invoice} <Button onClick={this.onClick}>배송조회</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            );
        }
        else {
            const { storesName, storesLocation } = info;
            return (
                <div className="OrderType orderPickUp">
                    <div className="tableTitle">픽업 정보</div>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <th>픽업 매장</th><td>{storesName}</td>
                            </tr>
                            <tr>
                                <th>주소</th><td style={{maxWidth:"90%", wordBreak:"break-all" }}>{storesLocation}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            );
        }
    }


}

export default OrderType;