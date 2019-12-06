import React from 'react';
import './App.css';

import LoginRegistrationForm from './LoginRegistrationForm'
import UserLanding from './UserLanding'

class App extends React.Component {
  constructor(){
    super()

    this.state = {
      loggedIn: false,
      loggedInUserEmail: null,
      username: null,
      userId: null
    }

  }

  // login action
  login = async (loginInfo) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/login', {
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify(loginInfo),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

    const parsedLoginResponse = await response.json()
    if (parsedLoginResponse.status.code === 200) {
      this.setState({
        loggedIn: true,
        loggedInUserEmail: parsedLoginResponse.data.email,
        username: parsedLoginResponse.data.username,
        userId: parsedLoginResponse.data.id
      })
    } else {
      console.log('Log In Failed')
      console.log(parsedLoginResponse)
    }
  }

  // logging user out
  logOut = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/logout', {
        method: 'GET',
        credentials: 'include'
      })
      this.setState({
        loggedIn: false,
        loggedInUserEmail: ''
      })
      return response
    }

  register = async (registerInfo) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(registerInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsedRegisterResponse = await response.json()

    if (parsedRegisterResponse.status.code === 201){
      this.setState({
        loggedIn: true,
        loggedInUserEmail: parsedRegisterResponse.data.email,
        username: parsedRegisterResponse.data.username,
        userId: parsedRegisterResponse.data.id
      })
    } else {
      console.log('Registration failed')
      console.log(parsedRegisterResponse)
    }
  }

  render(){
  return (
    <div className="App">
      {
        this.state.loggedIn
            ?    
        <UserLanding logout={this.logout} email={this.state.loggedInUserEmail} username={this.state.username} userId={this.state.userId}/>
            :
        <LoginRegistrationForm login={this.login} register={this.register} />
        }
    </div>
  );}
}

export default App;
