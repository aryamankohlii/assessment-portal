import LoginPage from './pages/LoginPage/loginpage'
import Dashboard from './pages/Dashboard/dashboard'
import RolePage from './pages/RolePage/Rolepage'
import AddEditPage from './pages/RolePage/AddRole'
import UserPage from './pages/UserPage/Userpage'
import AddEditUserPage from './pages/UserPage/AddUser'

import AssesmentAreaPage from './pages/AssesmentAreaPage/AssesmentAreaPage'
import AddEditAssesmentAreaPage from  './pages/AssesmentAreaPage/AddAssesmentArea'

import SubtrackPage from './pages/SubtrackPage/SubtrackPage'
import AddEditSubtrackPage from './pages/SubtrackPage/AddSubtrack'
import Questionpage from './pages/Question/Questionpage'
import AddQuestion from './pages/Question/AddQuestion'
import AnswerPage from './pages/Answer/AnswerPage'
import ResultPage from './pages/Result/ResultPage'



import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="wrapper">
    <Router>
       <Route exact path='/'>
            <LoginPage/>
        </Route>

        <Route exact path='/dashboard'>
            <Dashboard/>
        </Route>

        <Route exact path='/roles'>
            <RolePage/>
        </Route>
        <Route exact path='/role/:id'>
            <AddEditPage/>
        </Route>
        
        <Route exact path='/users'>
            <UserPage/>
        </Route>
        <Route exact path='/user/:id'>
            <AddEditUserPage/>
        </Route>

        <Route exact path='/assesmentArea'>
            <AssesmentAreaPage/>
        </Route>
        <Route exact path='/assesmentArea/:id'>
            <AddEditAssesmentAreaPage/>
        </Route>

        <Route exact path='/subtrack'>
            <SubtrackPage/>
        </Route>
        <Route exact path='/subtrack/:id'>
            <AddEditSubtrackPage/>
        </Route>
        <Route exact path='/question'>
            <Questionpage/>
        </Route>
        <Route exact path='/question/:Qid'>
            <AddQuestion/>
        </Route>
        <Route exact path='/answer'>
            <AnswerPage/>
        </Route>
        <Route exact path='/mark'>
            <ResultPage/>
        </Route>
        
        
      </Router>
      </div>

  );
}

export default App;
