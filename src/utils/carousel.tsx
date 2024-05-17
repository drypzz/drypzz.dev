"use client";

import React, { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

type Technology = {
    Component: React.ComponentType<any>;
    tooltipContent: string;
}

type ProjectProps = {
    title: string;
    link: string;
    description: string;
    images: string[];
    secondaryImages: string[];
    technologies: Technology[];
}

function ProjectCarousel({ title, link, description, images, secondaryImages, technologies }: ProjectProps) {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const openModal = (image: any) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setShowModal(false);
    };

    useEffect(() => {
        const body = document.querySelector("body");
        if (showModal) {
            body?.classList.add("__className_e29382");
        } else {
            body?.classList.remove("__className_e29382");
        }

        return () => {
            body?.classList.remove("__className_e29382");
        };
    }, [showModal]);

    return (
        <>
            <div data-aos="fade-left" className="projects-carousel-content">
                <div className="projects-carousel-content--title">
                    <a target="_blank" href={link}>{title} <span>({description})</span></a>
                </div>
                <div className="projects-carousel-content--carousel">
                    <Carousel autoPlay transitionTime={1500} interval={5000} showThumbs={false} stopOnHover={false} showStatus={false} infiniteLoop showArrows={true}>
                        {images.map((image, index) => (
                            <div key={index} className="image-carousel" onClick={() => openModal(secondaryImages)}>
                                <img draggable={false} src={image} alt={`Project ${index + 1}`} />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className="projects-technology">
                    {technologies.map((e, index) => (
                        <div data-tooltip-id={`tooltip-technology-${index}`} data-tooltip-content={e.tooltipContent} className="technology" key={index}>
                            <e.Component />
                        </div>
                    ))}
                </div>
                {technologies.map((e, index) => (
                    <Tooltip
                        id={`tooltip-technology-${index}`}
                        key={index}
                        arrowColor="rgba(3, 126, 219, 0.4)"
                        style={{ backgroundColor: "rgba(3, 126, 219, 0.4)", borderRadius: "5px" }}
                    />
                ))}
            </div>
            {showModal && selectedImage.length > 0 && (
                <div className="modal-container">
                    <div className="modal">
                        <div className="modal-content">
                            <Carousel transitionTime={1000} showThumbs={false} stopOnHover={true} showStatus={true} infiniteLoop showArrows={true}>
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
        </>
    );
};

export default ProjectCarousel;
