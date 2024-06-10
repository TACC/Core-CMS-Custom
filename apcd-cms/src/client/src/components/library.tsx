// library.ts
import React from 'react';
import ReactDOM from 'react-dom';
import { AdminRegistrations } from './Admin/Registrations';
import { ViewUsers } from './Admin/ViewUsers';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function setupAdminRegistrations(): void {
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <AdminRegistrations />
    </QueryClientProvider>,
    document.getElementById('react-root')
  );
}

function setupViewUsers(): void {
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <ViewUsers />
    </QueryClientProvider>,
    document.getElementById('react-root')
  );
}

export { setupAdminRegistrations, setupViewUsers };
