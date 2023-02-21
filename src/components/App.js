import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Events from "./Events"
import CreateEvent from "./CreateEvent"
import ProfileMain from "./ProfileMain"
// Note: :userID will be replaced with the current user's ID obtained from the ProfileMain. 

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/events" component={Events} />
              <Route path="/create-event" component={CreateEvent} />
              <Route path="/profile/:userID" component={ProfileMain} /> 
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
