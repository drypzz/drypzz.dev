import Link from "next/link";

import "./index.style.css";

const Footer = () => {
    return (
        <>
            <footer>
                <div>
                    <p>2021 - {new Date().getFullYear()} © All rights reserved</p>
                </div>
                <div>
                    <p>Developed by <Link target="_blank" href="https://github.com/drypzz">drypzz</Link></p>
                </div>
            </footer>
        </>
    );
};

export default Footer;