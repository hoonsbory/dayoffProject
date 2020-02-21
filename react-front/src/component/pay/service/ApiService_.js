import axios from 'axios';

const USER_API_BASE_URL = 'https://jaehoon-dayoff.ml:8443';
class ApiService_{

    fetchCarts() {
        return axios.get(USER_API_BASE_URL);
    }
    fetchUserLevel(userId) {
        return axios.get('/payInfoList' + userId);
    }
    order(carts) {
        return axios.post("/order",carts);
    }
    //  kakaopay(carts){
    //      return axios.post("/kakaoPay",carts);
    //  }


    kakaopay(carts,deliever_,selectValue,checked,store_,service,discount,totalPay,emoney,useEmoney,userId){
        var form={
            name: deliever_.name, location: deliever_.location, postalcode: deliever_.postalCode, phone: deliever_.phone,cartview:carts,
            checkedstore:store_,
            checkeddeliver:checked,
            store:selectValue,
            service:service,
            discount:discount,
            totalPay:totalPay,
            emoney:emoney,
            useEmoney:useEmoney,
            userId:userId
           // id: "123", name: "123", testTags: [{id: "1111", tag: "2222"},{id: "1111", tag: "2222"}]

        }
        // var form={
        //     delievertrans:deliever_, cartview:carts
        //    // id: "123", name: "123", testTags: [{id: "1111", tag: "2222"},{id: "1111", tag: "2222"}]

        // }
        // const params=new URLSearchParams();
        // params.append('a',form);
        // carts.forEach(element => {
        //     params.append('cartview',element);
        // });

        // return axios({
        //     method:"post",
        //     url:"/kakaoPay",
        //     data : JSON.stringify(params),
        //     dataType   : 'json'
        // ,
        //     contentType: 'application/json'
        // })
         return axios.post("/kakaoPay",form);
    }


    kakaopaySuccess(){
        return axios.get("/kakaoPaySuccess");
    }
   


}

export default new ApiService_();