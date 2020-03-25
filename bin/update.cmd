cp ../dataset-01/covid19-normalized.CSV ../dataset-01/covid19-normalized-noheader.CSV
sed -i '1,2d' ../dataset-01/covid19-normalized-noheader.CSV
node update.js

