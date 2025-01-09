"use client";

import { SkewLoader } from 'react-spinners';

import Loading from '@/app/components/layout/loading';
import Checkbox from "@/app/components/common/checkbox";

import useLogin from './page.rules';

import "@/app/components/section/contact/index.style.css";

const LoginPage = () => {

    const { 
        inputs, 
        loading, 
        loadingLogin, 
        setInputs, 
        submitForm 
    } = useLogin();

    if (loading) {
        return <Loading />;
    };

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
                                <input
                                    type="email"
                                    value={inputs.email}
                                    placeholder=""
                                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                    name="email"
                                    id="email"
                                    className="form-input"
                                    disabled={loading}
                                />
                                <label className="form-label">Email</label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    value={inputs.password}
                                    placeholder=""
                                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                    name="password"
                                    id="password"
                                    className="form-input"
                                    disabled={loading}
                                />
                                <label className="form-label">Password</label>
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", marginBottom: 20}}>
                                <Checkbox
                                    checked={inputs.remember}
                                    onChange={(e) => setInputs({ ...inputs, remember: e.target.checked })}
                                    id="remember"
                                    title="Remember me?"
                                />
                            </div>
                            <div className="form-group">
                                {loadingLogin ? (
                                    <SkewLoader color="#037edb" loading={loadingLogin} size={30} />
                                ) : (
                                    <button type="submit" className="form-button">Confirm</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
};

export default LoginPage;