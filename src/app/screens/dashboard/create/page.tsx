"use client";

import React from 'react';

import { SkewLoader } from 'react-spinners';

import Loading from '@/app/components/renders/loading';
import Checkbox from '@/app/components/interactions/checkbox';

import useCreate from './page.rules';

import "@/app/components/renders/contact/index.style.css";

const Create = () => {

    const { 
        inputs, 
        loading, 
        loadingRegister, 
        setInputs, 
        handleSubmit, 
        handleImageUpload, 
        image, 
        techsAndTools, 
        selectedTechs, 
        handleTechSelection 
    } = useCreate();

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
