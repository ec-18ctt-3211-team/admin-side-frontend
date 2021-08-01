import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import { Pages } from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Pages.AdminLogin/>
        </Route>
        <Route exact path={SITE_PAGES.VIEW_A_ROOM.path}>
          <Pages.ViewBlankPage
            path={SITE_PAGES.VIEW_A_ROOM.path}/>
        </Route>
        <Route exact path={SITE_PAGES.VIEW_A_HOST.path}>
          <Pages.ViewBlankPage 
            path={SITE_PAGES.VIEW_A_HOST.path}/>
        </Route>
        <Route exact path={SITE_PAGES.VIEW_A_CUSTOMER.path}>
          <Pages.ViewBlankPage 
            path={SITE_PAGES.VIEW_A_CUSTOMER.path}/>
        </Route>     
        <Route path={SITE_PAGES.VIEW_A_ROOM.path}>
          <Pages.ViewARoom/>
        </Route>
        <Route path={SITE_PAGES.VIEW_A_HOST.path}>
          <Pages.ViewAHost />
        </Route>
        <Route path={SITE_PAGES.VIEW_A_CUSTOMER.path}>
          <Pages.ViewACustomer/>
        </Route>
        <Route path={SITE_PAGES.VIEW_BLANK_PAGE.path}>
          <Pages.ViewBlankPage path="/" />
        </Route>
        <Route path="*">
          <div>ERROR!!!</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
