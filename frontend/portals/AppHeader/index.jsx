import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import { sendRequests } from '../../config';

/**
 * @returns {JSX}
 */
class AppHeader extends Component {
  static propTypes = {
    activateTestRequests: PropTypes.func.isRequired,
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
      // Activate the test requests after header / logo was pressed for 5 seconds
      this.props.activateTestRequests();
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

    // the magic area is not rendered if no test is needed
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
