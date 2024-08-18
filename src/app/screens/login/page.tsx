"use client";

import Checkbox from "@/app/components/hooks/checkbox";

import "@/app/components/renders/contact/index.style.css";

const LoginPage = () => {

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        console.log(data);
    }

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
                                <input type="email" placeholder="" required name="email" id="email" className="form-input" />
                                <label className="form-label">Email</label>
                            </div>
                            <div className="form-group">
                                <input type="password" placeholder="" required name="password" id="password" className="form-input" />
                                <label className="form-label">Password</label>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    marginBottom: 20,
                                }}
                            >
                                <Checkbox parameter="remember" />
                                <label htmlFor="remember" style={{cursor: "pointer", userSelect: "none"}}>Remember me?</label>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="form-button">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
};

export default LoginPage;