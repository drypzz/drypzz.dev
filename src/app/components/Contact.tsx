import React, { useRef, useState, useEffect, ForwardRefExoticComponent, RefAttributes } from "react";

import { FaSpinner, FaInfoCircle } from 'react-icons/fa';

import emailjs from "@emailjs/browser";

import { AlertNotify } from "@/utils/notify";

import "@/styles/contact.css";

interface TemplateDataProps extends Record<string, unknown> {
    from_name: string;
    email: string;
    message: string;
    hours: string;
    year: number;
}

type ContactFormProps = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    captchaValue: string;
    captchaError: string;
    num1: number;
    num2: number;
    onCaptchaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ContactForm: ForwardRefExoticComponent<ContactFormProps & RefAttributes<HTMLFormElement>> = React.forwardRef((props, ref) => {
    const { onSubmit, isLoading, captchaValue, captchaError, num1, num2, onCaptchaChange } = props;

    return (
        <form name="contact" onSubmit={onSubmit} ref={ref}>
            <div className="forms-content">
                <div className="forms-content--item">
                    <span>Name:</span>
                </div>
                <div className="forms-content--item">
                    <input placeholder="Type your name..." type="text" name="name" />
                </div>
            </div>
            <div className="forms-content">
                <div className="forms-content--item">
                    <span>Email:</span>
                </div>
                <div className="forms-content--item">
                    <input placeholder="Type your email..." type="email" name="email" />
                </div>
            </div>
            <div className="forms-content">
                <div className="forms-content--item">
                    <span>Message:</span>
                </div>
                <div className="forms-content--item">
                    <textarea placeholder="Type your message..." name="message" />
                </div>
            </div>
            <div className="forms-content">
                <div className="forms-content--item">
                    <span>{num1} + {num2} = ?</span>
                </div>
                <div className="forms-content--item">
                    <input type="number" name="captcha" placeholder="0..." value={captchaValue} onChange={onCaptchaChange} />
                    {captchaError &&
                        <div className="error">
                            <div>
                                <FaInfoCircle />
                            </div>
                            <div>
                                <span>{captchaError}</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div id="btn" className="forms-content">
                <button type="submit" id={String(isLoading)} disabled={isLoading}>
                    {isLoading ? <FaSpinner className="spinner" /> : 'Submit'}
                </button>
            </div>
        </form>
    );
});

ContactForm.displayName = "ContactForm";

function ContactPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [captchaValue, setCaptchaValue] = useState("");
    const [captchaError, setCaptchaError] = useState("");

    useEffect(() => {
        generateRandomNumbers();
    }, []);

    const generateRandomNumbers = () => {
        const randomNumber1 = Math.floor(Math.random() * 100);
        const randomNumber2 = Math.floor(Math.random() * 100);
        setNum1(randomNumber1);
        setNum2(randomNumber2);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const isEmpty = Array.from(formData.values()).some(value => !value);

        if (isEmpty) {
            AlertNotify("error", "Fill in all the fields!");
            setIsLoading(false);
            return;
        }

        if (captchaValue.trim() !== (num1 + num2).toString()) {
            setCaptchaError("Incorrect answer.");
            setIsLoading(false);
            return;
        }

        const template: TemplateDataProps = {
            from_name: formData.get('name') as string,
            message: formData.get('message') as string,
            email: formData.get('email') as string,
            hours: `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}h - ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            year: new Date().getFullYear(),
        };

        try {
            await sendEmail(template);
            AlertNotify("success", "Message sent successfully!");
            formRef.current?.reset();
        } catch (error) {
            console.error('FAILED...', error);
            AlertNotify("error", "Error when trying to send the email.");
        } finally {
            setIsLoading(false);
            setCaptchaValue("");
            setCaptchaError("");
            generateRandomNumbers();
        }
    };

    const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCaptchaValue(e.target.value);
        setCaptchaError("");
    };

    const sendEmail = async (template: TemplateDataProps) => {
        try {
            await emailjs.send('service_6mp012k', 'template_zot8bas', template, 'hYhCh-3mtaW-47Sub');
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className="contact-container">
            <div data-aos="fade-left" className="contact-content">
                <h1>Contact ✉️</h1>
            </div>
            <div data-aos="fade-right" className="contact-content">
                <ContactForm
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    captchaValue={captchaValue}
                    captchaError={captchaError}
                    num1={num1}
                    num2={num2}
                    ref={formRef}
                    onCaptchaChange={handleCaptchaChange}
                />
            </div>
        </div>
    );
}

export default ContactPage;
