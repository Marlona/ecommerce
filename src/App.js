import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import Checkout from './pages/checkout/checkout.component'
import { createStructuredSelector } from 'reselect'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.componets'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect} from 'react-redux'
import { setCurrentUser } from './redux/user/user.action'
import { selectCurrentUser } from './redux/user/user.selector'
import './App.css'




class App extends React.Component {
  unsubscibeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props 

    this.unsubscibeFromAuth = auth.onAuthStateChanged(async userAuth => {
     if (userAuth) {
       const userRef = await createUserProfileDocument(userAuth)

       userRef.onSnapshot(snapshot => {
            setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
      })
     }
     setCurrentUser( userAuth )
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
            <Route exact path='/checkout' component={ Checkout } />
            <Route 
              exact 
              path='/signin' 
              render={() => 
              this.props.currentUser ? (
                <Redirect to='/' />
                ) : (
                <SignInAndSignUpPage />
                ) 
              }
            />
          </Switch>
        
      </div>
    )
  }
  
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) 
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
