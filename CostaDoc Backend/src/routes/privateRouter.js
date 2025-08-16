import express from 'express';
import * as auth from '../middlewares/authMiddleware.js';
import * as dashboard from '../controllers/dashboard.js';

const router = express.Router();

router.get('/customers', auth.isUserLoggedIn, dashboard.getAllCustomers);
router.get('/properties', auth.isUserLoggedIn, dashboard.getAllProperties);
router.get('/customerSearch', auth.isUserLoggedIn, dashboard.getCustomersBySearch);
router.get('/propertySearch', auth.isUserLoggedIn, dashboard.getPropertyBySearch);
router.get('/customer', auth.isUserLoggedIn, dashboard.getCustomerById);
router.get('/property', auth.isUserLoggedIn, dashboard.getPropertyById);
router.put('/customer/:id', auth.isUserLoggedIn, dashboard.updateCustomer);
router.put('/property/:id', auth.isUserLoggedIn, dashboard.updateProperty);
router.delete('/customer/:id', auth.isUserLoggedIn, dashboard.deleteCustomer);
router.delete('/property/:id', auth.isUserLoggedIn, dashboard.deleteProperty);
router.post('/generateContract', auth.isUserLoggedIn, dashboard.generateContract);
router.get('/download/:file', dashboard.download);

export default router;