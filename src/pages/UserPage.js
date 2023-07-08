import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';

import { useNavigate } from 'react-router-dom';

import { Formik } from 'formik';

import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Modal,
  TextField,
} from '@mui/material';
import { Clear } from '@mui/icons-material';

import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';
import { fetchData } from '../Redux/thunk/UserThunkAction';
import adduserApi from '../Api/adduserApi';
import deleteUserApi from '../Api/deleteUserApi';

import editUser from '../Api/EditUserApi';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function UserPage() {
  const [trigger, settrigger] = useState(false);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [updating, setupdating] = useState(false);
  const [order, setOrder] = useState('asc');
  const [selectedId, setSelectedIds] = useState([]);
  const [selected, setSelected] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [data, setdata] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [modal, setMOdal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const status = ['active', 'inActive'];
  const verified = ['verified', 'banned'];
  const [id, setId] = useState('');
  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setId(id);
    console.log(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const dispatch = useDispatch();
  const USERLIST = useSelector((state) => state.users.users.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [fetchData, modal, data]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n._id);
      setSelectedIds(newSelecteds);

      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name, id) => {
    const selectedIndex = selected.indexOf(name);
    if (!selectedId.includes(id)) {
      selectedId.push(id);
    }
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleModal = () => {
    setMOdal(!modal);
    setupdating(false);
  };
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const deleteRow = () => {
    console.log(id);
    setdata(id);
    deleteUserApi(id);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST?.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers?.length && !!filterName;
  const filterSingleData = () => {
    setupdating(true);
    setMOdal(true);
    const data = USERLIST.filter((t) => t._id === id);
    setSingleData(data[0]);
  };
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" onClick={() => handleModal()} startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            selectedId={selectedId}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, name, role, status, company, avatarUrl, verified } = row;
                    const selectedUser = selected.indexOf(_id) !== -1;

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name, _id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{verified}</TableCell>

                        <TableCell align="left">
                          {/* <Label color={(status === 'inActive' && 'error') || 'success'}>{sentenceCase(status)}</Label> */}
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, _id)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => filterSingleData()}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => deleteRow()}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      {modal ? (
        <Modal
          open={Boolean(modal)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '96px',
            backgroundColor: 'white',
          }}
        >
          <Formik
            validateOnBlur
            initialValues={
              updating
                ? {
                    avatarUrl: singleData.avatarUrl,
                    name: singleData.name,
                    role: singleData.role,
                    status: singleData.status,
                    verified: singleData.verified,
                    company: singleData.company,
                  }
                : { avatarUrl: '', name: '', role: '', status: '', verified: '', company: '' }
            }
            validationSchema={Yup.object().shape({
              name: Yup.string().min(2, 'Too Short!').required('Required'),
              role: Yup.string().required('Required'),
              status: Yup.string().required('Required'),
              company: Yup.string().required('Required'),
              verified: Yup.string().required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              const formdata = new FormData();
              const selectedImage = values.avatarUrl; // Assuming avatarUrl is the name of the input field for the image

              if (selectedImage instanceof File) {
                formdata.append('avatarUrl', selectedImage);
              }

              // Append other form data fields as needed
              Object.entries(values).forEach(([key, value]) => {
                if (value && !(value instanceof File)) {
                  formdata.append(key, value);
                }
              });
              console.log(formdata);

              if (updating) {
                editUser(id, values);
                setupdating(false);
              } else {
                adduserApi(formdata);
              }

              // console.log(values);
              handleModal();
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, setFieldValue }) => (
              <>
                {' '}
                <form
                  onSubmit={handleSubmit}
                  style={{ backgroundColor: 'white', padding: '81px', borderRadius: '31px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Clear
                      style={{ position: 'relative', top: '-59px', right: ' -52px' }}
                      onClick={() => handleModal()}
                    />
                  </div>
                  <Stack spacing={3}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div
                        style={{
                          marginTop: '6px',
                          color: 'red',
                        }}
                      >
                        <TextField
                          name="name"
                          label="Name"
                          onChange={handleChange}
                          defaultValue={updating ? singleData?.name : ''}
                        />
                        {errors.name && touched.name ? <div>{errors.name}</div> : null}
                      </div>
                      <div
                        style={{
                          marginTop: '6px',
                          color: 'red',
                        }}
                      >
                        <TextField
                          name="role"
                          label="Role"
                          onChange={handleChange}
                          defaultValue={updating ? singleData?.role : ''}
                        />
                        {errors.role && touched.role ? <div>{errors.role}</div> : null}
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: '6px',
                        color: 'red',
                      }}
                    >
                      <TextField
                        fullWidth
                        name="company"
                        label="Company"
                        onChange={handleChange}
                        defaultValue={updating ? singleData?.company : ''}
                        margin="dense"
                      />
                      {errors.company && touched.company ? <div>{errors.company}</div> : null}
                    </div>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                      <div
                        style={{
                          marginTop: '6px',
                          color: 'red',
                        }}
                      >
                        <TextField
                          style={{ width: '200px' }}
                          className="px-2 my-2"
                          variant="outlined"
                          name="verified"
                          select
                          label="Verified Status"
                          defaultValue={updating ? singleData?.verified : ''}
                          onChange={handleChange}
                        >
                          {verified.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                        {errors.verified && touched.verified ? <div>{errors.verified}</div> : null}
                      </div>
                      <div
                        style={{
                          marginTop: '6px',
                          color: 'red',
                        }}
                      >
                        <TextField
                          style={{ width: '200px' }}
                          className="px-2 my-2"
                          variant="outlined"
                          name="status"
                          select
                          defaultValue={updating ? singleData?.status : ''}
                          label="Status"
                          onChange={handleChange}
                        >
                          {status.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                        {errors.status && touched.status ? <div>{errors.status}</div> : null}
                      </div>
                    </div>
                    <div>
                      <TextField
                        type="file"
                        name="avatarUrl"
                        accept="image/*"
                        fullWidth
                        hidden
                        // value={selectedImage}
                        defaultValue={singleData?.image}
                        // onChange={handleChange}
                        onChange={(event) => {
                          const file = event.target.files[0];

                          setSelectedImage(file);
                        }}
                      />
                      {updating ? (
                        <div>
                          <img
                            style={{ display: 'block', objectFit: 'contain', width: '362px' }}
                            src={trigger ? singleData?.avatarUrl : selectedImage}
                            alt="Preview"
                          />
                        </div>
                      ) : (
                        <div>
                          <img
                            style={{ display: 'block', objectFit: 'contain', width: '362px' }}
                            src={selectedImage}
                            alt="Preview"
                          />
                        </div>
                      )}
                    </div>
                  </Stack>

                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />

                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Save
                  </LoadingButton>
                </form>
              </>
            )}
          </Formik>
        </Modal>
      ) : null}
    </>
  );
}
