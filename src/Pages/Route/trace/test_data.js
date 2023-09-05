export const test_data = `[
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 161839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 1561839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "b9a709147bf63c69239e66db3b671162",
        "spans": [
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "239e66db3b671162",
                "startTime": 1693298224953616,
                "duration": 66026,
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
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "af47f55e311b6dc6",
                "startTime": 1693298224959657,
                "duration": 46091,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "2c68f878b6c83c2f",
                "startTime": 1693298224959960,
                "duration": 44641,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "ed95a889dd732995",
                "startTime": 1693298225010169,
                "duration": 6901,
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
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "683d1836350e757d",
                "startTime": 1693298225010574,
                "duration": 6059,
                "tags": [
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
                    },
                    {
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "5ced8f45d02dbc41",
                "startTime": 1693298225013584,
                "duration": 1725,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "cba157885aa3a824",
                "startTime": 1693298225014086,
                "duration": 853,
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
                    }
                ]
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "b9a709147bf63c69239e66db3b671162",
        "spans": [
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "239e66db3b671162",
                "startTime": 1693298224953616,
                "duration": 66026,
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
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "af47f55e311b6dc6",
                "startTime": 1693298224959657,
                "duration": 46091,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "2c68f878b6c83c2f",
                "startTime": 1693298224959960,
                "duration": 44641,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "ed95a889dd732995",
                "startTime": 1693298225010169,
                "duration": 6901,
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
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "683d1836350e757d",
                "startTime": 1693298225010574,
                "duration": 6059,
                "tags": [
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
                    },
                    {
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "5ced8f45d02dbc41",
                "startTime": 1693298225013584,
                "duration": 1725,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "cba157885aa3a824",
                "startTime": 1693298225014086,
                "duration": 853,
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
                    }
                ]
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "b9a709147bf63c69239e66db3b671162",
        "spans": [
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "239e66db3b671162",
                "startTime": 1693298224953616,
                "duration": 66026,
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
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "af47f55e311b6dc6",
                "startTime": 1693298224959657,
                "duration": 46091,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "2c68f878b6c83c2f",
                "startTime": 1693298224959960,
                "duration": 44641,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "ed95a889dd732995",
                "startTime": 1693298225010169,
                "duration": 6901,
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
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "683d1836350e757d",
                "startTime": 1693298225010574,
                "duration": 6059,
                "tags": [
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
                    },
                    {
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "5ced8f45d02dbc41",
                "startTime": 1693298225013584,
                "duration": 1725,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "cba157885aa3a824",
                "startTime": 1693298225014086,
                "duration": 853,
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
                    }
                ]
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "b9a709147bf63c69239e66db3b671162",
        "spans": [
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "239e66db3b671162",
                "startTime": 1693298224953616,
                "duration": 66026,
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
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "af47f55e311b6dc6",
                "startTime": 1693298224959657,
                "duration": 46091,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "2c68f878b6c83c2f",
                "startTime": 1693298224959960,
                "duration": 44641,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "ed95a889dd732995",
                "startTime": 1693298225010169,
                "duration": 6901,
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
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "683d1836350e757d",
                "startTime": 1693298225010574,
                "duration": 6059,
                "tags": [
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
                    },
                    {
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "5ced8f45d02dbc41",
                "startTime": 1693298225013584,
                "duration": 1725,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "cba157885aa3a824",
                "startTime": 1693298225014086,
                "duration": 853,
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
                    }
                ]
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "b9a709147bf63c69239e66db3b671162",
        "spans": [
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "239e66db3b671162",
                "startTime": 1693298224953616,
                "duration": 66026,
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
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "af47f55e311b6dc6",
                "startTime": 1693298224959657,
                "duration": 46091,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "2c68f878b6c83c2f",
                "startTime": 1693298224959960,
                "duration": 44641,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "ed95a889dd732995",
                "startTime": 1693298225010169,
                "duration": 6901,
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
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "683d1836350e757d",
                "startTime": 1693298225010574,
                "duration": 6059,
                "tags": [
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
                    },
                    {
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "5ced8f45d02dbc41",
                "startTime": 1693298225013584,
                "duration": 1725,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "cba157885aa3a824",
                "startTime": 1693298225014086,
                "duration": 853,
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
                    }
                ]
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "b9a709147bf63c69239e66db3b671162",
        "spans": [
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "239e66db3b671162",
                "startTime": 1693298224953616,
                "duration": 66026,
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
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "af47f55e311b6dc6",
                "startTime": 1693298224959657,
                "duration": 46091,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "2c68f878b6c83c2f",
                "startTime": 1693298224959960,
                "duration": 44641,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "ed95a889dd732995",
                "startTime": 1693298225010169,
                "duration": 6901,
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
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "683d1836350e757d",
                "startTime": 1693298225010574,
                "duration": 6059,
                "tags": [
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
                    },
                    {
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "5ced8f45d02dbc41",
                "startTime": 1693298225013584,
                "duration": 1725,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "cba157885aa3a824",
                "startTime": 1693298225014086,
                "duration": 853,
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
                    }
                ]
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "b9a709147bf63c69239e66db3b671162",
        "spans": [
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "239e66db3b671162",
                "startTime": 1693298224953616,
                "duration": 66026,
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
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "af47f55e311b6dc6",
                "startTime": 1693298224959657,
                "duration": 46091,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "2c68f878b6c83c2f",
                "startTime": 1693298224959960,
                "duration": 44641,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "ed95a889dd732995",
                "startTime": 1693298225010169,
                "duration": 6901,
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
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "683d1836350e757d",
                "startTime": 1693298225010574,
                "duration": 6059,
                "tags": [
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
                    },
                    {
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "5ced8f45d02dbc41",
                "startTime": 1693298225013584,
                "duration": 1725,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "cba157885aa3a824",
                "startTime": 1693298225014086,
                "duration": 853,
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
                    }
                ]
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "427d6936879b5901c77a532d88dad55f",
        "spans": [
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "c77a532d88dad55f",
                "startTime": 1693298225032431,
                "duration": 61839,
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
                        "key": "node_id",
                        "value": "sidecar~10.244.100.104~productpage-v1-7b4dbf9c75-mhx4r.default~default.svc.cluster.local"
                    }
                ]
            },
            {
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "d030611be934d62d",
                "startTime": 1693298225037469,
                "duration": 47699,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "70e11a5404580fb3",
                "startTime": 1693298225037792,
                "duration": 46910,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "507705a45fb36d3c",
                "startTime": 1693298225083624,
                "duration": 2006,
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
                "traceID": "427d6936879b5901c77a532d88dad55f",
                "spanID": "af82a8c19209af8c",
                "startTime": 1693298225089152,
                "duration": 3172,
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
            }
        ]
    },
    {
        "traceID": "b9a709147bf63c69239e66db3b671162",
        "spans": [
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "239e66db3b671162",
                "startTime": 1693298224953616,
                "duration": 66026,
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
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "af47f55e311b6dc6",
                "startTime": 1693298224959657,
                "duration": 46091,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "2c68f878b6c83c2f",
                "startTime": 1693298224959960,
                "duration": 44641,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "ed95a889dd732995",
                "startTime": 1693298225010169,
                "duration": 6901,
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
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "683d1836350e757d",
                "startTime": 1693298225010574,
                "duration": 6059,
                "tags": [
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
                    },
                    {
                        "key": "http.url",
                        "value": "http://reviews:9080/reviews/0"
                    }
                ]
            },
            {
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "5ced8f45d02dbc41",
                "startTime": 1693298225013584,
                "duration": 1725,
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
                "traceID": "b9a709147bf63c69239e66db3b671162",
                "spanID": "cba157885aa3a824",
                "startTime": 1693298225014086,
                "duration": 853,
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
                    }
                ]
            }
        ]
    }
]`