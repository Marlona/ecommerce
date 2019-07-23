import React from 'react';
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.componets'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import SignUp from './components/sign-up/sign-up.component'
import './App.css';


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscibeFromAuth = null

  componentDidMount() {
    this.unsubscibeFromAuth = auth.onAuthStateChanged(async userAuth => {
     if (userAuth) {
       const userRef = await createUserProfileDocument(userAuth)

       userRef.onSnapshot(snapshot => {
        this.setState({
          currentUser: {
            id: snapshot.id,
            ...snapshot.data()
          }
        })
        console.log(this.state  )
      })
     }
     this.setState({ currentUser: userAuth })
    })
  }
 
  componentWillUnmount() {
    this.unsubscibeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
          <Switch>
            <Route exact path='/' component={ HomePage } />
            <Route path='/shop' component={ ShopPage } />
            <Route path='/signin' component={ SignInAndSignUpPage }/>
            <Route path='/signup' component={ SignUp }/>
          </Switch>
        
      </div>
    )
  }
  
}

export default App;
