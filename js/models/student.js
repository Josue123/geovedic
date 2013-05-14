
var app = app || {};

app.Student = Backbone.Model.extend({

    defaults: {
        order: 0,
        sede: '',
        carrera: {
            codigo: '',
            nombre: ''
        },
        ingreso: 0,
        promocion: 0,
        direccion_procedencia: {
            calle: '',
            comuna: '',
            ciudad: ''
        },
        direccion_actual: {
            calle: '',
            comuna: '',
            ciudad: ''
        },
        estado_academico: ''
    }

});
