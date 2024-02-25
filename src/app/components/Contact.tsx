import React, { useRef, useState } from "react";
import { FaSpinner } from 'react-icons/fa';

import { AlertNotify } from "@/utils/notify";

import "@/styles/contact.css";

function ContactPage () {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        let isEmpty = false;
        formData.forEach((value) => {
            if (!value) {
                isEmpty = true;
            }
        });

        if (isEmpty) {
            AlertNotify("error", "Preencha todos os campos!");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("https://formsubmit.co/gugapalmeiraa@gmail.com", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                AlertNotify("error", "Erro ao enviar mensagem!");
                setIsLoading(false);
                formRef.current?.reset();
                return;
            }

            formRef.current?.reset();
            
            AlertNotify("success", "Mensagem enviada com sucesso!");
        } catch (error) {
            AlertNotify("error", "Erro ao tentar enviar o email.");
            console.error("Error:", error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="contact-container">
            <div data-aos="fade-left" className="contact-content">
                <h1>Contato ✉️</h1>
                <p>Se precisar de ajuda ou quiser conversar, fique à vontade para me enviar um email.</p>
            </div>
            <div data-aos="fade-right" className="contact-content">
                <form name="contact" action="#" method="POST" onSubmit={handleSubmit} ref={formRef}>
                    <div className="forms-content">
                        <div className="forms-content--item">
                            <span>Nome:</span>
                        </div>
                        <div className="forms-content--item">
                            <input placeholder="Digite seu nome..." type="text" name="name" />
                        </div>
                    </div>
                    <div className="forms-content">
                        <div className="forms-content--item">
                            <span>Email:</span>
                        </div>
                        <div className="forms-content--item">
                            <input placeholder="Digite seu email..." type="email" name="email" />
                        </div>
                    </div>
                    <div className="forms-content">
                        <div className="forms-content--item">
                            <span>Mensagem:</span>
                        </div>
                        <div className="forms-content--item">
                            <textarea placeholder="Olá..." name="message" />
                        </div>
                    </div>
                    <div id="btn" className="forms-content">
                        <button type="submit" id={String(isLoading)} disabled={isLoading}>
                            {isLoading ? <FaSpinner className="spinner" /> : 'Enviar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;