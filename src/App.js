import './App.css';
import React from "react";
import Navbar from './components/layout/Navbar';
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import axios from "axios";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

class App extends React.Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    showClearButton: false,
    alert: null,
  }

  async componentDidMount() {
    this.setState({loading: true});

    const res = await axios
      .get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({users: res.data, loading: false, showClearButton: false});
  }

  searchUsers = async text => {
    this.setState({loading: true})

    const res = await axios
      .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({users: res.data.items, loading: false, showClearButton: true});
  }

  getUser = async (login) => {
    this.setState({loading: true})

    const res = await axios
      .get(`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({user: res.data, loading: false});
  }

  getUserRepos = async (login) => {
    this.setState({loading: true})

    const res = await axios
      .get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({repos: res.data, loading: false});
  }

  clearUsers = () => this.setState(this.componentDidMount());

  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}})
    setTimeout(() => this.setState({alert: null}), 5000);
  }

  render() {
    const {users, loading, showClearButton, alert, user, repos} = this.state;
    return (
      <Router>
        <div>
          <Navbar title='Github Finder' icon='fab fa-github'/>
          <div className='container'>
            <Alert alert={alert}/>
            <Switch>
              <Route exact path='/' render={props => (
                <React.Fragment>
                <Search searchUsers={this.searchUsers}
                clearUsers={this.clearUsers}
                showClear={
                  showClearButton ? true : false
                }
                setAlert={this.setAlert}
                />
                <Users loading={loading} users={users}/>
                </React.Fragment>
                )}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/user/:login' render={props => (
                  <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} loading={loading} repos={repos}/>
                )}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
