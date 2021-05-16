/*@cristian-ignore*/
import React, { useEffect, useState } from 'react';
import BaseChart from 'chart.js/auto';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const createGraph = (
  ctx: CanvasRenderingContext2D,
  data: number[],
  extras: any
) => {
  if (ctx) {
    return new BaseChart(ctx, {
      type: 'line',
      data: {
        labels: [...data],
        datasets: [
          {
            label: 'material',
            backgroundColor: extras.gradient,
            data: data,
            fill: true,
            lineTension: 0.35,
            pointRadius: 0,
          },
        ],
      },
      options: {
        animation: {
          duration: 0,
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: {
            display: false,
          },
          yAxes: {
            display: false,
            min: -1 * Math.max(...data.map(Math.abs)),
            max: Math.max(...data.map(Math.abs)),
          },
        },
        plugins: {
          legend: false,
        },
      },
    });
  }
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    graph: {
      width: '100%',
      height: '50px',
    },
  })
);

interface Props {
  data: number[];
}

export const Graph = (props: Props) => {
  const classes = useStyles();
  const graphRef = React.createRef<HTMLCanvasElement>();

  const [graph, setGraph] = useState({});

  useEffect(() => {
    if (graphRef.current && graph) {
      const ctx = graphRef.current.getContext('2d');
      if (ctx) {
        const start = {
          x: 0,
          y: 0,
        };
        const end = {
          x: 0,
          y: graphRef.current.clientHeight,
        };
        const gradient = ctx.createLinearGradient(
          start.x,
          start.y,
          end.x,
          end.y
        );
        gradient.addColorStop(0, 'rgba(237,210,203,1)');
        gradient.addColorStop(1, 'rgba(84, 60, 82, 1)');

        const currentGraph = createGraph(ctx, props.data, {
          gradient,
        });
        setGraph(currentGraph);
        return () => {
          currentGraph.destroy();
        };
      }
    }
  }, [props.data]);
  return <canvas ref={graphRef} className={classes.graph} />;
};
