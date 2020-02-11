import * as React from "react";
import { Gallery, GalleryImage } from "react-gesture-gallery";
import './banner.css';
import { Link } from "react-router-dom"
 
function Banner() {
  const [index, setIndex] = React.useState(0);
 
   const images = [
    {
      src:
      '/images/MainImg2.jpg'
    },
    
    {
      src:
      'https://cdn-cms.f-static.com/ready_uploads/media/8080/1600_5cda756a84f49.jpg'
    }
  ]; 
  return (
    <div className='Banner'>
      <Gallery 
        index={index}
        onRequestChange={i => {
          setIndex(i);
        }}
      >
        {images.map(img => (
          <GalleryImage objectFit="contain" alt="gallery" key={img.src} src={img.src} />
        ))}
      </Gallery>
    </div>
  );
}

export default Banner;