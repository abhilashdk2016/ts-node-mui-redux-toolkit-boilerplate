import express from 'express';

import authentication from './authentication';
import users from './users';
import client from './client';
import general from './general';
import management from './management';
import sales from './sales';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  client(router);
  general(router);
  management(router);
  sales(router);

  return router;
};
