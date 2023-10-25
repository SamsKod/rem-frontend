import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import styles from "./App.module.css";


function App() {
	return (
    <div>
      <NavBar />
        <Container>
          <Switch>
            <Route render={() => <NotFound />}
            />
          </Switch>
        </Container>
    </div>
  );
}

export default App;