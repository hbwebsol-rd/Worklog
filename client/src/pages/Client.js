import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Button, IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import AddClient from "../components/AddClient";
import { useStyles } from "../views/view-css";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const createData = (userId, userName, mail) => ({
    id: userId,
    userName,
    mail,
    isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
    const { isEditMode } = row;
    return (
        <TableCell align="left" >
            {isEditMode ? (
                <>
                    {
                        name === 'id' ? row[name] : <Input
                            value={row[name]}
                            name={name}
                            onChange={e => onChange(e, row)}

                        />
                    }
                </>
            ) : (
                row[name]
            )}
        </TableCell>
    );
};

function Client() {
    const classes = useStyles();
    const [rows, setRows] = useState([
        createData(' 1', 'Saurabh', 'saurabh@gmail.com'),
        createData(' 2', 'Taha', 'taha@gmail.com'),
        createData(' 3', 'Moiz', 'moiz@gmail.com'),
        createData(' 4', 'SSKY', 'ssky@gmail.com'),
        createData(' 5', 'Rahul', 'rahul@gmail.com'),
    ]);
    const [previous, setPrevious] = React.useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    }

    const onToggleEditMode = id => {
        setRows(() => {
            return rows.map(row => {
                if (row.id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        if (!previous[row.id]) {
            setPrevious(state => ({ ...state, [row.id]: row }));
        }
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
        const newRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setRows(newRows);
    };

    const handleDelete = index => {
        const list = [...rows];
        list.splice(index, 1);
        setRows(list);
    };

    return (
        <div className={classes.pageRoot}>
            <AddClient open={open} setOpen={setOpen} classes={classes} />
            <TableContainer component={Paper} className={classes.tableContainer} >
                <div className={classes.titleContainer}>
                    <TextField id="standard-basic" label="Search Client" variant="outlined" size='small' />
                    <Button className={classes.addButton} onClick={() => setOpen(true)}>{<ControlPointIcon fontSize='small' sx={{ mr: '10px' }} />}Add Client</Button>
                </div>
                <Table aria-label="caption table" className={classes.table}>
                    <TableHead style={{ backgroundColor: '#F5F3FF' }}>
                        <TableRow>
                            <TableCell align="left" className={classes.tableCell} >ID</TableCell>
                            <TableCell align="left" className={classes.tableCell}>NAME</TableCell>
                            <TableCell align="left" className={classes.tableCell}>EMAIL</TableCell>
                            <TableCell align="left" className={classes.tableCell}>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => (
                                <TableRow key={row.id}>
                                    <CustomTableCell {...{ row, name: "id", onChange }} />
                                    <CustomTableCell {...{ row, name: "userName", onChange }} />
                                    <CustomTableCell {...{ row, name: "mail", onChange }} />
                                    <TableCell >
                                        <IconButton
                                            aria-label="edit"
                                            style={{ color: '#3525B5' }}
                                            onClick={() => onToggleEditMode(row.id)}
                                        >
                                            {row.isEditMode ? <DoneAllIcon sx={{ color: 'Green' }} /> : <EditIcon />}
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            style={{ color: 'Red' }}
                                            onClick={() => handleDelete(i)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>

                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[2, 5, 10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}
export default Client