// library.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AdminRegistrations } from './Admin/Registrations';
import { ViewUsers } from './Admin/ViewUsers';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function setupAdminRegistrations(): void {
  const root = document.getElementById('admin-registrations-root');
  if (root) {
    ReactDOM.render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AdminRegistrations />
        </BrowserRouter>
      </QueryClientProvider>,
      root
    );
  }
}

function setupViewUsers(): void {
  const root = document.getElementById('react-root');
  if (root) {
    ReactDOM.render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ViewUsers />
        </BrowserRouter>
      </QueryClientProvider>,
      root
    );
  }
}

setupAdminRegistrations();
setupViewUsers();
