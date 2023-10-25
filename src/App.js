import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";


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