import App from './app';
import { votanteRoutes } from './routes/VotanteRoutes';

const app = new App([
    votanteRoutes
]);

app.listen();