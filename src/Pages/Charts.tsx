import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from "react-google-charts";
import { ALL_COUNTRY_DATA, DATE_CASES_DATA, WORLD_WIDE_DATA_CASES } from '../api/core';
import { isEmpty } from 'lodash';

const Charts = () => {
    const [barChartData, setBarChartData] = useState<any>([]);
    const [lineChartData, setLineChartData] = useState<any>([]);
    const [mapChartData, setMapChartData] = useState<any>([]);

    const fetchbarChartData = async () => {
        try {
            const response = await axios.get(WORLD_WIDE_DATA_CASES);
            const data = await response.data;
            const arr = Object.entries(data);
            arr.splice(0, 1);
            setBarChartData([
                ['Stats', 'Counts'],
                ...arr.slice(0, 6)
            ]);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchDatedCaesData = async () => {
        try {
            const response = await axios.get(DATE_CASES_DATA);
            const data = await response.data;
            const cases = Object.entries(data?.cases).slice(0, 240);
            const deaths = Object.entries(data?.deaths).slice(0, 240);
            const recovered = Object.entries(data?.recovered).slice(0, 240);
            const lineChartData = [];
            for (let i = 0; i < cases.length; i++) {
                const dateParts = cases[i][0].split("/");
                const formattedDate = new Date(Number(`20${dateParts[2]}`), parseInt(dateParts[0]) - 1, parseInt(dateParts[1])).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                });
                const ele = [formattedDate, cases[i][1], deaths[i][1], recovered[i][1]];
                lineChartData.push(ele);
            }
            setLineChartData([
                ["Dates", "Cases", "Deaths", "Recovered"],
                ...lineChartData.slice(39)
            ])
        } catch (err) {
            console.error(err);
        }
    };

    const fetchAllCountryData = async () => {
        try {
            const response = await axios.get(ALL_COUNTRY_DATA);
            const data = await response.data;
            const arr = data.map((item: any) => {
                return [item.country, item.cases, item.deaths]
            });
            console.log(arr);
            setMapChartData([
                ["Country", "Cases", "Deaths"],
                ...arr
            ])
        } catch (err) {
            console.error(err);
        }
    };

    const barChartOptions = {
        title: "",
        chartArea: { width: "50%" },
        hAxis: {
            title: "Numbers",
            minValue: 0,
        },
        vAxis: {
            title: "Stats",
        },
    };

    const LineChartoptions = {
        title: "",
        curveType: "function",
        legend: { position: "bottom" },
    };

    useEffect(() => {
        fetchbarChartData();
        fetchDatedCaesData();
        fetchAllCountryData();
    }, []);

    return (
        <div className='h-full'>
            <div className='w-full flex justify-between items-center mb-4 py-3'>
                <div>
                    <h1 className='text-lg md:text-2xl font-medium truncate'>Chart & Maps</h1>
                </div>
            </div>
            <hr className='py-2 md:py-5' />
            <div className="pb-8">
                {!isEmpty(barChartData) && (
                    <div>
                        <h1 className='text-sm md:text-xl font-medium my-4'>Global COVID-19 Statistics: Visualizing Cases, Deaths, and Recovered</h1>
                        <Chart
                            chartType='BarChart'
                            width="100%"
                            height="400px"
                            data={barChartData}
                            options={barChartOptions}
                        />
                    </div>
                )}
                {!isEmpty(lineChartData) && (
                    <div className="mt-10">
                        <h1 className='text-sm md:text-xl font-medium my-4'>COVID-19 Line diagrame form March - September 2020 : Cases, Deaths, and Recovered Statistics</h1>
                        <Chart
                            chartType='LineChart'
                            width="100%"
                            height="400px"
                            data={lineChartData}
                            options={LineChartoptions}
                        />
                    </div>

                )}
                {!isEmpty(mapChartData) && (
                    <div className="mt-10">
                        <h1 className='text-sm md:text-xl font-medium my-4'>COVID-19 Cases and Deaths by Country: A Geographical Representation</h1>
                        <Chart
                            chartType='GeoChart'
                            width="100%"
                            height="400px"
                            data={mapChartData}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Charts;