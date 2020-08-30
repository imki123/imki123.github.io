import React from 'react'
import './App.css'
import Header from './components/Header'
import { Switch, Link, NavLink, Route } from 'react-router-dom'
import Body from './components/Body'
import Guide from './components/Guide'
import Content from './components/Content';
import NotFoundPage from './components/NotFoundPage';

function App() {
	return (
		<>
			<Header />
			<Body>
				<Guide />
        <Content>
          <Switch>
            <Route path="/" exact>
              hello, blog_imki123 
            </Route>
            <Route path="/about">
              hello, about
            </Route>
            <Route path="*" to="/NotFoundPage" component={NotFoundPage}/>
          </Switch>
        </Content>
			</Body>
		</>
	)
}

export default App
