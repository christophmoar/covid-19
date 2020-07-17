#!/bin/bash

## get data from abaumg
##cd ../../covid19-bz-scraper && python3 scraper.py && cd -
##cp ../../covid19-bz-scraper/data/covid19_bz.csv ../dataset-01

## get data from simedia
##rm -f ../dataset-01/covid19_bz_detailed.csv
##rm -f ../dataset-01/covid19_bz_detailed.json
##wget -c "https://api.corona-bz.simedia.cloud/?format=json" -O ../dataset-01/covid19_bz_detailed.json
##python3 json_to_csv.py ../dataset-01/covid19_bz_detailed.json ../dataset-01/covid19_bz_detailed.csv
##rm -f ../dataset-01/covid19_bz_detailed.json

## get local data
cp ../dataset-01/covid19-normalized.CSV ../dataset-01/covid19-normalized-noheader.CSV
sed -i '1,2d' ../dataset-01/covid19-normalized-noheader.CSV

## update
/usr/bin/node ./update.js
