import { Card, CardContent, CardHeader, Grid, makeStyles } from '@material-ui/core';
import { Explore as ExploreIcon } from '@material-ui/icons';
import { FC } from 'react';
import EntryCard, { EntryCardProps } from './EntryCard';

export interface EntryProps {
  entries: EntryCardProps[];
}

const useStyles = makeStyles((theme) => ({
  cardHeaderAvatar: {
    display: 'flex',
    alignItems: 'center',
  },
  cardContentContainer: {
    padding: theme.spacing(1, 2, 4, 2) + ' !important',
  },
}));

const Entry: FC<EntryProps> = ({ entries }) => {
  const classes = useStyles();

  return (
    <Card elevation={3}>
      <CardHeader
        avatar={<ExploreIcon />}
        title='功能入口'
        titleTypographyProps={{ variant: 'subtitle1', component: 'h1' }}
        classes={{ avatar: classes.cardHeaderAvatar }}
      />
      <CardContent className={classes.cardContentContainer}>
        <Grid container spacing={4} justify='center' alignItems='center'>
          {entries.map((ent) => (
            <Grid item key={ent.href} xs={12} sm={6} xl={4}>
              <EntryCard {...ent} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Entry;
