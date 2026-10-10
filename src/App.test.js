import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('renders ResQ AI application and authentication screen', () => {
  render(<App />);
  const brandingElements = screen.getAllByText(/ResQ AI/i);
  expect(brandingElements.length).toBeGreaterThan(0);
  const loginButtons = screen.getAllByRole('button', { name: /log in/i });
  expect(loginButtons.length).toBeGreaterThan(0);
  expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
});

test('renders demo login button with username Dhruv', () => {
  render(<App />);
  const demoButton = screen.getByRole('button', { name: /demo login.*dhruv/i });
  expect(demoButton).toBeInTheDocument();
});

test('clicking demo login button logs in with username Dhruv', async () => {
  render(<App />);
  const demoButton = screen.getByRole('button', { name: /demo login.*dhruv/i });
  fireEvent.click(demoButton);
  await waitFor(() => {
    expect(screen.getByText('Dhruv')).toBeInTheDocument();
  }, { timeout: 2000 });
});

test('renders official ResQ AI brand logo image', () => {
  render(<App />);
  const logoImages = screen.getAllByRole('img', { name: /resq ai/i });
  expect(logoImages.length).toBeGreaterThan(0);
  expect(logoImages[0].getAttribute('src')).toMatch(/\/assets\/resq-ai-(logo|emblem)\.png/);
});

test('footer tagline on homepage does not repeat ResQ AI', async () => {
  render(<App />);
  const demoButton = screen.getByRole('button', { name: /demo login.*dhruv/i });
  fireEvent.click(demoButton);
  await waitFor(() => {
    expect(screen.getByText('Dhruv')).toBeInTheDocument();
  });
  const footerNote = screen.getByText(/Hold-to-SOS, offline first-aid, AI triage in 12\+ languages\./i);
  expect(footerNote).toBeInTheDocument();
  expect(footerNote.textContent).toBe('ResQ AI · Hold-to-SOS, offline first-aid, AI triage in 12+ languages.');
  expect(footerNote.textContent).not.toContain('ResQ AI · ResQ AI');
});




