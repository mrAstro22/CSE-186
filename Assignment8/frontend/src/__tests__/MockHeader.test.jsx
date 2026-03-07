import {render, screen} from './testHelpers';
import Header from '../view/Header';
import {it, expect} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import {LayoutContext} from '../App';
import {mockNavigate, mockContext} from './testHelpers';
import userEvent from '@testing-library/user-event';

const headerWrapper = () => (
  <MemoryRouter>
    <LayoutContext.Provider value={mockContext}>
      <Header />
    </LayoutContext.Provider>
  </MemoryRouter>
);

it('navigates home on avatar click', async () => {
  render(headerWrapper());

  const user = userEvent.setup();
  await user.click(screen.getByLabelText('go-home'));

  expect(mockNavigate).toHaveBeenCalledWith('/home');
});
