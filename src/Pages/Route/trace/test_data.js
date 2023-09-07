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
        "id": 63,
        "service": "productpage.default",
        "time": "2023-09-07T00:30:48.000+00:00",
        "trace": {
            "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
            "spans": [
                {
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "043fa5f1a8d7ba29",
                    "startTime": 1693046647759848,
                    "duration": 60719,
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
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "8ec21f1fb589bd93",
                    "startTime": 1694046647764017,
                    "duration": 45003,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "a13a33793f0d7dce",
                    "startTime": 1694046647764295,
                    "duration": 44329,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "ed6b3b36fb603326",
                    "startTime": 1694046647812157,
                    "duration": 6363,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "ce6004b56fcd2287",
                    "startTime": 1694046647812548,
                    "duration": 5618,
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
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "2b1b24d7a00db5e0",
                    "startTime": 1694046647815396,
                    "duration": 1538,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "ab739f415086c232",
                    "startTime": 1694046647815728,
                    "duration": 791,
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
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 64,
        "service": "reviews.default",
        "time": "2023-09-07T00:30:48.000+00:00",
        "trace": {
            "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
            "spans": [
                {
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "043fa5f1a8d7ba29",
                    "startTime": 1694046647759848,
                    "duration": 60719,
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
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "8ec21f1fb589bd93",
                    "startTime": 1694046647764017,
                    "duration": 45003,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "a13a33793f0d7dce",
                    "startTime": 1694046647764295,
                    "duration": 44329,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "ed6b3b36fb603326",
                    "startTime": 1694046647812157,
                    "duration": 6363,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "ce6004b56fcd2287",
                    "startTime": 1694046647812548,
                    "duration": 5618,
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
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "2b1b24d7a00db5e0",
                    "startTime": 1694046647815396,
                    "duration": 1538,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "ab739f415086c232",
                    "startTime": 1694046647815728,
                    "duration": 791,
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
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 65,
        "service": "details.default",
        "time": "2023-09-07T00:30:48.000+00:00",
        "trace": {
            "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
            "spans": [
                {
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "043fa5f1a8d7ba29",
                    "startTime": 1694046647759848,
                    "duration": 60719,
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
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "8ec21f1fb589bd93",
                    "startTime": 1694046647764017,
                    "duration": 45003,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "a13a33793f0d7dce",
                    "startTime": 1694046647764295,
                    "duration": 44329,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "ed6b3b36fb603326",
                    "startTime": 1694046647812157,
                    "duration": 6363,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "ce6004b56fcd2287",
                    "startTime": 1694046647812548,
                    "duration": 5618,
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
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "2b1b24d7a00db5e0",
                    "startTime": 1694046647815396,
                    "duration": 1538,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "ab739f415086c232",
                    "startTime": 1694046647815728,
                    "duration": 791,
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
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 66,
        "service": "ratings.default",
        "time": "2023-09-07T00:30:48.000+00:00",
        "trace": {
            "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
            "spans": [
                {
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "043fa5f1a8d7ba29",
                    "startTime": 1694046647759848,
                    "duration": 60719,
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
                            "key": "peer.address",
                            "value": "10.244.36.192"
                        }
                    ]
                },
                {
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "8ec21f1fb589bd93",
                    "startTime": 1694046647764017,
                    "duration": 45003,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "a13a33793f0d7dce",
                    "startTime": 1694046647764295,
                    "duration": 44329,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "ed6b3b36fb603326",
                    "startTime": 1694046647812157,
                    "duration": 6363,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "ce6004b56fcd2287",
                    "startTime": 1694046647812548,
                    "duration": 5618,
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
                            "value": "sidecar~10.244.100.109~reviews-v2-cdd8fb88b-jswrn.default~default.svc.cluster.local"
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "2b1b24d7a00db5e0",
                    "startTime": 1694046647815396,
                    "duration": 1538,
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
                    "traceID": "26c88bd0f22e008a043fa5f1a8d7ba29",
                    "spanID": "ab739f415086c232",
                    "startTime": 1694046647815728,
                    "duration": 791,
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
                        }
                    ]
                }
            ]
        }
    }
]`