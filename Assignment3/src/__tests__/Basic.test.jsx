/*
#######################################################################
#
# Copyright (C) 2025-2026 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/
import {it} from 'vitest';
import {render, screen} from '@testing-library/react';
import Tree from '../view/Tree';

it('Renders - Remove this test', () => {
  render(<Tree />);
  screen.getByText('Your Tree goes here (delete this div)');
});
