import * as React from 'react';
import {
  withStyles,
  StyleRulesCallback,
  Theme,
  WithStyles,
} from 'material-ui';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import Grid from 'src/components/Grid';
import IPAddress from 'src/features/linodes/LinodesLanding/IPAddress';
import { formatRegion } from 'src/features/linodes/presentation';

import { convertMegabytesTo } from 'src/utilities/convertMegabytesTo';

type ClassNames = 'root'
| 'title';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit * 3,
    paddingBottom: 20,
    marginTop: theme.spacing.unit * 2,
  },
  title: {
    marginBottom: theme.spacing.unit * 2,
  },
});

interface Props {
  nodeBalancer: Linode.ExtendedNodeBalancer;
}

type CombinedProps = Props & WithStyles<ClassNames>;

const SummaryPanel: React.StatelessComponent<CombinedProps> = (props) => {
  const { nodeBalancer, classes } = props;
  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="headline"
            className={classes.title}
            data-qa-title
          >
            Summary
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="caption"
            data-qa-hostname
          >
            <strong>Host Name:</strong> {nodeBalancer.hostname}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" data-qa-ports>
            <strong>
              Ports: </strong> {nodeBalancer.ports.length === 0 && 'None'}
              {nodeBalancer.ports.join(', ')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Typography variant="caption" data-qa-node-status>
            <strong>Node Status:</strong> {`${nodeBalancer.up} up, ${nodeBalancer.down} down`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Typography variant="caption" data-qa-transferred>
            <strong>Transferred:</strong> {convertMegabytesTo(nodeBalancer.transfer.total)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <IPAddress ips={[nodeBalancer.ipv4]} copyRight />
          {nodeBalancer.ipv6 && <IPAddress ips={[nodeBalancer.ipv6]} copyRight />}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" data-qa-region>
            {formatRegion(nodeBalancer.region)}
          </Typography>
        </Grid>
      </Grid>
    </Paper >
  );
};

const styled = withStyles(styles, { withTheme: true });

export default styled<Props>(SummaryPanel);

