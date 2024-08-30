import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonPage, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Navbar from './components/Nav';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Taskspage from './pages/Taskspage';
import Users from './pages/Users';
import Adduser from './pages/Adduser';
import Project from './pages/Project';
import Task from './pages/Task';
import Details from './pages/Details';
import DetailsByTaskId from './pages/DetailsByTaskId';
import Registration from './pages/Registration';
import TaskbyUserid from './pages/TaskbyUserid';
import Loginform from './pages/Loginform';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { AuthProvider } from './components/AuthContext';

setupIonicReact();

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <IonPage>
      <IonContent>
        {children}
      </IonContent>
    </IonPage>
  );
};

const App: React.FC = () => {
  return (
    <IonReactRouter>
       <AuthProvider>
      <IonRouterOutlet>
       
        <Switch>
          <Route exact path="/" render={() => <Layout><Navbar /><Home /></Layout>} />
          <Route path="/projects" render={() => <Layout><Navbar /><Projects /></Layout>} />
          <Route path="/taskbyuserid" render={() => <Layout><Navbar /><TaskbyUserid /></Layout>} />
          <Route path="/taskspage/:id" render={() => <Layout><Navbar /><Taskspage /></Layout>} />
          <Route path="/details/:id" render={() => <Layout><Navbar /><Details /></Layout>} />
          <Route path="/detailsbasedontaskid/:id" render={() => <Layout><Navbar /><DetailsByTaskId /></Layout>} />
          <Route path="/register" render={() => <Layout><Navbar /><Registration /></Layout>} />
          <Route path="/login" render={() => <Layout><Navbar /><Loginform /></Layout>} />
          <Route path="/task" render={() => <Layout><Navbar /><Task /></Layout>} />
          <Route path="/adduser" render={() => <Layout><Navbar /><Adduser /></Layout>} />
          <Route path="/project" render={() => <Layout><Navbar /><Project /></Layout>} />
          <Route path="/users" render={() => <Layout><Navbar /><Users /></Layout>} />
          <Redirect to="/" /> {/* Redirect to home if no route matches */}
        </Switch>
      </IonRouterOutlet>
      </AuthProvider>
    </IonReactRouter>
  );
};

export default App;
