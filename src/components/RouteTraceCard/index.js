import React from 'react';

import './index.css';

import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
  } from "@mui/material"


export function RouteTraceCard() {
  const bull = <span>•</span>;

  return (
    <Card className="card">
      <CardContent>
        <Typography className="title" color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className="pos" color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}


