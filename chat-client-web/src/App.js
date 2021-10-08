import React, {Fragment} from 'react'
import Login from './containers/login'
import Home from './containers/home'
import {HashRouter, Route, Switch} from 'react-router-dom'
import {useSelector} from "react-redux";

function App() {
  const { authToken } = useSelector(state => state.user);

  const checkLogin = () => {
    console.log('[checkLogin]', authToken.accessToken);
    let isLogin = authToken.accessToken && authToken.accessToken.length > 0;
    return isLogin ? (
      <Home/>
    ) : (
      <Login/>
    )
  };

  return (
    <Fragment>
      <HashRouter>
        <Switch>
          {/* path: 路由匹配规则；excat：精确匹配路由；component：需要渲染的组件 */}
          <Route path='/login' component={Login} />
          <Route path='/home' component={Home} />
          <Route exact path="/" render={checkLogin} />
        </Switch>
      </HashRouter>
    </Fragment>
  )
}

export default App;
