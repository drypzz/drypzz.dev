import Link from "next/link";

import { motion } from "framer-motion";

import "./index.style.css";

const Footer = () => {
    return (
        <>
            <motion.footer
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div>
                    <p>2021 - {new Date().getFullYear()} © All rights reserved</p>
                </div>
                <div>
                    <p>Developed by <Link target="_blank" href="https://github.com/drypzz">@drypzz</Link></p>
                </div>
            </motion.footer>
        </>
    );
};

export default Footer;