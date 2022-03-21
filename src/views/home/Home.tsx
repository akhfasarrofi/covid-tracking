import React, { useState, useEffect } from 'react';
import './Home.css';
import {
    MenuItem,
    FormControl,
    Select,
    Card,
    CardContent,
} from '@material-ui/core';
import InfoBox from '../home/infoBox/InfoBox';
import LineGraph from '../home/graph/LineGraph';
import Table from '../home/table/Table';
import { sortData, prettyPrintStat } from '../../lib/util';
import numeral from 'numeral';
import Map from '../home/map/Map';
import 'leaflet/dist/leaflet.css';
import death from '../../assets/death.jpg'
import health from '../../assets/health.png'
import covid from '../../assets/covid.png'

interface ICountry {
    country: string
}

const Home: React.FC = () => {
    const [country, setInputCountry] = useState<string>('Country');
    const [countryInfo, setCountryInfo] = useState<any>({});
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [mapCountries, setMapCountries] = useState<any>([]);
    const [tableData, setTableData] = useState<ICountry[]>([]);
    const [casesType, setCasesType] = useState<string>('cases');
    const [mapCenter, setMapCenter] = useState<object>({ lat: -6.200000, lng: 106.816666 });
    const [mapZoom, setMapZoom] = useState<number>(3);

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all')
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            });
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries')
                .then((response) => response.json())
                .then((data) => {
                    let sortedData: any = sortData(data);
                    setCountries(data);
                    setMapCountries(data);
                    setTableData(sortedData);
                });
        };

        getCountriesData();
    }, []);

    const onCountryChange = async (e: any) => {
        const countryCode = e.target.value;
        const url =
            countryCode === 'Country'
                ? 'https://disease.sh/v3/covid-19/all'
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setInputCountry(countryCode);
                setCountryInfo(data);
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            });
    };

    return (
        <div className="home">
            <div className="home__map">
                <div className="home__header">
                    <h2>Spread of Covid-19</h2>
                    <FormControl className="home__dropdown">
                        <Select
                            variant="outlined"
                            value={country}
                            onChange={onCountryChange}
                        >
                            <MenuItem value="Country">Country</MenuItem>
                            {countries.map((data: ICountry, idx: number) => (
                                <MenuItem key={idx} value={data.country}>{data.country}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="home__stats">
                    <InfoBox
                        onClick={() => setCasesType('cases')}
                        title="Coronavirus Cases"
                        isRed="isRed"
                        active={casesType === 'cases'}
                        cases={prettyPrintStat(countryInfo.todayDeaths)}
                        total={numeral(countryInfo.cases).format('0.0a')}
                        img={covid}
                    />
                    <InfoBox
                        onClick={() => setCasesType('recovered')}
                        title="Recovered"
                        active={casesType === 'recovered'}
                        cases={prettyPrintStat(countryInfo.todayRecovered)}
                        total={numeral(countryInfo.recovered).format('0.0a')}
                        isRed=""
                        img={health}
                    />
                    <InfoBox
                        onClick={() => setCasesType('deaths')}
                        title="Deaths"
                        isRed="isRed"
                        active={casesType === 'deaths'}
                        cases={prettyPrintStat(countryInfo.todayDeaths)}
                        total={numeral(countryInfo.deaths).format('0.0a')}
                        img={death}
                    />
                </div>
                <Map
                    countries={mapCountries}
                    casesType={casesType}
                    center={mapCenter}
                    zoom={mapZoom}
                />
            </div>
            <Card>
                <CardContent>
                    <div className="app__information">
                        <h3>Live Cases by Country</h3>
                        <Table countries={tableData} />
                        <h3>All new {casesType} in 3 Months</h3>
                    </div>
                </CardContent>
                <LineGraph casesType={casesType} />
            </Card>
        </div>
    );
};

export default Home;
