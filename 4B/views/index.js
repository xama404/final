async function login(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            alert(`Welcome, ${data.user.username}!`);
            $('#loginModal').modal('hide');
        } else {
            alert('Invalid email or password!');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed');
    }
}

async function register(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            alert('Registered successfully!');
            $('#registerModal').modal('hide');
        } else {
            alert('Registration failed');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed');
    }
}
