# experimental COVID-19 comparison datasets
[![GitHub license](https://img.shields.io/badge/License-Creative%20Commons%20Zero%20v1.0%20Universal-blue)](https://github.com/christophmoar/covid-19/blob/master/LICENSE)
[![GitHub commit](https://img.shields.io/github/last-commit/christophmoar/covid-19)](https://github.com/christophmoar/covid-19/commits/master)

# charts
## normalized averaged timeseries
* Fullscreen interactive (https://datawrapper.dwcdn.net/4sti7/)
* Normal size interactive (https://www.datawrapper.de/_/4sti7/)
![Current covid-19 normalized averaged timeseries](https://github.com/christophmoar/covid-19/blob/master/image/4sti7-covid-19-normalized-averaged-timeseries.png?raw=true)

## normalized total cases
* Fullscreen interactive (https://datawrapper.dwcdn.net/njNtn/)
* Normal interactive(https://www.datawrapper.de/_/njNtn/)
![Current covid-19 normalized](https://github.com/christophmoar/covid-19/blob/master/image/njNtn-covid-19-normalized.png?raw=true)

## doubling time
* Fullscreen interactive (https://datawrapper.dwcdn.net/Zojai/)
* Normal size interactive (https://www.datawrapper.de/_/Zojai/)
![Current covid-19 doubling time](https://github.com/christophmoar/covid-19/blob/master/image/Zojai-covid-19-doubling-time.png?raw=true)

## südtirol data
* Fullscreen interactive(https://datawrapper.dwcdn.net/HWIBU/)
* Normal size interactive (https://www.datawrapper.de/_/HWIBU/)
![Current covid-19 südtirol](https://github.com/christophmoar/covid-19/blob/master/image/HWIBU-covid-19-s-dtirol.png?raw=true)

# datasets
* Current dataset (https://github.com/christophmoar/covid-19/blob/master/dataset-01/covid19-normalized.CSV)
* Current dataset without date index and population headers (https://github.com/christophmoar/covid-19/blob/master/dataset-01/covid19-normalized-noheader.CSV)
* Current südtirol dataset  (https://github.com/abaumg/covid19-bz-scraper/blob/master/data/covid19_bz.csv)
* Current normalized averaged timeseries dataset (https://github.com/christophmoar/covid-19/blob/master/dataset-01/covid19-normalized-timeseries.CSV)

## normalized dataset description
column name | description
----------- | -------------
n|new cases
t|total cases
nx|new cases, normalized to population=60.3m
tx|total cases, normalized to population=60.3m
q|daily growth rate: q=1+p/100
td|doubling time in days: td=ln(2)/ln(q)

To smooth out  single day spikes in testing and case numbers, we currently use a six-day averaging of the daily growth rate in the doubling time computation.
