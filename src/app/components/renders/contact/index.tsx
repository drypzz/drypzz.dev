"use client";

import React from 'react';
import { SkewLoader } from 'react-spinners';

import { motion } from 'framer-motion';

import useContact from './index.rules';

import "./index.style.css";

const Contact = () => {
    const { 
        inputs,
        loading,
        formRef,
        setInputs,
        handleSubmit
    } = useContact();

    return (
        <section>
            <div>
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    style={{ marginBottom: 20 }}
                    className="dev-title"
                >
                    ✉️ Contact Me
                </motion.h1>
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
                                value={inputs.name}
                                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                name="name"
                                id="name"
                                placeholder=""
                                className="form-input"
                                disabled={loading}
                            />
                            <label className="form-label">Name</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                value={inputs.email}
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                name="email"
                                placeholder=""
                                id="email"
                                className="form-input"
                                disabled={loading}
                            />
                            <label className="form-label">E-mail</label>
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                value={inputs.message}
                                onChange={(e) => setInputs({ ...inputs, message: e.target.value })}
                                id="message"
                                placeholder=""
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
    );
};

export default Contact;
