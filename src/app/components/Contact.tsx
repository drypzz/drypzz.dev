import React, { useRef } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import "@/styles/contact.css";

function ContactPage () {

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formData = new FormData(e.currentTarget);
    
        let isEmpty = false;
        formData.forEach((value) => {
            if (!value) {
                isEmpty = true;
            };
        });

        if (isEmpty) {
            Notify.failure("Preencha todos os campos!", {
                position: "right-bottom",
                cssAnimationStyle: "from-right",
                timeout: 3000,
            });
            return;
        }
    
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.reset();
            };
            Notify.success("Mensagem enviada com sucesso!", {
                position: "right-bottom",
                cssAnimationStyle: "from-right",
                timeout: 3000,
            });
        }, 1000);
    };

    return (
        <div className="contact-container">
            <div data-aos="fade-left" className="contact-content">
                <h1>Contato ✉️</h1>
                <p>Se precisar de ajuda ou quiser conversar, fique à vontade para me enviar um email.</p>
            </div>
            <div data-aos="fade-right" className="contact-content">
                <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
                    <div className="forms-content">
                        <div className="forms-content--item">
                            <span>Nome:</span>
                        </div>
                        <div className="forms-content--item">
                            <input placeholder="Digite..." type="text" name="name" />
                        </div>
                    </div>
                    <div className="forms-content">
                        <div className="forms-content--item">
                            <span>Email:</span>
                        </div>
                        <div className="forms-content--item">
                            <input placeholder="Digite..." type="email" name="email" />
                        </div>
                    </div>
                    <div className="forms-content">
                        <div className="forms-content--item">
                            <span>Mensagem:</span>
                        </div>
                        <div className="forms-content--item">
                            <textarea placeholder="Digite..." name="message" />
                        </div>
                    </div>
                    <div id="btn" className="forms-content">
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;