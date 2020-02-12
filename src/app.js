import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import './styles/main.scss'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import Discovery from './components/common/Discovery'
import Search from './components/common/Search'
import ProjectShow from './components/projects/ProjectShow'
import ProjectEdit from './components/projects/ProjectEdit'
import ProjectNew from './components/projects/ProjectNew'
import UserShow from './components/users/UserShow'
import UserEdit from './components/users/UserEdit'
// import UserMessages from './components/users/UserMessages'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import NotFound from './components/common/NotFound'
// import MyPortfolio from './components/common/MyPortfolio'
// import Auth from '../../lib/auth'
import SecureRoute from './components/common/SecureRoute'
import UnSecureRoute from './components/common/UnSecureRoute'
import PendingRequests from './components/users/PendingRequests' 
import FirstLogin from './components/common/FirstLogin'
import Gallery from './components/common/Gallery'



const App = () => (

  <BrowserRouter>
    <main>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/discovery" component={Discovery} />
        <SecureRoute path="/myportfolio/edit" component={UserEdit} />
        <Route path="/search" component={Search} />
        {/* <SecureRoute path="/myportfolio" component={MyPortfolio} /> */}
        <SecureRoute path="/projects/:id/edit" component={ProjectEdit} />
        <SecureRoute path="/projects/new" component={ProjectNew} />
        <Route path="/projects/:id" component={ProjectShow} />
        {/* <SecureRoute path="/users/:username/edit" component={UserEdit} /> */}
        <Route path="/users/:username" component={UserShow} />
        {/* <Route path="/users/:username/messages" component={UserMessages} /> */}
        <UnSecureRoute path="/register" component={Register} />
        <UnSecureRoute path="/login" component={Login} />
        <SecureRoute path="/getstarted" component={FirstLogin} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/*" component={NotFound} />
      </Switch>
      <PendingRequests />
    </main>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)