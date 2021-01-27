import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Table from '@material-ui/core/Table';
//import TableHead from '@material-ui/core/TableHead';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableFooter from '@material-ui/core/TableFooter';
//import TablePagination from '@material-ui/core/TablePagination';
//import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddItemForm from "../../components/addItem/addItem"
//Грид для теста
import { DataGrid } from '@material-ui/data-grid';
import Tooltip from '@material-ui/core/Tooltip';
import './dataTable.css';

const columns = [
  { field: 'date', headerName: 'Дата', width: 150 },
  { field: 'time', headerName: 'Время', width: 100 },
  { field: 'temperature', headerName: 'Температура', width: 100 },
  { field: 'drugs', headerName: 'Лекарства', width: 250 ,
 
  renderCell: (params) =>  {console.log (params.row.drugs); return(
    <Tooltip title={params.row.drugs} >
     <span className="table-cell-trucate">{params.row.drugs}</span>
     </Tooltip>
   )},  
},
  { field: 'comment', headerName: 'Комментарий', width: 250,  
  renderCell: (params) =>  {console.log (params.row.comment); return(
    <Tooltip title={params.row.comment} >
     <span className="table-cell-trucate">{params.row.comment}</span>
     </Tooltip>
   )},}
  
];


function DataTableGrid(props) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={props.rows} columns={columns} pageSize={5} />
    </div>
  );
}
//Конец грида для теста
// const actionsStyles = theme => ({
//   root: {
//     flexShrink: 0,
//     color: theme.palette.text.secondary,
//     marginLeft: theme.spacing.unit * 2.5,
//   },
// });

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>

        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

//const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
//  TablePaginationActions,
//);

//подготовка данных для таблицы. Унифицировать бы.
let counter = 0;
function createTemperatureData(dataObject) {
  // let counter = 0;
  let { date, time, temperature, drugs, comment } = dataObject;
  counter += 1;
  return { id: counter, date, time, temperature, drugs, comment };
}
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class DataTable extends React.Component {
  constructor (props){
    super(props)
    this.state = {
    rows: [].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
    page: 0,
    rowsPerPage: 5,
    dataTable: {},
  };
}
  componentDidMount = () => {
    let lsDataStr = localStorage.getItem("data");
    let lsData = (JSON.parse(lsDataStr).temperature);
    this.setState({dataTable: lsData},()=>{
      let tempRows = [];
      for (const dataItem of this.state.dataTable) {
        tempRows.push(createTemperatureData(dataItem));
      }
      this.setState({ rows: tempRows.sort((a, b) => (a.time > b.time ? -1 : 1)) })
    })
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleAddItem = (row) => {
    this.setState({dataTable: [...this.state.dataTable, row]},()=>{
      let lsData=JSON.parse(localStorage.getItem("data"));
      lsData.temperature=this.state.dataTable;
      localStorage.setItem("data", JSON.stringify(lsData));
      let tempRows = [];
      for (const dataItem of this.state.dataTable) {
        tempRows.push(createTemperatureData(dataItem));
      }
      this.setState({ rows: tempRows.sort((a, b) => (a.time > b.time ? -1 : 1)) })
    })
    
    
    console.log("done")
    console.log("state: ", this.state);
  }
  render() {
    const { classes } = this.props;
//    const { rows, rowsPerPage, page } = this.state;
//    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
//    let headers = [];
//    let headerCells = [];
    if (this.props.dataType === "Temperature") {
//      headers = ["Дата", "Время", "Температура", "Лекарства", "Комментарий"];
//      headerCells = headers.map((h, i) => <TableCell key={i}>{h}</TableCell>);
    }
    //const onAddItem=this.handleAddItem.bind(this)
    return (
      <>
        <AddItemForm dataType="Temperature" prevTemperature={37.8} writeData={this.handleAddItem} />
        <Paper className={classes.root}>
          {/* <div className={classes.tableWrapper} key="troot">
            <Table className={classes.table}>
              <TableHead>
                <TableRow key="0">
                  {headerCells}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="td" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {row.time}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {row.temperature}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {row.drags}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {row.comment}
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }} key="empty">
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      native: true,
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsWrapped}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div> */}

          <DataTableGrid rows={this.state.rows}/>

        </Paper>
      </>
    );
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired, //Строковые названия показателей
  //data: PropTypes.object,//Сама таблица
  //tableData: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataTable);
