# experimental COVID-19 comparison datasets
[![GitHub license](https://img.shields.io/badge/License-Creative%20Commons%20Zero%20v1.0%20Universal-blue)](https://github.com/christophmoar/covid-19/blob/master/LICENSE)
[![GitHub commit](https://img.shields.io/github/last-commit/christophmoar/covid-19)](https://github.com/christophmoar/covid-19/commits/master)

# charts
* Fullscreen covid-19 normalized chart (https://datawrapper.dwcdn.net/njNtn/)
* Fullscreen covid-19 doubling time chart (https://datawrapper.dwcdn.net/Zojai/)

* Normal size covid-19 normalized chart (https://www.datawrapper.de/_/njNtn/)
* Normal size covid-19 doubling time chart (https://www.datawrapper.de/_/Zojai/)

# chart snapshopts
![Current covid-19 normalized](https://github.com/christophmoar/covid-19/blob/master/image/njNtn-covid-19-normalized.png?raw=true)
![Current covid-19 doubling time](https://github.com/christophmoar/covid-19/blob/master/image/Zojai-covid-19-doubling-time.png?raw=true)

# datasets
* Current dataset (https://github.com/christophmoar/covid-19/blob/master/dataset-01/covid19-normalized.CSV)
* Current dataset without date index and population headers (https://github.com/christophmoar/covid-19/blob/master/dataset-01/covid19-normalized-noheader.CSV)

## dataset description
column name | description
----------- | -------------
n|new cases
t|total cases
nx|new cases, normalized to population=60.3m
tx|total cases, normalized to population=60.3m
q|growth rate: q=1+p/100
td|doubling time in days: td=ln(2)/ln(q)

To smooth out  single day spikes in testing and case numbers, we use a three-day rolling average for q in the doubling time computation.
