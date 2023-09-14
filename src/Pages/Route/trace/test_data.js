export const test_service_data = `[
    {
        "service": "productpage.default",
        "api": "/productpage",
        "count": 100,
        "low": 16325,
        "percentile50": 60709,
        "percentile95": 67751,
        "percentile99": 69133,
        "high": 72398
    },
    {
        "service": "reviews.default",
        "api": "/reviews/0",
        "count": 94,
        "low": 16325,
        "percentile50": 60879,
        "percentile95": 67902,
        "percentile99": 72398,
        "high": 72398
    },
    {
        "service": "details.default",
        "api": "/details/0",
        "count": 94,
        "low": 16325,
        "percentile50": 60879,
        "percentile95": 67902,
        "percentile99": 72398,
        "high": 72398
    },
    {
        "service": "ratings.default",
        "api": "/ratings/0",
        "count": 60,
        "low": 25374,
        "percentile50": 62030,
        "percentile95": 68759,
        "percentile99": 72398,
        "high": 72398
    }
]`
export const test_detail_data = `{
    "edges": [
        {
            "start": "10.244.36.192",
            "end": "10.244.100.104",
            "info": "http://10.244.100.104:9080/productpage"
        },
        {
            "start": "10.244.100.104",
            "end": "10.244.100.103",
            "info": "http://details:9080/details/0"
        },
        {
            "start": "10.244.100.104",
            "end": "10.244.100.109",
            "info": "http://reviews:9080/reviews/0"
        },
        {
            "start": "10.244.100.109",
            "end": "10.244.100.69",
            "info": "http://ratings:9080/ratings/0"
        }
    ],
    "nodes": [
        {
            "ip": "10.244.36.192",
            "name": ""
        },
        {
            "ip": "10.244.100.69",
            "name": "ratings-v1-85cc46b6d4-z5lc8.default"
        },
        {
            "ip": "10.244.100.109",
            "name": "reviews-v2-cdd8fb88b-jswrn.default"
        },
        {
            "ip": "10.244.100.104",
            "name": "productpage-v1-7b4dbf9c75-mhx4r.default"
        },
        {
            "ip": "10.244.100.103",
            "name": "details-v1-7d4d9d5fcb-ff2qg.default"
        }
    ]
}`

export const test_data = `[
    {
        "id": 759,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:09.000+00:00",
        "trace": {
            "traceID": "7f00ac6317074d132fdc057f39e7cd05",
            "spans": [
                {
                    "traceID": "7f00ac6317074d132fdc057f39e7cd05",
                    "spanID": "2fdc057f39e7cd05",
                    "startTime": 1694412308961989,
                    "duration": 63571,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "7f00ac6317074d132fdc057f39e7cd05",
                    "spanID": "d9ff38d98b4ee107",
                    "startTime": 1694412308969129,
                    "duration": 43856,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "7f00ac6317074d132fdc057f39e7cd05",
                    "spanID": "d5879f6c93ad748a",
                    "startTime": 1694412308969440,
                    "duration": 43142,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "7f00ac6317074d132fdc057f39e7cd05",
                    "spanID": "23edc5850cc354bf",
                    "startTime": 1694412309016281,
                    "duration": 6276,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "7f00ac6317074d132fdc057f39e7cd05",
                    "spanID": "ed8be19709c8ffe7",
                    "startTime": 1694412309016695,
                    "duration": 5477,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "7f00ac6317074d132fdc057f39e7cd05",
                    "spanID": "42de3fd3d95623b5",
                    "startTime": 1694412309019160,
                    "duration": 1509,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "7f00ac6317074d132fdc057f39e7cd05",
                    "spanID": "9796e62209729cfb",
                    "startTime": 1694412309019497,
                    "duration": 743,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 760,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:08.000+00:00",
        "trace": {
            "traceID": "3636cfbbb0710cd198f12ca4934ff432",
            "spans": [
                {
                    "traceID": "3636cfbbb0710cd198f12ca4934ff432",
                    "spanID": "98f12ca4934ff432",
                    "startTime": 1694412308185122,
                    "duration": 72398,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "3636cfbbb0710cd198f12ca4934ff432",
                    "spanID": "b6dc3fd4444df0dc",
                    "startTime": 1694412308191675,
                    "duration": 49356,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "3636cfbbb0710cd198f12ca4934ff432",
                    "spanID": "4a8f5323469939e8",
                    "startTime": 1694412308192012,
                    "duration": 48584,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "3636cfbbb0710cd198f12ca4934ff432",
                    "spanID": "21b80a403bf7817b",
                    "startTime": 1694412308247185,
                    "duration": 7599,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "3636cfbbb0710cd198f12ca4934ff432",
                    "spanID": "6dd87196d7243ac8",
                    "startTime": 1694412308247516,
                    "duration": 6804,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "3636cfbbb0710cd198f12ca4934ff432",
                    "spanID": "05504f66db08e943",
                    "startTime": 1694412308250603,
                    "duration": 1938,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        }
                    ]
                },
                {
                    "traceID": "3636cfbbb0710cd198f12ca4934ff432",
                    "spanID": "e1e66395113c40d3",
                    "startTime": 1694412308250907,
                    "duration": 804,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 761,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:07.000+00:00",
        "trace": {
            "traceID": "f052f9b67ba13575233fbd9d9f910e30",
            "spans": [
                {
                    "traceID": "f052f9b67ba13575233fbd9d9f910e30",
                    "spanID": "233fbd9d9f910e30",
                    "startTime": 1694412307432249,
                    "duration": 63505,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "f052f9b67ba13575233fbd9d9f910e30",
                    "spanID": "71b71fc747f2e854",
                    "startTime": 1694412307436461,
                    "duration": 48588,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "f052f9b67ba13575233fbd9d9f910e30",
                    "spanID": "c40fb49bf75e9501",
                    "startTime": 1694412307436759,
                    "duration": 47959,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "f052f9b67ba13575233fbd9d9f910e30",
                    "spanID": "a7bc2197753f2608",
                    "startTime": 1694412307488357,
                    "duration": 5558,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "f052f9b67ba13575233fbd9d9f910e30",
                    "spanID": "e24f3d030bb23fa8",
                    "startTime": 1694412307488680,
                    "duration": 4856,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "f052f9b67ba13575233fbd9d9f910e30",
                    "spanID": "ad91f596cbe3a0f8",
                    "startTime": 1694412307491030,
                    "duration": 1464,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                },
                {
                    "traceID": "f052f9b67ba13575233fbd9d9f910e30",
                    "spanID": "8b47b2e8ecca8fd2",
                    "startTime": 1694412307491417,
                    "duration": 717,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 762,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:07.000+00:00",
        "trace": {
            "traceID": "c5ce8d4598075feb4e7740da409a69ff",
            "spans": [
                {
                    "traceID": "c5ce8d4598075feb4e7740da409a69ff",
                    "spanID": "4e7740da409a69ff",
                    "startTime": 1694412307281086,
                    "duration": 62212,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "c5ce8d4598075feb4e7740da409a69ff",
                    "spanID": "fe1f80c3c024127c",
                    "startTime": 1694412307285409,
                    "duration": 43555,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "c5ce8d4598075feb4e7740da409a69ff",
                    "spanID": "a20d27ff59fd9b9f",
                    "startTime": 1694412307285731,
                    "duration": 42878,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "c5ce8d4598075feb4e7740da409a69ff",
                    "spanID": "1ce84d1ffbee17bd",
                    "startTime": 1694412307335260,
                    "duration": 5556,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "c5ce8d4598075feb4e7740da409a69ff",
                    "spanID": "843a2fad3c12e87a",
                    "startTime": 1694412307335677,
                    "duration": 4795,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "c5ce8d4598075feb4e7740da409a69ff",
                    "spanID": "e267938c6c9c57b5",
                    "startTime": 1694412307338104,
                    "duration": 1381,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "c5ce8d4598075feb4e7740da409a69ff",
                    "spanID": "6b5c774d278c9011",
                    "startTime": 1694412307338427,
                    "duration": 730,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 763,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:13.000+00:00",
        "trace": {
            "traceID": "85468473fd794257dc857396a71ac3ab",
            "spans": [
                {
                    "traceID": "85468473fd794257dc857396a71ac3ab",
                    "spanID": "dc857396a71ac3ab",
                    "startTime": 1694412313444359,
                    "duration": 61368,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "85468473fd794257dc857396a71ac3ab",
                    "spanID": "ac4d21f54975bb39",
                    "startTime": 1694412313448639,
                    "duration": 44340,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "85468473fd794257dc857396a71ac3ab",
                    "spanID": "ec87a96e7362224b",
                    "startTime": 1694412313448911,
                    "duration": 43672,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "85468473fd794257dc857396a71ac3ab",
                    "spanID": "b013462476e7de6a",
                    "startTime": 1694412313496631,
                    "duration": 5664,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "85468473fd794257dc857396a71ac3ab",
                    "spanID": "3986f39ef62de7dc",
                    "startTime": 1694412313496952,
                    "duration": 4981,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "85468473fd794257dc857396a71ac3ab",
                    "spanID": "253d7cf51c2d899b",
                    "startTime": 1694412313499274,
                    "duration": 1563,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "85468473fd794257dc857396a71ac3ab",
                    "spanID": "0dabf05090f4ed27",
                    "startTime": 1694412313499679,
                    "duration": 809,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 764,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:13.000+00:00",
        "trace": {
            "traceID": "aff193c3d739777d230a1fa04264f5fd",
            "spans": [
                {
                    "traceID": "aff193c3d739777d230a1fa04264f5fd",
                    "spanID": "230a1fa04264f5fd",
                    "startTime": 1694412312921354,
                    "duration": 69037,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "aff193c3d739777d230a1fa04264f5fd",
                    "spanID": "2db9511fb00d2224",
                    "startTime": 1694412312926046,
                    "duration": 43046,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "aff193c3d739777d230a1fa04264f5fd",
                    "spanID": "e75c713a6cdf6fcf",
                    "startTime": 1694412312926393,
                    "duration": 42250,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "aff193c3d739777d230a1fa04264f5fd",
                    "spanID": "018e5b61a7c48d21",
                    "startTime": 1694412312976563,
                    "duration": 11174,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "aff193c3d739777d230a1fa04264f5fd",
                    "spanID": "95f49a272cbe9436",
                    "startTime": 1694412312980886,
                    "duration": 6421,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "aff193c3d739777d230a1fa04264f5fd",
                    "spanID": "7c423601a2418218",
                    "startTime": 1694412312984489,
                    "duration": 1636,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        }
                    ]
                },
                {
                    "traceID": "aff193c3d739777d230a1fa04264f5fd",
                    "spanID": "b1e86d8e8a163823",
                    "startTime": 1694412312984922,
                    "duration": 834,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 765,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "c476aabb79dace0ad2c5509562d350a9",
            "spans": [
                {
                    "traceID": "c476aabb79dace0ad2c5509562d350a9",
                    "spanID": "d2c5509562d350a9",
                    "startTime": 1694412312039040,
                    "duration": 59529,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        }
                    ]
                },
                {
                    "traceID": "c476aabb79dace0ad2c5509562d350a9",
                    "spanID": "1720b2d9110239af",
                    "startTime": 1694412312046385,
                    "duration": 43267,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "c476aabb79dace0ad2c5509562d350a9",
                    "spanID": "21acbaadc29628ef",
                    "startTime": 1694412312046708,
                    "duration": 41989,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        }
                    ]
                },
                {
                    "traceID": "c476aabb79dace0ad2c5509562d350a9",
                    "spanID": "01479166ffe4f229",
                    "startTime": 1694412312089507,
                    "duration": 1964,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "c476aabb79dace0ad2c5509562d350a9",
                    "spanID": "6e9d577ff538d7a9",
                    "startTime": 1694412312093293,
                    "duration": 2965,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 766,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:09.000+00:00",
        "trace": {
            "traceID": "c4e50e6d80f03870443d59cc6443553f",
            "spans": [
                {
                    "traceID": "c4e50e6d80f03870443d59cc6443553f",
                    "spanID": "443d59cc6443553f",
                    "startTime": 1694412309115459,
                    "duration": 60503,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "c4e50e6d80f03870443d59cc6443553f",
                    "spanID": "bacbf22367b9f59b",
                    "startTime": 1694412309119875,
                    "duration": 45128,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "c4e50e6d80f03870443d59cc6443553f",
                    "spanID": "83c00d9ccc3fb6cb",
                    "startTime": 1694412309120160,
                    "duration": 44439,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "c4e50e6d80f03870443d59cc6443553f",
                    "spanID": "d7ccc1f77aa6cea1",
                    "startTime": 1694412309168672,
                    "duration": 5283,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "c4e50e6d80f03870443d59cc6443553f",
                    "spanID": "b6043ed7ab479b7a",
                    "startTime": 1694412309169040,
                    "duration": 4607,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "c4e50e6d80f03870443d59cc6443553f",
                    "spanID": "34eecb86740a0372",
                    "startTime": 1694412309171339,
                    "duration": 1428,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "c4e50e6d80f03870443d59cc6443553f",
                    "spanID": "8e23d994390f4964",
                    "startTime": 1694412309171661,
                    "duration": 743,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 767,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:09.000+00:00",
        "trace": {
            "traceID": "b444c7524fb447cdfdc9ab111e90adbf",
            "spans": [
                {
                    "traceID": "b444c7524fb447cdfdc9ab111e90adbf",
                    "spanID": "fdc9ab111e90adbf",
                    "startTime": 1694412308723848,
                    "duration": 66485,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "b444c7524fb447cdfdc9ab111e90adbf",
                    "spanID": "dc2ac4a292eec95b",
                    "startTime": 1694412308728207,
                    "duration": 48777,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "b444c7524fb447cdfdc9ab111e90adbf",
                    "spanID": "9e70b6833b1173a0",
                    "startTime": 1694412308728483,
                    "duration": 48095,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "b444c7524fb447cdfdc9ab111e90adbf",
                    "spanID": "70ef7cf07879b428",
                    "startTime": 1694412308782120,
                    "duration": 6259,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "b444c7524fb447cdfdc9ab111e90adbf",
                    "spanID": "b6f54f7f1b648219",
                    "startTime": 1694412308782506,
                    "duration": 5483,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "b444c7524fb447cdfdc9ab111e90adbf",
                    "spanID": "55df8301b6299ace",
                    "startTime": 1694412308784969,
                    "duration": 2006,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "b444c7524fb447cdfdc9ab111e90adbf",
                    "spanID": "332fda428f72e15d",
                    "startTime": 1694412308785266,
                    "duration": 758,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 768,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:09.000+00:00",
        "trace": {
            "traceID": "69f02ef62ed239c1b50b8399ef0bc553",
            "spans": [
                {
                    "traceID": "69f02ef62ed239c1b50b8399ef0bc553",
                    "spanID": "b50b8399ef0bc553",
                    "startTime": 1694412308576818,
                    "duration": 58398,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "69f02ef62ed239c1b50b8399ef0bc553",
                    "spanID": "7e3388d452a9fe5a",
                    "startTime": 1694412308581310,
                    "duration": 43678,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "69f02ef62ed239c1b50b8399ef0bc553",
                    "spanID": "5b9e6251cb386a26",
                    "startTime": 1694412308581651,
                    "duration": 42970,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "69f02ef62ed239c1b50b8399ef0bc553",
                    "spanID": "f63356fb46293cab",
                    "startTime": 1694412308626080,
                    "duration": 1819,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "69f02ef62ed239c1b50b8399ef0bc553",
                    "spanID": "ed0d7e634487035f",
                    "startTime": 1694412308629746,
                    "duration": 2998,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 769,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:08.000+00:00",
        "trace": {
            "traceID": "92721086e688aa21c00c4328cf14e5e1",
            "spans": [
                {
                    "traceID": "92721086e688aa21c00c4328cf14e5e1",
                    "spanID": "c00c4328cf14e5e1",
                    "startTime": 1694412307581706,
                    "duration": 56391,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "92721086e688aa21c00c4328cf14e5e1",
                    "spanID": "05e81dae0cde269c",
                    "startTime": 1694412307586284,
                    "duration": 42619,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "92721086e688aa21c00c4328cf14e5e1",
                    "spanID": "fa723faabe8cbced",
                    "startTime": 1694412307586595,
                    "duration": 42004,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "92721086e688aa21c00c4328cf14e5e1",
                    "spanID": "eabf00fe1cacd51c",
                    "startTime": 1694412307628874,
                    "duration": 2147,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "92721086e688aa21c00c4328cf14e5e1",
                    "spanID": "70ac4afccf53e1d9",
                    "startTime": 1694412307632592,
                    "duration": 3248,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 770,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:13.000+00:00",
        "trace": {
            "traceID": "97c7c4e15d3b10df143fe871a29f314c",
            "spans": [
                {
                    "traceID": "97c7c4e15d3b10df143fe871a29f314c",
                    "spanID": "143fe871a29f314c",
                    "startTime": 1694412313368886,
                    "duration": 63530,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        }
                    ]
                },
                {
                    "traceID": "97c7c4e15d3b10df143fe871a29f314c",
                    "spanID": "a954fe776a5f744f",
                    "startTime": 1694412313373084,
                    "duration": 47905,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "97c7c4e15d3b10df143fe871a29f314c",
                    "spanID": "1a34c1b451a8e383",
                    "startTime": 1694412313373357,
                    "duration": 47249,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "97c7c4e15d3b10df143fe871a29f314c",
                    "spanID": "dd14885f0bd83f05",
                    "startTime": 1694412313424729,
                    "duration": 5720,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "97c7c4e15d3b10df143fe871a29f314c",
                    "spanID": "be149bb6004c49dd",
                    "startTime": 1694412313425079,
                    "duration": 5020,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "97c7c4e15d3b10df143fe871a29f314c",
                    "spanID": "570dbed71ed846e2",
                    "startTime": 1694412313427729,
                    "duration": 1441,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "97c7c4e15d3b10df143fe871a29f314c",
                    "spanID": "5581662ab084fc32",
                    "startTime": 1694412313428059,
                    "duration": 738,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 771,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:13.000+00:00",
        "trace": {
            "traceID": "4f7a906f52f99555af70fb76ce13b9eb",
            "spans": [
                {
                    "traceID": "4f7a906f52f99555af70fb76ce13b9eb",
                    "spanID": "af70fb76ce13b9eb",
                    "startTime": 1694412312629666,
                    "duration": 57460,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        }
                    ]
                },
                {
                    "traceID": "4f7a906f52f99555af70fb76ce13b9eb",
                    "spanID": "a65f302fa09b5520",
                    "startTime": 1694412312634415,
                    "duration": 42503,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "4f7a906f52f99555af70fb76ce13b9eb",
                    "spanID": "7da14bd89644577e",
                    "startTime": 1694412312634793,
                    "duration": 41787,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "4f7a906f52f99555af70fb76ce13b9eb",
                    "spanID": "f6526267a44c2540",
                    "startTime": 1694412312676665,
                    "duration": 2081,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "4f7a906f52f99555af70fb76ce13b9eb",
                    "spanID": "d9feda57f834c252",
                    "startTime": 1694412312680464,
                    "duration": 3186,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 772,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "037ad4a8187f9be93435037fe379bc93",
            "spans": [
                {
                    "traceID": "037ad4a8187f9be93435037fe379bc93",
                    "spanID": "3435037fe379bc93",
                    "startTime": 1694412310193602,
                    "duration": 59338,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 773,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:11.000+00:00",
        "trace": {
            "traceID": "7bff3d743fb290ad84e961843e98ae7b",
            "spans": [
                {
                    "traceID": "7bff3d743fb290ad84e961843e98ae7b",
                    "spanID": "84e961843e98ae7b",
                    "startTime": 1694412310569913,
                    "duration": 62903,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "7bff3d743fb290ad84e961843e98ae7b",
                    "spanID": "b02c854c80825b53",
                    "startTime": 1694412310574748,
                    "duration": 42921,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "7bff3d743fb290ad84e961843e98ae7b",
                    "spanID": "a33fd0ffd4e21eb7",
                    "startTime": 1694412310575032,
                    "duration": 41534,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "7bff3d743fb290ad84e961843e98ae7b",
                    "spanID": "0dfb4584958fd2af",
                    "startTime": 1694412310622511,
                    "duration": 6892,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "7bff3d743fb290ad84e961843e98ae7b",
                    "spanID": "cb76807b0363f8bb",
                    "startTime": 1694412310622833,
                    "duration": 5573,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "7bff3d743fb290ad84e961843e98ae7b",
                    "spanID": "179cfef4c12d24a3",
                    "startTime": 1694412310625487,
                    "duration": 1798,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "7bff3d743fb290ad84e961843e98ae7b",
                    "spanID": "9a1d5296662fe19e",
                    "startTime": 1694412310625852,
                    "duration": 1075,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 774,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "7254b679d7298589ec9911204e38e7aa",
            "spans": [
                {
                    "traceID": "7254b679d7298589ec9911204e38e7aa",
                    "spanID": "ec9911204e38e7aa",
                    "startTime": 1694412309971813,
                    "duration": 62235,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "7254b679d7298589ec9911204e38e7aa",
                    "spanID": "b392449df6b8c4e3",
                    "startTime": 1694412309976413,
                    "duration": 44612,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "7254b679d7298589ec9911204e38e7aa",
                    "spanID": "edf8f2328fd5343b",
                    "startTime": 1694412309976758,
                    "duration": 43857,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "7254b679d7298589ec9911204e38e7aa",
                    "spanID": "67e1fb9a7a8b90c4",
                    "startTime": 1694412310025222,
                    "duration": 6601,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "7254b679d7298589ec9911204e38e7aa",
                    "spanID": "88bd2bda87680d10",
                    "startTime": 1694412310025570,
                    "duration": 5807,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "7254b679d7298589ec9911204e38e7aa",
                    "spanID": "93049bb82d0612a4",
                    "startTime": 1694412310028000,
                    "duration": 1648,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "7254b679d7298589ec9911204e38e7aa",
                    "spanID": "23f75cf286d2ac30",
                    "startTime": 1694412310028341,
                    "duration": 896,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 775,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:07.000+00:00",
        "trace": {
            "traceID": "9ff5c7a94954a6aa0d8852f28c3cf029",
            "spans": [
                {
                    "traceID": "9ff5c7a94954a6aa0d8852f28c3cf029",
                    "spanID": "0d8852f28c3cf029",
                    "startTime": 1694412307133520,
                    "duration": 57729,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        }
                    ]
                },
                {
                    "traceID": "9ff5c7a94954a6aa0d8852f28c3cf029",
                    "spanID": "9a1ffb0398f105f8",
                    "startTime": 1694412307137553,
                    "duration": 43616,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "9ff5c7a94954a6aa0d8852f28c3cf029",
                    "spanID": "3410e110a24e272d",
                    "startTime": 1694412307137821,
                    "duration": 42997,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "9ff5c7a94954a6aa0d8852f28c3cf029",
                    "spanID": "d4655ee49781c79e",
                    "startTime": 1694412307182868,
                    "duration": 1935,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "9ff5c7a94954a6aa0d8852f28c3cf029",
                    "spanID": "43ad66d225b93e0b",
                    "startTime": 1694412307186470,
                    "duration": 3130,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 776,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:14.000+00:00",
        "trace": {
            "traceID": "a8c0cb0833d06618b0262ced3870dfbe",
            "spans": [
                {
                    "traceID": "a8c0cb0833d06618b0262ced3870dfbe",
                    "spanID": "b0262ced3870dfbe",
                    "startTime": 1694412313520875,
                    "duration": 64764,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "a8c0cb0833d06618b0262ced3870dfbe",
                    "spanID": "35ed8b694fbe7e72",
                    "startTime": 1694412313527631,
                    "duration": 45372,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "a8c0cb0833d06618b0262ced3870dfbe",
                    "spanID": "dd58aee557d6334a",
                    "startTime": 1694412313527920,
                    "duration": 44689,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "a8c0cb0833d06618b0262ced3870dfbe",
                    "spanID": "271a3e84b3adce34",
                    "startTime": 1694412313576490,
                    "duration": 6470,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "a8c0cb0833d06618b0262ced3870dfbe",
                    "spanID": "d4b5ca4d14a7a015",
                    "startTime": 1694412313576853,
                    "duration": 5236,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "a8c0cb0833d06618b0262ced3870dfbe",
                    "spanID": "4cc9f65a10c7e1e5",
                    "startTime": 1694412313579594,
                    "duration": 1461,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "a8c0cb0833d06618b0262ced3870dfbe",
                    "spanID": "b81743a8d06c28ad",
                    "startTime": 1694412313579958,
                    "duration": 754,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 777,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "cc8aab7408426ab73b6943de7c85d973",
            "spans": [
                {
                    "traceID": "cc8aab7408426ab73b6943de7c85d973",
                    "spanID": "3b6943de7c85d973",
                    "startTime": 1694412311964939,
                    "duration": 60494,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "cc8aab7408426ab73b6943de7c85d973",
                    "spanID": "42bef8b3b0bb7cd7",
                    "startTime": 1694412311969192,
                    "duration": 43811,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "cc8aab7408426ab73b6943de7c85d973",
                    "spanID": "4d8691afe1e25b14",
                    "startTime": 1694412311969479,
                    "duration": 43147,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "cc8aab7408426ab73b6943de7c85d973",
                    "spanID": "26df08d3e543e13d",
                    "startTime": 1694412312016692,
                    "duration": 6722,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "cc8aab7408426ab73b6943de7c85d973",
                    "spanID": "799316190e2e0ad3",
                    "startTime": 1694412312017056,
                    "duration": 5883,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "cc8aab7408426ab73b6943de7c85d973",
                    "spanID": "68b71541beb209f3",
                    "startTime": 1694412312020035,
                    "duration": 1610,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                },
                {
                    "traceID": "cc8aab7408426ab73b6943de7c85d973",
                    "spanID": "a088b902f24256ad",
                    "startTime": 1694412312020426,
                    "duration": 800,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 778,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "6bc1446170162a4c0b40cef564eb19b7",
            "spans": [
                {
                    "traceID": "6bc1446170162a4c0b40cef564eb19b7",
                    "spanID": "0b40cef564eb19b7",
                    "startTime": 1694412311522604,
                    "duration": 63178,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        }
                    ]
                },
                {
                    "traceID": "6bc1446170162a4c0b40cef564eb19b7",
                    "spanID": "56b1942770b7852f",
                    "startTime": 1694412311526709,
                    "duration": 42362,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "6bc1446170162a4c0b40cef564eb19b7",
                    "spanID": "45f6a0025a4bd00b",
                    "startTime": 1694412311526968,
                    "duration": 41682,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "6bc1446170162a4c0b40cef564eb19b7",
                    "spanID": "cd1995160b74bb14",
                    "startTime": 1694412311575101,
                    "duration": 7570,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "6bc1446170162a4c0b40cef564eb19b7",
                    "spanID": "66019904f0f179fb",
                    "startTime": 1694412311575478,
                    "duration": 6800,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "6bc1446170162a4c0b40cef564eb19b7",
                    "spanID": "8ee182ced2d31f03",
                    "startTime": 1694412311577929,
                    "duration": 2193,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                },
                {
                    "traceID": "6bc1446170162a4c0b40cef564eb19b7",
                    "spanID": "d7a2f90a12fcd737",
                    "startTime": 1694412311578292,
                    "duration": 873,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 779,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:11.000+00:00",
        "trace": {
            "traceID": "edbc68547d07ded99809512fbb836f80",
            "spans": [
                {
                    "traceID": "edbc68547d07ded99809512fbb836f80",
                    "spanID": "9809512fbb836f80",
                    "startTime": 1694412311149844,
                    "duration": 61430,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "edbc68547d07ded99809512fbb836f80",
                    "spanID": "1971fe10f7f585d1",
                    "startTime": 1694412311153981,
                    "duration": 42994,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "edbc68547d07ded99809512fbb836f80",
                    "spanID": "b6c9531e5c91f606",
                    "startTime": 1694412311154251,
                    "duration": 42328,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "edbc68547d07ded99809512fbb836f80",
                    "spanID": "f9f8fd6ecdcaf5f8",
                    "startTime": 1694412311201441,
                    "duration": 7413,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "edbc68547d07ded99809512fbb836f80",
                    "spanID": "5630726b0bcb1c42",
                    "startTime": 1694412311201772,
                    "duration": 6678,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "edbc68547d07ded99809512fbb836f80",
                    "spanID": "7cfb0602bdacbe0b",
                    "startTime": 1694412311204799,
                    "duration": 2332,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "edbc68547d07ded99809512fbb836f80",
                    "spanID": "ad993344ddb4ba9a",
                    "startTime": 1694412311205132,
                    "duration": 790,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 780,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:11.000+00:00",
        "trace": {
            "traceID": "26064e00fb522ae8ecb17def43fe6c34",
            "spans": [
                {
                    "traceID": "26064e00fb522ae8ecb17def43fe6c34",
                    "spanID": "ecb17def43fe6c34",
                    "startTime": 1694412311077340,
                    "duration": 57701,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "26064e00fb522ae8ecb17def43fe6c34",
                    "spanID": "26b3c4cea5a0a38a",
                    "startTime": 1694412311082728,
                    "duration": 42295,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "26064e00fb522ae8ecb17def43fe6c34",
                    "spanID": "78428f8f1e177997",
                    "startTime": 1694412311082995,
                    "duration": 41624,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        }
                    ]
                },
                {
                    "traceID": "26064e00fb522ae8ecb17def43fe6c34",
                    "spanID": "e484cac71646525b",
                    "startTime": 1694412311124772,
                    "duration": 1876,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "26064e00fb522ae8ecb17def43fe6c34",
                    "spanID": "fb532a1d28e9d93e",
                    "startTime": 1694412311128436,
                    "duration": 3828,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 781,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "054432a800cd2d8dbdef63b1046fa123",
            "spans": [
                {
                    "traceID": "054432a800cd2d8dbdef63b1046fa123",
                    "spanID": "bdef63b1046fa123",
                    "startTime": 1694412310049177,
                    "duration": 59475,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 782,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:09.000+00:00",
        "trace": {
            "traceID": "c0227de925422b0a298143640caff15d",
            "spans": [
                {
                    "traceID": "c0227de925422b0a298143640caff15d",
                    "spanID": "298143640caff15d",
                    "startTime": 1694412309041671,
                    "duration": 60144,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "c0227de925422b0a298143640caff15d",
                    "spanID": "000d324dee99db65",
                    "startTime": 1694412309045986,
                    "duration": 42997,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "c0227de925422b0a298143640caff15d",
                    "spanID": "9312cf301703abc1",
                    "startTime": 1694412309046299,
                    "duration": 42299,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "c0227de925422b0a298143640caff15d",
                    "spanID": "665e73cc32faaabd",
                    "startTime": 1694412309092708,
                    "duration": 6420,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "c0227de925422b0a298143640caff15d",
                    "spanID": "ff2f9acc12cd53ac",
                    "startTime": 1694412309093032,
                    "duration": 5654,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "c0227de925422b0a298143640caff15d",
                    "spanID": "c2d9ee004f94c0c1",
                    "startTime": 1694412309095501,
                    "duration": 1478,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "c0227de925422b0a298143640caff15d",
                    "spanID": "64cf7933a33bb44c",
                    "startTime": 1694412309095872,
                    "duration": 785,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 783,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:09.000+00:00",
        "trace": {
            "traceID": "72441292fb849692fb5e9e87c51bec61",
            "spans": [
                {
                    "traceID": "72441292fb849692fb5e9e87c51bec61",
                    "spanID": "fb5e9e87c51bec61",
                    "startTime": 1694412308884250,
                    "duration": 62609,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "72441292fb849692fb5e9e87c51bec61",
                    "spanID": "964fbe572400676c",
                    "startTime": 1694412308889548,
                    "duration": 48171,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "72441292fb849692fb5e9e87c51bec61",
                    "spanID": "27a9c5a1baccc7f4",
                    "startTime": 1694412308889837,
                    "duration": 46899,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "72441292fb849692fb5e9e87c51bec61",
                    "spanID": "1093ad8a2e30b75a",
                    "startTime": 1694412308937766,
                    "duration": 1885,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "72441292fb849692fb5e9e87c51bec61",
                    "spanID": "e6f417a33b7c965c",
                    "startTime": 1694412308941458,
                    "duration": 3601,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 784,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:14.000+00:00",
        "trace": {
            "traceID": "9d4564a0908e50a280972dd14020f848",
            "spans": [
                {
                    "traceID": "9d4564a0908e50a280972dd14020f848",
                    "spanID": "80972dd14020f848",
                    "startTime": 1694412313598061,
                    "duration": 58083,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "9d4564a0908e50a280972dd14020f848",
                    "spanID": "5cf291ff92e1b319",
                    "startTime": 1694412313602211,
                    "duration": 42926,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "9d4564a0908e50a280972dd14020f848",
                    "spanID": "647efe15d4bcb87a",
                    "startTime": 1694412313602476,
                    "duration": 42271,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "9d4564a0908e50a280972dd14020f848",
                    "spanID": "f702f1d898eebae0",
                    "startTime": 1694412313648591,
                    "duration": 5572,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "9d4564a0908e50a280972dd14020f848",
                    "spanID": "1181686c63b05f39",
                    "startTime": 1694412313648924,
                    "duration": 4913,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "9d4564a0908e50a280972dd14020f848",
                    "spanID": "05381d63fcaf2fd7",
                    "startTime": 1694412313651265,
                    "duration": 1583,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        }
                    ]
                },
                {
                    "traceID": "9d4564a0908e50a280972dd14020f848",
                    "spanID": "752a63116160f7a9",
                    "startTime": 1694412313651648,
                    "duration": 827,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 785,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:13.000+00:00",
        "trace": {
            "traceID": "cdbd260a0b141a89c7e14a32e7de8cb9",
            "spans": [
                {
                    "traceID": "cdbd260a0b141a89c7e14a32e7de8cb9",
                    "spanID": "c7e14a32e7de8cb9",
                    "startTime": 1694412313146419,
                    "duration": 55274,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "cdbd260a0b141a89c7e14a32e7de8cb9",
                    "spanID": "3d51bd33b782dd24",
                    "startTime": 1694412313150572,
                    "duration": 42532,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "cdbd260a0b141a89c7e14a32e7de8cb9",
                    "spanID": "adfe165b6f255823",
                    "startTime": 1694412313150900,
                    "duration": 41852,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "cdbd260a0b141a89c7e14a32e7de8cb9",
                    "spanID": "84748b70e28d3a1f",
                    "startTime": 1694412313192580,
                    "duration": 2136,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "cdbd260a0b141a89c7e14a32e7de8cb9",
                    "spanID": "fa7b93de4690b6aa",
                    "startTime": 1694412313196424,
                    "duration": 3115,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 786,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:13.000+00:00",
        "trace": {
            "traceID": "afe2af14d6b885f997f4afb883ce39d0",
            "spans": [
                {
                    "traceID": "afe2af14d6b885f997f4afb883ce39d0",
                    "spanID": "97f4afb883ce39d0",
                    "startTime": 1694412312849871,
                    "duration": 59604,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "afe2af14d6b885f997f4afb883ce39d0",
                    "spanID": "b847155cfd06d771",
                    "startTime": 1694412312854430,
                    "duration": 43125,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "afe2af14d6b885f997f4afb883ce39d0",
                    "spanID": "8fa000368ad78601",
                    "startTime": 1694412312854800,
                    "duration": 41805,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "afe2af14d6b885f997f4afb883ce39d0",
                    "spanID": "e39d3c6f41c6d389",
                    "startTime": 1694412312901038,
                    "duration": 6390,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "afe2af14d6b885f997f4afb883ce39d0",
                    "spanID": "f05ef7734b81ab10",
                    "startTime": 1694412312901336,
                    "duration": 5218,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "afe2af14d6b885f997f4afb883ce39d0",
                    "spanID": "54762237dd378e9b",
                    "startTime": 1694412312903931,
                    "duration": 1471,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "afe2af14d6b885f997f4afb883ce39d0",
                    "spanID": "f7e2adc4c0cafaa5",
                    "startTime": 1694412312904283,
                    "duration": 762,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 787,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:08.000+00:00",
        "trace": {
            "traceID": "1c05a345281f99fe5b6a1f4019a29896",
            "spans": [
                {
                    "traceID": "1c05a345281f99fe5b6a1f4019a29896",
                    "spanID": "5b6a1f4019a29896",
                    "startTime": 1694412308271834,
                    "duration": 61489,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "1c05a345281f99fe5b6a1f4019a29896",
                    "spanID": "7c9a1715d50dac2c",
                    "startTime": 1694412308276073,
                    "duration": 45062,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "1c05a345281f99fe5b6a1f4019a29896",
                    "spanID": "a3a145f93204a9a2",
                    "startTime": 1694412308276369,
                    "duration": 44404,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "1c05a345281f99fe5b6a1f4019a29896",
                    "spanID": "046352141d42cea6",
                    "startTime": 1694412308325442,
                    "duration": 5918,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "1c05a345281f99fe5b6a1f4019a29896",
                    "spanID": "8eb1219ce1f936b3",
                    "startTime": 1694412308325803,
                    "duration": 5185,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "1c05a345281f99fe5b6a1f4019a29896",
                    "spanID": "af18a0db9f42f9ce",
                    "startTime": 1694412308328112,
                    "duration": 1396,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "1c05a345281f99fe5b6a1f4019a29896",
                    "spanID": "f547845e34f1e6e1",
                    "startTime": 1694412308328436,
                    "duration": 685,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 788,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:08.000+00:00",
        "trace": {
            "traceID": "5086a40f089262094db221d7f78d55ac",
            "spans": [
                {
                    "traceID": "5086a40f089262094db221d7f78d55ac",
                    "spanID": "4db221d7f78d55ac",
                    "startTime": 1694412307510408,
                    "duration": 55988,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "5086a40f089262094db221d7f78d55ac",
                    "spanID": "3cd2fd481924d472",
                    "startTime": 1694412307514666,
                    "duration": 42357,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "5086a40f089262094db221d7f78d55ac",
                    "spanID": "ca6c4a248e2cd7c7",
                    "startTime": 1694412307514907,
                    "duration": 41730,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "5086a40f089262094db221d7f78d55ac",
                    "spanID": "7f21106d59b73791",
                    "startTime": 1694412307557771,
                    "duration": 2079,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "5086a40f089262094db221d7f78d55ac",
                    "spanID": "57d2cce1ea1773cb",
                    "startTime": 1694412307561418,
                    "duration": 3251,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 789,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "3081a2069b0d52e6b3c6cae5a170f42b",
            "spans": [
                {
                    "traceID": "3081a2069b0d52e6b3c6cae5a170f42b",
                    "spanID": "b3c6cae5a170f42b",
                    "startTime": 1694412312411288,
                    "duration": 60405,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "3081a2069b0d52e6b3c6cae5a170f42b",
                    "spanID": "5fb5fe12b9c6c0cb",
                    "startTime": 1694412312415766,
                    "duration": 45277,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "3081a2069b0d52e6b3c6cae5a170f42b",
                    "spanID": "ef1dd1e1362327fd",
                    "startTime": 1694412312416047,
                    "duration": 44571,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "3081a2069b0d52e6b3c6cae5a170f42b",
                    "spanID": "eb86461494930c72",
                    "startTime": 1694412312462267,
                    "duration": 1984,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "3081a2069b0d52e6b3c6cae5a170f42b",
                    "spanID": "6c65c36d4037f37d",
                    "startTime": 1694412312466012,
                    "duration": 3184,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 790,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:09.000+00:00",
        "trace": {
            "traceID": "e40fc314bd2ba7508a8222da00d97a5a",
            "spans": [
                {
                    "traceID": "e40fc314bd2ba7508a8222da00d97a5a",
                    "spanID": "8a8222da00d97a5a",
                    "startTime": 1694412309190432,
                    "duration": 58857,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "e40fc314bd2ba7508a8222da00d97a5a",
                    "spanID": "1e791c8f443f9b93",
                    "startTime": 1694412309195087,
                    "duration": 45828,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "e40fc314bd2ba7508a8222da00d97a5a",
                    "spanID": "4adf50b349dbe22f",
                    "startTime": 1694412309195397,
                    "duration": 45191,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "e40fc314bd2ba7508a8222da00d97a5a",
                    "spanID": "8c31afcafa5e32ce",
                    "startTime": 1694412309240863,
                    "duration": 1817,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "e40fc314bd2ba7508a8222da00d97a5a",
                    "spanID": "013c53e48c7f708d",
                    "startTime": 1694412309244512,
                    "duration": 2993,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 791,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:07.000+00:00",
        "trace": {
            "traceID": "166cc885f64eeef4b7a4dc2e4d4cc483",
            "spans": [
                {
                    "traceID": "166cc885f64eeef4b7a4dc2e4d4cc483",
                    "spanID": "b7a4dc2e4d4cc483",
                    "startTime": 1694412306683438,
                    "duration": 60563,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "166cc885f64eeef4b7a4dc2e4d4cc483",
                    "spanID": "aebb66a927763ef6",
                    "startTime": 1694412306687919,
                    "duration": 45154,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "166cc885f64eeef4b7a4dc2e4d4cc483",
                    "spanID": "1b268eb61e6d8ff3",
                    "startTime": 1694412306688172,
                    "duration": 44543,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "166cc885f64eeef4b7a4dc2e4d4cc483",
                    "spanID": "ec88a0411f085317",
                    "startTime": 1694412306736649,
                    "duration": 5563,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "166cc885f64eeef4b7a4dc2e4d4cc483",
                    "spanID": "c96cf84dcba91ba1",
                    "startTime": 1694412306736949,
                    "duration": 4855,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "166cc885f64eeef4b7a4dc2e4d4cc483",
                    "spanID": "1edf9414ac691b5c",
                    "startTime": 1694412306739364,
                    "duration": 1508,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "166cc885f64eeef4b7a4dc2e4d4cc483",
                    "spanID": "831589be89431cdc",
                    "startTime": 1694412306739748,
                    "duration": 777,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 792,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "9a3892cbfa01b0e2e2113a577a644802",
            "spans": [
                {
                    "traceID": "9a3892cbfa01b0e2e2113a577a644802",
                    "spanID": "e2113a577a644802",
                    "startTime": 1694412310494517,
                    "duration": 60879,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "9a3892cbfa01b0e2e2113a577a644802",
                    "spanID": "d013b0b0470157cb",
                    "startTime": 1694412310499917,
                    "duration": 45021,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "9a3892cbfa01b0e2e2113a577a644802",
                    "spanID": "126b3f0659b672d9",
                    "startTime": 1694412310500234,
                    "duration": 44336,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "9a3892cbfa01b0e2e2113a577a644802",
                    "spanID": "4fd8157a5ef0185e",
                    "startTime": 1694412310546908,
                    "duration": 1783,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "9a3892cbfa01b0e2e2113a577a644802",
                    "spanID": "c8e0b79b0433a210",
                    "startTime": 1694412310550733,
                    "duration": 2674,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 793,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "ffccff9b09e48e1aa92ea6bceedfa7f4",
            "spans": [
                {
                    "traceID": "ffccff9b09e48e1aa92ea6bceedfa7f4",
                    "spanID": "a92ea6bceedfa7f4",
                    "startTime": 1694412309737389,
                    "duration": 63811,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "ffccff9b09e48e1aa92ea6bceedfa7f4",
                    "spanID": "bf3ecc714eb2c206",
                    "startTime": 1694412309741420,
                    "duration": 47552,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "ffccff9b09e48e1aa92ea6bceedfa7f4",
                    "spanID": "46f842a5a3c4b958",
                    "startTime": 1694412309741687,
                    "duration": 46900,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "ffccff9b09e48e1aa92ea6bceedfa7f4",
                    "spanID": "6640013ba6d6f22f",
                    "startTime": 1694412309792993,
                    "duration": 6197,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "ffccff9b09e48e1aa92ea6bceedfa7f4",
                    "spanID": "dab5b52365536ec6",
                    "startTime": 1694412309793305,
                    "duration": 4986,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "ffccff9b09e48e1aa92ea6bceedfa7f4",
                    "spanID": "8679f530a833d0ba",
                    "startTime": 1694412309795760,
                    "duration": 1409,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "ffccff9b09e48e1aa92ea6bceedfa7f4",
                    "spanID": "0dc67560e39549dc",
                    "startTime": 1694412309796119,
                    "duration": 725,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 794,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:09.000+00:00",
        "trace": {
            "traceID": "1b15568ad1042f2a840e4108c824d4f0",
            "spans": [
                {
                    "traceID": "1b15568ad1042f2a840e4108c824d4f0",
                    "spanID": "840e4108c824d4f0",
                    "startTime": 1694412309345345,
                    "duration": 62868,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "1b15568ad1042f2a840e4108c824d4f0",
                    "spanID": "397ad8feae9a4eb7",
                    "startTime": 1694412309350329,
                    "duration": 42732,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "1b15568ad1042f2a840e4108c824d4f0",
                    "spanID": "7f589f2ebf4e2bbb",
                    "startTime": 1694412309350615,
                    "duration": 42011,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "1b15568ad1042f2a840e4108c824d4f0",
                    "spanID": "c851ddd419744dbf",
                    "startTime": 1694412309397692,
                    "duration": 7602,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "1b15568ad1042f2a840e4108c824d4f0",
                    "spanID": "c1b4c09135b2113e",
                    "startTime": 1694412309397997,
                    "duration": 6405,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "1b15568ad1042f2a840e4108c824d4f0",
                    "spanID": "a056aac9f2a8a9f0",
                    "startTime": 1694412309400660,
                    "duration": 2398,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "1b15568ad1042f2a840e4108c824d4f0",
                    "spanID": "a48dff576a9ac63c",
                    "startTime": 1694412309401022,
                    "duration": 759,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 795,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:09.000+00:00",
        "trace": {
            "traceID": "dac6c863996e629788e529d5dd86dfe4",
            "spans": [
                {
                    "traceID": "dac6c863996e629788e529d5dd86dfe4",
                    "spanID": "88e529d5dd86dfe4",
                    "startTime": 1694412308647339,
                    "duration": 62833,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "dac6c863996e629788e529d5dd86dfe4",
                    "spanID": "ec5712cb41ad5242",
                    "startTime": 1694412308651818,
                    "duration": 49145,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "dac6c863996e629788e529d5dd86dfe4",
                    "spanID": "48e3df8d10b768db",
                    "startTime": 1694412308652111,
                    "duration": 48477,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "dac6c863996e629788e529d5dd86dfe4",
                    "spanID": "2554174b024a0fc8",
                    "startTime": 1694412308701247,
                    "duration": 1488,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "dac6c863996e629788e529d5dd86dfe4",
                    "spanID": "4369cdfe6f5c9706",
                    "startTime": 1694412308704970,
                    "duration": 2753,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 796,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:08.000+00:00",
        "trace": {
            "traceID": "112d2d1c836da144e2d1e6b6ec264f15",
            "spans": [
                {
                    "traceID": "112d2d1c836da144e2d1e6b6ec264f15",
                    "spanID": "e2d1e6b6ec264f15",
                    "startTime": 1694412307874146,
                    "duration": 63145,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "112d2d1c836da144e2d1e6b6ec264f15",
                    "spanID": "0a43159ac5547421",
                    "startTime": 1694412307879001,
                    "duration": 46173,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "112d2d1c836da144e2d1e6b6ec264f15",
                    "spanID": "234ae7982dffb05a",
                    "startTime": 1694412307879336,
                    "duration": 45404,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "112d2d1c836da144e2d1e6b6ec264f15",
                    "spanID": "1d2a86155de3272c",
                    "startTime": 1694412307929027,
                    "duration": 5865,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "112d2d1c836da144e2d1e6b6ec264f15",
                    "spanID": "b7ae2b6a020f7acf",
                    "startTime": 1694412307929424,
                    "duration": 5131,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "112d2d1c836da144e2d1e6b6ec264f15",
                    "spanID": "4aa284ee40807511",
                    "startTime": 1694412307932181,
                    "duration": 1432,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "112d2d1c836da144e2d1e6b6ec264f15",
                    "spanID": "4b109125746c840e",
                    "startTime": 1694412307932550,
                    "duration": 712,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 797,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:14.000+00:00",
        "trace": {
            "traceID": "aac7c81a1164fd5ec4be58515d028559",
            "spans": [
                {
                    "traceID": "aac7c81a1164fd5ec4be58515d028559",
                    "spanID": "c4be58515d028559",
                    "startTime": 1694412313821188,
                    "duration": 65836,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "aac7c81a1164fd5ec4be58515d028559",
                    "spanID": "541e9a194962ee1b",
                    "startTime": 1694412313826712,
                    "duration": 50274,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "aac7c81a1164fd5ec4be58515d028559",
                    "spanID": "8b77abc4981964c6",
                    "startTime": 1694412313827048,
                    "duration": 49528,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "aac7c81a1164fd5ec4be58515d028559",
                    "spanID": "d5cd026d4d589121",
                    "startTime": 1694412313877309,
                    "duration": 1812,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "aac7c81a1164fd5ec4be58515d028559",
                    "spanID": "d19d54ab0029ea14",
                    "startTime": 1694412313880922,
                    "duration": 3613,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 798,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:13.000+00:00",
        "trace": {
            "traceID": "edff209ba620e7e3be74c3ee1889188b",
            "spans": [
                {
                    "traceID": "edff209ba620e7e3be74c3ee1889188b",
                    "spanID": "be74c3ee1889188b",
                    "startTime": 1694412312698781,
                    "duration": 59680,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "edff209ba620e7e3be74c3ee1889188b",
                    "spanID": "55148cb78dcd3849",
                    "startTime": 1694412312702997,
                    "duration": 46026,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "edff209ba620e7e3be74c3ee1889188b",
                    "spanID": "7cd3ab90a3d32bd3",
                    "startTime": 1694412312703269,
                    "duration": 45353,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "edff209ba620e7e3be74c3ee1889188b",
                    "spanID": "669fbff15fbf8930",
                    "startTime": 1694412312750248,
                    "duration": 1758,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "edff209ba620e7e3be74c3ee1889188b",
                    "spanID": "a02e8581292862a3",
                    "startTime": 1694412312753816,
                    "duration": 2890,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 799,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:11.000+00:00",
        "trace": {
            "traceID": "9a746a48c405e95e8e8bd5867d08143f",
            "spans": [
                {
                    "traceID": "9a746a48c405e95e8e8bd5867d08143f",
                    "spanID": "8e8bd5867d08143f",
                    "startTime": 1694412311000966,
                    "duration": 61060,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "9a746a48c405e95e8e8bd5867d08143f",
                    "spanID": "a9898a28d4489c31",
                    "startTime": 1694412311004863,
                    "duration": 44172,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "9a746a48c405e95e8e8bd5867d08143f",
                    "spanID": "681a3d1e4e719bb8",
                    "startTime": 1694412311005131,
                    "duration": 43511,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "9a746a48c405e95e8e8bd5867d08143f",
                    "spanID": "64e406c84c7f07f4",
                    "startTime": 1694412311053369,
                    "duration": 6574,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "9a746a48c405e95e8e8bd5867d08143f",
                    "spanID": "c280ef3252dd1d7c",
                    "startTime": 1694412311053727,
                    "duration": 5844,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "9a746a48c405e95e8e8bd5867d08143f",
                    "spanID": "3b56df8f730951da",
                    "startTime": 1694412311056742,
                    "duration": 1476,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                },
                {
                    "traceID": "9a746a48c405e95e8e8bd5867d08143f",
                    "spanID": "8a9d14b35ff0016e",
                    "startTime": 1694412311057070,
                    "duration": 785,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 800,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:07.000+00:00",
        "trace": {
            "traceID": "caa5b236a34e154dad9ba573fb13c83a",
            "spans": [
                {
                    "traceID": "caa5b236a34e154dad9ba573fb13c83a",
                    "spanID": "ad9ba573fb13c83a",
                    "startTime": 1694412306563080,
                    "duration": 35465,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "caa5b236a34e154dad9ba573fb13c83a",
                    "spanID": "a02da78125a6d8b6",
                    "startTime": 1694412306570570,
                    "duration": 5265,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "caa5b236a34e154dad9ba573fb13c83a",
                    "spanID": "f0285fe86a710813",
                    "startTime": 1694412306571096,
                    "duration": 4080,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "caa5b236a34e154dad9ba573fb13c83a",
                    "spanID": "3e9ca90fc1e1c0f9",
                    "startTime": 1694412306580138,
                    "duration": 16323,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "caa5b236a34e154dad9ba573fb13c83a",
                    "spanID": "19a92ca2e6efb17e",
                    "startTime": 1694412306580598,
                    "duration": 15276,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "caa5b236a34e154dad9ba573fb13c83a",
                    "spanID": "f1a8eab16926b61b",
                    "startTime": 1694412306589528,
                    "duration": 4075,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "caa5b236a34e154dad9ba573fb13c83a",
                    "spanID": "cd5ef91ccfaf37ad",
                    "startTime": 1694412306589978,
                    "duration": 3104,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 801,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:09.000+00:00",
        "trace": {
            "traceID": "64f3571fc45a6707db246c992ce93a36",
            "spans": [
                {
                    "traceID": "64f3571fc45a6707db246c992ce93a36",
                    "spanID": "db246c992ce93a36",
                    "startTime": 1694412309262429,
                    "duration": 67751,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "64f3571fc45a6707db246c992ce93a36",
                    "spanID": "4302a85ed25d1877",
                    "startTime": 1694412309267193,
                    "duration": 50344,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "64f3571fc45a6707db246c992ce93a36",
                    "spanID": "3d82fde71496dc4d",
                    "startTime": 1694412309267456,
                    "duration": 49165,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "64f3571fc45a6707db246c992ce93a36",
                    "spanID": "763694d72accf420",
                    "startTime": 1694412309319258,
                    "duration": 2407,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "64f3571fc45a6707db246c992ce93a36",
                    "spanID": "2333b108b30f6761",
                    "startTime": 1694412309322888,
                    "duration": 3740,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 802,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:08.000+00:00",
        "trace": {
            "traceID": "4055a7cfc03f513bab047bc33e3e576a",
            "spans": [
                {
                    "traceID": "4055a7cfc03f513bab047bc33e3e576a",
                    "spanID": "ab047bc33e3e576a",
                    "startTime": 1694412308110520,
                    "duration": 59473,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "4055a7cfc03f513bab047bc33e3e576a",
                    "spanID": "711e4419884a2acc",
                    "startTime": 1694412308115540,
                    "duration": 45447,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "4055a7cfc03f513bab047bc33e3e576a",
                    "spanID": "17bed715b8c2175f",
                    "startTime": 1694412308115909,
                    "duration": 44692,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "4055a7cfc03f513bab047bc33e3e576a",
                    "spanID": "0f1e149019be8081",
                    "startTime": 1694412308161067,
                    "duration": 1800,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "4055a7cfc03f513bab047bc33e3e576a",
                    "spanID": "89783d481e5b43c3",
                    "startTime": 1694412308164709,
                    "duration": 3076,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 803,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:07.000+00:00",
        "trace": {
            "traceID": "0b6cb498cd5bafde49bf4acf64b55682",
            "spans": [
                {
                    "traceID": "0b6cb498cd5bafde49bf4acf64b55682",
                    "spanID": "49bf4acf64b55682",
                    "startTime": 1694412307358397,
                    "duration": 62137,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 804,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:07.000+00:00",
        "trace": {
            "traceID": "ce3cfebe4c0a0f62f3ebd24cd9eb4e46",
            "spans": [
                {
                    "traceID": "ce3cfebe4c0a0f62f3ebd24cd9eb4e46",
                    "spanID": "f3ebd24cd9eb4e46",
                    "startTime": 1694412306649704,
                    "duration": 19643,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "ce3cfebe4c0a0f62f3ebd24cd9eb4e46",
                    "spanID": "fabd6406eb3e0a89",
                    "startTime": 1694412306654144,
                    "duration": 1953,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "ce3cfebe4c0a0f62f3ebd24cd9eb4e46",
                    "spanID": "e1e4ead83d6d2c91",
                    "startTime": 1694412306654563,
                    "duration": 1146,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "ce3cfebe4c0a0f62f3ebd24cd9eb4e46",
                    "spanID": "9735577981004b9b",
                    "startTime": 1694412306656183,
                    "duration": 5759,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "ce3cfebe4c0a0f62f3ebd24cd9eb4e46",
                    "spanID": "88578e79f7656dd6",
                    "startTime": 1694412306659802,
                    "duration": 7424,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 805,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "347c1371cccd8ed4b1580179574a87bb",
            "spans": [
                {
                    "traceID": "347c1371cccd8ed4b1580179574a87bb",
                    "spanID": "b1580179574a87bb",
                    "startTime": 1694412312114308,
                    "duration": 60143,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "347c1371cccd8ed4b1580179574a87bb",
                    "spanID": "9c564834899756e4",
                    "startTime": 1694412312119697,
                    "duration": 45257,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "347c1371cccd8ed4b1580179574a87bb",
                    "spanID": "8dade5907eddc0a9",
                    "startTime": 1694412312119983,
                    "duration": 44583,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        }
                    ]
                },
                {
                    "traceID": "347c1371cccd8ed4b1580179574a87bb",
                    "spanID": "af747ee1c2b8ca7f",
                    "startTime": 1694412312165264,
                    "duration": 1627,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "347c1371cccd8ed4b1580179574a87bb",
                    "spanID": "3fb9180564e97f3b",
                    "startTime": 1694412312168916,
                    "duration": 3057,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 806,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "84d0ca69b0e955f6170d749338f02959",
            "spans": [
                {
                    "traceID": "84d0ca69b0e955f6170d749338f02959",
                    "spanID": "170d749338f02959",
                    "startTime": 1694412309662225,
                    "duration": 59436,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "84d0ca69b0e955f6170d749338f02959",
                    "spanID": "9ca3da0bd88f280e",
                    "startTime": 1694412309666649,
                    "duration": 46834,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "84d0ca69b0e955f6170d749338f02959",
                    "spanID": "00eb90bc5e92ff96",
                    "startTime": 1694412309666994,
                    "duration": 45617,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "84d0ca69b0e955f6170d749338f02959",
                    "spanID": "e336bde4ee8744b5",
                    "startTime": 1694412309713287,
                    "duration": 1749,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "84d0ca69b0e955f6170d749338f02959",
                    "spanID": "b474446b7846ec31",
                    "startTime": 1694412309716930,
                    "duration": 2938,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 807,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:09.000+00:00",
        "trace": {
            "traceID": "7597ab7a49006d68c26bfbc54950fb03",
            "spans": [
                {
                    "traceID": "7597ab7a49006d68c26bfbc54950fb03",
                    "spanID": "c26bfbc54950fb03",
                    "startTime": 1694412309422429,
                    "duration": 66163,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "7597ab7a49006d68c26bfbc54950fb03",
                    "spanID": "0986f90407ef744d",
                    "startTime": 1694412309426864,
                    "duration": 46063,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "7597ab7a49006d68c26bfbc54950fb03",
                    "spanID": "93891f2e2c5e152f",
                    "startTime": 1694412309427178,
                    "duration": 45401,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "7597ab7a49006d68c26bfbc54950fb03",
                    "spanID": "ebfaf40e54a41f4a",
                    "startTime": 1694412309476725,
                    "duration": 8770,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "7597ab7a49006d68c26bfbc54950fb03",
                    "spanID": "ae635c41700e587f",
                    "startTime": 1694412309477058,
                    "duration": 8065,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "7597ab7a49006d68c26bfbc54950fb03",
                    "spanID": "e24f3074b677a54a",
                    "startTime": 1694412309479307,
                    "duration": 4785,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "7597ab7a49006d68c26bfbc54950fb03",
                    "spanID": "0b97991dd1af66c4",
                    "startTime": 1694412309479641,
                    "duration": 4052,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 808,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:07.000+00:00",
        "trace": {
            "traceID": "5e74d6e455286c317f2c6810115b9a3b",
            "spans": [
                {
                    "traceID": "5e74d6e455286c317f2c6810115b9a3b",
                    "spanID": "7f2c6810115b9a3b",
                    "startTime": 1694412306757977,
                    "duration": 56876,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "5e74d6e455286c317f2c6810115b9a3b",
                    "spanID": "31e423977053fc18",
                    "startTime": 1694412306762326,
                    "duration": 43527,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "5e74d6e455286c317f2c6810115b9a3b",
                    "spanID": "ece0f4cbd6d2e48f",
                    "startTime": 1694412306762634,
                    "duration": 42158,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "5e74d6e455286c317f2c6810115b9a3b",
                    "spanID": "7ac13d46b3cd44a2",
                    "startTime": 1694412306805655,
                    "duration": 2257,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "5e74d6e455286c317f2c6810115b9a3b",
                    "spanID": "7b30ed9772f22879",
                    "startTime": 1694412306809346,
                    "duration": 3315,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 809,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "9f715529cdd0c91c413435e37c5dbb01",
            "spans": [
                {
                    "traceID": "9f715529cdd0c91c413435e37c5dbb01",
                    "spanID": "413435e37c5dbb01",
                    "startTime": 1694412311744330,
                    "duration": 63770,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "9f715529cdd0c91c413435e37c5dbb01",
                    "spanID": "542ef30568a7e1a8",
                    "startTime": 1694412311749989,
                    "duration": 46990,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "9f715529cdd0c91c413435e37c5dbb01",
                    "spanID": "ff9b06366faf4efc",
                    "startTime": 1694412311750270,
                    "duration": 46340,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "9f715529cdd0c91c413435e37c5dbb01",
                    "spanID": "4ac821a6f6be68f6",
                    "startTime": 1694412311796746,
                    "duration": 2079,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "9f715529cdd0c91c413435e37c5dbb01",
                    "spanID": "20a3e4c022eed067",
                    "startTime": 1694412311800423,
                    "duration": 4265,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 810,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:11.000+00:00",
        "trace": {
            "traceID": "64c06d7963a0b9118edb7667efe8b3cf",
            "spans": [
                {
                    "traceID": "64c06d7963a0b9118edb7667efe8b3cf",
                    "spanID": "8edb7667efe8b3cf",
                    "startTime": 1694412310970804,
                    "duration": 16325,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "64c06d7963a0b9118edb7667efe8b3cf",
                    "spanID": "0e18de2a3c451a58",
                    "startTime": 1694412310975776,
                    "duration": 2511,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "64c06d7963a0b9118edb7667efe8b3cf",
                    "spanID": "1a9a974fa3b081c1",
                    "startTime": 1694412310976126,
                    "duration": 1231,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "64c06d7963a0b9118edb7667efe8b3cf",
                    "spanID": "321bfa2f2e3628c4",
                    "startTime": 1694412310978631,
                    "duration": 1919,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "64c06d7963a0b9118edb7667efe8b3cf",
                    "spanID": "5675028d5793f8cb",
                    "startTime": 1694412310982326,
                    "duration": 3124,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 811,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:08.000+00:00",
        "trace": {
            "traceID": "b647eee051b1411a1a5c4ba17ff661f0",
            "spans": [
                {
                    "traceID": "b647eee051b1411a1a5c4ba17ff661f0",
                    "spanID": "1a5c4ba17ff661f0",
                    "startTime": 1694412308028456,
                    "duration": 67902,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "b647eee051b1411a1a5c4ba17ff661f0",
                    "spanID": "67f1fbded64afa77",
                    "startTime": 1694412308035777,
                    "duration": 45976,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "b647eee051b1411a1a5c4ba17ff661f0",
                    "spanID": "2f4980fcca44af82",
                    "startTime": 1694412308036116,
                    "duration": 44568,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "b647eee051b1411a1a5c4ba17ff661f0",
                    "spanID": "8481a7be466cf804",
                    "startTime": 1694412308086942,
                    "duration": 7367,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "b647eee051b1411a1a5c4ba17ff661f0",
                    "spanID": "3dfc03ed0225be46",
                    "startTime": 1694412308087303,
                    "duration": 6019,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "b647eee051b1411a1a5c4ba17ff661f0",
                    "spanID": "172ca6230f3f2342",
                    "startTime": 1694412308090514,
                    "duration": 1448,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "b647eee051b1411a1a5c4ba17ff661f0",
                    "spanID": "728e43c5e86a77f7",
                    "startTime": 1694412308090868,
                    "duration": 737,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 812,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "850533b59ad39800c416107e26ef4d53",
            "spans": [
                {
                    "traceID": "850533b59ad39800c416107e26ef4d53",
                    "spanID": "c416107e26ef4d53",
                    "startTime": 1694412309501801,
                    "duration": 61493,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        }
                    ]
                },
                {
                    "traceID": "850533b59ad39800c416107e26ef4d53",
                    "spanID": "3e12dd95bf1f8e15",
                    "startTime": 1694412309506670,
                    "duration": 42308,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "850533b59ad39800c416107e26ef4d53",
                    "spanID": "28947e778adb378a",
                    "startTime": 1694412309507022,
                    "duration": 41580,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "850533b59ad39800c416107e26ef4d53",
                    "spanID": "de4c54580c01a3f7",
                    "startTime": 1694412309553489,
                    "duration": 6952,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "850533b59ad39800c416107e26ef4d53",
                    "spanID": "cf66d9b4d67480b2",
                    "startTime": 1694412309553908,
                    "duration": 6154,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "850533b59ad39800c416107e26ef4d53",
                    "spanID": "bbdc01ec4046cbae",
                    "startTime": 1694412309556925,
                    "duration": 1857,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                },
                {
                    "traceID": "850533b59ad39800c416107e26ef4d53",
                    "spanID": "2defd7e2bd017789",
                    "startTime": 1694412309557282,
                    "duration": 1165,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 813,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:08.000+00:00",
        "trace": {
            "traceID": "19793680a0afc84573fb7b69e787dd0d",
            "spans": [
                {
                    "traceID": "19793680a0afc84573fb7b69e787dd0d",
                    "spanID": "73fb7b69e787dd0d",
                    "startTime": 1694412308425381,
                    "duration": 61768,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "19793680a0afc84573fb7b69e787dd0d",
                    "spanID": "d4fac7986a8bc9ff",
                    "startTime": 1694412308430172,
                    "duration": 43347,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "19793680a0afc84573fb7b69e787dd0d",
                    "spanID": "9b8138e2f744bd5c",
                    "startTime": 1694412308430508,
                    "duration": 42081,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "19793680a0afc84573fb7b69e787dd0d",
                    "spanID": "fe71876d5b376b29",
                    "startTime": 1694412308478816,
                    "duration": 5911,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "19793680a0afc84573fb7b69e787dd0d",
                    "spanID": "289dcb489629e6b4",
                    "startTime": 1694412308479131,
                    "duration": 5181,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "19793680a0afc84573fb7b69e787dd0d",
                    "spanID": "325418446909125c",
                    "startTime": 1694412308481928,
                    "duration": 1372,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "19793680a0afc84573fb7b69e787dd0d",
                    "spanID": "276eda3b1bbfc2b9",
                    "startTime": 1694412308482269,
                    "duration": 705,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 814,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:08.000+00:00",
        "trace": {
            "traceID": "ea9c94dd92d60c0353b87eab7966f606",
            "spans": [
                {
                    "traceID": "ea9c94dd92d60c0353b87eab7966f606",
                    "spanID": "53b87eab7966f606",
                    "startTime": 1694412307653320,
                    "duration": 57652,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "ea9c94dd92d60c0353b87eab7966f606",
                    "spanID": "6669b8e9012762a7",
                    "startTime": 1694412307657305,
                    "duration": 44263,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "ea9c94dd92d60c0353b87eab7966f606",
                    "spanID": "b2aed1bd40de6473",
                    "startTime": 1694412307657560,
                    "duration": 43121,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "ea9c94dd92d60c0353b87eab7966f606",
                    "spanID": "9cbc7347600c0d06",
                    "startTime": 1694412307701771,
                    "duration": 2732,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "ea9c94dd92d60c0353b87eab7966f606",
                    "spanID": "a57b7a9264a1c702",
                    "startTime": 1694412307705311,
                    "duration": 3962,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 815,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "ca44e5cb1a1aec80566debfb4809553c",
            "spans": [
                {
                    "traceID": "ca44e5cb1a1aec80566debfb4809553c",
                    "spanID": "566debfb4809553c",
                    "startTime": 1694412311891956,
                    "duration": 58498,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "ca44e5cb1a1aec80566debfb4809553c",
                    "spanID": "0678a9ae90f2c707",
                    "startTime": 1694412311896547,
                    "duration": 44436,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "ca44e5cb1a1aec80566debfb4809553c",
                    "spanID": "ed22b37ea2a78b55",
                    "startTime": 1694412311896852,
                    "duration": 43772,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "ca44e5cb1a1aec80566debfb4809553c",
                    "spanID": "b6267d763dd5bd90",
                    "startTime": 1694412311941263,
                    "duration": 2063,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "ca44e5cb1a1aec80566debfb4809553c",
                    "spanID": "ebd7efbb9bed1cee",
                    "startTime": 1694412311945088,
                    "duration": 3025,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 816,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:11.000+00:00",
        "trace": {
            "traceID": "9504e3067baed41240fe1762a01858bb",
            "spans": [
                {
                    "traceID": "9504e3067baed41240fe1762a01858bb",
                    "spanID": "40fe1762a01858bb",
                    "startTime": 1694412310727468,
                    "duration": 58693,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        }
                    ]
                },
                {
                    "traceID": "9504e3067baed41240fe1762a01858bb",
                    "spanID": "7f05d6a15dc800db",
                    "startTime": 1694412310732825,
                    "duration": 44149,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "9504e3067baed41240fe1762a01858bb",
                    "spanID": "012a6b6a1968f8d4",
                    "startTime": 1694412310733126,
                    "duration": 43470,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "9504e3067baed41240fe1762a01858bb",
                    "spanID": "8136380e14aa12fe",
                    "startTime": 1694412310777049,
                    "duration": 1733,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "9504e3067baed41240fe1762a01858bb",
                    "spanID": "a2b345cf2e637ac1",
                    "startTime": 1694412310780860,
                    "duration": 2715,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 817,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "563c1d723e653c5bc05dea06bd06fd44",
            "spans": [
                {
                    "traceID": "563c1d723e653c5bc05dea06bd06fd44",
                    "spanID": "c05dea06bd06fd44",
                    "startTime": 1694412310418243,
                    "duration": 59735,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "563c1d723e653c5bc05dea06bd06fd44",
                    "spanID": "9e9489d996b3879e",
                    "startTime": 1694412310422603,
                    "duration": 42343,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "563c1d723e653c5bc05dea06bd06fd44",
                    "spanID": "8dd39e5852fa32fe",
                    "startTime": 1694412310422883,
                    "duration": 41718,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "563c1d723e653c5bc05dea06bd06fd44",
                    "spanID": "df562d01fc7bd05d",
                    "startTime": 1694412310468403,
                    "duration": 6542,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "563c1d723e653c5bc05dea06bd06fd44",
                    "spanID": "4d764e22704915a5",
                    "startTime": 1694412310468747,
                    "duration": 5806,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "563c1d723e653c5bc05dea06bd06fd44",
                    "spanID": "d7d0a748e90d20e8",
                    "startTime": 1694412310470988,
                    "duration": 2479,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "563c1d723e653c5bc05dea06bd06fd44",
                    "spanID": "903d52a0776f4aea",
                    "startTime": 1694412310471383,
                    "duration": 839,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 818,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:08.000+00:00",
        "trace": {
            "traceID": "b6cbf62cd23ae9d08a6c52a214e67ae5",
            "spans": [
                {
                    "traceID": "b6cbf62cd23ae9d08a6c52a214e67ae5",
                    "spanID": "8a6c52a214e67ae5",
                    "startTime": 1694412307950556,
                    "duration": 65388,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "b6cbf62cd23ae9d08a6c52a214e67ae5",
                    "spanID": "2340ee97b96068e6",
                    "startTime": 1694412307958625,
                    "duration": 42466,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "b6cbf62cd23ae9d08a6c52a214e67ae5",
                    "spanID": "c0bac7138e6d33a3",
                    "startTime": 1694412307958922,
                    "duration": 41718,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "b6cbf62cd23ae9d08a6c52a214e67ae5",
                    "spanID": "355b6db7ffc54b7c",
                    "startTime": 1694412308006384,
                    "duration": 6519,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "b6cbf62cd23ae9d08a6c52a214e67ae5",
                    "spanID": "a4e83d10f711ad89",
                    "startTime": 1694412308006815,
                    "duration": 5690,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "b6cbf62cd23ae9d08a6c52a214e67ae5",
                    "spanID": "df36c8ac101a760c",
                    "startTime": 1694412308009204,
                    "duration": 2377,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "b6cbf62cd23ae9d08a6c52a214e67ae5",
                    "spanID": "4c2953f79efcc768",
                    "startTime": 1694412308009607,
                    "duration": 1580,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 819,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:07.000+00:00",
        "trace": {
            "traceID": "069cf9f73a5a6cc3489053df42392cbd",
            "spans": [
                {
                    "traceID": "069cf9f73a5a6cc3489053df42392cbd",
                    "spanID": "489053df42392cbd",
                    "startTime": 1694412306983259,
                    "duration": 60709,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 820,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:13.000+00:00",
        "trace": {
            "traceID": "7fd86b01571ae5f8d090998276b26c8f",
            "spans": [
                {
                    "traceID": "7fd86b01571ae5f8d090998276b26c8f",
                    "spanID": "d090998276b26c8f",
                    "startTime": 1694412313074037,
                    "duration": 58618,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "7fd86b01571ae5f8d090998276b26c8f",
                    "spanID": "7084642c0dabd00f",
                    "startTime": 1694412313078170,
                    "duration": 42742,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "7fd86b01571ae5f8d090998276b26c8f",
                    "spanID": "f34df379ea821e88",
                    "startTime": 1694412313078418,
                    "duration": 42161,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "7fd86b01571ae5f8d090998276b26c8f",
                    "spanID": "9bbee653157c1e4a",
                    "startTime": 1694412313124268,
                    "duration": 6430,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "7fd86b01571ae5f8d090998276b26c8f",
                    "spanID": "8e717b9356a988d4",
                    "startTime": 1694412313124560,
                    "duration": 5732,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "7fd86b01571ae5f8d090998276b26c8f",
                    "spanID": "16c43ce04a1858ab",
                    "startTime": 1694412313126985,
                    "duration": 1489,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                },
                {
                    "traceID": "7fd86b01571ae5f8d090998276b26c8f",
                    "spanID": "698475f9e8fced53",
                    "startTime": 1694412313127305,
                    "duration": 772,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 821,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:11.000+00:00",
        "trace": {
            "traceID": "7a43014523635c848262a24ffd0ca47e",
            "spans": [
                {
                    "traceID": "7a43014523635c848262a24ffd0ca47e",
                    "spanID": "8262a24ffd0ca47e",
                    "startTime": 1694412311378278,
                    "duration": 57316,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "7a43014523635c848262a24ffd0ca47e",
                    "spanID": "0b75bd60451fdaec",
                    "startTime": 1694412311382590,
                    "duration": 42331,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "7a43014523635c848262a24ffd0ca47e",
                    "spanID": "457097b8b319fac2",
                    "startTime": 1694412311382874,
                    "duration": 41687,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "7a43014523635c848262a24ffd0ca47e",
                    "spanID": "da426a17e555ead7",
                    "startTime": 1694412311428135,
                    "duration": 5624,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "7a43014523635c848262a24ffd0ca47e",
                    "spanID": "298f8e1187b3d29b",
                    "startTime": 1694412311428410,
                    "duration": 4876,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "7a43014523635c848262a24ffd0ca47e",
                    "spanID": "9f18a8cc2bfed532",
                    "startTime": 1694412311430795,
                    "duration": 1439,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "7a43014523635c848262a24ffd0ca47e",
                    "spanID": "a4a037405879f26f",
                    "startTime": 1694412311431173,
                    "duration": 736,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 822,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "2c8c01ba23a940b06046b70ef8eac93b",
            "spans": [
                {
                    "traceID": "2c8c01ba23a940b06046b70ef8eac93b",
                    "spanID": "6046b70ef8eac93b",
                    "startTime": 1694412309897088,
                    "duration": 62370,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "2c8c01ba23a940b06046b70ef8eac93b",
                    "spanID": "9bebd41215ff89ae",
                    "startTime": 1694412309901831,
                    "duration": 47071,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "2c8c01ba23a940b06046b70ef8eac93b",
                    "spanID": "11585d6b76d47559",
                    "startTime": 1694412309902092,
                    "duration": 46468,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "2c8c01ba23a940b06046b70ef8eac93b",
                    "spanID": "1f6b03ffaedcdae5",
                    "startTime": 1694412309949677,
                    "duration": 2466,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "2c8c01ba23a940b06046b70ef8eac93b",
                    "spanID": "7d949cd79b646401",
                    "startTime": 1694412309953443,
                    "duration": 4147,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 823,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:08.000+00:00",
        "trace": {
            "traceID": "6be87dc31640da6289d8de4b998a51ab",
            "spans": [
                {
                    "traceID": "6be87dc31640da6289d8de4b998a51ab",
                    "spanID": "89d8de4b998a51ab",
                    "startTime": 1694412307800687,
                    "duration": 61187,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "6be87dc31640da6289d8de4b998a51ab",
                    "spanID": "4ed4e042350cd510",
                    "startTime": 1694412307804708,
                    "duration": 44245,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "6be87dc31640da6289d8de4b998a51ab",
                    "spanID": "978c8195c6ca1118",
                    "startTime": 1694412307805009,
                    "duration": 43565,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "6be87dc31640da6289d8de4b998a51ab",
                    "spanID": "6608139410054e49",
                    "startTime": 1694412307853237,
                    "duration": 5973,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "6be87dc31640da6289d8de4b998a51ab",
                    "spanID": "20b9c3b95c41aca8",
                    "startTime": 1694412307853553,
                    "duration": 4725,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "6be87dc31640da6289d8de4b998a51ab",
                    "spanID": "42576353455805b0",
                    "startTime": 1694412307855918,
                    "duration": 1381,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "6be87dc31640da6289d8de4b998a51ab",
                    "spanID": "70a473685193b3ae",
                    "startTime": 1694412307856230,
                    "duration": 736,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 824,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:13.000+00:00",
        "trace": {
            "traceID": "88980bf90b6248e75f97a2e8e1bb8b66",
            "spans": [
                {
                    "traceID": "88980bf90b6248e75f97a2e8e1bb8b66",
                    "spanID": "5f97a2e8e1bb8b66",
                    "startTime": 1694412312772887,
                    "duration": 63202,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "88980bf90b6248e75f97a2e8e1bb8b66",
                    "spanID": "f5451ca9c2896e1f",
                    "startTime": 1694412312777000,
                    "duration": 44032,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "88980bf90b6248e75f97a2e8e1bb8b66",
                    "spanID": "c0ea82e6cab03dff",
                    "startTime": 1694412312777290,
                    "duration": 43348,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "88980bf90b6248e75f97a2e8e1bb8b66",
                    "spanID": "87b8cb80f8d91c4d",
                    "startTime": 1694412312824576,
                    "duration": 8488,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "88980bf90b6248e75f97a2e8e1bb8b66",
                    "spanID": "e9123c257669f519",
                    "startTime": 1694412312824895,
                    "duration": 7714,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "88980bf90b6248e75f97a2e8e1bb8b66",
                    "spanID": "2b8dada72bf5a865",
                    "startTime": 1694412312827726,
                    "duration": 2478,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "88980bf90b6248e75f97a2e8e1bb8b66",
                    "spanID": "12ccfacd48dd6237",
                    "startTime": 1694412312828101,
                    "duration": 880,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 825,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "d5f6f85acab2a825acc63476581d5323",
            "spans": [
                {
                    "traceID": "d5f6f85acab2a825acc63476581d5323",
                    "spanID": "acc63476581d5323",
                    "startTime": 1694412312262225,
                    "duration": 59507,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "d5f6f85acab2a825acc63476581d5323",
                    "spanID": "3fa5d6a589d6561c",
                    "startTime": 1694412312266700,
                    "duration": 46278,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "d5f6f85acab2a825acc63476581d5323",
                    "spanID": "5dc19bede7f9c300",
                    "startTime": 1694412312266940,
                    "duration": 45667,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "d5f6f85acab2a825acc63476581d5323",
                    "spanID": "88852f710f10133b",
                    "startTime": 1694412312312874,
                    "duration": 1495,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "d5f6f85acab2a825acc63476581d5323",
                    "spanID": "44aead8b8a268b38",
                    "startTime": 1694412312316619,
                    "duration": 2570,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 826,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "d13abf9ad16258ea14fe579d42a8d9ab",
            "spans": [
                {
                    "traceID": "d13abf9ad16258ea14fe579d42a8d9ab",
                    "spanID": "14fe579d42a8d9ab",
                    "startTime": 1694412311601479,
                    "duration": 56688,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "d13abf9ad16258ea14fe579d42a8d9ab",
                    "spanID": "05bab9a4d237402e",
                    "startTime": 1694412311605897,
                    "duration": 43410,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "d13abf9ad16258ea14fe579d42a8d9ab",
                    "spanID": "76b4b84613707348",
                    "startTime": 1694412311606269,
                    "duration": 42548,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "d13abf9ad16258ea14fe579d42a8d9ab",
                    "spanID": "6cfef1a1f001ef1d",
                    "startTime": 1694412311649341,
                    "duration": 2183,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "d13abf9ad16258ea14fe579d42a8d9ab",
                    "spanID": "a93d607d9a7fdb28",
                    "startTime": 1694412311652917,
                    "duration": 3426,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 827,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "f987d0b50ace72cef9e069f4dc175e09",
            "spans": [
                {
                    "traceID": "f987d0b50ace72cef9e069f4dc175e09",
                    "spanID": "f9e069f4dc175e09",
                    "startTime": 1694412311819690,
                    "duration": 60066,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "f987d0b50ace72cef9e069f4dc175e09",
                    "spanID": "527c76a7db409a7b",
                    "startTime": 1694412311823741,
                    "duration": 45412,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "f987d0b50ace72cef9e069f4dc175e09",
                    "spanID": "087ec169ae72acc5",
                    "startTime": 1694412311823997,
                    "duration": 44734,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "f987d0b50ace72cef9e069f4dc175e09",
                    "spanID": "c4acc50e3bd6fc2d",
                    "startTime": 1694412311872433,
                    "duration": 5512,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "f987d0b50ace72cef9e069f4dc175e09",
                    "spanID": "e7a12fc489471f23",
                    "startTime": 1694412311872788,
                    "duration": 4839,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "f987d0b50ace72cef9e069f4dc175e09",
                    "spanID": "ebe69745a2f1d186",
                    "startTime": 1694412311875115,
                    "duration": 1470,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "f987d0b50ace72cef9e069f4dc175e09",
                    "spanID": "a5bac905227c932d",
                    "startTime": 1694412311875422,
                    "duration": 762,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 828,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:11.000+00:00",
        "trace": {
            "traceID": "65f558badf1588f7025f2c592ac5f44d",
            "spans": [
                {
                    "traceID": "65f558badf1588f7025f2c592ac5f44d",
                    "spanID": "025f2c592ac5f44d",
                    "startTime": 1694412310878113,
                    "duration": 55400,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "65f558badf1588f7025f2c592ac5f44d",
                    "spanID": "ae0be3a09595ee32",
                    "startTime": 1694412310882114,
                    "duration": 42824,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "65f558badf1588f7025f2c592ac5f44d",
                    "spanID": "81d8c88d23614989",
                    "startTime": 1694412310882484,
                    "duration": 42061,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "65f558badf1588f7025f2c592ac5f44d",
                    "spanID": "a79e8a4bffe1a7e5",
                    "startTime": 1694412310924793,
                    "duration": 2070,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "65f558badf1588f7025f2c592ac5f44d",
                    "spanID": "14bf9f5478c0f641",
                    "startTime": 1694412310928415,
                    "duration": 3289,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 829,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:07.000+00:00",
        "trace": {
            "traceID": "6f5c70c9a3a66aaacf8ef322cf8c12b7",
            "spans": [
                {
                    "traceID": "6f5c70c9a3a66aaacf8ef322cf8c12b7",
                    "spanID": "cf8ef322cf8c12b7",
                    "startTime": 1694412307057371,
                    "duration": 62030,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "6f5c70c9a3a66aaacf8ef322cf8c12b7",
                    "spanID": "e6897d50a5fe2d5e",
                    "startTime": 1694412307061424,
                    "duration": 47733,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "6f5c70c9a3a66aaacf8ef322cf8c12b7",
                    "spanID": "dc2c465a442ddcf2",
                    "startTime": 1694412307061708,
                    "duration": 47048,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        }
                    ]
                },
                {
                    "traceID": "6f5c70c9a3a66aaacf8ef322cf8c12b7",
                    "spanID": "864fa624c7f08a20",
                    "startTime": 1694412307112643,
                    "duration": 5038,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "6f5c70c9a3a66aaacf8ef322cf8c12b7",
                    "spanID": "d922afb74b623d12",
                    "startTime": 1694412307112920,
                    "duration": 4430,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "6f5c70c9a3a66aaacf8ef322cf8c12b7",
                    "spanID": "c1a4071c00c60575",
                    "startTime": 1694412307115051,
                    "duration": 1354,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                },
                {
                    "traceID": "6f5c70c9a3a66aaacf8ef322cf8c12b7",
                    "spanID": "168eaa8b08535411",
                    "startTime": 1694412307115344,
                    "duration": 693,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 830,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:07.000+00:00",
        "trace": {
            "traceID": "97f07009fee5d00fd5ecbdf55360fb5e",
            "spans": [
                {
                    "traceID": "97f07009fee5d00fd5ecbdf55360fb5e",
                    "spanID": "d5ecbdf55360fb5e",
                    "startTime": 1694412306830178,
                    "duration": 61809,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "97f07009fee5d00fd5ecbdf55360fb5e",
                    "spanID": "d187303280e1f76a",
                    "startTime": 1694412306834405,
                    "duration": 46575,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "97f07009fee5d00fd5ecbdf55360fb5e",
                    "spanID": "0a3f6bc5ff91924b",
                    "startTime": 1694412306834671,
                    "duration": 45987,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "97f07009fee5d00fd5ecbdf55360fb5e",
                    "spanID": "f55d1fb892c7e3b0",
                    "startTime": 1694412306884182,
                    "duration": 6070,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "97f07009fee5d00fd5ecbdf55360fb5e",
                    "spanID": "49b78fa8e2e99630",
                    "startTime": 1694412306884582,
                    "duration": 5208,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "97f07009fee5d00fd5ecbdf55360fb5e",
                    "spanID": "a6c71426c35ac836",
                    "startTime": 1694412306887179,
                    "duration": 1524,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "97f07009fee5d00fd5ecbdf55360fb5e",
                    "spanID": "ecc047f8d4e2d1a9",
                    "startTime": 1694412306887509,
                    "duration": 794,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 831,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:14.000+00:00",
        "trace": {
            "traceID": "f4d257d3313b46265ead3d00b5704b38",
            "spans": [
                {
                    "traceID": "f4d257d3313b46265ead3d00b5704b38",
                    "spanID": "5ead3d00b5704b38",
                    "startTime": 1694412313746135,
                    "duration": 59615,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "f4d257d3313b46265ead3d00b5704b38",
                    "spanID": "30e2b4f71910bda8",
                    "startTime": 1694412313750744,
                    "duration": 46295,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "f4d257d3313b46265ead3d00b5704b38",
                    "spanID": "153b0e61b24fcbe6",
                    "startTime": 1694412313751068,
                    "duration": 45550,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "f4d257d3313b46265ead3d00b5704b38",
                    "spanID": "40ea7160e27bda49",
                    "startTime": 1694412313796830,
                    "duration": 2247,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "f4d257d3313b46265ead3d00b5704b38",
                    "spanID": "792ef37286d23b4e",
                    "startTime": 1694412313800563,
                    "duration": 3389,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 832,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:14.000+00:00",
        "trace": {
            "traceID": "79845e5d93b58717334c0eb72ee5519d",
            "spans": [
                {
                    "traceID": "79845e5d93b58717334c0eb72ee5519d",
                    "spanID": "334c0eb72ee5519d",
                    "startTime": 1694412313668402,
                    "duration": 61859,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "79845e5d93b58717334c0eb72ee5519d",
                    "spanID": "84ad04c411ba93f5",
                    "startTime": 1694412313672629,
                    "duration": 44301,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "79845e5d93b58717334c0eb72ee5519d",
                    "spanID": "e550029257cb09bc",
                    "startTime": 1694412313672987,
                    "duration": 43593,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "79845e5d93b58717334c0eb72ee5519d",
                    "spanID": "4a260e692888fb04",
                    "startTime": 1694412313720310,
                    "duration": 7449,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "79845e5d93b58717334c0eb72ee5519d",
                    "spanID": "db2947f557a86dca",
                    "startTime": 1694412313720665,
                    "duration": 6645,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "79845e5d93b58717334c0eb72ee5519d",
                    "spanID": "c7a5988e47655a3e",
                    "startTime": 1694412313723639,
                    "duration": 2435,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                },
                {
                    "traceID": "79845e5d93b58717334c0eb72ee5519d",
                    "spanID": "0ed1f9bb10e19386",
                    "startTime": 1694412313724005,
                    "duration": 791,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 833,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:13.000+00:00",
        "trace": {
            "traceID": "e33632de252e1a8b47c81fefe24018d4",
            "spans": [
                {
                    "traceID": "e33632de252e1a8b47c81fefe24018d4",
                    "spanID": "47c81fefe24018d4",
                    "startTime": 1694412313002780,
                    "duration": 59554,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "e33632de252e1a8b47c81fefe24018d4",
                    "spanID": "d696ed316b6f29e0",
                    "startTime": 1694412313007619,
                    "duration": 45324,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "e33632de252e1a8b47c81fefe24018d4",
                    "spanID": "85206ce9dfaba25a",
                    "startTime": 1694412313007923,
                    "duration": 44670,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "e33632de252e1a8b47c81fefe24018d4",
                    "spanID": "b86867fc1ef1f279",
                    "startTime": 1694412313053070,
                    "duration": 2406,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "e33632de252e1a8b47c81fefe24018d4",
                    "spanID": "807fc88ddf98cb74",
                    "startTime": 1694412313056726,
                    "duration": 3633,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 834,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "97b7692984f910059266c4c1256263d4",
            "spans": [
                {
                    "traceID": "97b7692984f910059266c4c1256263d4",
                    "spanID": "9266c4c1256263d4",
                    "startTime": 1694412309816628,
                    "duration": 65007,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "97b7692984f910059266c4c1256263d4",
                    "spanID": "3cc1ed081a61adec",
                    "startTime": 1694412309821143,
                    "duration": 47810,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "97b7692984f910059266c4c1256263d4",
                    "spanID": "c75cbf1c1feff3f7",
                    "startTime": 1694412309821420,
                    "duration": 47184,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "97b7692984f910059266c4c1256263d4",
                    "spanID": "4e08170245e0f275",
                    "startTime": 1694412309872226,
                    "duration": 7506,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "97b7692984f910059266c4c1256263d4",
                    "spanID": "c49824aabcc26c43",
                    "startTime": 1694412309872537,
                    "duration": 6789,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "97b7692984f910059266c4c1256263d4",
                    "spanID": "8718b210d8b6c91c",
                    "startTime": 1694412309874975,
                    "duration": 2066,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "97b7692984f910059266c4c1256263d4",
                    "spanID": "17e95dcc472e90ab",
                    "startTime": 1694412309875288,
                    "duration": 709,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 835,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "156f57187f945340e51a972ef2a908b2",
            "spans": [
                {
                    "traceID": "156f57187f945340e51a972ef2a908b2",
                    "spanID": "e51a972ef2a908b2",
                    "startTime": 1694412309577602,
                    "duration": 69133,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "156f57187f945340e51a972ef2a908b2",
                    "spanID": "c59ebbf5a23f04e3",
                    "startTime": 1694412309583885,
                    "duration": 49170,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "156f57187f945340e51a972ef2a908b2",
                    "spanID": "f86e3c4b0fb587d7",
                    "startTime": 1694412309584177,
                    "duration": 48421,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "156f57187f945340e51a972ef2a908b2",
                    "spanID": "e6bb08a071a85192",
                    "startTime": 1694412309638518,
                    "duration": 5823,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "156f57187f945340e51a972ef2a908b2",
                    "spanID": "c3e930f8a0161945",
                    "startTime": 1694412309638881,
                    "duration": 5066,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "156f57187f945340e51a972ef2a908b2",
                    "spanID": "4afd5091c2952789",
                    "startTime": 1694412309641322,
                    "duration": 1424,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "156f57187f945340e51a972ef2a908b2",
                    "spanID": "0c6b804f6e3647f2",
                    "startTime": 1694412309641637,
                    "duration": 698,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 836,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:09.000+00:00",
        "trace": {
            "traceID": "d824e7962151edf1c283e8988d41c137",
            "spans": [
                {
                    "traceID": "d824e7962151edf1c283e8988d41c137",
                    "spanID": "c283e8988d41c137",
                    "startTime": 1694412308803206,
                    "duration": 68759,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        }
                    ]
                },
                {
                    "traceID": "d824e7962151edf1c283e8988d41c137",
                    "spanID": "b30216b684f2f521",
                    "startTime": 1694412308807800,
                    "duration": 49462,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "d824e7962151edf1c283e8988d41c137",
                    "spanID": "6ffa0422bcf3dcf6",
                    "startTime": 1694412308808115,
                    "duration": 48688,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        }
                    ]
                },
                {
                    "traceID": "d824e7962151edf1c283e8988d41c137",
                    "spanID": "6a709ace6af2f21c",
                    "startTime": 1694412308862465,
                    "duration": 6326,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "d824e7962151edf1c283e8988d41c137",
                    "spanID": "b925609729a6d20e",
                    "startTime": 1694412308862819,
                    "duration": 5614,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "d824e7962151edf1c283e8988d41c137",
                    "spanID": "a918d068ecc0ee83",
                    "startTime": 1694412308865344,
                    "duration": 1459,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        }
                    ]
                },
                {
                    "traceID": "d824e7962151edf1c283e8988d41c137",
                    "spanID": "97090e6c6cac752b",
                    "startTime": 1694412308865680,
                    "duration": 697,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 837,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:07.000+00:00",
        "trace": {
            "traceID": "736c8bdb650873562597192e053759d5",
            "spans": [
                {
                    "traceID": "736c8bdb650873562597192e053759d5",
                    "spanID": "2597192e053759d5",
                    "startTime": 1694412307205667,
                    "duration": 59589,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        }
                    ]
                },
                {
                    "traceID": "736c8bdb650873562597192e053759d5",
                    "spanID": "708d7393d9308cd2",
                    "startTime": 1694412307209734,
                    "duration": 43803,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "736c8bdb650873562597192e053759d5",
                    "spanID": "75e1f8cf901f37d0",
                    "startTime": 1694412307210016,
                    "duration": 42608,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "736c8bdb650873562597192e053759d5",
                    "spanID": "07c82044042e7da2",
                    "startTime": 1694412307257083,
                    "duration": 6166,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "736c8bdb650873562597192e053759d5",
                    "spanID": "43d38089bf707749",
                    "startTime": 1694412307257434,
                    "duration": 5414,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "736c8bdb650873562597192e053759d5",
                    "spanID": "29f61136933fdad5",
                    "startTime": 1694412307259755,
                    "duration": 1427,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "736c8bdb650873562597192e053759d5",
                    "spanID": "5aaf135cb2fa4bce",
                    "startTime": 1694412307260080,
                    "duration": 757,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 838,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:07.000+00:00",
        "trace": {
            "traceID": "328de05f3b325e0d9a9296b8ea87b2de",
            "spans": [
                {
                    "traceID": "328de05f3b325e0d9a9296b8ea87b2de",
                    "spanID": "9a9296b8ea87b2de",
                    "startTime": 1694412306610239,
                    "duration": 25374,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "328de05f3b325e0d9a9296b8ea87b2de",
                    "spanID": "45829f3181a85eef",
                    "startTime": 1694412306614596,
                    "duration": 1763,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "328de05f3b325e0d9a9296b8ea87b2de",
                    "spanID": "970477df49db46e0",
                    "startTime": 1694412306614893,
                    "duration": 1127,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "328de05f3b325e0d9a9296b8ea87b2de",
                    "spanID": "6ca119a3ac8deefb",
                    "startTime": 1694412306620315,
                    "duration": 12531,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "328de05f3b325e0d9a9296b8ea87b2de",
                    "spanID": "679d72ce8e7b74d5",
                    "startTime": 1694412306620689,
                    "duration": 11666,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "328de05f3b325e0d9a9296b8ea87b2de",
                    "spanID": "982c5ea4de54de57",
                    "startTime": 1694412306628852,
                    "duration": 1472,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "328de05f3b325e0d9a9296b8ea87b2de",
                    "spanID": "0aa30824c41546dd",
                    "startTime": 1694412306629339,
                    "duration": 688,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 839,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "f2aa436560f39788810fea09df975964",
            "spans": [
                {
                    "traceID": "f2aa436560f39788810fea09df975964",
                    "spanID": "810fea09df975964",
                    "startTime": 1694412311673983,
                    "duration": 55810,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "f2aa436560f39788810fea09df975964",
                    "spanID": "15d7a7dd510d9890",
                    "startTime": 1694412311678659,
                    "duration": 42814,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "f2aa436560f39788810fea09df975964",
                    "spanID": "e7e731455ea8a73b",
                    "startTime": 1694412311678927,
                    "duration": 41649,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "f2aa436560f39788810fea09df975964",
                    "spanID": "f929371acbbc55e2",
                    "startTime": 1694412311721199,
                    "duration": 1707,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "f2aa436560f39788810fea09df975964",
                    "spanID": "7cde62da5f3e63c4",
                    "startTime": 1694412311724951,
                    "duration": 2845,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 840,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "b188327fd1deba98ac6f1f31810c5806",
            "spans": [
                {
                    "traceID": "b188327fd1deba98ac6f1f31810c5806",
                    "spanID": "ac6f1f31810c5806",
                    "startTime": 1694412310340429,
                    "duration": 64348,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "b188327fd1deba98ac6f1f31810c5806",
                    "spanID": "4677a9251f1b5cb2",
                    "startTime": 1694412310344752,
                    "duration": 48307,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "b188327fd1deba98ac6f1f31810c5806",
                    "spanID": "8a51cf9e95c8db9a",
                    "startTime": 1694412310345035,
                    "duration": 47653,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "b188327fd1deba98ac6f1f31810c5806",
                    "spanID": "90dcbdc7f2771a8a",
                    "startTime": 1694412310396664,
                    "duration": 5930,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "b188327fd1deba98ac6f1f31810c5806",
                    "spanID": "0303ff6b4ea82730",
                    "startTime": 1694412310396966,
                    "duration": 5198,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "b188327fd1deba98ac6f1f31810c5806",
                    "spanID": "98d0179e84b97b34",
                    "startTime": 1694412310399531,
                    "duration": 1484,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "b188327fd1deba98ac6f1f31810c5806",
                    "spanID": "c1ad1002d2cc309d",
                    "startTime": 1694412310399906,
                    "duration": 786,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 841,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "5e2a6ec029dc19c707aefb0421867f1a",
            "spans": [
                {
                    "traceID": "5e2a6ec029dc19c707aefb0421867f1a",
                    "spanID": "07aefb0421867f1a",
                    "startTime": 1694412310267162,
                    "duration": 61356,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "5e2a6ec029dc19c707aefb0421867f1a",
                    "spanID": "2d8d4e817641bf1b",
                    "startTime": 1694412310271307,
                    "duration": 45659,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "5e2a6ec029dc19c707aefb0421867f1a",
                    "spanID": "944d5f9aafcc9f56",
                    "startTime": 1694412310271587,
                    "duration": 44988,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "5e2a6ec029dc19c707aefb0421867f1a",
                    "spanID": "4aac339a1cbb1e5d",
                    "startTime": 1694412310320365,
                    "duration": 6211,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "5e2a6ec029dc19c707aefb0421867f1a",
                    "spanID": "fcdec8fa45aa0d18",
                    "startTime": 1694412310320695,
                    "duration": 5440,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "5e2a6ec029dc19c707aefb0421867f1a",
                    "spanID": "6e8a740f7ce8a23e",
                    "startTime": 1694412310323538,
                    "duration": 1501,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                },
                {
                    "traceID": "5e2a6ec029dc19c707aefb0421867f1a",
                    "spanID": "859c6d8278c59c85",
                    "startTime": 1694412310323934,
                    "duration": 738,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 842,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:11.000+00:00",
        "trace": {
            "traceID": "d2435dd6f22c098c69d66f6772073041",
            "spans": [
                {
                    "traceID": "d2435dd6f22c098c69d66f6772073041",
                    "spanID": "69d66f6772073041",
                    "startTime": 1694412310798514,
                    "duration": 67510,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "d2435dd6f22c098c69d66f6772073041",
                    "spanID": "1cad26cd52a2659e",
                    "startTime": 1694412310803343,
                    "duration": 49742,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "d2435dd6f22c098c69d66f6772073041",
                    "spanID": "849e820c41d8d42c",
                    "startTime": 1694412310803631,
                    "duration": 49013,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "d2435dd6f22c098c69d66f6772073041",
                    "spanID": "f2bcf552747d9a93",
                    "startTime": 1694412310856660,
                    "duration": 6609,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "d2435dd6f22c098c69d66f6772073041",
                    "spanID": "ad5e353e1641a4af",
                    "startTime": 1694412310857060,
                    "duration": 5801,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "d2435dd6f22c098c69d66f6772073041",
                    "spanID": "c456d0cc17f2492b",
                    "startTime": 1694412310859490,
                    "duration": 1516,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "d2435dd6f22c098c69d66f6772073041",
                    "spanID": "fe0fbaeb89d3d7f8",
                    "startTime": 1694412310859846,
                    "duration": 788,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 843,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:08.000+00:00",
        "trace": {
            "traceID": "3bbfaaa9dec9a677e7fdc509804e47fc",
            "spans": [
                {
                    "traceID": "3bbfaaa9dec9a677e7fdc509804e47fc",
                    "spanID": "e7fdc509804e47fc",
                    "startTime": 1694412308349279,
                    "duration": 62767,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "3bbfaaa9dec9a677e7fdc509804e47fc",
                    "spanID": "894a8f55506a3dc0",
                    "startTime": 1694412308354648,
                    "duration": 46509,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "3bbfaaa9dec9a677e7fdc509804e47fc",
                    "spanID": "b3b998484cce62be",
                    "startTime": 1694412308355027,
                    "duration": 45792,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "3bbfaaa9dec9a677e7fdc509804e47fc",
                    "spanID": "bbecc84b07228e7d",
                    "startTime": 1694412308404790,
                    "duration": 5436,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "3bbfaaa9dec9a677e7fdc509804e47fc",
                    "spanID": "1f2f151ab90844cd",
                    "startTime": 1694412308405149,
                    "duration": 4658,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "3bbfaaa9dec9a677e7fdc509804e47fc",
                    "spanID": "d4c48df309535af0",
                    "startTime": 1694412308407467,
                    "duration": 1380,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                },
                {
                    "traceID": "3bbfaaa9dec9a677e7fdc509804e47fc",
                    "spanID": "63a25a8a5411424b",
                    "startTime": 1694412308407804,
                    "duration": 714,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 844,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:11.000+00:00",
        "trace": {
            "traceID": "4aaec5625fb622b2392ed5817fa8258d",
            "spans": [
                {
                    "traceID": "4aaec5625fb622b2392ed5817fa8258d",
                    "spanID": "392ed5817fa8258d",
                    "startTime": 1694412311298705,
                    "duration": 65250,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "4aaec5625fb622b2392ed5817fa8258d",
                    "spanID": "cfe669c27ca03e17",
                    "startTime": 1694412311304653,
                    "duration": 44876,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "4aaec5625fb622b2392ed5817fa8258d",
                    "spanID": "e38f44bf6cb9436c",
                    "startTime": 1694412311304934,
                    "duration": 43667,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "4aaec5625fb622b2392ed5817fa8258d",
                    "spanID": "97292889a0256bee",
                    "startTime": 1694412311355401,
                    "duration": 5840,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "4aaec5625fb622b2392ed5817fa8258d",
                    "spanID": "dd0f8d638411b164",
                    "startTime": 1694412311355729,
                    "duration": 5120,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "4aaec5625fb622b2392ed5817fa8258d",
                    "spanID": "095a4b395bbc3a61",
                    "startTime": 1694412311358263,
                    "duration": 1459,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                },
                {
                    "traceID": "4aaec5625fb622b2392ed5817fa8258d",
                    "spanID": "5f834665d2d23f15",
                    "startTime": 1694412311358608,
                    "duration": 766,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 845,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:11.000+00:00",
        "trace": {
            "traceID": "af97860274787676d23ea049faacc0bd",
            "spans": [
                {
                    "traceID": "af97860274787676d23ea049faacc0bd",
                    "spanID": "d23ea049faacc0bd",
                    "startTime": 1694412310646811,
                    "duration": 66423,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "af97860274787676d23ea049faacc0bd",
                    "spanID": "d7138cca63b59ad9",
                    "startTime": 1694412310651477,
                    "duration": 49561,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "af97860274787676d23ea049faacc0bd",
                    "spanID": "b9639b00224c355f",
                    "startTime": 1694412310651786,
                    "duration": 48811,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "af97860274787676d23ea049faacc0bd",
                    "spanID": "1de04affd019bd91",
                    "startTime": 1694412310704833,
                    "duration": 6131,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "af97860274787676d23ea049faacc0bd",
                    "spanID": "55de3d4bf0e1dd1f",
                    "startTime": 1694412310705234,
                    "duration": 4858,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "af97860274787676d23ea049faacc0bd",
                    "spanID": "fee3cbbafd7363e0",
                    "startTime": 1694412310707552,
                    "duration": 1531,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                },
                {
                    "traceID": "af97860274787676d23ea049faacc0bd",
                    "spanID": "30e7698f2a4b6766",
                    "startTime": 1694412310707895,
                    "duration": 859,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 846,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:09.000+00:00",
        "trace": {
            "traceID": "6b2a1b7b19fc22352cfca603417050ba",
            "spans": [
                {
                    "traceID": "6b2a1b7b19fc22352cfca603417050ba",
                    "spanID": "2cfca603417050ba",
                    "startTime": 1694412308501872,
                    "duration": 62655,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "6b2a1b7b19fc22352cfca603417050ba",
                    "spanID": "96dc0d5d020abbcb",
                    "startTime": 1694412308506350,
                    "duration": 42629,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "6b2a1b7b19fc22352cfca603417050ba",
                    "spanID": "797df9f9ca50e24d",
                    "startTime": 1694412308506644,
                    "duration": 41933,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "6b2a1b7b19fc22352cfca603417050ba",
                    "spanID": "a4778fe680056cf1",
                    "startTime": 1694412308555292,
                    "duration": 6230,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "6b2a1b7b19fc22352cfca603417050ba",
                    "spanID": "bbbbc2a7cfd9684a",
                    "startTime": 1694412308555738,
                    "duration": 4878,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "6b2a1b7b19fc22352cfca603417050ba",
                    "spanID": "bf0f5f6582032860",
                    "startTime": 1694412308558168,
                    "duration": 1386,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                },
                {
                    "traceID": "6b2a1b7b19fc22352cfca603417050ba",
                    "spanID": "9a7fd42158ca1e6d",
                    "startTime": 1694412308558471,
                    "duration": 720,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 847,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:14.000+00:00",
        "trace": {
            "traceID": "0c35068cd00963eefc0717d51d093dc6",
            "spans": [
                {
                    "traceID": "0c35068cd00963eefc0717d51d093dc6",
                    "spanID": "fc0717d51d093dc6",
                    "startTime": 1694412313899925,
                    "duration": 61704,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 848,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:13.000+00:00",
        "trace": {
            "traceID": "ec0582380155e5bc5760e77133f579dc",
            "spans": [
                {
                    "traceID": "ec0582380155e5bc5760e77133f579dc",
                    "spanID": "5760e77133f579dc",
                    "startTime": 1694412312557702,
                    "duration": 59361,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "ec0582380155e5bc5760e77133f579dc",
                    "spanID": "09cb56f4084839ac",
                    "startTime": 1694412312562377,
                    "duration": 42724,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "ec0582380155e5bc5760e77133f579dc",
                    "spanID": "50712a51c65cb3aa",
                    "startTime": 1694412312562667,
                    "duration": 41974,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "ec0582380155e5bc5760e77133f579dc",
                    "spanID": "c9cb067b3589fc6c",
                    "startTime": 1694412312608910,
                    "duration": 6125,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "ec0582380155e5bc5760e77133f579dc",
                    "spanID": "a8638699b158dd3b",
                    "startTime": 1694412312609255,
                    "duration": 5407,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "ec0582380155e5bc5760e77133f579dc",
                    "spanID": "b88a214f44f1e46b",
                    "startTime": 1694412312612032,
                    "duration": 1518,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "ec0582380155e5bc5760e77133f579dc",
                    "spanID": "1132e4cc39350b6c",
                    "startTime": 1694412312612371,
                    "duration": 802,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 849,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "1e54f4979c7e8dddbc9d7ed02c9f51fb",
            "spans": [
                {
                    "traceID": "1e54f4979c7e8dddbc9d7ed02c9f51fb",
                    "spanID": "bc9d7ed02c9f51fb",
                    "startTime": 1694412312338145,
                    "duration": 59412,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "1e54f4979c7e8dddbc9d7ed02c9f51fb",
                    "spanID": "ceeaf9238176d44b",
                    "startTime": 1694412312342800,
                    "duration": 42138,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "1e54f4979c7e8dddbc9d7ed02c9f51fb",
                    "spanID": "bee912770f583aaf",
                    "startTime": 1694412312343080,
                    "duration": 41513,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "1e54f4979c7e8dddbc9d7ed02c9f51fb",
                    "spanID": "2ddba842e565e567",
                    "startTime": 1694412312389751,
                    "duration": 5901,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "1e54f4979c7e8dddbc9d7ed02c9f51fb",
                    "spanID": "15f79e5f59a22145",
                    "startTime": 1694412312390044,
                    "duration": 5119,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "1e54f4979c7e8dddbc9d7ed02c9f51fb",
                    "spanID": "39f3a9cecd5afd2e",
                    "startTime": 1694412312392547,
                    "duration": 1453,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "1e54f4979c7e8dddbc9d7ed02c9f51fb",
                    "spanID": "e4e127299a891ec2",
                    "startTime": 1694412312392907,
                    "duration": 756,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 850,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "0978f543908db615edf7bbd4546f88af",
            "spans": [
                {
                    "traceID": "0978f543908db615edf7bbd4546f88af",
                    "spanID": "edf7bbd4546f88af",
                    "startTime": 1694412312189452,
                    "duration": 55828,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 851,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:11.000+00:00",
        "trace": {
            "traceID": "525e23ac9f25d600db954255fa897ce0",
            "spans": [
                {
                    "traceID": "525e23ac9f25d600db954255fa897ce0",
                    "spanID": "db954255fa897ce0",
                    "startTime": 1694412311449154,
                    "duration": 58944,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "525e23ac9f25d600db954255fa897ce0",
                    "spanID": "60e6ab22e09948c8",
                    "startTime": 1694412311453221,
                    "duration": 43713,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        }
                    ]
                },
                {
                    "traceID": "525e23ac9f25d600db954255fa897ce0",
                    "spanID": "71ea5af20baadb18",
                    "startTime": 1694412311453506,
                    "duration": 43090,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "525e23ac9f25d600db954255fa897ce0",
                    "spanID": "131dd80db776238a",
                    "startTime": 1694412311500476,
                    "duration": 5424,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "525e23ac9f25d600db954255fa897ce0",
                    "spanID": "8b2ddd5601cb21c8",
                    "startTime": 1694412311500800,
                    "duration": 4763,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "525e23ac9f25d600db954255fa897ce0",
                    "spanID": "fb6dae7927a8213b",
                    "startTime": 1694412311503026,
                    "duration": 1590,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "525e23ac9f25d600db954255fa897ce0",
                    "spanID": "28b44228134bdd56",
                    "startTime": 1694412311503424,
                    "duration": 787,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 852,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:11.000+00:00",
        "trace": {
            "traceID": "184f0aa18a2b6fa312fb80740e82443b",
            "spans": [
                {
                    "traceID": "184f0aa18a2b6fa312fb80740e82443b",
                    "spanID": "12fb80740e82443b",
                    "startTime": 1694412311225751,
                    "duration": 59008,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "184f0aa18a2b6fa312fb80740e82443b",
                    "spanID": "5708fc58a07c71d5",
                    "startTime": 1694412311230274,
                    "duration": 42678,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "184f0aa18a2b6fa312fb80740e82443b",
                    "spanID": "16c3c79d3c18f7b0",
                    "startTime": 1694412311230606,
                    "duration": 41980,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "184f0aa18a2b6fa312fb80740e82443b",
                    "spanID": "cc1de2ec27ee8c47",
                    "startTime": 1694412311276373,
                    "duration": 6359,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "184f0aa18a2b6fa312fb80740e82443b",
                    "spanID": "b98b81783795cf8b",
                    "startTime": 1694412311276703,
                    "duration": 5579,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "184f0aa18a2b6fa312fb80740e82443b",
                    "spanID": "b4389a699ba7d2fa",
                    "startTime": 1694412311279512,
                    "duration": 1412,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "184f0aa18a2b6fa312fb80740e82443b",
                    "spanID": "bd8bc053ca6b043d",
                    "startTime": 1694412311279859,
                    "duration": 740,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 853,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:10.000+00:00",
        "trace": {
            "traceID": "219b09abc4b928d7df0acf26d0ef2039",
            "spans": [
                {
                    "traceID": "219b09abc4b928d7df0acf26d0ef2039",
                    "spanID": "df0acf26d0ef2039",
                    "startTime": 1694412310120600,
                    "duration": 60066,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "219b09abc4b928d7df0acf26d0ef2039",
                    "spanID": "0a508e07f2ade8a6",
                    "startTime": 1694412310126905,
                    "duration": 42573,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "219b09abc4b928d7df0acf26d0ef2039",
                    "spanID": "2c976c3ec1a7ace1",
                    "startTime": 1694412310127201,
                    "duration": 41352,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        }
                    ]
                },
                {
                    "traceID": "219b09abc4b928d7df0acf26d0ef2039",
                    "spanID": "b3b8288b101021b9",
                    "startTime": 1694412310173052,
                    "duration": 5674,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "219b09abc4b928d7df0acf26d0ef2039",
                    "spanID": "d33f95b047f15111",
                    "startTime": 1694412310173378,
                    "duration": 4990,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        }
                    ]
                },
                {
                    "traceID": "219b09abc4b928d7df0acf26d0ef2039",
                    "spanID": "bf284068d2490300",
                    "startTime": 1694412310175984,
                    "duration": 1467,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "219b09abc4b928d7df0acf26d0ef2039",
                    "spanID": "1dfbd40e194b33b7",
                    "startTime": 1694412310176320,
                    "duration": 750,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 854,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:08.000+00:00",
        "trace": {
            "traceID": "5c2b05245b170c0fb0690349f1338ed8",
            "spans": [
                {
                    "traceID": "5c2b05245b170c0fb0690349f1338ed8",
                    "spanID": "b0690349f1338ed8",
                    "startTime": 1694412307723165,
                    "duration": 63230,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "5c2b05245b170c0fb0690349f1338ed8",
                    "spanID": "64db35266db53836",
                    "startTime": 1694412307727707,
                    "duration": 45418,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "5c2b05245b170c0fb0690349f1338ed8",
                    "spanID": "ec0d7a35bb9376ab",
                    "startTime": 1694412307727987,
                    "duration": 44739,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "5c2b05245b170c0fb0690349f1338ed8",
                    "spanID": "9cb0ca7c8b948562",
                    "startTime": 1694412307776443,
                    "duration": 7224,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "5c2b05245b170c0fb0690349f1338ed8",
                    "spanID": "284f57b79ef13601",
                    "startTime": 1694412307776762,
                    "duration": 6354,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        }
                    ]
                },
                {
                    "traceID": "5c2b05245b170c0fb0690349f1338ed8",
                    "spanID": "c66d2ea7d3e2bc86",
                    "startTime": 1694412307779286,
                    "duration": 1931,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.113~reviews-v3-58b6479b-d5dsv.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        }
                    ]
                },
                {
                    "traceID": "5c2b05245b170c0fb0690349f1338ed8",
                    "spanID": "cf99a50d463c5f27",
                    "startTime": 1694412307779630,
                    "duration": 708,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.100.113"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 855,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:13.000+00:00",
        "trace": {
            "traceID": "ed194d02a5c245be78a922cc517a1f36",
            "spans": [
                {
                    "traceID": "ed194d02a5c245be78a922cc517a1f36",
                    "spanID": "78a922cc517a1f36",
                    "startTime": 1694412313291539,
                    "duration": 63584,
                    "tags": [
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "ed194d02a5c245be78a922cc517a1f36",
                    "spanID": "796882d5c62d6cfe",
                    "startTime": 1694412313295961,
                    "duration": 45166,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "ed194d02a5c245be78a922cc517a1f36",
                    "spanID": "4acb5aa9f9d3eeeb",
                    "startTime": 1694412313296259,
                    "duration": 44468,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "ed194d02a5c245be78a922cc517a1f36",
                    "spanID": "04bda6475a985775",
                    "startTime": 1694412313344855,
                    "duration": 7374,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        }
                    ]
                },
                {
                    "traceID": "ed194d02a5c245be78a922cc517a1f36",
                    "spanID": "dbf4ce504240ae99",
                    "startTime": 1694412313345185,
                    "duration": 6101,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "ed194d02a5c245be78a922cc517a1f36",
                    "spanID": "60181d868bb936f5",
                    "startTime": 1694412313347554,
                    "duration": 2494,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "ed194d02a5c245be78a922cc517a1f36",
                    "spanID": "0cef5227897f42bb",
                    "startTime": 1694412313347906,
                    "duration": 837,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 856,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:13.000+00:00",
        "trace": {
            "traceID": "f1e73c867e935bdca62fa605fbc5be4c",
            "spans": [
                {
                    "traceID": "f1e73c867e935bdca62fa605fbc5be4c",
                    "spanID": "a62fa605fbc5be4c",
                    "startTime": 1694412313213953,
                    "duration": 63610,
                    "tags": [
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "f1e73c867e935bdca62fa605fbc5be4c",
                    "spanID": "907f07c8cd819e41",
                    "startTime": 1694412313218326,
                    "duration": 47184,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "f1e73c867e935bdca62fa605fbc5be4c",
                    "spanID": "1a46202c4253e6fe",
                    "startTime": 1694412313218641,
                    "duration": 45990,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "f1e73c867e935bdca62fa605fbc5be4c",
                    "spanID": "5ed2e5aad6676ee5",
                    "startTime": 1694412313269698,
                    "duration": 5946,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "f1e73c867e935bdca62fa605fbc5be4c",
                    "spanID": "f9af33f4121cd88c",
                    "startTime": 1694412313270018,
                    "duration": 5256,
                    "tags": [
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        }
                    ]
                },
                {
                    "traceID": "f1e73c867e935bdca62fa605fbc5be4c",
                    "spanID": "abcd68f11aac7736",
                    "startTime": 1694412313272539,
                    "duration": 1507,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "f1e73c867e935bdca62fa605fbc5be4c",
                    "spanID": "707b4c1c7a88a024",
                    "startTime": 1694412313272897,
                    "duration": 810,
                    "tags": [
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.69~ratings-v1-85cc46b6d4-z5lc8.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "http.url",
                            "value": "http://ratings:9080/ratings/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.109"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "ratings"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 857,
        "service": "productpage.default",
        "api": "/productpage",
        "time": "2023-09-11T06:05:12.000+00:00",
        "trace": {
            "traceID": "d901a318c036d4cacf43f25095118eaa",
            "spans": [
                {
                    "traceID": "d901a318c036d4cacf43f25095118eaa",
                    "spanID": "cf43f25095118eaa",
                    "startTime": 1694412312485707,
                    "duration": 57280,
                    "tags": [
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.url",
                            "value": "http://10.244.100.104:9080/productpage"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "d901a318c036d4cacf43f25095118eaa",
                    "spanID": "deefa3aa8f5c2557",
                    "startTime": 1694412312490188,
                    "duration": 43289,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                },
                {
                    "traceID": "d901a318c036d4cacf43f25095118eaa",
                    "spanID": "26845f45f24ea692",
                    "startTime": 1694412312490564,
                    "duration": 41998,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://details:9080/details/0"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "details"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.103~details-v1-7d4d9d5fcb-ff2qg.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        }
                    ]
                },
                {
                    "traceID": "d901a318c036d4cacf43f25095118eaa",
                    "spanID": "e3b6aa5bacb1ba44",
                    "startTime": 1694412312534195,
                    "duration": 1845,
                    "tags": [
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.6.152~reviews-v1-777df99c6d-pst8b.default~default.svc.cluster.local"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "reviews"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        }
                    ]
                },
                {
                    "traceID": "d901a318c036d4cacf43f25095118eaa",
                    "spanID": "7f25b1c94d6940af",
                    "startTime": 1694412312538006,
                    "duration": 2760,
                    "tags": [
                        {
                            "key": "node_id",
                            "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                        },
                        {
                            "key": "http.method",
                            "value": "GET"
                        },
                        {
                            "key": "peer.address",
                            "value": "10.244.100.104"
                        },
                        {
                            "key": "istio.canonical_service",
                            "value": "productpage"
                        },
                        {
                            "key": "http.url",
                            "value": "http://reviews:9080/reviews/0"
                        },
                        {
                            "key": "http.status_code",
                            "value": "200"
                        },
                        {
                            "key": "istio.namespace",
                            "value": "default"
                        }
                    ]
                }
            ]
        }
    }
]`