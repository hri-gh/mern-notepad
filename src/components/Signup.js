import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
// import { useSignup } from '../hooks/use-signup' s1

function Signup(props) {
    // const { isLoading, error, signup } = useSignup() s1

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {

        // await signup(email, password) s1

        e.preventDefault()
        const { name, email, password } = credentials
        const response = await fetch("http://localhost:8000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            // Save the auth token and redirect
            // localStorage.setItem('token', json.authtoken);
            props.showAlert("Account Created Successfully", "success")
            navigate("/login");
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <section>
                <div className="mask d-flex align-items-center h-80 gradient-custom-3">
                    <div className="container h-80">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: 15 }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">
                                            Create an account
                                        </h2>
                                        <form onSubmit={handleSubmit}>
                                            <label className="form-label" htmlFor="name">
                                                Your Name
                                            </label>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name='name'
                                                    className="form-control form-control-lg"
                                                    onChange={onChange}
                                                    required
                                                />

                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="email">
                                                    Your Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name='email'
                                                    className="form-control form-control-lg"
                                                    onChange={onChange}
                                                    required
                                                />

                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="password">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name='password'
                                                    className="form-control form-control-lg"
                                                    onChange={onChange}
                                                    minLength={5}
                                                    required
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="cpassword">
                                                    Repeat your password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="cpassword"
                                                    name='cpassword'
                                                    className="form-control form-control-lg"
                                                    onChange={onChange}
                                                    minLength={5}
                                                    required

                                                />
                                            </div>
                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input
                                                    className="form-check-input me-2"
                                                    type="checkbox"
                                                    defaultValue=""
                                                    id="formcheck"
                                                    onChange={onChange}
                                                />
                                                <label className="form-check-label" htmlFor="form2Example3g">
                                                    I agree all statements in{" "}
                                                    <a href="#!" className="text-body">
                                                        <u>Terms of service</u>
                                                    </a>
                                                </label>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body"
                                                >
                                                    Register
                                                </button>
                                            </div>
                                            <p className="text-center text-muted mt-5 mb-0">
                                                Have already an account?{" "}
                                                <Link to="/login" className="fw-bold text-body">
                                                    <u>Login here</u>
                                                </Link>
                                            </p>
                                            {/* <button disabled={isLoading}></button> s1*/}
                                            {/* {error && <div>{error}</div>} s1*/}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Signup
