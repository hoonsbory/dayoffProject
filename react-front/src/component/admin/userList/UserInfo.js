import React from 'react';

const UserInfo = ({user}) => {
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
            <tr>
                <td>{user.id}</td><td>{user.socialId}</td><td>{user.name}</td><td>{user.phone}</td><td>{user.grade.level}</td><td>{numberWithCommas(user.accrue)}</td><td>{user.signUpDate}</td><td>{user.role}</td>
            </tr>
            
    );
};

export default UserInfo;