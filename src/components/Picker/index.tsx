//
//  index.tsx
//
//  The MIT License
//  Copyright (c) 2021 - 2022 O2ter Limited. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

import _ from 'lodash';
import React from 'react';
import { StyleSheet, Platform, ViewStyle, TextStyle, StyleProp } from 'react-native';
import PickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import { Modify } from '../../internals/types';

type PickerProps = Partial<Modify<PickerSelectProps, {
  style: StyleProp<TextStyle>;
  containerStyle: StyleProp<ViewStyle>;
}>>

export const Picker = React.forwardRef<PickerSelect, PickerProps>(({
  items = [],
  style,
  containerStyle,
  onValueChange = () => {},
  ...props
}, forwardRef) => {

  const _style = StyleSheet.flatten(style);
  const _containerStyle = StyleSheet.flatten(containerStyle);
  
  return <PickerSelect
  ref={forwardRef}
  items={items}
  style={Platform.select({
    ios: {
      inputIOS: _style,
      inputIOSContainer: _containerStyle,
    },
    android: {
      inputAndroid: _style,
      inputAndroidContainer: _containerStyle,
    },
    web: {
      inputWeb: _style,
      viewContainer: _containerStyle,
    },
  })}
  onValueChange={onValueChange}
  {...props} />;
});

export default Picker;