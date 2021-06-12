import Checkout from './Checkout';
import Review from './Review';
import Chat from './Chat';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path="/">
        <Checkout />
        <Chat key="chat" />
        </Route>
        <Route path="/signature">
          <Review />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
