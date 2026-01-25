/*
#######################################################################
#
# Copyright (C) 2020-2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/
import {it} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from '../App';

it('Shows JSON Tree', () => {
  render(<App />);
  screen.getByLabelText('JSON Tree');
});

