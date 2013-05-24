# Geovedic

Visualización de la evolución de la distribución geográfica de los estudiantes de la Universidad del Desarrollo, entre los años 2000 y 2013.

## Conversión de Shapefiles a TopoJSON


    ogr2ogr -f GeoJSON -t_srs EPSG:4326 comunas.geojson division_comunal.shp


    topojson -p comuna=NOM_COM -p region=NOM_REG -p provincia=NOM_PROV -o comunas.topojson comunas.geojson


# References

Mapas Vectoriales
Biblioteca del Congreso Nacional de Chile
http://siit2.bcn.cl/mapas_vectoriales/index_html/

Let's Make a Map
Tutorial en D3 y TopoJSON
http://bost.ocks.org/mike/map/

Colorbrewer 2.0
Color Advice on Maps
http://colorbrewer2.org/
