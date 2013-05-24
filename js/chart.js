var geovedic = geovedic || {};

geovedic.colorExtent = ['#FFFFCC', '#006837'];


geovedic.Legend = function() {
    'use strict';

    var selection;

    function chart(_selection) {
        selection = _selection;
        selection.each(function(data) {

            var items,
            div = d3.select(this),
            title = div.append('h5'),
            text = div.append('p').classed('legend-detail', true),
            ul = div.append('ul').classed('unstyled', true),
            colorScale = d3.scale.linear()
                .domain([0.1, d3.max(data, function(d) { return d.level; })])
                .range(geovedic.colorExtent);

            title.text('Leyenda'),
            text.text('El color de cada comuna representa el porcentaje de alumnos que vive ' +
                      'en esa comuna, respecto del total del año de ingreso correspondiente.');

            items = ul.selectAll('li')
                .data(data)
                .enter()
                .append('li');

            items.append('span')
                .classed('label', true)
                .text('_')
                .style('background-color', function(d) {
                    if (d.level === 0) { return '#fff'; }
                    return colorScale(d.level);
                })
                .style('color', function(d) {
                    if (d.level === 0) { return '#fff'; }
                    return colorScale(d.level);
                })
                .style('margin-right', '8px');

            items.append('text')
                .text(function(d) { return d.label; });
        });
    }

    return chart;
};


geovedic.SmallChlorophlet = function() {
    'use strict';

    var model,
    selection,
    width,
    height;

    function chart(_selection) {
        selection = _selection;
        selection.each(function(data) {

            // Compute the width of the container element
            width = parseInt(d3.select(this).style('width'), 10),
            height = width;

            // Create the svg element with the proper size
            var div = d3.select(this),
            svg = div.append('svg')
                .attr('width', width)
                .attr('height', height);

            // Add the map background
            svg.append('rect')
                .attr('width', width)
                .attr('height', height)
                .classed('map-bg', true);

            svg.append('g').classed('map', true);

            // Add a text for the year
            svg.append('text')
                .attr('x', 10)
                .attr('y', 20)
                .text(data);

            svg.append('rect')
                .classed('map-frame', true)
                .attr('width', width)
                .attr('height', height)
                .attr('fill-opacity', 0.0)
                .attr('stroke', '#bbb')
                .attr('stroke-width', 1);


        });
    }

    chart.update = function() {
        selection.each(function(year) {

            // Compute the width of the parent container
            width = parseInt(d3.select(this).style('width'), 10),
            height = width;

            var dataComuna = {},
            div = d3.select(this),
            svg = div.select('svg')
                .attr('width', width)
                .attr('height', height),
            map = svg.select('g.map'),
            countComuna = model.getCount(model.sede(), parseInt(year, 10));

            // Retrive the geographic features, configure the projection and create
            // the path generator
            var geodata = model.currentCommunes(),
            scale = geodata.scaleSmall,
            features = geodata.features,
            centroid = d3.geo.centroid(geodata),
            projection = d3.geo.mercator()
                .scale(scale)
                .center(centroid)
                .translate([width / 2, height / 2]),
            path = d3.geo.path()
                .projection(projection);

            // Resize the background
            svg.select('rect.map-bg')
                .attr('width', width)
                .attr('height', height);

            svg.select('rect.map-frame')
                .attr('width', width - 1)
                .attr('height', height - 1);


            // Add the count of each commune
            countComuna.forEach(function(d) {
                dataComuna[d.comuna] = d;
            });

            // Create the color scale
            var percColor = d3.scale.linear()
                .domain([0.0, 50.0])
                .range(geovedic.colorExtent);

            // Remove existing paths and draw the new ones
            map.selectAll('path').remove(),
            map.selectAll('path')
                .data(features)
                .enter()
                .append('path')
                    .attr('d', path)
                    .attr('fill', function(d) {
                        var color = '#fff',
                        nomComuna = d.properties.comuna.toLowerCase();
                        if (dataComuna.hasOwnProperty(nomComuna)) {
                            color = percColor(dataComuna[nomComuna].perc);
                        }
                        return color;
                    })
                    .classed('communes', true);

        });
    };

    chart.model = function(dataModel) {
        model = dataModel;
        this.listenTo(model, 'state:ready', chart.update),
        this.listenTo(model, 'change:sede', chart.update);
        return chart;
    };

    _.extend(chart, Backbone.Events);
    return chart;
};

geovedic.TimeLapse = function() {
    'use strict';

    var model,
    selection,
    width = 300,
    height = 400;

    function chart(_selection) {
        selection = _selection;
        selection.each(function() {
            // Update the width to use all the available space
            width = parseInt(d3.select(this).style('width'), 10);

            var div = d3.select(this),
            svg = div.append('svg')
                .attr('width', width)
                .attr('height', height),
            map = svg.append('g').classed('map', true);

            // Add the map background and a group for the labels
            map.append('rect')
                .attr('width', width)
                .attr('height', height)
                .classed('map-bg', true);

            map.append('text')
                .attr('x', 20)
                .attr('y', 40)
                .text(' ')
                .classed('timelapse-year', true);

            svg.append('g')
                .classed('labels', true);
        });
    }

    chart.updateSede = function() {
        selection.each(function() {

            // Compute the width of the parent container
            width = parseInt(d3.select(this).style('width'), 10);

            var div = d3.select(this),
            svg = div.select('svg').attr('width', width),
            map = svg.select('g.map');

            // Resize the background
            map.select('rect.map-bg')
                .attr('width', width);

            map.select('text.timelapse-year')
                .text(model.ingreso());

            var geodata = model.currentCommunes(),
            scale = geodata.scaleLarge,
            features = geodata.features,
            centroid = d3.geo.centroid(geodata),
            projection = d3.geo.mercator()
                .scale(scale)
                .center(centroid)
                .translate([width / 2, height / 2]),
            path = d3.geo.path()
                .projection(projection),
            dataComuna = {},
            countComuna = model.getCount(model.sede(), model.ingreso()),
            percColor = d3.scale.linear()
                .domain([0.0, 50.0])
                .range(geovedic.colorExtent);

            countComuna.forEach(function(d) {
                dataComuna[d.comuna] = d;
            });

            map.selectAll('path').remove();
            map.selectAll('path')
                .data(features)
                .enter()
                .append('path')
                    .attr('d', path)
                    .classed('communes', true)
                    .attr('fill', function(d) {
                        var color = '#fff',
                        nomComuna = d.properties.comuna.toLowerCase();
                        if (dataComuna.hasOwnProperty(nomComuna)) {
                            color = percColor(dataComuna[nomComuna].perc);
                        }
                        return color;
                    });

            var textProjection = d3.geo.mercator()
                .scale(scale)
                .center(centroid)
                .translate([width / 2, height / 2]),
            grpLabel = svg.select('g.labels');

            grpLabel.selectAll('text').remove(),
            grpLabel.selectAll('text')
                .data(features)
                .enter()
                .append('text')
                .attr('x', function(d) {
                    var _centroid = d3.geo.centroid(d);
                    return textProjection(_centroid)[0];
                })
                .attr('y', function(d) {
                    var _centroid = d3.geo.centroid(d);
                    return textProjection(_centroid)[1];
                })
                .text(function(d) { return d.properties.comuna; })
                .classed('place-label', true);

        });
    };

    chart.updateIngreso = function() {
        selection.each(function() {

            var div = d3.select(this),
            svg = div.select('svg'),
            map = svg.select('g.map'),
            dataComuna = {},
            countComuna = model.getCount(model.sede(), model.ingreso()),
            percColor = d3.scale.linear()
                .domain([0.0, 50.0])
                .range(geovedic.colorExtent);

            map.select('text.timelapse-year')
                .text(model.ingreso());

            countComuna.forEach(function(d) {
                dataComuna[d.comuna] = d;
            });

            map.selectAll('path.communes')
                .transition()
                .duration(2000)
                .attr('fill', function(d) {
                    var color = '#fff',
                    nomComuna = d.properties.comuna.toLowerCase();
                    if (dataComuna.hasOwnProperty(nomComuna)) {
                        color = percColor(dataComuna[nomComuna].perc);
                    }
                    return color;
                });

        });
    };

    chart.model = function(dataModel) {
        model = dataModel;
        this.listenTo(model, 'state:ready', chart.updateSede),
        this.listenTo(model, 'change:ingreso', chart.updateIngreso),
        this.listenTo(model, 'change:sede', chart.updateSede);
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) { return height; }
        height = value;
        return chart;
    };

    _.extend(chart, Backbone.Events);
    return chart;
};


geovedic.Player = function() {
    'use strict';

    var selection,
    domain,
    state = { id: 0, stop: true },
    duration = 5000,
    tickDuration = duration,
    margin = 10,
    slider = {
        width: 100,
        height: 6
    },
    handler = {
        height: 16,
        width: 12
    };

    function chart(_selection) {
        selection = _selection;
        selection.each(function() {

            var div = d3.select(this),
                ctl = div.append('div').classed('player-control', true),
                svg = div.append('div').classed('player-slider', true).append('svg'),
                bg = svg.append('rect').classed('player-bg', true),
                gslider = svg.append('g').classed('slider', true),
                handlerDrag = d3.behavior.drag();

            // CONTROLS

            // Play
            ctl.append('i').classed('icon-play', true)
                .on('click', function() {
                    if (state.stop) {
                        state.stop = false,
                        chart.play();
                    }
                });

            // Pause
            ctl.append('i'),
            ctl.append('i').classed('icon-pause', true)
                .on('click', function() {
                    if (!state.stop) {
                        state.stop = true;
                    }
                });

            // Replay
            ctl.append('i'),
            ctl.append('i').classed('icon-repeat', true)
                .on('click', function() {
                    state.stop = true;
                    state.id = 0;
                    chart.trigger('player:tick', {id: state.currentId, item: domain[state.id]});
                });

            // SLIDER

            // Slider Background
            gslider.append('rect').classed('slider-bg', true)
                .attr('y', -slider.height / 2)
                .attr('height', slider.height)
                .attr('rx', slider.height / 2)
                .attr('ry', slider.height / 2);

            // Slider foreground
            gslider.append('rect').classed('slider-fg', true)
                .attr('y', -slider.height / 2)
                .attr('height', slider.height)
                .attr('rx', slider.height / 2)
                .attr('ry', slider.height / 2);

            // Handler

            // Bind the drag behaviors
            handlerDrag
                .on('drag', chart.handlerMove)
                .on('dragend', chart.handlerRelease);

            // Draw the handler
            gslider.append('rect').classed('player-handler', true)
                .attr('x', -handler.width / 2)
                .attr('y', -handler.height / 2)
                .attr('width', handler.width)
                .attr('height', handler.height)
                .call(handlerDrag);

        });

        chart.on('player:tick', chart.update),
        chart.updateLayout();
    }

    chart.handlerMove = function() {
        selection.each(function() {

            var svg = d3.select(this).select('svg'),
            gslider = svg.select('g.slider'),
            rHandler = gslider.select('rect.player-handler'),
            rProgress = gslider.select('rect.slider-fg'),
            newpos = parseInt(rHandler.attr('x'), 10) + d3.event.dx;

            if ((0 < newpos) && (newpos < slider.width - handler.width / 2)) {
                rHandler.attr('x', newpos),
                rProgress.attr('width', newpos + slider.height / 2);
            }
        });
    };

    chart.handlerRelease = function() {
        selection.each(function() {
            var svg = d3.select(this).select('svg'),
            gslider = svg.select('g.slider'),
            rHandler = gslider.select('rect.player-handler'),
            pos = parseInt(rHandler.attr('x'), 10),
            posScale = d3.scale.linear()
                .domain([0, slider.width])
                .rangeRound([0, domain.length - 1]);

            state.id = posScale(pos);
            chart.trigger('player:tick', {id: state.currentId, item: domain[state.id]});
        });
    };

    chart.updateLayout = function() {
        selection.each(function() {

            var div = d3.select(this),
                ctl = div.select('div.player-control'),
                divslider = div.select('div.player-slider'),
                svg = divslider.select('svg'),
                gslider = svg.select('g.slider'),
                divHeight = parseInt(ctl.style('height'), 10),
                divPadding = parseInt(ctl.style('padding'), 10),
                height = divHeight + 2 * divPadding,
                width = parseInt(divslider.style('width'), 10);

            svg.attr('width', width)
                .attr('height', height);

            svg.select('rect.player-bg')
                .attr('width', width)
                .attr('height', height);

            slider.width = width - 2 * margin,
            gslider
                .attr('transform', 'translate(' + margin + ', ' + height / 2 + ')'),
            gslider.select('rect.slider-bg')
                .attr('width', slider.width),
            gslider.select('rect.slider-fg')
                .attr('width', slider.height);

        });
    };

    chart.update = function() {
        selection.each(function() {

            var div = d3.select(this),
                divslider = div.select('div.player-slider'),
                svg = divslider.select('svg'),
                gslider = svg.select('g.slider'),
                sliderScale = d3.scale.linear()
                    .domain(d3.extent(domain))
                    .range([0, slider.width]);

            gslider.select('rect.slider-fg')
                .attr('width', sliderScale(domain[state.id])),
            gslider.select('rect.player-handler')
                .attr('x', sliderScale(domain[state.id]) - handler.width / 2);
        });
    };

    chart.reset = function() {
        state.stop = true,
        state.id = 0;
        chart.update();
    };

    chart.play = function() {
        state.stop = state.stop || state.id > domain.length - 1;
        if (!state.stop) {
            chart.trigger('player:tick', {id: state.currentId, item: domain[state.id]}),
            state.id += 1,
            window.setTimeout(chart.play, tickDuration);
        }
    };

    chart.domain = function(value) {
        if (!arguments.length) { return domain; }
        domain = value,
        tickDuration = duration / domain.length;
        return chart;
    };

    chart.duration = function(value) {
        if (!arguments.length) { return duration; }
        duration = value,
        tickDuration = duration / domain.length;
        return chart;
    };

    _.extend(chart, Backbone.Events);
    return chart;
};

