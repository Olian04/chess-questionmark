import React, { useEffect, useState } from 'react';

import BaseChart from 'chart.js/auto';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      margin: theme.spacing(1),
      minHeight: '160px',
      position: 'relative',
      overflow: 'hidden',
    },
    wrapper: {
      position: 'absolute',
      top: 0,
      padding: theme.spacing(1),
    },
    chart: {
      margin: theme.spacing(-2),
    },
  })
);

const getChart = (
  ctx: CanvasRenderingContext2D,
  data: number[],
  extras: any
) => {
  const transformedData =
    data.length <= 2 ? [...Array(2).fill(data[0]), ...data] : data;
  if (ctx) {
    /*@ts-ignore */
    return new BaseChart(ctx, {
      type: 'line',
      data: {
        labels: [...Array(transformedData.length).keys()],
        datasets: [
          {
            label: 'rank',
            backgroundColor: extras.gradient,
            borderColor: 'rgba(237,210,203,0.5)',
            borderWidth: 1.5,
            data: transformedData,
            fill: true,
            lineTension: 0.35,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { right: -30 },
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: {
            display: false,
          },
          yAxes: {
            min: Math.max(...data) - 10,
            max: Math.max(...data) + 10,
            grid: {
              display: false,
            },
            ticks: {
              mirror: true,
              textStrokeWidth: 1,
              color: 'rgba(247,246,244,1)',
              textStrokeColor: 'rgba(63, 62, 67, 1)',
              z: 5,
              callback: (tick: any) => {
                /* lazy hack for aligning the ticks inside of the
                  chart without creating a padded area for the axis */
                return `${tick}       `;
              },
            },
            position: 'right',
            afterFit: (axis: any) => {
              axis.ticks = [axis.ticks[0], axis.ticks[axis.ticks.length - 1]];
              axis.paddingBottom = 18;
              axis.paddingTop = 18;
            },
          },
        },
        plugins: {
          legend: false,
        },
      },
    });
  }
};

interface Props {
  data: number[];
}

export const Chart = (props: Props) => {
  const classes = useStyles();
  const chartRef = React.createRef<HTMLCanvasElement>();

  const [chart, setChart] = useState({});

  useEffect(() => {
    if (chartRef.current && chart) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 160);
        gradient.addColorStop(0, 'rgba(237,210,203,1)');
        gradient.addColorStop(1, 'rgba(237,210,203,0)');

        const currentChart = getChart(ctx, props.data, { gradient });
        setChart(currentChart);
        return () => {
          currentChart.destroy();
        };
      }
    }
  }, [props.data]);

  return <canvas ref={chartRef} className={classes.chart} />;
};
