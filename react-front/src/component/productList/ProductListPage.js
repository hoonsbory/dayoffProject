import React from 'react';
import Contents from '../main/Contents';
import ProductNav from '../common/nav/ProductNav';
import queryString from 'query-string';

const  ProductList  = ({match,location}) =>   {
  const keyword=queryString.parse(location.search).keyword;
  return (
      <div>
          <ProductNav keyword ={keyword} category={match.params.category}/>
          <Contents keyword={keyword} category={match.params.category}/>
          </div>
  );
}

export default ProductList;
