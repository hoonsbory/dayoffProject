import React, { Component } from 'react';
import XLSX from 'xlsx';
import { Form, Table, Row, Col } from 'react-bootstrap';

class ProductsFileForm extends Component {

    state = {
        uploadName: ".xls, .xlsx 파일 선택",
        colors: [],
        categories: []
    }
    handleChange = (e) => {
        this.setState({
            uploadName: e.target.files[0] ? e.target.files[0].name : this.state.uploadName
        })
        const file = e.target.files[0];
        let typeError = null;
        switch (file.name.substring(file.name.lastIndexOf("."))) {
            // case ".csv":
            case ".xlsx":
            case ".xls":
                this.xlsxToJson(file, this.props.addProduct)
                break;
            default:
                this.props.addProduct();
                typeError = '지원되는 파일 형식만 첨부 가능합니다. (.xls, .xlsx)';
        }
        this.props.setTypeError(typeError);
    }

    xlsxToJson(file, callback) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = reader.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetNameList = workbook.SheetNames; // 시트 이름 목록 가져오기 
            const firstSheetName = sheetNameList[0]; // 첫번째 시트명
            const firstSheet = workbook.Sheets[firstSheetName];
            const json = XLSX.utils.sheet_to_json(firstSheet);
            const products = json.map(product => {
                let sizes = product.size.toString().split(";").map(s => s.toUpperCase().trim()).filter(s => s.length > 0&&s!==" ").reduce((prev, curr) => { return prev.concat({ size: curr }) }, []);
                let colors = product.color.toString().split(";").map(c => c.trim()).filter(c => c.length > 0).reduce((prev, curr) => { return prev.concat({ id: curr }) }, []);
                let productImages = product.productImage.split(";").map(i => i.trim()).filter(i => i.length > 0).reduce((prev, curr) => { return prev.concat({ originalName: curr }) }, []);
                return { category: { id: product.category }, name: product.name, price: product.price, productSize: sizes, color: colors, detailImage: product.detailImage, productImage: productImages }
            })
            callback(products);
        };
        reader.readAsBinaryString(file);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            colors: nextProps.colors,
            categories: nextProps.categories
        })
    }


    render() {
        const categories = this.state.categories.map(c => (<tr><td>{c.id}</td><td>{c.name}</td><td>{c.subName}</td></tr>));
        const colors = this.state.colors.map(c => (<tr><td>{c.id}</td><td>{c.color}</td></tr>));

        return (
            <div className="ProductsFileForm">
                <div className="filebox ml-4">
                <Row>
                <Form.Label column sm="2">
                엑셀 파일
                </Form.Label>
                <Col>
                    <input className="upload-name" value={this.state.uploadName} disabled="disabled" />
                    <label className="fileBtnLabel" htmlFor="ex_file">파일첨부</label>
                    <input type="file" id="ex_file" onChange={this.handleChange} />
                    <span className="typeError">{this.props.typeError}</span>
                </Col>
                </Row>
                </div>
                <div className="formInfo">
                    카테고리, 상품명, 색상, 사이즈, 가격, 상세설명 이미지명, 상품 이미지명이 입력된 엑셀 파일을 첨부하세요.<br></br>
                    카테고리와 색상의 경우, 아래의 표를 참고하여 번호를 입력하세요.<br></br>
                    색상, 사이즈, 상품 이미지 등과 같이 한 필드에 1개 이상의 항목이 입력되어야 할 때에는 구분자로 ';'을 사용하세요. <div className="formInfoEx">파일 예시보기<img alt="fileEx" src="/images/productFormInfoEx.png"></img></div><br></br>
                    <Row>
                        <Col>
                            <Table striped bordered size="sm" className="formInfoCategories">

                                <thead><tr><th>카테고리 번호</th><th>상위 카테고리</th><th>하위 카테고리</th></tr></thead>
                                <tbody>{categories}</tbody>
                            </Table>
                        </Col>
                        <Col>

                            <Table striped bordered size="sm" className="formInfoColors">

                                <thead><tr><th>색상 번호</th><th>색상명</th></tr></thead>
                                <tbody>{colors}</tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default ProductsFileForm;