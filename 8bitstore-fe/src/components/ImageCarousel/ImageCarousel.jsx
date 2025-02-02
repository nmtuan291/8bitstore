import { useState } from 'react';
import banner1 from './banner1.jpg';
import banner2 from './banner2.jpg';

const images = [
    { src: banner1, alt: "Banner 1" },
    { src: banner2, alt: "Banner 2" }
];


const ImageCarousel = () => {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner ">
                {
                    images.map((image, index) => {
                        return (
                            <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                <div class="d-flex justify-content-center">
                                    <img src={image.src} alt="img.png" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default ImageCarousel;