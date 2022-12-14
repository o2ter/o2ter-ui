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
import { NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native';
import TextInput from '../../TextInput';
import { useField } from '../Form';
import { useTheme } from '../../../theme';
import { Modify } from '../../../internals/types';

type FormTextFieldProps = Modify<ComponentPropsWithoutRef<typeof TextInput>, {
  name: string | string[];
}>

export const FormTextField = React.forwardRef<ComponentRef<typeof TextInput>, FormTextFieldProps>(({
  name,
  style,
  ...props
}, forwardRef) => {

  const { value, error, touched, setTouched, onChange, submit } = useField(name);
  const theme = useTheme();

  const onEndEditing = React.useCallback((e: NativeSyntheticEvent<TextInputEndEditingEventData>) => { onChange(e.nativeEvent.text); setTouched(); }, []);

  return (
    <TextInput
      ref={forwardRef}
      value={value ?? ''}
      onChangeText={onChange}
      onEndEditing={onEndEditing}
      onSubmitEditing={submit}
      style={[
        theme.styles.formTextFieldStyle,
        !touched || _.isEmpty(error) ? {} : { borderColor: theme.themeColors.danger },
        !touched || _.isEmpty(error) ? {} : theme.styles.formTextFieldErrorStyle,
        style,
      ]}
      {...props} />
  );
});

export default FormTextField;