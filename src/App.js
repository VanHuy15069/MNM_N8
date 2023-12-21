import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRouter, userRouter, adminRouter } from './routes';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import { Fragment } from 'react';
import AdminLayout from './layout/AdminLayout/AdminLayout';
function App() {
    const user = JSON.parse(localStorage.getItem('user'));
    // const [, setIsLogin] = useContext(Context);
    let admin = false;
    if (user) {
        admin = user.isAdmin;
    }
    return (
        <div className="App">
            <Routes>
                {publicRouter.map((route, index) => {
                    const Layout = route.layout === null ? Fragment : DefaultLayout;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {userRouter.map((route, index) => {
                    const Layout = route.layout === null ? Fragment : DefaultLayout;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                user ? (
                                    <Layout>
                                        <Page />
                                    </Layout>
                                ) : (
                                    <Navigate to={'/login'} />
                                )
                            }
                        />
                    );
                })}
                {adminRouter.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                admin ? (
                                    <AdminLayout>
                                        <Page />
                                    </AdminLayout>
                                ) : (
                                    <Navigate to={'/login'} />
                                )
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
