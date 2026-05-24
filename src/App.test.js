import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the storefront landing page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /crafted for pocket power/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /best deals/i })).toBeInTheDocument();
});
