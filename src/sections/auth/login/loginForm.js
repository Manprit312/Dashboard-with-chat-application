import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { login } from '../../../Redux/thunk/Auth/registereThunkAction';
import { loginUser } from '../../../Redux/thunk/Auth/LoginThunk';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const data = useSelector((state) => state.logindata?.loginData);
  console.log(data);
  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object().shape({
          password: Yup.string().min(2, 'Too Short!').required('Required'),
          email: Yup.string().email().required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(loginUser(values));
          if (data.status === 200 ) {
            toast.success('User Logged in SuccessFully');
            setTimeout(() => {
              router('/dashboard/app');
            }, 1000);
          } else {
            toast.error('Something Went wrong');
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField onChange={handleChange} name="email" label="email" type="email" />
            </Stack>
            <Stack spacing={3} mt={2}>
              <TextField
                onChange={handleChange}
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
              <Checkbox name="remember" label="Remember me" />
              <Link variant="subtitle2" underline="hover">
                Forgot password?
              </Link>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained">
              Login
            </LoadingButton>
          </form>
        )}
      </Formik>
    </>
  );
}
