import React, { lazy, Suspense } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

const Cart = lazy(() => import('../step_1/hooks/OrderList'));

export const Nav = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading 🌹 🌸 💐 🌺 🌻 🌼 🌷</div>}>
        <Switch>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route path='/'>
            <Redirect to='/cart' />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};
