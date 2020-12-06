import React from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  /*
    1. connect to server with username/password
    2. store the token that gets passed on successful login
    3. output an error when we have an unsuccessful login
  */

  login = e => {
    e.preventDefault();
    // login to server
    axiosWithAuth().post('http://localhost:5000/api/login', this.state.credentials)
      .then(res => {
        console.log('Login.js: login: res: ', res)
        localStorage.setItem('token', res.data.payload)
        this.props.history.push('/protected')
      })
      .catch(err => {
        console.log('err response: ', err)
      })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;