import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { LISH_ROOT } from '~/secrets';
import { lishToken } from '~/api/linodes';

function addCSSLink(url) {
  const head = window.document.querySelector('head');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  head.appendChild(link);
}

function addJSScript(url) {
  const head = window.document.querySelector('head');
  const script = document.createElement('script');
  script.src = url;
  head.appendChild(script);
}

export class Weblish extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      renderingLish: false,
    };

    addCSSLink('/assets/weblish/weblish-fonts.css');
    addCSSLink('/assets/weblish/weblish.css');
    addJSScript('/assets/weblish/xterm.js');
    addCSSLink('/assets/weblish/xterm.css');
  }

  componentWillMount() {
    this.connect();
  }

  async connect() {
    const { dispatch, params: { linodeId } } = this.props;
    const { lish_token: token } = await dispatch(lishToken(linodeId));
    const socket = new WebSocket(`${LISH_ROOT}:8181/${token}/weblish`);
    socket.addEventListener('open', () =>
      this.setState({ renderingLish: true }, this.renderTerminal(socket)));
  }

  renderTerminal(socket) {
    const terminal = new window.Terminal({
      cols: 120,
      rows: 32,
    });

    terminal.on('data', data =>
      socket.send(data));
    terminal.open(document.body);

    terminal.writeln('\x1b[32mLinode Lish Console\x1b[m');

    socket.addEventListener('message', evt =>
      terminal.write(evt.data));

    socket.addEventListener('close', () => {
      terminal.destroy();
      this.setState({ renderingLish: false });
    });
    window.terminal = terminal;
    window.document.title = 'Linode Lish Console';
  }

  render() {
    return this.state.renderingLish ? null : (
      <div>
        <div id="disconnected">
          <h2>Connection Lost</h2>
          <p>Lish appears to be temporarily unavailable.</p>
          <button onClick={() => this.connect()}>Reload &#x27f3;</button>
        </div>
      </div>
    );
  }
}

Weblish.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    linodeId: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(connect()(Weblish));