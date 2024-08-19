"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/database/config";

import Loading from '@/app/components/renders/loading';
import Checkbox from "@/app/components/hooks/checkbox";

import { showNotify } from '@/app/utils/notify';

import "@/app/components/renders/contact/index.style.css";
import { SkewLoader } from 'react-spinners';


const LoginPage = () => {

    const router = useRouter();

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        remember: false
    });

    const [loading, setLoading] = useState(true);

    const [loadingLogin, setLoadingLogin] = useState(false);

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {

            if (inputs.email === "" || inputs.password === "") {
                showNotify("error", "Email and password are required!");
                return;
            };

            if (inputs.remember) {
                await setPersistence(auth, browserLocalPersistence);
                localStorage.setItem("savedEmail", inputs.email);
                localStorage.setItem("savedChecked", "true");
            }else{
                localStorage.removeItem("savedEmail");
                localStorage.removeItem("savedChecked");
            }

            setLoadingLogin(true);
            
            const userCredential = await signInWithEmailAndPassword(auth, inputs.email, inputs.password).then((userCredential) => {
                showNotify("success", "Successfully logged in.");
                router.push("/dashboard");
            }).catch((error) => {
                showNotify("error", "Failed to login.");
            });
        } catch (error) {
            console.error(error);
            alert('Failed to login.');
        } finally{
            setLoadingLogin(false);
        }
    }

    useEffect(() => {
        const logged = auth.onAuthStateChanged(async (user) => { 
            if (user) {
                router.push('/dashboard');
            }else{
                const savedEmail = localStorage.getItem("savedEmail");
                const savedChecked = localStorage.getItem("savedChecked");
                if (savedEmail) {
                    setInputs((prev) => ({ ...prev, email: savedEmail, remember: Boolean(savedChecked) }));
                }
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        });

        return () => {
            logged();
        };
    }, [router]);

    if (loading) {
        return <Loading />;
    };

    return (
        <>  
            <section style={{height: "100dvh"}}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100%"}}>
                    <div>
                        <h1 className="dev-title" style={{marginBottom: 20}}>🔑 Login</h1>
                    </div>
                    <div className="dev-contact">
                        <form onSubmit={submitForm} className="styled-form">
                            <div className="form-group">
                                <input
                                    type="email"
                                    value={inputs.email}
                                    placeholder=""
                                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                    name="email"
                                    id="email"
                                    className="form-input"
                                    disabled={loading}
                                />
                                <label className="form-label">Email</label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    value={inputs.password}
                                    placeholder=""
                                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                    name="password"
                                    id="password"
                                    className="form-input"
                                    disabled={loading}
                                />
                                <label className="form-label">Password</label>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", marginBottom: 20}}>
                                <Checkbox
                                    checked={inputs.remember}
                                    onChange={(e) => setInputs({ ...inputs, remember: e.target.checked })}
                                    id="remember"
                                    title="Remember me?"
                                />
                            </div>
                            <div className="form-group">
                                {loadingLogin ? (
                                    <SkewLoader color="#037edb" loading={loadingLogin} size={30} />
                                ) : (
                                    <button type="submit" className="form-button">Confirm</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
};

export default LoginPage;