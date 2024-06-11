// library.ts
import React from 'react';
import ReactDOM from 'react-dom';
import { AdminRegistrations } from './Admin/Registrations';
import { ViewUsers } from './Admin/ViewUsers';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function setupAdminRegistrations(): void {
  const root = document.getElementById('admin-registrations-root');
  if (root) {
    ReactDOM.render(
      <QueryClientProvider client={queryClient}>
        <AdminRegistrations />
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
        <ViewUsers />
      </QueryClientProvider>,
      root
    );
  }
}

setupAdminRegistrations();
setupViewUsers();
