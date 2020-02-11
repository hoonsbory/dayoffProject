import React, { Component } from 'react';
import './productNav.css';
import { NavLink } from 'react-router-dom';
import ApiService from '../../main/ApiService';


class ProductNav extends Component {
  state = {
    category:'',
      categorySub:[],
      categoryName:[],
      MonthData:[],
      color:[]
    }

    //   ApiService.CategoryList(keyword).then(res => {
    //     console.log(res);
    //     console.log(keyword);
    //     this.setState({keyword : res.data[0].name})
    //     this.setState({category : res.data});
    //       // ApiService.KeywordSubNameCategory(keyword).then(res => {
    //       //   this.setState({categorySubName :res.data});
    //       // })
    // })

  ClickCategory() {
    const category=this.props.category;
    if(category !=='BEST' && category !=='OUTER' && category !=='TOP' && category !=='BOTTOM' && category !=='DRESS' && category !=='ACC'){
    ApiService.CategorySubList(category).then(res =>{
      this.setState({categorySub : res.data});
    });
  } else if(category ==='BEST'){
    ApiService.CategorySubList(category).then(res =>{
      this.setState({categorySub : res.data});
    });
  } else {
    ApiService.CategoryNameList(category).then(res =>{
      console.log(category , res.data)
      this.setState({categoryName : res.data});
    });
    
  }
}

    componentDidMount() {
      ApiService.MonthProductListmax5().then(res => {
        this.setState({ MonthData: res.data })
        this.setState({category : this.props.category},this.ClickCategory);
      });

      ApiService.ColorProductList().then(res=> {
        this.setState({color : res.data});
      })
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.category!==this.props.category){
        this.setState({category : nextProps.category},this.ClickCategory);
      }
    }

    shouldComponentUpdate(nextProps, nextState){
      return true;
    }

  render() {
    if(!this.state.category){
      return ( <div className='ProductNav'>
      <div className='Product_NavTitle'>
        <h3> {this.props.keyword} </h3>
          </div>
      </div>)
    }
      else if(this.state.category ==='OUTER' || this.state.category ==='TOP' || this.state.category ==='BOTTOM' || this.state.category ==='DRESS'){
        return (
          <div className='ProductNav'>
          <div className='NavInfo_Box'>
          <div className='Product_NavTitle'>
          <h3>{this.state.categoryName.length>0&&this.state.categoryName[0].name}</h3>
          </div>
          <br></br>
          <div className='Product_NavCategory'>
          <br></br>
          { this.state.categoryName.map(categoryNames => <div className='NavCate'><NavLink activeStyle={{fontWeight:'bold'}} className="Nava" to={"/productList/category/"+categoryNames.subName}>{categoryNames.subName}<br></br><br></br></NavLink></div>)}
          </div>
          <div className='NavColor'>
            <br></br>
          <h3>Color</h3>
          <NavLink to={"/productList/category/RED"}><img className='colorImage' alt="red" src='/images/red.jpg' value='RED'/></NavLink>
          <NavLink to={"/productList/category/BLACK"}><img className='colorImage' alt="black" src='/images/black.jpg' value='BLACK'/></NavLink>
          <NavLink to={"/productList/category/GRAY"}><img className='colorImage' alt="gray" src='/images/gray.jpg' value='GRAY'/></NavLink><br></br>
          <NavLink to={"/productList/category/BLUE"}><img className='colorImage' alt="blue"src='/images/blue.jpg' value='BLUE'/></NavLink>
          <NavLink to={"/productList/category/PINK"}><img className='colorImage' alt="pink"src='/images/pink.jpg' vale='PINK'/></NavLink>
          <NavLink to={"/productList/category/WHITE"}><img className='colorImage'alt="white" src='/images/white.jpg' vale='WHITE'/></NavLink><br></br>
          <NavLink to={"/productList/category/GREEN"}><img className='colorImage' alt="green"src='/images/green.jpg' value='GREEN'/></NavLink>
          <NavLink to={"/productList/category/PURPLE"}><img className='colorImage' alt="purple"src='/images/purple.jpg' value='PURPLE'/></NavLink>
          <NavLink to={"/productList/category/ORANGE"}><img className='colorImage' alt="orange"src='/images/orange.jpg' value='ORANGE'/></NavLink><br></br>
          <NavLink to={"/productList/category/YELLOW"}><img className='colorImage' alt="yellow"src='/images/yellow.jpg' value='YELLOW'/></NavLink>
          <NavLink to={"/productList/category/BEIGE"}><img className='colorImage' alt="beige" src='/images/beige.jpg' value='BEIGE'/></NavLink>
          <NavLink to={"/productList/category/BROWN"}><img className='colorImage' alt="brown" src='/images/brown.jpg' value='BROWN'/></NavLink><br></br>
          <NavLink to={"/productList/category/CREAM"}><img className='colorImage'  alt="cream" src='/images/cream.jpg' value='CREAM'/></NavLink>
          <NavLink to={"/productList/category/SILVER"}><img className='colorImage'  alt="silver" src='/images/silver.jpg' value='SILVER'/></NavLink>
          <NavLink to={"/productList/category/GOLD"}><img className='colorImage'  alt="gold" src='/images/gold.jpg' value='GOLD'/></NavLink>

          </div>
          </div>
          </div>
      );
      }else if(this.state.category ==='슈즈' || this.state.category ==='가방' || this.state.category ==='쥬얼리' || this.state.category ==='벨트' || this.state.category ==='모자' || this.state.category ==='양말' || this.state.category ==='스카프' || this.state.category ==='헤어 액세서리' ){
        return (
            <div className='ProductNav'>
            <div className='NavInfo_Box'>
            <div className='Product_NavTitle'>
              <h3>{this.state.categorySub.length>0&&this.state.categorySub[0].name}</h3>
            </div>
            <br></br>
            <div className='Product_NavCategory1'>
            <br></br>
            { this.state.categorySub.map(categorySubs => <div className='NavCate'><NavLink activeStyle={{fontWeight:'bold'}} className="Nava" to={"/productList/category/"+categorySubs.subName}>{categorySubs.subName}<br></br><br></br></NavLink></div>)}
            </div>
            <div className='NavColor'>
              <br></br>
            <h3>Color</h3>
            <NavLink to={"/productList/category/RED"}><img className='colorImage' alt="red" src='/images/red.jpg' value='RED'/></NavLink>
          <NavLink to={"/productList/category/BLACK"}><img className='colorImage' alt="black" src='/images/black.jpg' value='BLACK'/></NavLink>
          <NavLink to={"/productList/category/GRAY"}><img className='colorImage' alt="gray" src='/images/gray.jpg' value='GRAY'/></NavLink><br></br>
          <NavLink to={"/productList/category/BLUE"}><img className='colorImage' alt="blue"src='/images/blue.jpg' value='BLUE'/></NavLink>
          <NavLink to={"/productList/category/PINK"}><img className='colorImage' alt="pink"src='/images/pink.jpg' vale='PINK'/></NavLink>
          <NavLink to={"/productList/category/WHITE"}><img className='colorImage'alt="white" src='/images/white.jpg' vale='WHITE'/></NavLink><br></br>
          <NavLink to={"/productList/category/GREEN"}><img className='colorImage' alt="green"src='/images/green.jpg' value='GREEN'/></NavLink>
          <NavLink to={"/productList/category/PURPLE"}><img className='colorImage' alt="purple"src='/images/purple.jpg' value='PURPLE'/></NavLink>
          <NavLink to={"/productList/category/ORANGE"}><img className='colorImage' alt="orange"src='/images/orange.jpg' value='ORANGE'/></NavLink><br></br>
          <NavLink to={"/productList/category/YELLOW"}><img className='colorImage' alt="yellow"src='/images/yellow.jpg' value='YELLOW'/></NavLink>
          <NavLink to={"/productList/category/BEIGE"}><img className='colorImage' alt="beige" src='/images/beige.jpg' value='BEIGE'/></NavLink>
          <NavLink to={"/productList/category/BROWN"}><img className='colorImage' alt="brown" src='/images/brown.jpg' value='BROWN'/></NavLink><br></br>
          <NavLink to={"/productList/category/CREAM"}><img className='colorImage'  alt="cream" src='/images/cream.jpg' value='CREAM'/></NavLink>
          <NavLink to={"/productList/category/SILVER"}><img className='colorImage'  alt="silver" src='/images/silver.jpg' value='SILVER'/></NavLink>
          <NavLink to={"/productList/category/GOLD"}><img className='colorImage'  alt="gold" src='/images/gold.jpg' value='GOLD'/></NavLink>
            </div>
            </div>
            </div>
        );
        } else if(this.state.category ==='ACC'){
          return (
            <div className='ProductNav'>
            <div className='NavInfo_Box'>
            <div className='Product_NavTitle'>
              <h3>{this.state.categoryName.length>0&&this.state.categoryName[0].name}</h3>
            </div>
            <br></br>
            <div className='Product_NavCategory1'>
            <br></br>
            { this.state.categoryName.map(categoryNames => <div className='NavCate'><NavLink activeStyle={{fontWeight:'bold'}} className="Nava" to={"/productList/category/"+categoryNames.subName}>{categoryNames.subName}<br></br><br></br></NavLink></div>)}
            </div>
            <div className='NavColor'>
              <br></br>
            <h3>Color</h3>
            
            <NavLink to={"/productList/category/RED"}><img className='colorImage' alt="red" src='/images/red.jpg' value='RED'/></NavLink>
          <NavLink to={"/productList/category/BLACK"}><img className='colorImage' alt="black" src='/images/black.jpg' value='BLACK'/></NavLink>
          <NavLink to={"/productList/category/GRAY"}><img className='colorImage' alt="gray" src='/images/gray.jpg' value='GRAY'/></NavLink><br></br>
          <NavLink to={"/productList/category/BLUE"}><img className='colorImage' alt="blue"src='/images/blue.jpg' value='BLUE'/></NavLink>
          <NavLink to={"/productList/category/PINK"}><img className='colorImage' alt="pink"src='/images/pink.jpg' vale='PINK'/></NavLink>
          <NavLink to={"/productList/category/WHITE"}><img className='colorImage'alt="white" src='/images/white.jpg' vale='WHITE'/></NavLink><br></br>
          <NavLink to={"/productList/category/GREEN"}><img className='colorImage' alt="green"src='/images/green.jpg' value='GREEN'/></NavLink>
          <NavLink to={"/productList/category/PURPLE"}><img className='colorImage' alt="purple"src='/images/purple.jpg' value='PURPLE'/></NavLink>
          <NavLink to={"/productList/category/ORANGE"}><img className='colorImage' alt="orange"src='/images/orange.jpg' value='ORANGE'/></NavLink><br></br>
          <NavLink to={"/productList/category/YELLOW"}><img className='colorImage' alt="yellow"src='/images/yellow.jpg' value='YELLOW'/></NavLink>
          <NavLink to={"/productList/category/BEIGE"}><img className='colorImage' alt="beige" src='/images/beige.jpg' value='BEIGE'/></NavLink>
          <NavLink to={"/productList/category/BROWN"}><img className='colorImage' alt="brown" src='/images/brown.jpg' value='BROWN'/></NavLink><br></br>
          <NavLink to={"/productList/category/CREAM"}><img className='colorImage'  alt="cream" src='/images/cream.jpg' value='CREAM'/></NavLink>
          <NavLink to={"/productList/category/SILVER"}><img className='colorImage'  alt="silver" src='/images/silver.jpg' value='SILVER'/></NavLink>
          <NavLink to={"/productList/category/GOLD"}><img className='colorImage'  alt="gold" src='/images/gold.jpg' value='GOLD'/></NavLink>
            </div>
            </div>
            </div>
        );
        }else if(this.state.category ==='BEST'){
          return (
            <div className='ProductNav'>
            <div className='NavInfo_Box'>
            <div className='Product_NavTitle'>
              <h3>BEST</h3>
            </div>
            <br></br>
            <div className='Product_NavCategory'>
            <br></br>
          { this.state.MonthData.map(MonthDatas => <div className='NavCate'><div activeStyle={{fontWeight:'bold'}} className="Nava" to=''><br></br><br></br></div></div>)}
            </div>
            <div className='NavColor'>
              <br></br>
            <h3>Color</h3>
            <NavLink to={"/productList/category/RED"}><img className='colorImage' alt="red" src='/images/red.jpg' value='RED'/></NavLink>
          <NavLink to={"/productList/category/BLACK"}><img className='colorImage' alt="black" src='/images/black.jpg' value='BLACK'/></NavLink>
          <NavLink to={"/productList/category/GRAY"}><img className='colorImage' alt="gray" src='/images/gray.jpg' value='GRAY'/></NavLink><br></br>
          <NavLink to={"/productList/category/BLUE"}><img className='colorImage' alt="blue"src='/images/blue.jpg' value='BLUE'/></NavLink>
          <NavLink to={"/productList/category/PINK"}><img className='colorImage' alt="pink"src='/images/pink.jpg' vale='PINK'/></NavLink>
          <NavLink to={"/productList/category/WHITE"}><img className='colorImage'alt="white" src='/images/white.jpg' vale='WHITE'/></NavLink><br></br>
          <NavLink to={"/productList/category/GREEN"}><img className='colorImage' alt="green"src='/images/green.jpg' value='GREEN'/></NavLink>
          <NavLink to={"/productList/category/PURPLE"}><img className='colorImage' alt="purple"src='/images/purple.jpg' value='PURPLE'/></NavLink>
          <NavLink to={"/productList/category/ORANGE"}><img className='colorImage' alt="orange"src='/images/orange.jpg' value='ORANGE'/></NavLink><br></br>
          <NavLink to={"/productList/category/YELLOW"}><img className='colorImage' alt="yellow"src='/images/yellow.jpg' value='YELLOW'/></NavLink>
          <NavLink to={"/productList/category/BEIGE"}><img className='colorImage' alt="beige" src='/images/beige.jpg' value='BEIGE'/></NavLink>
          <NavLink to={"/productList/category/BROWN"}><img className='colorImage' alt="brown" src='/images/brown.jpg' value='BROWN'/></NavLink><br></br>
          <NavLink to={"/productList/category/CREAM"}><img className='colorImage'  alt="cream" src='/images/cream.jpg' value='CREAM'/></NavLink>
          <NavLink to={"/productList/category/SILVER"}><img className='colorImage'  alt="silver" src='/images/silver.jpg' value='SILVER'/></NavLink>
          <NavLink to={"/productList/category/GOLD"}><img className='colorImage'  alt="gold" src='/images/gold.jpg' value='GOLD'/></NavLink>
            </div>
            </div>
            </div>
        );
        }else{
    return (
      <div className='ProductNav'>
      <div className='NavInfo_Box'>
      <div className='Product_NavTitle'>
      <h3>{this.state.categorySub.length>0&&this.state.categorySub[0].name}</h3>
      </div>
      <br></br>
      <div className='Product_NavCategory'>
      <br></br>
      { this.state.categorySub.map(categorySubs => <div className='NavCate'><NavLink activeStyle={{fontWeight:'bold'}} className="Nava" to={"/productList/category/"+categorySubs.subName}>{categorySubs.subName}<br></br><br></br></NavLink></div>)}
      </div>
      <div className='NavColor'>
        <br></br>
      <h3>Color</h3>
      <NavLink to={"/productList/category/RED"}><img className='colorImage' alt="red" src='/images/red.jpg' value='RED'/></NavLink>
          <NavLink to={"/productList/category/BLACK"}><img className='colorImage' alt="black" src='/images/black.jpg' value='BLACK'/></NavLink>
          <NavLink to={"/productList/category/GRAY"}><img className='colorImage' alt="gray" src='/images/gray.jpg' value='GRAY'/></NavLink><br></br>
          <NavLink to={"/productList/category/BLUE"}><img className='colorImage' alt="blue"src='/images/blue.jpg' value='BLUE'/></NavLink>
          <NavLink to={"/productList/category/PINK"}><img className='colorImage' alt="pink"src='/images/pink.jpg' vale='PINK'/></NavLink>
          <NavLink to={"/productList/category/WHITE"}><img className='colorImage'alt="white" src='/images/white.jpg' vale='WHITE'/></NavLink><br></br>
          <NavLink to={"/productList/category/GREEN"}><img className='colorImage' alt="green"src='/images/green.jpg' value='GREEN'/></NavLink>
          <NavLink to={"/productList/category/PURPLE"}><img className='colorImage' alt="purple"src='/images/purple.jpg' value='PURPLE'/></NavLink>
          <NavLink to={"/productList/category/ORANGE"}><img className='colorImage' alt="orange"src='/images/orange.jpg' value='ORANGE'/></NavLink><br></br>
          <NavLink to={"/productList/category/YELLOW"}><img className='colorImage' alt="yellow"src='/images/yellow.jpg' value='YELLOW'/></NavLink>
          <NavLink to={"/productList/category/BEIGE"}><img className='colorImage' alt="beige" src='/images/beige.jpg' value='BEIGE'/></NavLink>
          <NavLink to={"/productList/category/BROWN"}><img className='colorImage' alt="brown" src='/images/brown.jpg' value='BROWN'/></NavLink><br></br>
          <NavLink to={"/productList/category/CREAM"}><img className='colorImage'  alt="cream" src='/images/cream.jpg' value='CREAM'/></NavLink>
          <NavLink to={"/productList/category/SILVER"}><img className='colorImage'  alt="silver" src='/images/silver.jpg' value='SILVER'/></NavLink>
          <NavLink to={"/productList/category/GOLD"}><img className='colorImage'  alt="gold" src='/images/gold.jpg' value='GOLD'/></NavLink>
      </div>
      </div>
      </div>
  );
} 
  }
}

export default ProductNav;