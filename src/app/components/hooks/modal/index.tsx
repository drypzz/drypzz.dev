import React from 'react';

import { FaX } from 'react-icons/fa6';

import ModalProps from './index.props';

import './index.styles.css';

const Modal = ({ isOpen, onClose, imageUrl, altText }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <img src={imageUrl} alt={altText} className="modal-image" />
                    <button className="modal-close" onClick={onClose}>
                        <FaX />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Modal;
