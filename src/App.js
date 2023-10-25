import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";

import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";

import NotesCreateForm from "./pages/notes/NotesCreateForm";
import NotePage from "./pages/notes/NotePage";
import NotesPage from "./pages/notes/NotesPage";
import NotesEditForm from "./pages/notes/NotesEditForm";

import { useCurrentUser } from "./contexts/CurrentUserContext";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";
import styles from "./App.module.css";



function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <NotesPage message="No Notes found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/pins"
            render={() => (
              <NotesPage
                message="No results found. Adjust the search keyword or pin a note."
                filter={`pins__owner__profile=${profile_id}&ordering=-pins__created_at&`}
              />
            )}
          />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/notes/create" render={() => <NotesCreateForm />} />
          <Route exact path="/notes/:id" render={() => <NotePage />} />
          <Route exact path="/notes/:id/edit" render={() => <NotesEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <NotFound />}
          />
        </Switch>
      </Container>
    </div>
  );
}

export default App;