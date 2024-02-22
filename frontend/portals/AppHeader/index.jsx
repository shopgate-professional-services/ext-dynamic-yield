import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import { sendRequests } from '../../config';

/**
 * AppHeader component with magic area
 * @returns {JSX}
 */
class AppHeader extends Component {
  static propTypes = {
    triggerTestRequests: PropTypes.func.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  /**
   * @inheritdoc
   */
  constructor(props) {
    super(props);
    /**
     * Timeout for the long touch logic that activates the test after user pressed
     * the header / logo for 5 seconds
     *
     * Logic adopted from ext-maintenance-mode
     * @link https://github.com/shopgate-professional-services/ext-maintenance-mode/blob/master/frontend/portals/MaintenanceMode/index.jsx
     */
    this.handleTouchTimeout = undefined;
  }

  /**
   * Handles touch start action.
   */
  handleTouchStart = () => {
    this.handleTouchTimeout = setTimeout(() => {
      this.props.triggerTestRequests();
    }, 5000);
  };

  /**
   * Handles touch end action.
   */
  handleTouchEnd = () => {
    clearTimeout(this.handleTouchTimeout);
  };

  /**
   * @returns {JSX}
   */
  render() {
    const { children } = this.props;

    // the magic area is not rendered if it is not needed
    if (sendRequests) {
      return children;
    }

    return (
      <div
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        {children}
      </div>
    );
  }
}

export default connect(AppHeader);
