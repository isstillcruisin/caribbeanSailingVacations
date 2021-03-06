import React, { Component, Suspense } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import ls from 'local-storage'
import axios from 'axios'
import history from './history'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import PropTypes from 'prop-types'

const Page = React.lazy(() => import('./components/Page'))
const AddBoat = React.lazy(() => import('./pages/AddBoat'))
const AllBoats = React.lazy(() => import('./pages/AllBoats'))
const BoatDetail = React.lazy(() => import('./pages/BoatDetail'))
const Home = React.lazy(() => import('./pages/Home'))
const SignIn = React.lazy(() => import('./pages/SignIn'))
const SignUp = React.lazy(() => import('./pages/SignUp'))
const SignOut = React.lazy(() => import('./pages/SignOut'))
const Confirm = React.lazy(() => import('./pages/Confirm'))
const AddWhiteLabel = React.lazy(() => import('./pages/AddWhiteLabel'))
const ConfigureWhiteLabel = React.lazy(() => import('./pages/ConfigureWhiteLabel'))
const AllWhiteLabels =  React.lazy(() => import('./pages/AllWhiteLabels'))
const WhiteLabelCharterInquiries = React.lazy(() => import('./pages/WhiteLabelCharterInquiries'))
const AddEBrochure = React.lazy(() => import('./pages/AddEBrochure'))
const EBrochure = React.lazy(() => import('./pages/EBrochure'))
const ConfigureEBrochure = React.lazy(() => import('./pages/ConfigureEBrochure'))
const EditBoat = React.lazy(() => import('./pages/EditBoat'))
const MyWhiteLabels = React.lazy(() => import('./pages/MyWhiteLabels'))
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'))
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'))
const ConfigureCurrentUser = React.lazy(() => import('./pages/ConfigureCurrentUser'))

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  height: 100%;
  width: 100%;
  z-index: -1;
  background-size: 100% 100%;
  min-width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`

axios.interceptors.request.use(function (config) {
  const token = ls.get('user-token')
  config.headers.Authorization =  token ? `Bearer ${token}` : ''
  return config
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    if (window.location.pathname !== '/sign-in') {
      history.push('/')
    }
  }
  return error
})


function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        ls.get('admin') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

AdminRoute.propTypes = {
  location: PropTypes.any,
  component: PropTypes.object.isRequired,
}

function AuthenticatedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        ls.get('user-token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

AuthenticatedRoute.propTypes = {
  location: PropTypes.any,
  component: PropTypes.object.isRequired,
}


class App extends Component {
  render() {
    return (
      <Router history={history}>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        /> 
        <Suspense
          fallback={
            <Background>
              <div>Loading...</div>
            </Background>
          }
        >
          <Background>
            <Page>
              <Switch>
                <AdminRoute exact path="/add-boat" component={AddBoat} />
                <AdminRoute exact path="/boats" component={AllBoats} />
                <AdminRoute exact path="/boat/:id/edit" component={EditBoat} />
                <Route exact path="/sign-in" component={SignIn} />
                <Route exact path='/forgot-password' component={ForgotPassword} />
                <Route exact path='/reset-password/:token' component={ResetPassword} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/sign-out" component={SignOut} />
                <Route exact path="/confirm/:id" component={Confirm} />
                <AuthenticatedRoute exact path="/settings" component={ConfigureCurrentUser} />
                <AuthenticatedRoute exact path="/add-white-label" component={AddWhiteLabel} />
                <AdminRoute exact path="/all-white-labels" component={AllWhiteLabels} />
                <AuthenticatedRoute exact path="/my-white-labels" component={MyWhiteLabels} />
                <AuthenticatedRoute exact path="/charter-inquiries/:whiteLabelName" component={WhiteLabelCharterInquiries} />
                <AuthenticatedRoute exact path="/white-label/:name/edit/:tab" component={ConfigureWhiteLabel} />
                <AuthenticatedRoute exact path="/white-label/:name/new-e-brochure" component={AddEBrochure} />
                <AuthenticatedRoute exact path="/e-brochure/:id/edit" component={ConfigureEBrochure} />
                <Route path="/e-brochure/:id" component={EBrochure} />
                <Route path="/boat/:id" component={BoatDetail} />
                <Route path="/" component={Home} />
              </Switch>
            </Page>
          </Background>
        </Suspense>
      </Router>
    )
  }
}

export default App
