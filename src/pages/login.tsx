import {
  Paper,
  Container,
  Grid,
  Button,
  makeStyles,
  Input,
  Typography,
  Link,
  Avatar,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { DashboardRounded as DashboardIcon } from '@material-ui/icons';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getVerificationCode, GetVerificationCodeResp, loginCandidate, LoginCandidateResp } from 'services';
import { useAppDispatch } from 'store';
import { showSnackbar } from 'store/component';
import { setToken } from 'utils/token';
import { checkPhone } from 'utils/validators';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(4, 2),
  },
  icon: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  iconBgColor: {
    backgroundColor: blue[50],
  },
  buttonProgress: {
    color: theme.palette.common.white,
  },
}));

const Login: NextPage = () => {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const matchMedia = useMediaQuery(theme.breakpoints.down('xs'));

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [login, setLogin] = useState(false);
  const [countdown, setCountdown] = useState({ time: 0, send: false, id: undefined as number | undefined });

  const handleSendCode = () => {
    if (countdown.send) {
      return;
    }
    if (!phone) {
      dispatch(showSnackbar({ type: 'warning', message: '请填写手机号码！' }));
      return;
    }
    if (!checkPhone(phone)) {
      dispatch(showSnackbar({ type: 'warning', message: '手机号码格式不正确!' }));
      return;
    }
    const id = window.setInterval(() => {
      setCountdown((prev) => {
        if (!prev.send) {
          return prev;
        } else if (prev.time === 0) {
          window.clearInterval(prev.id);
          return { ...prev, send: false, id: undefined };
        } else {
          return { ...prev, time: prev.time - 1 };
        }
      });
    }, 1000);
    setCountdown({ time: 59, send: true, id });
    dispatch(async (dispatch) => {
      const res: GetVerificationCodeResp = await getVerificationCode(phone).catch((e) => {
        return { type: 'error', message: e?.message };
      });
      dispatch(showSnackbar({ type: res.type, message: res.type == 'success' ? '验证码已发送' : res?.message }));
    });
  };

  const handleLogin = () => {
    if (login) {
      return;
    }
    if (!phone) {
      dispatch(showSnackbar({ type: 'warning', message: '请填写手机号码！' }));
      return;
    }
    if (!checkPhone(phone)) {
      dispatch(showSnackbar({ type: 'warning', message: '手机号码格式不正确!' }));
      return;
    }
    if (!code) {
      dispatch(showSnackbar({ type: 'warning', message: '请填写验证码！' }));
      return;
    }
    setLogin(true);
    dispatch(async (dispatch) => {
      const res: LoginCandidateResp = await loginCandidate(phone, code).catch((e) => {
        return { type: 'error', message: e?.message };
      });
      setLogin(false);
      if (res.type != 'success') {
        dispatch(showSnackbar({ type: res.type, message: res?.message }));
      } else {
        setToken(res.token ?? '');
        router.push('/');
      }
    });
  };

  return (
    <Container maxWidth='xs' className={classes.container}>
      <Paper className={classes.paper} elevation={12}>
        <Grid container spacing={4} justify='center'>
          <Grid item xs='auto'>
            <Grid container spacing={2} justify='center'>
              <Grid item xs='auto'>
                <Avatar className={classes.icon} classes={{ colorDefault: classes.iconBgColor }}>
                  <DashboardIcon color='primary' fontSize='large' />
                </Avatar>
              </Grid>
              <Grid item xs={10}>
                <Typography variant='h5' align='center' component='h1'>
                  联创团队
                </Typography>
                <Typography variant='subtitle1' align='center'>
                  招新选手 Dashboard
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Input
              fullWidth
              id='phone'
              placeholder='手机号码'
              type='tel'
              inputProps={{ maxLength: 11 }}
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              id='verification_code'
              placeholder='验证码'
              fullWidth
              inputProps={{ maxLength: 4 }}
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button color='primary' fullWidth onClick={handleSendCode}>
              {countdown.send ? `${countdown.time}s` : matchMedia ? '验证码' : '获取验证码'}
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Button variant='contained' color='primary' fullWidth onClick={handleLogin}>
              {login ? <CircularProgress size={24} classes={{ colorPrimary: classes.buttonProgress }} /> : '登陆'}
            </Button>
          </Grid>

          <Grid item xs={10}>
            <Typography variant='caption' color='textSecondary'>
              请输入在报名时填写的手机号，如果您还没有报名，可以前往
              <Link href='https://join.hustunique.com'>联创招新报名网站</Link>报名
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
