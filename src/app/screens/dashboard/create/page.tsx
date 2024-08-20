"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { SkewLoader } from 'react-spinners';

import { auth, db, storage } from "@/app/database/config";
import { ref as dbRef, set } from "firebase/database";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Loading from '@/app/components/renders/loading';
import Checkbox from '@/app/components/hooks/checkbox';

import { showNotify } from '@/app/utils/notify';
import Image from "@/app/utils/image.props";

import "@/app/components/renders/contact/index.style.css";

const Create = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [loadingRegister, setLoadingRegister] = useState(false);

    const [techsAndTools, setTechsAndTools] = useState<Image[]>([]);
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
        const fetchTechsAndTools = async () => {
            try {
                const response = await fetch("/api/getImages");
                const data = await response.json();
                setTechsAndTools(data);
            } catch (error) {
                console.error("Failed to fetch techs and tools:", error);
            }
        };

        fetchTechsAndTools();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <section style={{height: "100dvh"}}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100%"}}>
                    <div>
                        <h1 className="dev-title" style={{marginBottom: 20}}>📌 Create Project</h1>
                    </div>
                    <div className="dev-contact">
                        <form className="styled-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={inputs.title}
                                    placeholder=""
                                    onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                                    name="title"
                                    id="title"
                                    className="form-input"
                                    disabled={loadingRegister}
                                />
                                <label className="form-label">Title</label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={inputs.link}
                                    placeholder=""
                                    onChange={(e) => setInputs({ ...inputs, link: e.target.value })}
                                    name="link"
                                    id="link"
                                    className="form-input"
                                    disabled={loadingRegister}
                                />
                                <label className="form-label">Link</label>
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-input"
                                    type="file" 
                                    id="image" 
                                    name="image" 
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={loadingRegister}
                                    checked={image !== null}
                                />
                            </div>
                            <div style={{display: "flex", alignItems: "center", gap: 20, height: "280px", overflow: "auto", width: "100%", flexWrap: "wrap", justifyContent: "center", marginBottom: 30}}>
                                {techsAndTools.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <Checkbox
                                            id={`tech-${index}`} 
                                            title={item.title}
                                            onChange={() => handleTechSelection(item.title)} 
                                            name={`techs-${index}`} 
                                            value={item.title} 
                                            style={{
                                                padding: 10,
                                                border: "1px solid #037edb",
                                                borderRadius: 5,
                                                cursor: "pointer",
                                            }}
                                            checked={selectedTechs.includes(item.title)}
                                        />
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="form-group">
                                {loadingRegister ? (
                                    <SkewLoader color="#037edb" loading={loadingRegister} size={30} />
                                ) : (
                                    <button type="submit" className="form-button" disabled={loadingRegister}>Confirm</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Create;
