import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";

import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ProfilePage from "./pages/profiles/ProfilePage";
import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";

import NotePage from "./pages/notes/NotePage";
import NotesPage from "./pages/notes/NotesPage";


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