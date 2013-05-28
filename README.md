# Geovedic

Visualización de la evolución de la distribución geográfica de los estudiantes de la Universidad del Desarrollo, entre los años 2000 y 2013.

[Live Version](http://pnavarrc.github.io/geovedic/)

## Conversión de Shapefiles a TopoJSON


    ogr2ogr -f GeoJSON -t_srs EPSG:4326 comunas.geojson division_comunal.shp


    topojson -p comuna=NOM_COM -p region=NOM_REG -p provincia=NOM_PROV -o comunas.topojson comunas.geojson


# References

  * [Mapas Vectoriales. Biblioteca del Congreso Nacional)](http://siit2.bcn.cl/mapas_vectoriales/index_html/)
  * [Let's Make a Map](http://bost.ocks.org/mike/map/)
  * [Colorbrewer 2.0](http://colorbrewer2.org/)
  * [Jekyll](http://jekyllrb.com/)
