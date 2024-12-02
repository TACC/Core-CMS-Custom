// library.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AdminRegistrations } from 'apcd-components/Admin/Registrations';
import { ViewUsers } from 'apcd-components/Admin/ViewUsers';
import { AdminSubmissions } from 'apcd-components/Admin/Submissions';
import { AdminExtensions } from 'apcd-components/Admin/Extensions';
import { AdminExceptions } from 'apcd-components/Admin/Exceptions';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ViewSubmitterUsers } from 'apcd-components/Submitter/ViewSubmitterUsers';

const queryClient = new QueryClient();

function setupComponent(rootId: string, Component: React.ComponentType): void {
  const root = document.getElementById(rootId);
  if (root) {
    ReactDOM.render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </QueryClientProvider>,
      root
    );
  }
}

// Mapping of element IDs to components
const componentMap: { [key: string]: React.ComponentType<any> } = {
  'list-registrations-root': AdminRegistrations,
  'view-users-root': ViewUsers,
  'list-admin-submissions': AdminSubmissions,
  'admin-extensions-root': AdminExtensions,
  'admin-exceptions-root': AdminExceptions,
  'view-submitter-users-root': ViewSubmitterUsers,
  // Add new components with html id in the list above.
};

function setupApp(): void {
  Object.keys(componentMap).forEach((id) => {
    const elem = document.getElementById(id);
    if (elem) {
      setupComponent(id, componentMap[id]);
    }
  });
}

document.addEventListener('DOMContentLoaded', setupApp);
