import axios from 'axios';


class ApiService {

    MonthProductList(){
        return axios.get('/MonthProductList')
    }

    MonthProductListmax5(){
        return axios.get('/MonthProductListmax5')
    }

    RegisterProduct(){
        return axios.get('/productRegister')
    }

    SearchProduct(name) {
        return axios.get('/SearchProduct/' + name);
    }

    SearchAdminProduct(name) {
        return axios.get('/SearchAdminProduct/' + name);
    }

    //// 콘텐츠
    MainCategoryList(name,selected) {
        const sort=selected&&selected.substring(0,selected.lastIndexOf("_"));
        const direction=selected&&selected.substring(selected.lastIndexOf("_")+1);
        return axios.get('/MainCategory/category/' + name+"?sort="+sort+","+direction)
    }

    SubCategoryList(name,selected) {
        const sort=selected&&selected.substring(0,selected.lastIndexOf("_"));
        const direction=selected&&selected.substring(selected.lastIndexOf("_")+1);
        
        return axios.get('/SubCategory/category/' + name+"?sort="+sort+","+direction)
    }

    AdminMainCategoryList(name,selected) {
        const sort=selected&&selected.substring(0,selected.lastIndexOf("_"));
        const direction=selected&&selected.substring(selected.lastIndexOf("_")+1);
        return axios.get('/AdminMainCategory/category/' + name+"?sort="+sort+","+direction);
    }

    AdminSubCategoryList(name,selected) {
        const sort=selected&&selected.substring(0,selected.lastIndexOf("_"));
        const direction=selected&&selected.substring(selected.lastIndexOf("_")+1);
        return axios.get('/AdminSubCategory/category/' + name+"?sort="+sort+","+direction)
    }


    CategoryNameList(name) {
        return axios.get('/CategoryNameList/category/' + name)
    }

    CategorySubList(name) {
        return axios.get('/CategorySubList/category/' + name)
    }

    ColorProductList(name,selected) {
        const sort=selected&&selected.substring(0,selected.lastIndexOf("_"));
        const direction=selected&&selected.substring(selected.lastIndexOf("_")+1);
        return axios.get('/ColorProduct/category/' + name+"?sort="+sort+","+direction)
    }

    AdminColorProductList(name,selected) {
        const sort=selected&&selected.substring(0,selected.lastIndexOf("_"));
        const direction=selected&&selected.substring(selected.lastIndexOf("_")+1);
        return axios.get('/AdminColorProduct/category/' + name+"?sort="+sort+","+direction)
    }

    isAvailableUp(id){
        return axios.get('/isAvailableUp/'+id);
    }

    isAvailableDown(id){
        return axios.get('/isAvailableDown/'+id);
    }

}

export default new ApiService();