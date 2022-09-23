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
import { Text, TextProps } from 'react-native';
import { LocalizationStrings } from 'sugax';
import { useField } from '../Form';
import { Modify } from '../../../internals/types';

import locales from '../locales';
const strings = LocalizationStrings(locales);

type FormErrorMessageProps = Modify<TextProps, {
  name: string | string[];
}>

export default React.forwardRef<Text, FormErrorMessageProps>(({
  name,
  ...props
}, forwardRef) => {

  const { error } = useField(name);
  const localize = strings.useLocalize();

  console.log(error)

  return (
    <React.Fragment>
      {!_.isNil(null) && <Text ref={forwardRef} {...props}></Text>}
    </React.Fragment>
  );
});
