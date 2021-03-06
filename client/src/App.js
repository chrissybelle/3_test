import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SaveRecipes from "./pages/SaveRecipes";
import SavedRecipes from "./pages/SavedRecipes";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import EdamamSearch from "./pages/Edamam";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import SignInScreen from "./components/Login";

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons'

// library.add(faHeart, faBookmark)


const App = () =>
  <Router>
    <div>
      <Nav />
      <SignInScreen />
      <Jumbotron />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        {/* Can we certain paths only show if person is logged in? */}
        <Route exact path="/save-recipes" component={SaveRecipes} />
        <Route exact path="/saved-recipes" component={SavedRecipes} />
        <Route exact path="/recipes/:id" component={Detail} />
        <Route exact path="/edamamrecipes" component={EdamamSearch} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;

