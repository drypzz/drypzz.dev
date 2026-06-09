// src/app/actions/contact.ts
"use server";

export async function sendContactEmail(formData: { name: string; email: string; message: string }) {
    try {
        const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
        const userId = process.env.NEXT_PUBLIC_USER_ID;

        if (!serviceId || !templateId || !userId) {
            throw new Error("Credenciais do EmailJS não configuradas no servidor.");
        }

        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: userId,
                template_params: {
                    from_name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    hours: `${new Date().toLocaleTimeString('pt-BR', { hour: "2-digit", minute: "2-digit" })}h - ${new Date().toLocaleDateString('pt-BR')}`,
                    year: new Date().getFullYear(),
                }
            })
        });

        if (!response.ok) {
            throw new Error('Falha ao comunicar com a API de email');
        }

        return { success: true };
    } catch (error) {
        console.error("ERRO NA SERVER ACTION (Contato):", error);
        return { success: false, error: "Falha ao enviar mensagem." };
    }
}