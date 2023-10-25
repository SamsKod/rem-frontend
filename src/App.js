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
            <Route
            exact
            path="/"
            render={() => (
              <NotesPage message="No Notes found. Adjust the search keyword." />
            )}
            />
            <Route exact path="/login" render={() => <LoginForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route render={() => <NotFound />}
            />
          </Switch>
        </Container>
    </div>
  );
}

export default App;