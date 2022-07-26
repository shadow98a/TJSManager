import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';

const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      // email: 'demo@devias.io',
      empNum: '',
      // password: 'Password123'
      empPassword: ''
    },
    validationSchema: Yup.object({
      empNum: Yup
        .string()
        // .email(
        //   'Must be a valid email')
        .max(255)
        .required(
          '직원 번호를 입력해 주세요'),
          empPassword: Yup
        .string()
        .max(255)
        .required(
          '로그인을 위한 비밀번호를 입력해 주세요')
    }),
    onSubmit: () => {
      router.push('/dashboard');
    }
  });

  return (
    <>
      <Head>
        <title>로그인 | TJSManager</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          {/* <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink> */}
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                로그인
              </Typography>
              {/* <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in on the internal platform
              </Typography> */}
            </Box>
            {/* <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid> */}
            {/* <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                or login with email address
              </Typography>
            </Box> */}
            <TextField
              error={Boolean(formik.touched.empNum && formik.errors.empNum)}
              fullWidth
              helperText={formik.touched.empNum && formik.errors.empNum}
              label="직원 번호"
              margin="normal"
              name="empNum"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.empNum}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.empPassword && formik.errors.empPassword)}
              fullWidth
              helperText={formik.touched.empPassword && formik.errors.empPassword}
              label="로그인을 위한 비밀번호"
              margin="normal"
              name="empPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                지금 로그인
              </Button>
            </Box>
            {/* <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography> */}
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
