import React, { useRef, useState } from "react";

import { FaSpinner } from 'react-icons/fa';

import emailjs from "@emailjs/browser";

import { AlertNotify } from "@/utils/notify";

import "@/styles/contact.css";

function ContactPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        const isEmpty = Array.from(formData.values()).some(value => !value);

        if (isEmpty) {
            AlertNotify("error", "Preencha todos os campos!");
            setIsLoading(false);
            return;
        }

        const template = {
            from_name: formData.get('name') as string,
            message: formData.get('message') as string,
            email: formData.get('email') as string,
        };

        try {
            const response = await emailjs.send('service_swpwf1z', 'template_zot8bas', template, 'hYhCh-3mtaW-47Sub').then((response) => {
                AlertNotify("success", "Mensagem enviada com sucesso!");
                formRef.current?.reset();
            }).catch((error) => {
                console.error('FAILED...', error);
                AlertNotify("error", "Erro ao tentar enviar o email.");
            });
        } catch (error) {
            console.error('FAILED...', error);
            AlertNotify("error", "Erro ao tentar enviar o email.");
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
                <form name="contact" onSubmit={handleSubmit} ref={formRef}>
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
}

export default ContactPage;