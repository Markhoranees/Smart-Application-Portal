const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const auth = require('../middleware/auth');

// Protected routes
router.post('/upload', auth, documentController.uploadDocument);
router.get('/my-documents', auth, documentController.getUserDocuments);
router.get('/:id', auth, documentController.getDocument);
router.delete('/:id', auth, documentController.deleteDocument);

// Admin routes
router.patch('/:id/status', auth, documentController.updateDocumentStatus);

module.exports = router; 