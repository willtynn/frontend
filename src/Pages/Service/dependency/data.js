import * as d3 from "d3"

export const data = {
  invoked: [
    {
      id: "service_a",
      invoke_info: {
        time: "2023-07-24 16:00:00"
      }
    },
    {
      id: "service_b",
      invoke_info: {
        time: "2023-07-24 16:10:00"
      }
    }
  ],
  invoking: [
    {
      id: "service_c",
      invoke_info: {
        time: "2023-07-24 16:20:00"
      }
    },
    {
      id: "service_d",
      invoke_info: {
        time: "2023-07-24 16:30:00"
      }
    }
  ]
}

export const nodes = [
  {
    id: "1",
    label: "<h3>Node 1</h3>",
    labelType: "html",
    config: {
      style: 'fill: #afa; cursor: pointer'

    }
  },
  {
    id: "2",
    label: "<h3>Node 2</h3>",
    labelType: "html",
    config: {
      style: 'fill: #afa; cursor: pointer'
    }
  }
]
export const links = [
  {
    source: '1',
    target: '2',
    label: 'TO',
    config: {
      style: "stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;",
      arrowheadStyle: "fill: #f66",
      labelStyle: "cursor: pointer"
    }
  },
]

