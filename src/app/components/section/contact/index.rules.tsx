import { useState, useRef } from "react";

import emailjs from "@emailjs/browser";

import { showNotify } from "@/app/utils/notify";

import TemplateDataProps from "./index.props";

const useContact = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (inputs.name === "" || inputs.email === "" || inputs.message === "") {
            showNotify("error", "Please fill all the fields.");
            return;
        }

        const template: TemplateDataProps = {
            from_name: inputs.name,
            message: inputs.message,
            email: inputs.email,
            hours: `${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}h - ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            year: new Date().getFullYear(),
        };

        try {
            setLoading(true);
            await sendEmail(template);
            showNotify("success", "Message sent successfully!");
            if (formRef.current) {
                formRef.current.reset();
            }
            setInputs({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("FAILED...", error);
            showNotify("error", "Failed to send message.");
        } finally {
            setLoading(false);
        }
    };

    const sendEmail = async (template: TemplateDataProps) => {
        try {
            const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID || "";
            const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID || "";
            const userId = process.env.NEXT_PUBLIC_USER_ID || "";

            await emailjs.send(serviceId, templateId, template, userId);
        } catch (error) {
            throw error;
        }
    };

    return {
        inputs,
        loading,
        formRef,
        setInputs,
        handleSubmit,
    };
};

export default useContact;
