import type { RouteObject } from "react-router-dom";
import React from 'react';
import { useRoutes } from "react-router-dom";
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import About from '@/pages/About';
import NoFoundPage from '@/pages/404';
import Login from '@/pages/user/Login';



const suspenseContainer = (Container: () => JSX.Element) => {
    type stateType = {
        hasError: boolean
    }
    interface ErrorBoundary {
        state: stateType
    }
    class ErrorBoundary extends React.Component {
        constructor(props: any) {
          super(props);
          this.state = { hasError: false };
        }
      
        static getDerivedStateFromError(error: Error) {
          // 更新 state 使下一次渲染能够显示降级后的 UI
          return { hasError: true };
        }
      
        componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
          // 你同样可以将错误日志上报给服务器
          console.log(error, errorInfo);
        }
      
        render() {
          if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return <h1>Something went wrong.</h1>;
          }
      
          return this.props.children; 
        }
    }

    return (props: any) => (
        <ErrorBoundary>
            <React.Suspense fallback={<Loading />}>
                <Container {...props} />
            </React.Suspense>
        </ErrorBoundary>
    );
};
const LayoutContainer = suspenseContainer(Layout);
const Home = React.lazy(() => import('@/pages/Home'));
const Dashboard = React.lazy(() => import('@/pages/dashboard/Index'));
const DashboardHome = React.lazy(() => import('@/pages/dashboard/DashboardHome'));
const Invoices = React.lazy(() => import('@/pages/invoices/Index'));

const createRouter = () => {
    let routes: RouteObject[] = [
        {
            path: "/",
            element: <LayoutContainer />,
            children: [
                { index: true, element: <Home /> },
                {
                    path: "dashboard/*",
                    element: <Dashboard />,
                    children: [
                        { index: true, element: <DashboardHome /> },
                        { path: "invoices/:invoiceId", element: <Invoices /> }
                    ]
                }
            ]
        },
        { path: "/user/login", element: <Login /> },
        { path: "/about", element: <About /> },
        { path: "*", element: <NoFoundPage /> }
    ];

    return useRoutes(routes);
};

export default createRouter;