"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { auth } from "@/app/database/config";

import Loading from '@/app/components/renders/loading';

const DashboardPage = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const Logout = async () => {
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
            <div>
                <h1>Dashboard</h1>
                <button onClick={Logout}>Logout</button>
            </div>
        </>
    );
};

export default DashboardPage;
