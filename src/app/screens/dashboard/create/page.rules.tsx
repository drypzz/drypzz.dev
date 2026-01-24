"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ref, push, set } from "firebase/database";
import { auth, db } from "@/app/database/config";
import { onAuthStateChanged } from "firebase/auth";
import { showNotify } from '@/app/utils/notify';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const useCreate = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [techs, setTechs] = useState<string[]>([]);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/screens/login");
            } else {
                const sessionStr = localStorage.getItem("admin_session");
                let role = "mod";

                if (sessionStr) {
                    const session = JSON.parse(sessionStr);
                    role = session.role || "mod";
                }

                if (role !== "super") {
                    showNotify("error", "Acesso restrito a Super Admins.");
                    router.push("/screens/dashboard");
                    return;
                }
                setPageLoading(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleCreateProject = async () => {
        if (!title || !link || techs.length === 0) {
            showNotify("error", "Preencha todos os campos obrigatórios.");
            return;
        }

        setLoading(true);
        try {
            let finalImageUrl = "";

            if (imageFile) {
                const storage = getStorage();
                const imageRef = storageRef(storage, `images/${Date.now()}_${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                finalImageUrl = await getDownloadURL(imageRef);
            } else {
                showNotify("error", "Selecione uma imagem.");
                setLoading(false);
                return;
            }
            const projectsRef = ref(db, 'projects');
            const newProjectRef = push(projectsRef);

            await set(newProjectRef, {
                id: newProjectRef.key,
                title,
                link,
                techs,
                imageUrl: finalImageUrl,
                createdAt: new Date().toISOString()
            });

            showNotify("success", "Projeto criado com sucesso!");
            router.push('/screens/dashboard');

        } catch (error) {
            console.error(error);
            showNotify("error", "Erro ao criar projeto.");
        } finally {
            setLoading(false);
        }
    };

    return {
        title, setTitle,
        link, setLink,
        techs, setTechs,
        imagePreview, handleFileChange, setImageFile, setImagePreview,
        handleCreateProject,
        loading,
        pageLoading
    };
};

export default useCreate;