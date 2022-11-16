import { Container } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import Users from "./pages/users/Users";

function App() {
  return (
    <Router>

    <Container sx={{ height: '100%', mt: '100px', pb: '1em', }}>
      <Routes>
        <Route path="/web" element={<SignIn />} />
        <Route path="/web/sign-up" element={<SignUp />} />
        <Route path="/web/users" element={<Users />} />
      </Routes>
    </Container>

    </Router>
  )
}

export default App;
