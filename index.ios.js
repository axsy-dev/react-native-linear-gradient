/**
 * @providesModule LinearGradient
 * @flow
 */
import React, { Component } from 'react';
import { processColor, requireNativeComponent, View } from 'react-native';
import PropTypes from 'prop-types';

export default class LinearGradient extends Component {
  c: NativeLinearGradient;
  static propTypes = {
    start: PropTypes.arrayOf(PropTypes.number),
    end: PropTypes.arrayOf(PropTypes.number),
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    locations: PropTypes.arrayOf(PropTypes.number),
    ...View.propTypes,
  };

  setNativeProps(props: Object) {
    this.c.setNativeProps(props);
  }

  render() {
    const {
      colors,
      locations,
      ...otherProps
    } = this.props;
    if ((colors && locations) && (colors.length !== locations.length)) {
      console.warn('LinearGradient colors and locations props should be arrays of the same length');
    }

    return (
      <NativeLinearGradient
        ref={(c) => { this.c = c; }}
        {...otherProps}
        colors={colors.map(processColor)}
        locations={locations ? locations.slice(0, colors.length) : null}
      />
    );
  }
}

const NativeLinearGradient = requireNativeComponent('BVLinearGradient', null);
