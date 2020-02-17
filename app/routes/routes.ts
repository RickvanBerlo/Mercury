import { RequestHandler, ErrorRequestHandler } from 'express';
import express from 'express';
const router = express.Router();

const test: RequestHandler = (req, res, next) => { res.send('Hello World!') };

router.route('/login')
    .get(test);

export default router;