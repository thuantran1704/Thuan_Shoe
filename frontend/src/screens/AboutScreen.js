import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";


const AboutScreen = ({ }) => {

    const images = [
        { url: "http://res.cloudinary.com/dlodr7b0z/image/upload/v1629892050/shop/ntyfa5jauma2miqqq7ss.jpg" },
        { url: "http://res.cloudinary.com/dlodr7b0z/image/upload/v1629892346/shop/xmnqusgpc17n7016xq9p.jpg" },
        { url: "http://res.cloudinary.com/dlodr7b0z/image/upload/v1629892371/shop/ziixbpvi20vroh9htwuc.jpg" },
        { url: "http://res.cloudinary.com/dlodr7b0z/image/upload/v1629892393/shop/rpoizmsch63svmfsmnbn.jpg" },
//
    ];
    return (
        <>
            <div className='text-center py-3'>
            <h2>About Me</h2>

                <SimpleImageSlider
                    width={1200}
                    height={600}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                    style={{marginLeft:"4%"}}
                />
            </div>
        </>
    )
}

export default AboutScreen
