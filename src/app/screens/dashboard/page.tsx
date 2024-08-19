"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { auth } from "@/app/database/config";

import Loading from '@/app/components/renders/loading';

import "@/app/components/renders/contact/index.style.css";
import "./page.style.css";

const DashboardPage = () => {

    const router = useRouter();
    
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut().then(() => {
            router.push('/login');
        }).catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => { 
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

    if (loading) {
        return <Loading />;
    };

    return (
        <>
            <section style={{ height: "100vh" }}>
                <h1>Dashboard</h1>
                <button onClick={handleLogout}>
                    Logout
                </button>
                <button onClick={() => router.push('/dashboard/create')}>
                    Register
                </button>
            </section>
        </>
    );
};

export default DashboardPage;
