import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Customers from './components/customers'

/*class App extends Component {
  state = {
    customers: []
  }

  componentDidMount() {
    fetch('/customer')
    .then(res => res.json())
    .then((data) => {
      this.setState({ customers: data })
    })
    .catch(console.log)
  }

  render () {
    return (
      <Customers customers={this.state.customers} />
    );
  }
}*/


function App() {
    return (
    <div className="App">
        <h1>Hello to React</h1>
        <h2>Hello</h2>
    </div>
    )
}

export default App;