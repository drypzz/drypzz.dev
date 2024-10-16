"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { auth, db, storage } from "@/app/database/config";
import { ref as dbRef, set } from "firebase/database";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { showNotify } from '@/app/utils/notify';

import useGlobal from '@/app/hook/global';

const useCreate = () => {
    const router = useRouter();

    const { fetchTechsAndTools, techsAndTools } = useGlobal();

    const [loading, setLoading] = useState(true);
    const [loadingRegister, setLoadingRegister] = useState(false);

    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [inputs, setInputs] = useState({
        title: "",
        link: "",
    });

    const handleTechSelection = (tech: string) => {
        setSelectedTechs(prevState =>
            prevState.includes(tech)
                ? prevState.filter(item => item !== tech)
                : [...prevState, tech]
        );
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setImage(file);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { title, link } = inputs;

        if (!title || !link || selectedTechs.length === 0 || !image) {
            showNotify("error", "Title, techs and image are required!");
            return;
        }

        try {
            setLoadingRegister(true);
            const storageReference = storageRef(storage, `images/${title}/${image.name}`);
            const uploadTask = uploadBytesResumable(storageReference, image);
        
            uploadTask.on(
                "state_changed",
                () => {},
                (error) => {
                    console.error("Failed to upload image:", error);
                    showNotify("error", "Failed to upload image.");
                    setLoadingRegister(false);
                },
                async () => {
                    const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    await set(dbRef(db, `projects/${title}`), {
                        title,
                        techs: selectedTechs,
                        imageUrl,
                        link,
                        createdAt: new Date().toISOString(),
                    });
                    setLoadingRegister(false);
                    setInputs({ title: "", link: "" });
                    setSelectedTechs([]);
                    setImage(null);
                    showNotify("success", "Project sent successfully!");
                }
            );
        } catch (error) {
            console.error("Failed to submit project:", error);
            showNotify("error", "Failed to submit project.");
            setLoadingRegister(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => { 
            if (!user) {
                router.push('/login');
            } else {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [router]);

    useEffect(() => {
        fetchTechsAndTools();
    }, [fetchTechsAndTools]);

    return {
        loading,
        loadingRegister,
        techsAndTools,
        selectedTechs,
        image,
        setInputs,
        inputs,
        handleTechSelection,
        handleImageUpload,
        handleSubmit,
    };
};

export default useCreate;