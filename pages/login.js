import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { Adminsignin } from '../actions/loginAction';


const AdminSignin = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        error: '',
        loading: false,
        showPassword: false, 
    });

    const { username, password, error, loading, showPassword } = values;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setValues({ ...values, error: 'Please enter all fields' });
            return;
        }
        setValues({ ...values, loading: true, error: '' });

        try {
            const loginData = { username, password };
            const response = await Adminsignin(loginData); 
            if (response.error) {
                setValues({ ...values, error: 'Incorrect username or password', loading: false });
            } else {
                localStorage.setItem('id', response.userId);
               // console.log('id:', response.userId);
                // console.log('Username:', username);
                // console.log('Password:', password);
                setValues({ ...values, username: '', password: '', loading: false });
                Router.push('/Adminprofileui'); 
            }
        } catch (error) {
            console.error('Signin Error:', error);
            setValues({ ...values, error: 'An error occurred during login', loading: false });
        }
    };

    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setValues({ ...values, showPassword: !showPassword });
    };

    return (
        <div className="login-form">
            <Head>
                <title>Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
           

            <div className="login_wrapper">
                {/* <div className="logo">
                    <img src="/icons/img1.png" alt="" />
                </div> */}
              
                <div className="text-center mt-4 name">Login</div>
                
                <form onSubmit={handleSubmit} className="p-3 mt-3">
                    
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-user"></span>
                        <input
                            className='login_input'
                            id='login_username'
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={handleChange('username')}
                        />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-key"></span>
                        <input
                             className='login_input'
                            id='login_password'
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange('password')}
                        />
                       
                        <span
                            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                            onClick={togglePasswordVisibility}
                            style={{ cursor: 'pointer' }}
                        ></span>
                    </div>
                    <div className="text-center fs-6 mt-2">
                    <Link href="/Forgotpassword">
                        <a>Forgot Password</a>
                    </Link>
                    </div>
                    <button type="submit" className="btn mt-3">
                        Login
                    </button>
                </form>   
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {loading && <div className="alert alert-info">Loading...</div>}
                <div className="text-center fs-6 login-link">
                    Don't have an account?{' '}
                    <Link href="/Registration">
                        <a>create an account</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminSignin;
