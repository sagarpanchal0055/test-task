import axios from 'axios';

const signUp = async (name, email, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}users`, {
      username: name,
      email,
      password
    });

    if (response.status === 201) {
      console.log('User created successfully!');
      return response.data;
    }
  } catch (error) {
    console.error('Sign-up failed:', error);
  }
};

const loginApi = async (email, password) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}users`, {
      params: {
        email,
        password
      }
    });

    if (response.data.length > 0) {
      console.log('Login successful!');
      return response.data[0];
    } else {
      console.error('Invalid credentials!');
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const forgotPassword = async (email, newPassword) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}users`, {
      params: {
        email
      }
    });

    if (response.data.length > 0) {
      const userId = response.data[0].id;
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        password: newPassword
      });
      console.log('Password updated successfully!');
    } else {
      console.error('Email not found!');
    }
  } catch (error) {
    console.error('Password reset failed:', error);
  }
};

export {
  signUp,
  loginApi,
  forgotPassword
}
