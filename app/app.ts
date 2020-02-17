import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { port } from './constants/config';
import router from './routes/routes';
import swaggerDocument from '../documentation/swagger.json';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.listen(port, () => console.log(`Example app listening on port localhost:${port}!`))