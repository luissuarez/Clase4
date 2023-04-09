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

const createDocente = () => {
    
}


module.exports = { getAllDocentes, 
                   getDocenteByLegajo,
                   deleteDocenteByLegajo };
