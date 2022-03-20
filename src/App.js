
import './App.css';
import Formfull from './Component/Formfull';
import Table from './Component/Table';
import {Switch,Route} from 'react-router-dom'
import {Editform} from './Component/Editform';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"></Route>
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
