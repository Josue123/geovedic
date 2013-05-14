var app = app || {};


$(function() {
    var students = [
        {'carrera': {'codigo': '1500C', 'nombre': 'INGENIER\u00cdA CIVIL INDUSTRIAL'}, 'direccion_actual': {'calle': 'RAMON CARRASCO 208 LAS MONJAS', 'ciudad': 'CONCEPCION', 'comuna': 'CONCEPCION'}, 'direccion_procedencia': {'calle': 'RAMON CARRASCO 208 LAS MONJAS LO', 'ciudad': 'CONCEPCION', 'comuna': 'CONCEPCION'}, 'estado_academico': 'EGRESADO', 'ingreso': 2006, 'promocion': 2006, 'sede': 'CONCEPCION'},
        {'carrera': {'codigo': '1500C', 'nombre': 'INGENIER\u00cdA CIVIL INDUSTRIAL'}, 'direccion_actual': {'calle': 'JUAN VALIENTE 133 VILLA SAN PE', 'ciudad': 'CONCEPCION', 'comuna': 'SAN PEDRO DE LA PAZ'}, 'direccion_procedencia': {'calle': 'JUAN VALIENTE 133 VILLA SAN PEDR', 'ciudad': 'CONCEPCION', 'comuna': 'SAN PEDRO DE LA PAZ'}, 'estado_academico': 'EGRESADO', 'ingreso': 2007, 'promocion': 2007, 'sede': 'CONCEPCION'},
        {'carrera': {'codigo': '1500S', 'nombre': 'INGENIER\u00cdA CIVIL INDUSTRIAL'}, 'direccion_actual': {'calle': 'COLON 5444 DEPTO 801', 'ciudad': 'SANTIAGO', 'comuna': 'LAS CONDES'}, 'direccion_procedencia': {'calle': 'HUEQUEN 236 -PUERTO SAAVEDRA', 'ciudad': 'TALCAHUANO', 'comuna': 'TALCAHUANO'}, 'estado_academico': 'EGRESADO', 'ingreso': 2001, 'promocion': 1998, 'sede': 'SANTIAGO'},
        {'carrera': {'codigo': '1500C', 'nombre': 'INGENIER\u00cdA CIVIL INDUSTRIAL'}, 'direccion_actual': {'calle': 'LOS EUCALIPTUS 3528', 'ciudad': 'TALCAHUANO', 'comuna': 'TALCAHUANO'}, 'direccion_procedencia': {'calle': 'LOS EUCALIPTUS 3528', 'ciudad': 'TALCAHUANO', 'comuna': 'TALCAHUANO'}, 'estado_academico': 'ELIMINADO', 'ingreso': 2000, 'promocion': 1999, 'sede': 'CONCEPCION'},
        {'carrera': {'codigo': '1500C', 'nombre': 'INGENIER\u00cdA CIVIL INDUSTRIAL'}, 'direccion_actual': {'calle': 'RENGO 176 DPTO 502', 'ciudad': 'CONCEPCION', 'comuna': 'CONCEPCION'}, 'direccion_procedencia': {'calle': 'RENGO 176 DPTO 502', 'ciudad': 'CONCEPCION', 'comuna': 'CONCEPCION'}, 'estado_academico': 'ELIMINADO', 'ingreso': 2001, 'promocion': 2001, 'sede': 'CONCEPCION'},
        {'carrera': {'codigo': '1500C', 'nombre': 'INGENIER\u00cdA CIVIL INDUSTRIAL'}, 'direccion_actual': {'calle': 'ALCANTARA 979 DEPTO. 122', 'ciudad': 'SANTIAGO', 'comuna': 'LAS CONDES'}, 'direccion_procedencia': {'calle': 'AVDA. PRINCIPAL 417', 'ciudad': 'CONCEPCION', 'comuna': 'CHIGUAYANTE'}, 'estado_academico': 'ELIMINADO', 'ingreso': 2000, 'promocion': 1999, 'sede': 'CONCEPCION'}
    ];

    new app.StudentsView(students);
});