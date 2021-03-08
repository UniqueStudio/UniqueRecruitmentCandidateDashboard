import { ButtonBase, Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';
import { FC, useCallback, useState } from 'react';

export interface EntryCardProps {
  href: string;
  icon: React.ReactNode;
  describe: string;
  onClick?: () => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0, 2),
    '& button': {
      width: '100%',
      height: '100%',
    },
  },
  cardContent: {
    padding: theme.spacing(2, 2) + ' !important',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      margin: theme.spacing(1, 0),
    },
  },
}));

const EntryCard: FC<EntryCardProps> = ({ href, icon, describe, onClick }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const handleEnter = useCallback(() => setHover(true), []);
  const handleLeave = useCallback(() => setHover(false), []);
  return (
    <Link href={href}>
      <Card
        elevation={hover ? 6 : 2}
        className={classes.container}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={onClick}
      >
        <ButtonBase>
          <CardContent className={classes.cardContent}>
            {icon}
            <Typography variant='button' align='center'>
              {describe}
            </Typography>
          </CardContent>
        </ButtonBase>
      </Card>
    </Link>
  );
};

export default EntryCard;
