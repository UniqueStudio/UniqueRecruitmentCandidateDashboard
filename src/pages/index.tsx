import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { NextPage } from 'next';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'store';
import { setLayoutTitle } from 'store/component';
import RecruitmentInfo from 'components/RecruitmentInfo';
import Entry from 'components/Entry';
import type { EntryCardProps } from 'components/Entry/EntryCard';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(6, 10),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(6, 6),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6, 4),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4, 4),
    },
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  infoBar: {
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  title: {
    padding: theme.spacing(1, 2),
  },
}));

const entries: EntryCardProps[] = [
  {
    href: '/edit',
    icon: <EditIcon fontSize='large' color='action' />,
    describe: '修改信息',
  },
];

const Index: NextPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const recruitmentInfo = useAppSelector((state) => state.recruitment);

  useEffect(() => {
    dispatch(setLayoutTitle('首页'));
  }, [dispatch]);

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container spacing={3} className={classes.infoBar}>
        <Grid item xs={12} md={8} className={classes.info}>
          <div className={classes.title}>
            <Typography variant='h5' component='h1' paragraph>
              欢迎使用联创招新选手Dashboard
            </Typography>
            <Typography variant='subtitle1' paragraph>
              联创招新选手Dashboard是联创招新系统的补充部分，旨在为选手提供良好的招新状态信息获取平台。
              <br />
              目前大部分功能处于开发状态，如果在使用过程中有任何疑问，请通过招新FAQ群联系Web组负责人。
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4} className={classes.info}>
          <RecruitmentInfo {...recruitmentInfo} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Entry entries={entries} />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* 当前进度 */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
