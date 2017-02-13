import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { Match, BrowserRouter, Miss } from 'react-router';
import Header from './header';
import Dashboard from './dashboard';
import Broadcast from './broadcast';
import People from './people';
import Loader from './loader';
import Faq from './faq';
import Footer from './footer';
import Login from './login';
import { firebaseAuth } from '../modules/firebase';

import 'bootstrap/dist/css/bootstrap.css';
import '../styling/index.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      loading: true,
      user: null,
    }
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        console.log(`${user.displayName} is authenticated for this app.`);
        this.setState({
          authed: true,
          loading: false,
          user,
        })
      } else {
        this.setState({
          loading: false,
          user: null,
          authed: false,
        })
      }
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    let content;
    if(this.state.loading === true) {
      content = content = <Loader loaderStatus='Initialising awesomeness' />;
    } else if(this.state.authed === false) {
      content = <Login />;
    } else {
      content = (
        <BrowserRouter basename="/lets-connect">
          {({router}) => (
            <div className="lets-connect">
              <Header user={this.state.user} />
              <Grid className="body">
                <Row>
                  <Match render={props => <Dashboard user={this.state.user} {...props} />} pattern='/' exactly />
                  <Match render={props => <Broadcast user={this.state.user} {...props} />} pattern='/broadcast' exactly />
                  <Match render={props => <People user={this.state.user} {...props} />} pattern='/people' exactly />
                  <Match render={Faq} pattern='/faq' exactly />
                  <Miss render={() => <h3>Whoops! How did you get here? :)</h3>} />
                </Row>
              </Grid>
              <Footer />
            </div>
          )}
        </BrowserRouter>
    );
  }

  return content;
}
}
