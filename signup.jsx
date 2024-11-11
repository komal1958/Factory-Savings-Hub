import React, { useState, useEffect } from 'react';

function App() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [signUpData, setSignUpData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    });
    const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState(true);

    useEffect(() => {
        const { name, email, password } = signUpData;
        setIsSignUpButtonDisabled(!(name && email && password));
    }, [signUpData]);

    const handleSignUpInputChange = (e) => {
        const { id, value } = e.target;
        setSignUpData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSignInInputChange = (e) => {
        const { id, value } = e.target;
        setSignInData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSignUpSubmit = () => {
        localStorage.setItem('user', JSON.stringify(signUpData));
        window.location.href = 'landingpgfinal.html';
    };

    const handleSignInSubmit = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            const { email, password } = signInData;

            if (email === userData.email && password === userData.password) {
                window.location.href = 'landingpgfinal.html';
            } else {
                alert('Invalid credentials');
            }
        } else {
            alert('No user data found. Please sign up first.');
        }
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <div style={styles.welcomeSection}>
                    <h1>Welcome to FACTORY SAVING HUB</h1>
                    <p>Get, Gift, Glow</p>
                    <button style={styles.welcomeButton} onClick={() => setIsSignUp(true)}>SIGN UP</button>
                    <button style={styles.welcomeButton} onClick={() => setIsSignUp(false)}>SIGN IN</button>
                </div>
                {isSignUp ? (
                    <div style={{ ...styles.formSection, display: 'flex' }}>
                        <h2>SIGN UP</h2>
                        <input type="text" id="name" placeholder="Your Name" value={signUpData.name} onChange={handleSignUpInputChange} />
                        <input type="email" id="email" placeholder="Your Email" value={signUpData.email} onChange={handleSignUpInputChange} />
                        <input type="password" id="password" placeholder="Your Password" value={signUpData.password} onChange={handleSignUpInputChange} />
                        <button disabled={isSignUpButtonDisabled} onClick={handleSignUpSubmit}>SIGN UP</button>
                    </div>
                ) : (
                    <div style={{ ...styles.formSection, display: 'flex' }}>
                        <h2>SIGN IN</h2>
                        <input type="email" id="email" placeholder="Your Email" value={signInData.email} onChange={handleSignInInputChange} />
                        <input type="password" id="password" placeholder="Your Password" value={signInData.password} onChange={handleSignInInputChange} />
                        <button onClick={handleSignInSubmit}>SIGN IN</button>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4'
    },
    container: {
        display: 'flex',
        width: '800px',
        height: '400px',
        backgroundColor: 'white',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden'
    },
    welcomeSection: {
        background: 'linear-gradient(to bottom, #6a0dad, #2f2f2f)',
        color: 'white',
        padding: '40px',
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeButton: {
        width: '100%',
        padding: '15px',
        backgroundColor: '#fff',
        border: 'none',
        borderRadius: '25px',
        color: '#333',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom: '15px'
    },
    formSection: {
        width: '50%',
        padding: '40px',
        display: 'none',
        flexDirection: 'column',
        justifyContent: 'center'
    }
};

export default App;
