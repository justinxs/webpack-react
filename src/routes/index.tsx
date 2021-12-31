import type { RouteObject } from "react-router-dom";
import React from 'react';
import { useRoutes } from "react-router-dom";
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';

const asyncComponent = (loader: any) => {
    const DynamicComponent = React.lazy(loader);
    return (props: any) => (
        <React.Suspense fallback={<Loading />}>
            <DynamicComponent {...props} />
        </React.Suspense>
    );
};
const Home = asyncComponent(() => import('@/pages/Home'));
const Dashboard = asyncComponent(() => import('@/pages/dashboard/Index'));
const DashboardHome = asyncComponent(() => import('@/pages/dashboard/DashboardHome'));
const Invoices = asyncComponent(() => import('@/pages/invoices/Index'));
const About = asyncComponent(() => import('@/pages/About'));
const NotFound = asyncComponent(() => import('@/pages/NotFound'));

const createRouter = () => {
    let routes: RouteObject[] = [
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                {
                    path: "dashboard/*",
                    element: <Dashboard />,
                    children: [
                        { index: true, element: <DashboardHome /> },
                        { path: "invoices/:invoiceId", element: <Invoices /> }
                    ]
                },
                { path: "about", element: <About /> },
                { path: "*", element: <NotFound /> }
            ]
        }
    ];

    return useRoutes(routes);
};

export default createRouter;