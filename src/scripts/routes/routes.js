import Detail from '../views/pages/detail';
import Favorites from '../views/pages/favorite';
import Home from '../views/pages/home';

const routes = {
  '/': Home,
  '/favorite': Favorites,
  '/detail/:id': Detail,
};

export default routes;
