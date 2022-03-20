
import './App.css';
import Formfull from './Component/Formfull';
import Table from './Component/Table';
import {Switch,Route,Link} from 'react-router-dom'
import {Editform} from './Component/Editform';
import Welcome from './Welcome'

function App() {
  return (
    <div className="App">
      <Link to="/" className='head'>Home</Link>
      <Link to="/employee/" className='head'>Registrationform</Link>
      <Switch>
        <Route exact path="/"><Welcome/></Route>
        <Route  exact path="/employee/edit:id"><Editform/>fgdh</Route>
        <Route exact path="/employee/:id"></Route>
        <Route exact path="/employee"> <Formfull/>
     </Route>
        <Route exact path="**">not found</Route>
      </Switch>
     
    </div>
  );
}

export default App;
