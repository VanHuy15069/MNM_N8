import Home from '~/Pages/Home/Home';
import Singer from '~/Pages/Singer/Singer';
import Login from '~/Pages/Login/Login';
import NotFound from '~/Pages/404NotFound/404NotFound';
import Admin from '~/Pages/Admin/Admin';
import UserPage from '~/Pages/UserPage/UserPage';
import SingerMusic from '~/Pages/SingerMusic/SingerMusic';
import NewMusic from '~/Pages/NewMusic/NewMusic';
import Library from '~/Pages/Library/Library';
import SingerLibrary from '~/Pages/SingerLibrary/SingerLibrary';
import Category from '~/Pages/Category/Category';
import TopNewMusic from '~/Pages/TopNewMusic/TopNewMusic';
import CategoryItem from '~/Pages/CategoryItem/CategoryItem';
import TopicPage from '~/Pages/TopicPage/TopicPage';
import NationPage from '~/Pages/NationPage/NationPage';
import SearchPage from '~/Pages/SearchPage/SearchPage';
import MusicPage from '~/Pages/MusicPage/MusicPage';

export const publicRouter = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
    { path: '/error', component: NotFound, layout: null },
    { path: '/singer/:id', component: Singer },
    { path: '/singer/:id/song', component: SingerMusic },
    { path: '/newMusic', component: NewMusic },
    { path: '/category', component: Category },
    { path: '/rating', component: TopNewMusic },
    { path: '/category/:id', component: CategoryItem },
    { path: '/topic/:id', component: TopicPage },
    { path: '/nation/:id', component: NationPage },
    { path: '/search/:key', component: SearchPage },
    { path: '/song/:id', component: MusicPage },
    { path: '/admin', component: Admin },
];
export const userRouter = [
    { path: '/user', component: UserPage },
    { path: '/library', component: Library },
    { path: '/library/singer', component: SingerLibrary },
];
export const adminRouter = [{ path: '/admin', component: Admin }];
