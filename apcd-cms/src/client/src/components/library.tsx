// library.ts
import React from 'react';
import ReactDOM from 'react-dom';
import { AdminRegistrations } from './Admin/Registrations';
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

export { setupAdminRegistrations };
