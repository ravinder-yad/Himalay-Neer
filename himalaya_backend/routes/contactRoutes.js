const express = require('express');
const router = express.Router();
const { 
    submitContact, 
    getContacts, 
    updateContactStatus, 
    deleteContact 
} = require('../controllers/contactController');

router.route('/')
    .post(submitContact)
    .get(getContacts);

router.route('/:id')
    .put(updateContactStatus)
    .delete(deleteContact);

module.exports = router;
