import React, { Component } from 'react';
import axios from 'axios';
import SignUpForm from '../../common/login/SignUpForm';
import { Container } from 'react-bootstrap';
import "../../common/css/common.css";

class UpdateUser extends Component {

    state = {
        users: null,
        error: ''
    }


    componentDidMount() {
        this.getUser();
    }

    getUser = async () => {
        await axios({
            method: 'get',
            url: '/getUser'
        }).then(success => {

            let users = success.data;
            for (let u of Object.keys(users)) {
                users[u] = users[u] !== null ? users[u] : '';
            }
            this.setState({
                users: users
            });

        });

    }

    handleChange = (e) => {
        this.setState({
            users: {
                ...this.state.users,
                [e.target.name]: e.target.value
            },
            error: ''
        })
    }

    handleClick = async () => {
        let flag = true;
        const users = { ...this.state.users };
        for (let key of Object.keys(users)) {
            users[key] = users[key] !== '' ? users[key] : null;
            if ((key === 'name' || key === 'phone' || key === 'birth') && !(users[key])) {
                flag = false;
            }
        }
        if (flag) {
            await axios.post('/updateUserProcess', users);
            this.setState({
                error: '수정 완료'
            })

        } else {
            this.setState({
                error: '모든 항목을 입력해주세요.'
            });
        }
    }



    render() {
        const { users, error } = this.state;
        const { handleChange, handleClick } = this;

        return (
            <div className="UpdateUserWrapper">
                {users &&
                    <div>
                        <div className="pageTitle">
                            <div>회원 정보 수정</div>
                        </div>
                        <Container className="UpdateUser">
                            <SignUpForm users={users} onChange={handleChange} onClick={handleClick} error={error} button="수정"></SignUpForm>
                        </Container>
                    </div>
                }
            </div>
        );
    }
}

export default UpdateUser;

