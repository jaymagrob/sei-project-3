import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import './styles/main.scss'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import Discovery from './components/common/Discovery'
import Search from './components/common/Search'
import ProjectShow from './components/projects/ProjectShow'
// import ProjectEdit from './components/projects/ProjectEdit'
import ProjectNew from './components/projects/ProjectNew'
import UserShow from './components/users/UserShow'
import UserEdit from './components/users/UserEdit'
// import UserMessages from './components/users/UserMessages'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import NotFound from './components/common/NotFound'
import MyPortfolio from './components/common/MyPortfolio'
// import Auth from '../../lib/auth'



const App = () => (

  <BrowserRouter>
    <main>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/discovery" component={Discovery} />
        <Route path="/myportfolio/edit" component={UserEdit} />
        <Route path="/search" component={Search} />
        <Route path="/myportfolio" component={MyPortfolio} />
        {/* <Route path="/search" component={Search} /> */}
        <Route path="/projects/:id" component={ProjectShow} />
        {/* <Route path="/projects/:id/edit" component={ProjectEdit} /> */}
        <Route path="/projects/new" component={ProjectNew} />
        <Route path="/users/:username" component={UserShow} />
        {/* <Route path="/users/:username/edit" component={UserEdit} /> */}
        {/* <Route path="/users/:username/messages" component={UserMessages} /> */}
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </main>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)