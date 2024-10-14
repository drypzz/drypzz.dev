"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/database/config";

import { showNotify } from '@/app/utils/notify';

const useLogin = () => {
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

    return {
        inputs,
        loading,
        loadingLogin,
        setInputs,
        submitForm
    };
}

export default useLogin;