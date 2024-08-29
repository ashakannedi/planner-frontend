import React,{useEffect} from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
// import { Route, Routes, useNavigate, } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Taskspage from './pages/Taskspage';
import Projects from './pages/Projects';
import Details from './pages/Details';
import DetailsByTaskId from './pages/DetailsByTaskId';
import Navbar from './pages/Nav';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import Registration from './pages/Registration';





import Users from './pages/Users';
import Userproject from './pages/Userproject';
import Adduser from './pages/Adduser';
import Usertask from './pages/Usertask';
import TaskbyUserid from './pages/TaskbyUserid';
import Task from './pages/Task';
import Project from'./pages/Project';
import Loginform from './pages/Loginform';

setupIonicReact();

const App = () => {
  

  return(
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
      <Switch>
          <Route path="/navbar"><Navbar/></Route> 
          <Route path="/projects"><Projects/></Route>
          <Route path="/taskbyuserid"><TaskbyUserid/></Route>
          <Route path="/taskspage/:id" component={Taskspage}></Route> 
          <Route path="/details/:id" component={Details}><Details/></Route>
          <Route path="/detailsbasedontaskid/:id" component={DetailsByTaskId}><DetailsByTaskId/></Route>
          <Route path="/home"><Home/></Route>
          <Route path="/register" component={Registration} />
          <Route path="/login" component={Loginform} />
          <Route path="/usertask" component={Task}/>
          <Route path="/adduser"component={Adduser}/>
          <Route path="/userproject" component={Project}/>
           <Route path="/user" component={Users}/>
        </Switch> 
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);
}

export default App;

