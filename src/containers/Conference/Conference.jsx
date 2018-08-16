import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LargeVideo from '../../components/LargeVideo';
import RemoteVideosBox from '../../components/RemoteVideosBox';
import theme from './theme.css';

import ActionsBar from '../ActionBar';
import ToolBar from '../ToolBar';

const TOOLBAR_REVEAL_DISTANCE = 100;
const ACTIONSBAR_REVEAL_DISTANCE = 150;
const HIDE_CONTROLS_TIMEOUT = 2000;

class Conference extends PureComponent {
  static propTypes = {
    peers: PropTypes.array.isRequired,
    joinRoom: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  };

  state = {
    isControlsVisible: false,
  };

  componentWillMount() {
    this.props.joinRoom(this.props.params.roomId);
  }

  handleMouseMove = (event) => {
    this.isMouseNearToolBar_ = this.isMouseNearToolBar(event); // eslint-disable-line
    this.isMouseNearActionsBar_ = this.isMouseNearActionsBar(event); // eslint-disable-line

    if (this.isMouseNearToolBar_ || this.isMouseNearActionsBar_) { // eslint-disable-line
      this.setState({ isControlsVisible: true });
    }

    this.hideControlsAfterTimeout();
  };

  isMouseNearToolBar = event => (
    event.pageX < TOOLBAR_REVEAL_DISTANCE
  );

  isMouseNearActionsBar = event => (
    event.pageY > window.innerHeight - ACTIONSBAR_REVEAL_DISTANCE
  );

  hideControls = () => {
    if (this.isMouseNearToolBar_ || this.isMouseNearActionsBar_) { // eslint-disable-line
      return;
    }

    this.setState({ isControlsVisible: false });
  };

  hideControlsAfterTimeout = () => {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    }

    this.controlsTimeout = setTimeout(this.hideControls, HIDE_CONTROLS_TIMEOUT);
  };

  render() {
    const { peers } = this.props;
    const { isControlsVisible } = this.state;

    return (
      <div
        className={theme.conference}
        onMouseMove={this.handleMouseMove}
      >
        <LargeVideo streamId="me" />
        <RemoteVideosBox streamIds={peers} />
        <ToolBar isVisible={isControlsVisible} />
        <ActionsBar isVisible={isControlsVisible} />
      </div>
    );
  }
}

export default Conference;