import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DropdownMenu from './Dropdown';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  cell_selected: {
    padding: '3px',
    color: 'white',
    fontWeight: 500
  },
  cell_unselected: {
    padding: '3px',
    color: 'black',
    fontWeight: 500
  }
});

class EmergencyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.classes = props.classes;
  }

  render() {
    return (
      <Table padding="none">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Type of emergency</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Affected people</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Location</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Emergency details</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Note</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Emergency status</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.emergencies.map((row, index) => (
            <TableRow
              key={index}
              selected={this.props.selectedID === index}
              onClick={() => {
                this.props.setSelectedID(index);
              }}
            >
              <TableCell
                align="left"
                component="th"
                scope="row"
                style={{whiteSpace: 'nowrap'}}
                className={
                  this.props.selectedID === index
                    ? this.classes.cell_selected
                    : this.classes.cell_unselected
                }
              >
                {row.data.fullname}
              </TableCell>
              <TableCell
                align="left"
                style={{ textTransform: 'Capitalize'}}
                className={
                  this.props.selectedID === index
                    ? this.classes.cell_selected
                    : this.classes.cell_unselected
                }
              >
                {row.data.emergencyType}
              </TableCell>
              <TableCell
                align="left"
                style={{ textTransform: 'Capitalize'}}
                className={
                  this.props.selectedID === index
                    ? this.classes.cell_selected
                    : this.classes.cell_unselected
                }
              >
                {row.data.affectedPersons}
              </TableCell>
              <TableCell
                align="left"
                className={
                  this.props.selectedID === index
                    ? this.classes.cell_selected
                    : this.classes.cell_unselected
                }
              >
                {row.data.city} ({row.data.country})
              </TableCell>
              <TableCell
                align="left"
                className={
                  this.props.selectedID === index
                    ? this.classes.cell_selected
                    : this.classes.cell_unselected
                }
              >
                {row.data.emergencyDetails}
              </TableCell>
              <TableCell
                align="left"
                className={
                  this.props.selectedID === index
                    ? this.classes.cell_selected
                    : this.classes.cell_unselected
                }
              >
                {row.data.emergencyNote}
              </TableCell>
              <TableCell
                align="left"
                className={
                  this.props.selectedID === index
                    ? this.classes.cell_selected
                    : this.classes.cell_unselected
                }
              >
                <DropdownMenu
                  selected={this.props.selectedID === index}
                  emergency={this.props.emergencies[index]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(EmergencyTable);
