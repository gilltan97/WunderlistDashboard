import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Crypto from 'crypto-js'

import Index from './Index'
import Signin from './Signin'
import NoMatch from './NoMatch'

const AUTH = {
	clientId: '25ce62c7cb51183a13ce', 
	state: Crypto.SHA512('25ce62c7cb51183a13ce').toString(), 
	clientSecret: 'e358345aaf1a9e19e020b897a66ec427d5ae9d503d9c33e9aecbcc0dc4b1', 
	redirectUri: 'http://localhost:3000'
};

const AUTH_URI = `https://www.wunderlist.com/oauth/authorize?client_id=${AUTH.clientId}&redirect_uri=${AUTH.redirectUri}&state=${AUTH.state}`;

export default function App() {
  return (
    <Router>
	    <Switch>
	        <Route exact path="/" render={() => <Index auth={AUTH}/>} />
	        <Route exact path="/signin" render={() => <Signin authURI={AUTH_URI}/>}/>
	        <Route component={NoMatch} />
        </Switch>
    </Router>
  );
}
