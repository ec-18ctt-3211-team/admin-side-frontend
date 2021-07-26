import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import { Pages } from './pages';

function App() {
  const [isAuthorized, setAuthorized] = useState(true);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Pages.ViewBlankPage
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
            path={SITE_PAGES.VIEW_A_ROOM.path}
          />
        </Route>
        <Route exact path={SITE_PAGES.VIEW_A_ROOM.path}>
          <Pages.ViewBlankPage
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
            path={SITE_PAGES.VIEW_A_ROOM.path}/>
        </Route>
        <Route exact path={SITE_PAGES.VIEW_A_HOST.path}>
          <Pages.ViewBlankPage 
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
            path={SITE_PAGES.VIEW_A_HOST.path}/>
        </Route>
        <Route exact path={SITE_PAGES.VIEW_A_CUSTOMER.path}>
          <Pages.ViewBlankPage 
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
            path={SITE_PAGES.VIEW_A_CUSTOMER.path}/>
        </Route>
        
        <Route path={SITE_PAGES.VIEW_A_ROOM.path}>
          <Pages.ViewARoom host_id="123456" />
        </Route>
        <Route path={SITE_PAGES.VIEW_A_HOST.path}>
          <Pages.ViewAHost
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized} />
        </Route>
        <Route path={SITE_PAGES.VIEW_A_CUSTOMER.path}>
          <Pages.ViewACustomer
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
          />
        </Route>
        <Route path={SITE_PAGES.VIEW_BLANK_PAGE.path}>
          <Pages.ViewBlankPage
            isAuthorized={isAuthorized}
            setAuthorized={setAuthorized}
            path="/" />
        </Route>
        <Route path="*">
          <div>ERROR!!!</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
