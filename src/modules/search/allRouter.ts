import express from 'express';
import {filterData} from './filter'
import {notifications}  from './notification';
import {pagination} from './pagination'
import {searchLogic} from './search'
const router = express.Router();

// Route handler to set up database
router.get('/filter',filterData)
router.get('/', notifications);
router.get('/posts/:collectionName', pagination);
router.get('/search',searchLogic)

export default router;
