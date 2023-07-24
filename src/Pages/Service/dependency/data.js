import * as d3 from "d3"
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

