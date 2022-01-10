import { Outlet } from "react-router-dom";
import React, { Suspense } from 'react';
import Footer from './Footer';
import './layout.less';
import { PageLoading } from '@ant-design/pro-layout';
import ErrorBoundary from '@/components/ErrorBoundary';


export default function Layout() {
    return (
        <section className="layout-container">
            <aside className="layout-sider">sider</aside>
            <div className="layout-main">
                <header className="layout-header">header</header>
                <main className="layout-content">
                    <ErrorBoundary>
                        <Suspense fallback={<PageLoading />}>
                            <Outlet />
                        </Suspense>
                    </ErrorBoundary>
                </main>
                <Footer />
            </div>
        </section>
    );
}