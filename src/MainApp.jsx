import React, { useState, useEffect, Suspense } from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <Router basename="/Dev-port">
        <NavBarWithRouter />
        <main className="main">
          <Switch>
            <Suspense fallback={<FallbackSpinner />}>
              <Route exact path="/" component={Home} />
              {data
                 && data.sections.map((route) => {
                   const SectionComponent = React.lazy(() => import('./components/' + route.component));
                   return (
                     <Route key={route.path} path={route.path} component={SectionComponent} />
                   );
                 })}
            </Suspense>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default MainApp;
