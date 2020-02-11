import React, { Component } from 'react'
import axios from 'axios';
import UserInfo from './UserInfo';
import ReactPaginate from 'react-paginate';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import "./userList.css";

export default class UserList extends Component {
  state = {
    users: [],
    totalPages: 0,
    page: 0,
    keyword: 'id',
    search: '',
    includeWithdraw: false,
    currentPage: 0
  }

  getUserList() {
    axios.get(`/getUserList?page=${this.state.page}&keyword=${this.state.keyword}&search=${this.state.search}&include=${this.state.includeWithdraw}`)
      .then(res => {
        console.log(res);
        this.setState({
          users: res.data.content,
          totalPages: res.data.totalPages
        });
      })
  }


  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.props)
    if (this.props.match.params.userId) {
      this.setState({
        keyword: "id",
        search: this.props.match.params.userId
      }, () => this.getUserList()
      );
    } else
      this.getUserList();
  }

  handlePageClick = data => {
    const selected = data.selected;
    this.setState({ page: selected }, () => {
      this.getUserList();
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheck = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    }, () => {
      if (this.state.page !== 0)
        document.getElementsByClassName("page-link")[1].click();
      else
        this.getUserList();
    })
  }

  handleClick = (e) => {
    if (this.state.page !== 0)
      document.getElementsByClassName("page-link")[1].click();
    else
      this.getUserList();
  }


  render() {
    const userList = this.state.users.map(u => <UserInfo key={u.id} user={u}></UserInfo>);
    return (
      <div className="UserListWrapper">
        <div className="pageTitle">
          <div>회원 리스트</div>
        </div >
        <div className="UserList">
          <Form.Group as={Row} className="p-3 m-auto">
            <Col sm="2">
          <Form className="withdrawCheck">
            <Form.Check
              type='checkbox'
              name="includeWithdraw" onChange={this.handleCheck}
              id="탈퇴회원 포함"
              label="탈퇴회원 포함"
              />
          </Form>
              </Col>
            <Col sm="4"></Col>
            <Col sm="2">
              <Form.Control as="select" name="keyword" value={this.state.keyword} onChange={this.handleChange}>
                <option value="id">회원번호</option>
                <option value="name">회원이름</option>
              </Form.Control>
            </Col>
            <Col sm="3">
              <Form.Control type="input" name="search" value={this.state.search} onChange={this.handleChange} />
            </Col>
            <Button className="secondary" onClick={this.handleClick}>검색</Button>
          </Form.Group>
          <Table className="table">
            <thead>
              <tr><th>회원번호</th><th>소셜아이디</th><th>이름</th><th>연락처</th><th>회원등급</th><th>구매금액</th><th>가입날짜</th><th>회원상태</th></tr>
            </thead>
            <tbody>
              {userList}
            </tbody>
          </Table>
          <ReactPaginate
            previousLabel={'이전'}
            nextLabel={'다음'}
            breakLabel={'...'}
            pageCount={this.state.totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </div>
      </div>
    )
  }
}