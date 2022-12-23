//
//  date.tsx
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
import React, { ComponentRef, ComponentPropsWithoutRef } from 'react';
import { TextProps } from 'react-native';
import { useTheme } from '../../theme';
import { Calendar } from '../Calendar';
import { PickerBase } from './picker';
import { Modify } from '../../internals/types';
import { useDefaultInputStyle } from '../TextInput/style';

type DatePickerBaseProps = Pick<ComponentPropsWithoutRef<typeof Calendar>, 'value' | 'min' | 'max' | 'multiple' | 'selectable' | 'onChange'>;
type DatePickerProps = Modify<TextProps, DatePickerBaseProps>;

export const DatePicker = React.forwardRef<ComponentRef<typeof PickerBase>, DatePickerProps>(({
  value,
  min,
  max,
  multiple,
  onChange,
  disabled = false,
  selectable = () => true,
  style,
  children,
  ...props
}, forwardRef) => {

  const theme = useTheme();
  const defaultStyle = useDefaultInputStyle(theme);

  const date = _.castArray(value ?? []).map(x => new Calendar.Date(x));

  return (
    <PickerBase
      ref={forwardRef}
      disabled={disabled}
      text={date.map(x => x.toString()).join(', ')}
      style={[
        defaultStyle,
        theme.styles.datePickerStyle, 
        style
      ]}
      picker={(
        <Calendar
          value={value}
          min={min}
          max={max}
          multiple={multiple}
          onChange={onChange}
          selectable={selectable}
          style={{
            width: '80%',
            maxWidth: 350,
            backgroundColor: 'white',
          }} />
      )}
      {...props} />
  )
});

export default DatePicker;