import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import ActionMenu, { Action } from 'src/components/ActionMenu/ActionMenu';

interface Props {
  nodeBalancerId: number;
  toggleDialog: (nodeBalancerId: number) => void;
}

type CombinedProps = Props & RouteComponentProps<{}>;

class NodeBalancerActionMenu extends React.Component<CombinedProps> {
  createLinodeActions = () => {
    const { nodeBalancerId, history, toggleDialog } = this.props;

    return function (closeMenu: Function): Action[] {
      const actions = [
        {
          title: 'Configurations',
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            history.push(`/nodebalancers/${nodeBalancerId}/configurations`);
            e.preventDefault();
            closeMenu();
          },
        },
        {
          title: 'Delete',
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            toggleDialog(nodeBalancerId);
            closeMenu();
          },
        },
      ];
      return actions;
    };
  }

  render() {
    return (
      <ActionMenu createActions={this.createLinodeActions()} />
    );
  }
}

export default withRouter(NodeBalancerActionMenu);
