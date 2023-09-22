import {useState, useEffect, useCallback} from "react";

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import {getPage, getTaskCount, editTask, createTask, removeTask} from "./utils";
import {TASK_STATUSES} from "./constants";


const TablePaginationActions = ({count, page, rowsPerPage, onPageChange}) => {
    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
            >
                <KeyboardArrowLeft/>
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                <KeyboardArrowRight/>
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
const TaskTable = () => {
    const [data, setData] = useState({count: 0, tasks: []});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [newTaskValue, setNewTaskValue] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskValue, setEditTaskValue] = useState('');
    const [editTaskStatus, setEditTaskStatus] = useState('');

    const handleChangePage = (event, newPage) => {
        getPage(newPage, rowsPerPage, (tasks) => {
            setData({count: data.count, tasks});
            setPage(newPage);
        })
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowPerPage = parseInt(event.target.value, 10);
        const newPage = 0;

        getPage(newPage, newRowPerPage, (tasks) => {
            setData({count: data.count, tasks});
            setPage(newPage);
            setRowsPerPage(newRowPerPage);
        })
    };

    const handleUpdatePage = useCallback(() => {
        getTaskCount((count) => {
            if (count !== 0) {
                getPage(0, rowsPerPage, (tasks) => {
                    setData({count, tasks});
                    setPage(0);
                })
            } else {
                setData({count: 0, tasks: []});
                setPage(0);
            }
        });
    }, [rowsPerPage]);

    const onEditIconClick = (id, description, status) => {
        setEditTaskValue(description);
        setEditTaskId(id);
        setEditTaskStatus(status);
    }

    const onSaveSuccess = () => {
        setEditTaskValue('');
        setEditTaskStatus('');
        setEditTaskId(null);
        handleUpdatePage();
    }

    useEffect(() => {
        handleUpdatePage();
    }, [handleUpdatePage])


    return (
        <>
            <Typography variant="h1" gutterBottom>
                TO-DO APP
            </Typography>
            <div style={{marginBottom: '20px'}}>
                <Stack spacing={2} direction="row">
                    <TextField
                        fullWidth
                        required
                        label="Введите название задачи"
                        value={newTaskValue}
                        onChange={(event) => {
                            setNewTaskValue(event.target.value);
                        }}
                    />
                    <Button variant="contained" disabled={!newTaskValue.trim()} onClick={() => {
                        createTask({description: newTaskValue, status: TASK_STATUSES.IN_PROGRESS}, handleUpdatePage);
                    }}>Добавить</Button>
                </Stack>
            </div>
            {data.tasks.length > 0 &&
                <TableContainer component={Paper}>
                    <TablePagination
                        rowsPerPageOptions={[3, 5, 10,]}
                        colSpan={3}
                        count={data.count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        style={{display: 'flex'}}
                    />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" align="center">
                                    id
                                </TableCell>
                                <TableCell component="th" align="center" >
                                    description
                                </TableCell>
                                <TableCell component="th" align="center">
                                    task status
                                </TableCell>
                                <TableCell component="th" align="center">
                                    remove
                                </TableCell>
                                <TableCell component="th" align="center">
                                    edit
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.tasks.map(({id, description, status}) => (
                                <TableRow key={id}>
                                    <TableCell align="center">
                                        {id}
                                    </TableCell>
                                    <TableCell align="center">
                                        {editTaskId === id ? <TextField
                                            required
                                            value={editTaskValue}
                                            onChange={(event) => {
                                                setEditTaskValue(event.target.value);
                                            }}
                                        /> : description}
                                    </TableCell>
                                    <TableCell align="center">
                                        {editTaskId === id ? <Select
                                            value={editTaskStatus}
                                            onChange={(event) => {
                                                setEditTaskStatus(event.target.value);
                                            }}
                                        >{Object
                                            .values(TASK_STATUSES)
                                            .map(taskStatus => <MenuItem key={taskStatus}
                                                                         value={taskStatus}>{taskStatus}</MenuItem>)}
                                        </Select> : status}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => {
                                            removeTask(id, handleUpdatePage);
                                        }}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={
                                            () => editTaskId !== id ? onEditIconClick(id, description, status) : editTask({
                                                id, description: editTaskValue,
                                                status: editTaskStatus
                                            }, onSaveSuccess)} disabled={editTaskId === id && !editTaskValue.trim()}>
                                            {editTaskId !== id ? <EditIcon/> : <SaveIcon/>}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>

                        </TableFooter>
                    </Table>
                </TableContainer>}
        </>
    );
}

export default TaskTable;
