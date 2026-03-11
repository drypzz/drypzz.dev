"use client";
import { useEffect, useRef } from 'react';
import { incrementViewAction } from '@/app/actions/tracker';

export const PortfolioTracker = () => {
    const hasTracked = useRef(false);

    useEffect(() => {
        if (!hasTracked.current) {
            hasTracked.current = true;
            incrementViewAction();
        }
    }, []);

    return null;
};