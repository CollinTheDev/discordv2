document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            window.location.href = 'chat.html';
        } else {
            alert('Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('Registration successful');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

if (document.getElementById('user-info')) {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await fetch('/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const user = await response.json();
                document.getElementById('user-info').textContent = `Logged in as ${user.username}`;
            } else {
                window.location.href = 'login.html';
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        window.location.href = 'login.html';
    }
}
