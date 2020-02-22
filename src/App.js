import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Welcome';
import Todo from './Todo';
import './App.css';

class App extends React.Component {
    render(){
      return (
        <div className="App">
            <Router basename={process.env.PUBLIC_URL}>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/todo" component={Todo} />
            </Router>
        </div>
      );
    }
}


export default App;
