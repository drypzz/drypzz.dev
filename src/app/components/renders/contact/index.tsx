import "./index.style.css";

const Contact = () => {

    const submitForm = (e: any) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const message = e.target.message.value;

        console.log(name, email, message);
    };

    return (
        <>
            <section>
                <div>
                    <div>
                        <h1 className="dev-title" style={{marginBottom: 20}}>✉️ Contact Me</h1>
                    </div>
                    <div className="dev-contact">
                        <form onSubmit={submitForm} className="styled-form">
                            <div className="form-group">
                                <input type="text" placeholder="" name="name" id="name" className="form-input" />
                                <label className="form-label">Name</label>
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="" name="email" id="email" className="form-input" />
                                <label className="form-label">Email</label>
                            </div>
                            <div className="form-group">
                                <textarea name="message" placeholder="" id="message" className="form-input form-textarea"></textarea>
                                <label className="form-label">Message</label>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="form-button">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
};

export default Contact;