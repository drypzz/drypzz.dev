import React, { useRef } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import "@/styles/contact.css";

function ContactPage() {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(formRef.current!);
        
        if (formDataHasEmptyFields(formData)) {
            Notify.failure("Por favor, preencha todos os campos.", { position: "right-bottom", cssAnimationStyle: "from-right", timeout: 3000 });
            return;
        };

        const urlSearchParams = new URLSearchParams(formData as any);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: urlSearchParams.toString(),
        })
        .then(() => Notify.success("Mensagem enviada com sucesso!", { position: "right-bottom", cssAnimationStyle: "from-right", timeout: 3000 }))
        .catch((error) => Notify.failure("Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.", { position: "right-bottom", cssAnimationStyle: "from-right", timeout: 3000 }));
    };

    const formDataHasEmptyFields = (formData: FormData) => {
        for (const pair of Array.from(formData.entries())) {
            const [, value] = pair;
            if (!value) {
                return true;
            };
        };
        return false;
    };

    return (
        <div className="contact-container">
            <div data-aos="fade-left" className="contact-content">
                <h1>Contato ✉️</h1>
                <p>Se precisar de ajuda ou quiser conversar, fique à vontade para me enviar um email.</p>
            </div>
            <div data-aos="fade-right" className="contact-content">
                <form ref={formRef} name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
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