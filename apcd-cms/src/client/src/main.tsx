// library.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AdminRegistrations } from './components/Admin/Registrations';
import { ViewUsers } from './components/Admin/ViewUsers';
import { AdminSubmissions } from './components/Admin/Submissions';
import { AdminExtensions } from './components/Admin/Extensions';
import { AdminExceptions } from './components/Admin/Exceptions';
import { SubmitterRegistrationList } from './components/Submitter/Registrations';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ExceptionForm } from './components/Submitter/Exceptions';
import { ExtensionRequestForm } from 'apcd-components/Submitter/Extensions';

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
  'list-submitter-registrations-root': SubmitterRegistrationList,
  'exception-submission-root': ExceptionForm,
  'extension-submission-root': ExtensionRequestForm,
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
