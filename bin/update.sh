#!/bin/bash
cd ../../covid19-bz-scraper && python3 scraper.py && cd -
cp ../../covid19-bz-scraper/data/covid19_bz.csv ../dataset-01
cp ../dataset-01/covid19-normalized.CSV ../dataset-01/covid19-normalized-noheader.CSV
sed -i '1,2d' ../dataset-01/covid19-normalized-noheader.CSV
/usr/bin/node ./update.js
