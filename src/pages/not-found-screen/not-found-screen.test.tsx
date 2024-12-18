import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundScreen from './not-found-screen';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundScreen />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();

    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('width', '81');
    expect(logo).toHaveAttribute('height', '41');

    const homeButton = screen.getByText('Go to homepage');
    expect(homeButton).toBeInTheDocument();
  });


  it('should have correct aria labels', () => {
    render(
      <MemoryRouter>
        <NotFoundScreen />
      </MemoryRouter>
    );

    const pinEmoji = screen.getByRole('img', { name: 'pin' });
    expect(pinEmoji).toBeInTheDocument();
    expect(pinEmoji).toHaveTextContent('📍');

    const homeEmoji = screen.getByRole('img', { name: 'home' });
    expect(homeEmoji).toBeInTheDocument();
    expect(homeEmoji).toHaveTextContent('🏠');
  });
});
