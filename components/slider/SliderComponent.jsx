import React from 'react';
import { Carousel } from 'antd';
import { Image } from '@nextui-org/react';

const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

export default function SliderComponent() {
    return (
        <Carousel autoplay>
            <div>
                <div style={contentStyle}>
                    <Image 
                    alt="Banner 1"
                    src="/images/banners/bannerweb_01.jpg"
                />
                </div>
            </div>
            <div>
            <div style={contentStyle}>
                    <Image 
                    alt="Banner 1"
                    src="/images/banners/bannerweb_02.jpg"
                />
                </div>
            </div>
            <div>
            <div style={contentStyle}>
                    <Image 
                    alt="Banner 1"
                    src="/images/banners/bannerweb_03.jpg"
                />
                </div>
            </div>
        </Carousel>
    );
}