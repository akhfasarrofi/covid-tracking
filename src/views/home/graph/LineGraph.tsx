import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
  responsive: true,
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem: any, data: any) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value: any) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

const buildChartData = (data: any, casesType: string) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

type TProps = {
  casesType: string
}

const LineGraph: React.FC<TProps> = ({ casesType }) => {
  const [data, setData] = useState<object[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: 'rgba(204, 16, 52, 0.5)',
                borderColor: '#CC1034',
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
