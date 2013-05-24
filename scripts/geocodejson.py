import argparse
import json
import requests

# Geocoding API Key

BING_API_KEY = 'Ak3fIBOy4-Rvs1b5QmmzPa4p6Y5eDjllP0mJMICMFKTJj3ezAr3trswmXcw_UFfD'
BING_API_URL = 'http://dev.virtualearth.net/REST/v1/Locations'

parameters = {
    'countryRegion': 'CL',
    'addressLine': '',
    'maxResults': '1',
    'key': BING_API_KEY
}


if __name__ == '__main__':

    # Read and parse the input arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('input', help='json file')
    args = parser.parse_args()

    item_list = json.load(open(args.input, 'r'))
    data = []

    for item in item_list:

        # Geocoding
        if 'address' not in item.keys():

            address = ', '.join(item['direccion_procedencia'].values())
            parameters['addressLine'] = address

            # Request the coordinates and formatted address using the Bing API
            req = requests.get(BING_API_URL, params=parameters)
            res = req.json()

            try:
                resource = res['resourceSets'][0]['resources'].pop()
                _address = resource['address']
                _coords = resource['point']['coordinates']

                geoaddress = {
                    'street': _address['addressLine'],
                    'comuna': _address['locality'],
                    'ciudad': _address['adminDistrict2'],
                    'region': _address['adminDistrict'],
                    'pais': _address['countryRegion'],
                    'full': _address['formattedAddress'],
                    'coordinates': {
                        'lng': _coords[1],
                        'lat': _coords[0]
                    },
                    'geocoded': True,
                    'confirmed': False
                }

                item['address'] = geoaddress
                print item['order'], geoaddress['full']
            except:
                pass

        print item['order']
        data.append(item)

    # Save the results to json
    json_file = open('data/demo.json', 'w')
    json.dump(data, json_file, sort_keys=True, indent=2)
    json_file.close()
