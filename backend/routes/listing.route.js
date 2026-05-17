import express from 'express';

import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
  getListingsAdmin,
  deleteListingAdmin,
} from '../controllers/listing.controller.js';

import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);

router.delete('/delete/:id', verifyToken, deleteListing);

router.post('/update/:id', verifyToken, updateListing);

router.get('/get/:id', getListing);

router.get('/get', getListings);

/* ADMIN ROUTES */

router.get(
  '/admin/listings',
  verifyToken,
  verifyAdmin,
  getListingsAdmin
);

router.delete(
  '/admin/delete/:id',
  verifyToken,
  verifyAdmin,
  deleteListingAdmin
);

export default router;