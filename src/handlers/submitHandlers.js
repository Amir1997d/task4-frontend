// Submit function for Login page
export async function logSubmitting(e, navigate, setCurrentUser, setError, username, password) {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      // If login is successful, redirect to the admin page
      setCurrentUser({ userId: data.userId, username: data.username });
      navigate('/adminpage');
    } else {
      // If login fails, show an error message
      setError(data.message || 'Failed to log in.');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    setError('Failed to log in.');
  }
}

// Submit function for Register page
export async function registerSubmitting(e, setError, navigate, username, email, password) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/');
      } else {
        setError(data.message || 'Failed to log in.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in.');
    }
}