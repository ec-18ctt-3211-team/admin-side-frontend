import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import { Pages } from './pages';

function App() {
  const [isAuthorized, setAuthorized] = useState(true);
  return (
    <Router>
      <Switch>
        <Route exact path = "/">
          <Pages.ViewAHost/>
        </Route>
        <Route path ={SITE_PAGES.VIEW_A_ROOM.path}>
          <Pages.ViewARoom 
            host_id='123456'/>
        </Route>
        <Route path={SITE_PAGES.VIEW_A_HOST.path}>
          <Pages.ViewAHost/>
        </Route>
        <Route path={SITE_PAGES.VIEW_A_CUSTOMER.path}>
          <Pages.ViewACustomer id ='123456'/>
        </Route>
        <Route path="*">
          <div>ERROR!!!</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
