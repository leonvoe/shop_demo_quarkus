import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Articles from "./pages/Articles";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/customers" component={Customers} />
          <Route path="/articles" component={Articles} />
          <Route path="/orders" component={Orders} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
