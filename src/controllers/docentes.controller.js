const docentes = require('../../datos/docentes.json');
const httpStatusCodes = require('http2').constants;

const getAllDocentes = (req, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(docentes);
}

const getDocenteByLegajo = (req, res) => {
    const docente = docentes.find(d => d.legajo == req.params.legajo);
    if(docente)
        res.status(httpStatusCodes.HTTP_STATUS_OK).json(docente); 
    else
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND)
           .json({ mensaje: `El docente con legajo ${req.params.legajo} no fue encontrado`});    
}
 
const deleteDocenteByLegajo = (req, res) => {
    const index = docentes.findIndex(d => d.legajo == req.params.legajo);
    if(index >= 0) {
        const docente = docentes[index];
        docentes.splice(index, 1);
        res.status(httpStatusCodes.HTTP_STATUS_OK).json(
            {
                resultado: "La operación de borrado pudo realizarse con exito",
                docente : docente
            }
        );
    } else {
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json(
            {
                resultado: "La operación de borrado no pudo ser realizada",
                mensaje: `El docente con legajo ${req.params.legajo} no fue encontrado`
            }  
        );
    }
}

const createDocente = (req, res) => {
    const docenteData = req.body;
    const index = docentes.findIndex(d => d.legajo == docenteData.legajo);
    if(index == -1) {
        const errors = validateCreateDocente(docenteData);
        if(errors.length > 0) {
            res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST)
            .json({mensaje: `No puedo generar el docente, los siguientes atributos son obligatorios: ${errors}`});
        } else {
            docentes.push(docenteData);
            res.status(httpStatusCodes.HTTP_STATUS_CREATED)
               .json({mensaje: `El docente con legajo ${docenteData.legajo} fue creado correctamente`});
        }
    } else {
        res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST)
           .json({mensaje: `El docente con legajo ${docenteData.legajo} ya existe en la base de datos`});
    }
}

const updateDocente = (req, res) => {
    const docenteData = req.body;
    const index = docentes.findIndex(d => d.legajo == req.params.legajo);
    if(index != -1) {
        docentes[index].nombre = (typeof docenteData.nombre !== undefined) ? docenteData.nombre : docentes[index].nombre;
        docentes[index].carrera = (typeof docenteData.carrera !== undefined) ? docenteData.carrera : docentes[index].carrera;
        docentes[index].concursado = (typeof docenteData.concursado !== undefined) ? docenteData.concursado : docentes[index].concursado;
        docentes[index].materias = (typeof docenteData.materias !== undefined && docenteData.materias.length > 0) ? docenteData.materias : docentes[index].materias;
        res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({"docente": docentes[index]});
    } else {
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND)
           .json({
                resultado: "La operación de modicar no pudo ser realizada",
                mensaje: `El docente con legajo ${req.params.legajo} no fue encontrado`
            });
    }
}




const validateCreateDocente = (docenteData) => {
    const errors = [];
    const errorsMaterias = [];
    if (!docenteData.legajo)
        errors.push('legajo');
    
    if (!docenteData.nombre)
        errors.push('nombre');
    
    if (!docenteData.carrera)
        errors.push('carrera');
    
    if (!docenteData.concursado)
        errors.push('concursado');
    
    if (!docenteData.materias || docenteData.materias.length == 0)
        errors.push('materias');
    else {
        for(const materia of docenteData.materias) {
            if((!materia.codigo || !materia.descripcion)) {
                errors.push('[materias.codigo, materias.descripcion]');
                break;
            }
        }
     }
    return errors;
}


module.exports = { getAllDocentes, 
                   getDocenteByLegajo,
                   deleteDocenteByLegajo,
                   createDocente,
                   updateDocente};
