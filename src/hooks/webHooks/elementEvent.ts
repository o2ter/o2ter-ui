//
//  elementEvent.ts
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
import React from 'react';
import { useStableRef } from 'sugax';

export function useDOMElementEvent(element: EventTarget, event: string, callback: (event: Event) => void) {

  const callbackRef = useStableRef(callback);

  React.useEffect(() => {
    if (!(element instanceof EventTarget)) return;
    const listener = (event: Event) => { if (_.isFunction(callbackRef.current)) callbackRef.current(event); };
    element.addEventListener(event, listener);
    return () => void element.removeEventListener(event, listener);
  }, [element, event]);
}

export const useWindowEvent = (event: string, callback: (event: Event) => void) => useDOMElementEvent(window, event, callback);
export const useDocumentEvent = (event: string, callback: (event: Event) => void) => useDOMElementEvent(document, event, callback);
