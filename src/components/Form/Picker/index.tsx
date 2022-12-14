//
//  index.tsx
//
//  The MIT License
//  Copyright (c) 2021 - 2023 O2ter Limited. All rights reserved.
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
import { useField } from '../Form';
import { useTheme } from '../../../theme';
import { Picker } from '../../Picker';
import { Modify } from '../../../internals/types';
import { useDefaultInputStyle } from '../../TextInput/style';

type FormPickerProps = Modify<ComponentPropsWithoutRef<typeof Picker>, {
  name: string | string[];
}>

export const FormPicker = React.forwardRef<ComponentRef<typeof Picker>, FormPickerProps>(({
  name,
  style,
  ...props
}, forwardRef) => {

  const { value, error, touched, setTouched, onChange } = useField(name);
  const theme = useTheme();
  const defaultStyle = useDefaultInputStyle(theme);

  const _onChange = React.useCallback((value: any) => { onChange(value); setTouched(); }, []);

  return (
    <Picker
      ref={forwardRef}
      value={value}
      onValueChange={_onChange}
      style={[
        defaultStyle,
        theme.styles.formPickerStyle,
        !touched || _.isEmpty(error) ? {} : { borderColor: theme.themeColors.danger },
        !touched || _.isEmpty(error) ? {} : theme.styles.formPickerErrorStyle,
        style,
      ]}
      {...props} />
  )
});

export default FormPicker;