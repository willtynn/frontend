import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useEffect } from 'react';
import { AnsiUp } from 'ansi_up';
import { set } from 'lodash';

export function MonitorLog() {


    //创建与文本框绑定的对象，从而展示日志
    const [log, setLog] = useState("");
    useEffect(() => {
        // 采用websocket和后端通信
        //TODO:修改掉
        let ws = new WebSocket('ws://100.105.103.116:30030/log')
        // 连接成功后的回调函数
        ws.onopen = function (params) {
            console.log('客户端连接成功')
            console.log(params);
            setLog(log => "");
        };
        ws.onmessage = event => {
            // 后端发送的消息在event.data中
            console.log("后端发送的数据为")
            console.log(event.data)

            //转化为带style的html格式
            var ansi_up = new AnsiUp;
            var html = ansi_up.ansi_to_html(event.data);
            let replaceRegex = /(\n\r|\r\n|\r|\n)/g;
            html = log + html.replace(replaceRegex, '<br/>')
            setLog(log => log + html)
        }

        var intervalID = setInterval(() => {
            ws.send("get");
        }, 1000)

        //返回函数，组件卸载的时候断开ws连接
        return () => {
            // 关闭WebSocket连接
            try {
                ws.send("end");
                console.log("断开")
            } catch (error) {
                console.error('Error closing WebSocket:', error);
            }
            clearInterval(intervalID);
        };
    }, [])

    return (
            <Box border={1} sx={{ height: "500px"}}>
                <div dangerouslySetInnerHTML={{ __html: log }} 
                style={{ overflow: 'scroll',height:"500px",background:"	#F0F8FF"}}></div>
            </Box >
    );
}