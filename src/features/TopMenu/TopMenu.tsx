import * as React from 'react';

import {
  withStyles,
  WithStyles,
  StyleRules,
} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import AddNewMenu from './AddNewMenu';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import UserNotificationMenu from './UserNotificationMenu';

type ClassNames = 'appBar'
  | 'navIconHide'
  | 'flex'
  | 'leftIcon'
  | 'toolbar';

const styles = (theme: Linode.Theme): StyleRules => ({
  root: {
    color: theme.palette.text.primary,
  },
  flex: {
    flex: 1,
  },
  appBar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.bg.white,
    position: 'relative',
    paddingRight: '0 !important',
  },
  toolbar: {
    minHeight: 64,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      minHeight: 80,
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
    },
  },
  navIconHide: {
    '& > span': {
      justifyContent: 'flex-start',
    },
    '& svg': {
      width: 32,
      height: 32,
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

interface Props {
  toggleSideMenu: () => void;
}

type PropsWithStyles = Props & WithStyles<ClassNames>;

class TopMenu extends React.Component<PropsWithStyles> {
  render() {
    const { classes, toggleSideMenu } = this.props;

    return (
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open menu"
            onClick={toggleSideMenu}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <AddNewMenu />
          <SearchBar />
          <UserMenu />
          <UserNotificationMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })<Props>(TopMenu);
