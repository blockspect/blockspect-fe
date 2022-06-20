import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);

const Table = Loader(
  lazy(() => import('src/content/applications/DataTableMUI'))
);

const Blocks = Loader(
  lazy(() => import('src/content/applications/DataBlocks'))
);

const TokenTransfers = Loader(
  lazy(() => import('src/content/applications/TokenTransfers'))
)

const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

// tools

const Contracts = Loader(
  lazy(() => import('src/content/tools/smartContaracts'))
); 

const WhaleWatch = Loader(
  lazy(() => import('src/content/tools/WhaleWatch'))
)

const routes = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'tools',
        children: [
          {
            path: 'contracts',
            element: <Contracts />
          },
          {
            path: 'whalewatch',
            element: <WhaleWatch />
          },
        ]
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'eth',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="tasks" replace />
      },
      {
        path: 'address',
        element: <Crypto />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'table',
        element: <Table />
      },
      {
        path: 'blocks',
        element: <Blocks />
      },
      {
        path: 'tokentransfers',
        element: <TokenTransfers />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          }
        ]
      }
    ]
  }
];

export default routes;
