"use client";

import { useEffect } from 'react';
import useChristmas from '@/app/hooks/useChristmas';

const ChristmasThemeController = () => {
    const { isChristmas } = useChristmas();

    useEffect(() => {
        if (isChristmas) {
            document.body.classList.add('christmas-mode');
        } else {
            document.body.classList.remove('christmas-mode');
        }
    }, [isChristmas]);

    return null;
};

export default ChristmasThemeController;