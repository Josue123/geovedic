# GeoVedic

Geocoding Application

## Data

The original excel file has the following fields:

    SEDE,
    CODCARPR,
    NOMBRE_CARRERA,
    codcli,
    año_ingreso,
    promocion_academica,
    COLEGIO,
    DIRPROC_ALUMNO
    ,CIUPROC_ALUMNO
    ,COMUNAPRO_ALUMNO,
    DIRACTUAL_ALUMNO,
    CIUDADACT_ALUMNO,
    COMUNA_ALUMNO,
    ESTADO ACAD. ACTUAL

The structure of the json file:

    sede
    carrera
        codigo
        nombre
    ingreso
    promocion
    direccion_procedencia
        calle
        ciudad
        comuna
    direccion_actual
        calle
        ciudad
        comuna
    estado_academico
