//import logo from './logo.svg';
import './App.css';
//import ItemActionButtons from "./components/itemButtons/itemButtons"
import AddItemForm from "./components/addItem/addItem"
import DataTable from "./components/dataTable/dataTable"
function App() {
  localStorage.setItem("data",JSON.stringify(
  {"temperature":[
                    {"date":"15.10.2020","time":"10:23","temperature": "36.6", "drugs":"ничегошеньки", "comment":"все нормально!"},
                    {"date":"15.10.2020","time":"11:23","temperature": "37.6", "drugs":"ничегошеньки", "comment":"все нормально?"},
                    {"date":"15.10.2020","time":"12:23","temperature": "38.6", "drugs":"ничегошеньки", "comment":"все нормально??"},
                    {"date":"15.10.2020","time":"13:23","temperature": "39.6", "drugs":"ничегошеньки", "comment":"не все нормально"},
                    {"date":"15.10.2020","time":"14:23","temperature": "40.6", "drugs":"ВСЁЁЁЁЁ", "comment":"писец"}]
  }));
  return (
    <div className="App">
      
        <AddItemForm dataType="Temperature" prevTemperature={37.8}/>
        <DataTable dataType="Temperature"/>

    </div>
  );
}

export default App;
