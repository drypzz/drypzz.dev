'use client'

import { SetStateAction, useState } from "react";
import { Carousel } from "react-responsive-carousel";

function ProjectCarousel({ title, description, images, secondaryImages }: { title: string, description: string, images: string[], secondaryImages: string[]}) {

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const openModal = (image: any) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setShowModal(false);
    };

    return (
        <div className="projects-carousel-content">
            <div className="projects-carousel-content--title">
                <h2>{title} <span>({description})</span></h2>
            </div>
            <div className="projects-carousel-content--carousel">
                <Carousel autoPlay transitionTime={1500} showThumbs={false} stopOnHover={false} showStatus={false} infiniteLoop showArrows={true}>
                    {images.map((image, index) => (
                        <div key={index} className="image-carousel" onClick={() => openModal(secondaryImages)}>
                            <img draggable={false} src={image} alt={`Project ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
            </div>
            {showModal && selectedImage && (
                <div className="modal-container">
                    <div className="modal">
                        <div className="modal-content">
                            <Carousel autoPlay transitionTime={1500} showThumbs={false} stopOnHover={false} showStatus={false} infiniteLoop showArrows={true}>
                                {selectedImage.map((image: any, index: number) => (
                                    <div key={index} className="image-carousel">
                                        <img draggable={false} src={image} alt={`Project ${index + 1}`} />
                                    </div>
                                ))}
                            </Carousel>
                            <div className="modal-content-close">
                                <button onClick={closeModal}>Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectCarousel;