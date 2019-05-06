import React, { useState, useEffect } from 'react';
import './App.scss';
import logo from './logo.svg';

async function fetchData(set) {
  const response = await fetch("/users");
  const json = await response.json();
  set(json);
}

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {login: '', passwd: ''};

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswdChange = this.handlePasswdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleLoginChange(event){
    this.setState({login: event.target.value});
  }
  handlePasswdChange(event){
    this.setState({passwd: event.target.value});
  }

  handleSubmit(event) {
    alert(`A login was submitted: ${this.state.login}
A passwd was submitted: ${this.state.passwd}`);
    event.preventDefault();
  }

  render() {
    return (
      <div className="SignIn container-fluid">
      <div class="LoginContainer card">
          <img src={logo} alt="Logo" class="img img-fluid img-thumbnail "/>
          <form onSubmit={this.handleSubmit}>
            <div class="login-field-text"><input type="text" name="login" placeholder="Your Login" value={this.state.login} onChange={this.handleLoginChange}/></div>
            <div class="passwd-field-text"><input type="password" name="passwd" placeholder="Your Password" value={this.state.passwd} onChange={this.handlePasswdChange}/></div>
            <div class="Button-sign"><input type="submit" value="Sign In" /></div>
            </form>

          <div class="links">
            <a href="www.google.com">Forgot Password?</a>
            <a href="www.google.com">Sign up</a>
          </div>
        </div>
      </div>
    );
  }
}

function App() {
  // const [users, setUser] = useState([]);

  // useEffect(() => {
  //   fetchData(setUser);
  // }, []);
  return (
    <div className="App">
      <SignIn />
    </div>
  );
}

export default App;
