import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.componets'
import { auth } from './firebase/firebase.utils'
import './App.css';


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscibeFromAuth = null

  componentWillMount() {
    this.unsubscibeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
      console.log(user)
    })
  }

  componentWillUnmount() {
    this.unsubscibeFromAuth()
  }

  render() {
    return (
      <div>
      <BrowserRouter>
        <Header currentUser={ this.state.currentUser } />
          <Switch>
            <Route exact path='/' component={ HomePage } />
            <Route path='/shop' component={ ShopPage } />
            <Route path='/signin' component={ SignInAndSignUpPage }/>
          </Switch>
      </BrowserRouter>
        
      </div>
    )
  }
  
}

export default App;
