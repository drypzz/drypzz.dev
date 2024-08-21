"use client";

import React, { useState, useRef } from 'react';
import { SkewLoader } from 'react-spinners';

import emailjs from "@emailjs/browser";

import { showNotify } from '@/app/utils/notify';

import TemplateDataProps from "./index.props";

import { motion } from 'framer-motion';

import "./index.style.css";

const Contact = () => {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (inputs.name === '' || inputs.email === '' || inputs.message === '') {
            showNotify("error", "Please fill all the fields.");
            return;
        }

        const template: TemplateDataProps = {
            from_name: inputs.name,
            message: inputs.message,
            email: inputs.email,
            hours: `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}h - ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            year: new Date().getFullYear(),
        };

        try {
            setLoading(true);
            await sendEmail(template);
            showNotify("success", "Message sent successfully!");
            if (formRef.current) {
                formRef.current.reset();
            }
            setInputs({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('FAILED...', error);
            showNotify("error", "Failed to send message.");
        } finally {
            setLoading(false);
        }
    };

    const sendEmail = async (template: TemplateDataProps) => {
        try {
            const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID || '';
            const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID || '';
            const userId = process.env.NEXT_PUBLIC_USER_ID || '';

            await emailjs.send(serviceId, templateId, template, userId);
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <section>
                <div>
                    <div>
                        <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        style={{marginBottom: 20}}
                        className="dev-title">
                            ✉️ Contact Me
                        </motion.h1>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 2 }}
                        className="dev-contact"
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="styled-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder=""
                                    value={inputs.name}
                                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                    name="name"
                                    id="name"
                                    className="form-input"
                                    disabled={loading}
                                />
                                <label className="form-label">Name</label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder=""
                                    value={inputs.email}
                                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                    name="email"
                                    id="email"
                                    className="form-input"
                                    disabled={loading}
                                />
                                <label className="form-label">E-mail</label>
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder=""
                                    value={inputs.message}
                                    onChange={(e) => setInputs({ ...inputs, message: e.target.value })}
                                    id="message"
                                    className="form-input form-textarea"
                                    disabled={loading}
                                ></textarea>
                                <label className="form-label">Message</label>
                            </div>
                            <div className="form-group">
                                {loading ? (
                                    <SkewLoader color="#037edb" loading={loading} size={30} />
                                ) : (
                                    <button type="submit" className="form-button">Send</button>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Contact;
