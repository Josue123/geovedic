
var geovedic = geovedic || {};

geovedic.Model = function() {
    'use strict';

    var state = { sede: 'santiago', ingreso: 2000 },
    currentStudents,
    currentCommunes,
    comunas,
    students,
    studentCount;

    function model() {}

    model.students = function(jsonUrl) {
        if (!arguments.length) { return students; }

        d3.json(jsonUrl, function(error, jsonData) {
            students = jsonData;
            if (comunas) { model.update(); }
        });

        return model;
    };

    model.comunas = function(jsonUrl) {
        if (!arguments.length) { return comunas; }

        d3.json(jsonUrl, function(error, data) {

            var mainFeature = topojson.feature(data, data.objects.comunas);

            comunas = {
                all: mainFeature,
                santiago: {
                    type: 'FeatureCollection',
                    scaleSmall: 20000,
                    scaleLarge: 52000,
                    features: mainFeature.features.filter(function(d) {
                        return d.properties.provincia === 'Santiago';
                    })
                },
                concepcion: {
                    type: 'FeatureCollection',
                    scaleSmall: 12000,
                    scaleLarge: 25000,
                    features: mainFeature.features.filter(function(d) {
                        return d.properties.provincia === 'Concepcion';
                    })
                }
            };

            if (students) { model.update(); }
        });

        return model;
    };

    model.currentStudents = function() {
        return currentStudents;
    };

    model.currentCommunes = function() {
        return currentCommunes;
    };

    model.currentYears = function() {
        return _.keys(studentCount[state.sede]).map(Number);
    };

    model.count = function() {

        var _bySede = _.groupBy(students, 'sede');
        studentCount = {};

        _.each(_bySede, function(_valuesSede, _sede) {
            var nomSede = _sede.toLowerCase(),
            _byIngreso = _.groupBy(_valuesSede, 'ingreso');
            studentCount[nomSede] = {},
            _.each(_byIngreso, function(_valuesIngreso, _ingreso) {

                var _totalByIngreso = _valuesIngreso.length,
                _byComuna = _.groupBy(_valuesIngreso, function(d) {
                    return d.direccion_procedencia.comuna.toLowerCase();
                });
                studentCount[nomSede][_ingreso] = [];
                _.each(_byComuna, function(_valuesComuna, _comuna) {
                    studentCount[nomSede][_ingreso].push({
                        comuna: _comuna,
                        count: _valuesComuna.length,
                        perc: 100.0 * _valuesComuna.length / _totalByIngreso
                    });
                });
            });
        });

    };

    model.getCount = function(sede, ingreso) {
        return studentCount[sede][ingreso];
    };

    model.update = function() {
        // Update the data of the application
        currentCommunes = comunas[state.sede],
        currentStudents = students.filter(function(d) {
            return d.sede.toLowerCase() === state.sede &&
                   d.ingreso === state.ingreso;
        });

        // Compute the grouping count just once
        if (!studentCount) {
            model.count();
        }

        this.trigger('state:ready');
    };


    model.sede = function(value) {
        if (!arguments.length) { return state.sede; }
        state.sede = value,
        state.ingreso = Number(_.keys(studentCount[state.sede])[0]);
        model.update();
        this.trigger('change:sede', state);
    };

    model.ingreso = function(value) {
        if (!arguments.length) { return state.ingreso; }

        state.ingreso = value,
        model.update();
        this.trigger('change:ingreso', state);
    };

    // Add event support from backbone
    _.extend(model, Backbone.Events);
    return model;
};
