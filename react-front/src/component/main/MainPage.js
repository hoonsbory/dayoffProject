import React from 'react';
import MainContents from './MainContents';
import Banner from './banner/Banner';
import Banner2 from './banner/banner2';


function MainPage() {
  return (
      <div>
          <Banner />
          <Banner2 />   
          <MainContents />
          </div>
  );
}

export default MainPage;
