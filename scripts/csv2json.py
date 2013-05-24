import argparse
import csv
import json


class CSVReader(object):

    def __init__(self, csvpath, mode='rU', delimiter=',', header=True):
        """Initialize the csv reader.

        """

        # Read the csv file and create the csv parser
        self.reader = csv.reader(open(csvpath, mode), delimiter=delimiter)
        self.order = 0

        # Skip the header line
        if header:
            self.reader.next()

    def __iter__(self):
        """Iterator interface

        """
        return self

    def next(self):
        """Read each field in the csv file and return the same data as a dict.

        """

        # Read the next record in the csv file and remove all the trailing
        # whitespaces
        row = map(lambda x: x.strip(), self.reader.next())
        self.order += 1
        # Create a dict with the desired data structure
        return {
            'order': self.order,
            'sede': row[0],
            'carrera': {'codigo': row[1], 'nombre': row[2]},
            'ingreso': int(row[4]),
            'direccion_procedencia': {'comuna': row[9]},
        }


if __name__ == '__main__':

    # Read and parse the input arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('input', help='input file')
    parser.add_argument('output', help='output json file')
    args = parser.parse_args()

    # Read and parse each line of the csv file, storing the records
    # as dict objects

    data = list()
    reader = CSVReader(args.input)

    for item in reader:
        data.append(item)

    # Save the processed data to json
    json_file = open(args.output, 'w')
    json.dump(data, json_file)
    json_file.close()
