import "./App.css";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';

function App() {

  const handleButtonClick =(row) =>{
    window.open(row.webUrl);
  }

  const columns = [
    {
      name: "Display Name",
      selector: (row) => row.displayName,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      button: true,
      cell: (row) => (
        <div className="App">
          <div className="openbtn text-center">
            <Button
              variant="contained"
              color="primary"
              width="200"
              onClick={ ()=> handleButtonClick(row)}
            >
              Open Channel
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://localhost:7159/GetChannels")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
        },

        (error) => {}
      );
  }, []);

  return (
    <div className="App">
      <Card>
        <DataTable title="Channels List" columns={columns} data={items}/>
      </Card>
    </div>
  );
}

export default App;
