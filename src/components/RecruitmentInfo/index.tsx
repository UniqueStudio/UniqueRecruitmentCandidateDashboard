import { Card, CardContent, CardHeader, Link, makeStyles, Typography } from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';
import { Recruitment } from 'config/types';
import { FC, useMemo } from 'react';
import { convertToDate } from 'utils/timeConverter';
import { titleConverter } from 'utils/titleConverter';

export type RecruitmentInfoProps = Recruitment;

const useStyles = makeStyles((theme) => ({
  cardHeaderAvatar: {
    display: 'flex',
    alignItems: 'center',
  },
  cardContentContainer: {
    padding: theme.spacing(1, 3),
  },
}));

const RecruitmentInfo: FC<RecruitmentInfoProps> = (recruitmentInfo) => {
  const classes = useStyles();
  const info = useMemo(
    () => ({
      title: titleConverter(recruitmentInfo.title),
      begin: convertToDate(recruitmentInfo.begin),
      stop: convertToDate(recruitmentInfo.stop),
      end: convertToDate(recruitmentInfo.end),
    }),
    [recruitmentInfo],
  );

  return (
    <Card elevation={3}>
      <CardHeader
        avatar={<InfoIcon color='action' />}
        title={info.title ? `当前${info.title}已开启` : `当前还没有开启的招新`}
        titleTypographyProps={{ variant: 'subtitle1', component: 'h1' }}
        classes={{ avatar: classes.cardHeaderAvatar }}
      />
      <CardContent className={classes.cardContentContainer}>
        {info.title ? (
          <Typography variant='body2'>
            报名截止时间：{info.stop}
            <br />
            招新截止时间：{info.end}
            <br />
            报名地址：<Link href='https://join.hustunique.com'>join.hustunique.com</Link>
          </Typography>
        ) : (
          <Typography variant='body2'>
            联创团队的招新一般在每年的春季（秋季）学期开学后二至三周内开启，如无意外，每年的暑期会有夏令营招新。日常招新仍在筹备中。
            <br />
            如果有意向加入联创团队，可以在以上时间关注联创招新宣传。日常招新相关目前可咨询各组负责人。
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default RecruitmentInfo;
