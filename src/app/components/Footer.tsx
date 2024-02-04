import "@/styles/footer.css";

function Footer() {
    return (
        <footer data-aos="fade-left">
            <div className='content'>
                <span> 2021 - {new Date().getFullYear()} © All rights reserved</span>
            </div>
            <div className='content'>
                <span>Published with <a target='_blank' href='https://www.netlify.com'>Netlify</a></span>
            </div>
        </footer>
    )
};

export default Footer;