const express = require('express');
const router = express.Router();
const docentesController = require('../controllers/docentes.controller');

router.get('/', docentesController.getAllDocentes);
router.get('/:legajo', docentesController.getDocenteByLegajo);
router.delete('/:legajo', docentesController.deleteDocenteByLegajo);
router.post('/', docentesController.createDocente);
router.put('/:legajo', docentesController.updateDocente);

module.exports = { router };