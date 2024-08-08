// 源码结构来自 https://gridstackjs.com/demo/react.html 与 https://gridstackjs.com/demo/react-hooks.html
// 按F12看的源代码，本文件杂糅了两个方法的代码
// 同时还参考了 https://codepen.io/hjerhfqj-the-solid/pen/dyLMJpW?editors=0010 的代码
// 存在问题是不能修改init中的column数，否则可能无法正常使用
// import 'gridstack/dist/gridstack-extra.min.css';
// 通过handle来移动控件而不是整个控件都可以拖拽，解决了无法选中控件内的内容的问题

import { GridStack } from 'gridstack';
import { Button, Stack } from "@mui/material";
import 'gridstack/dist/gridstack.min.css';
import Handle from '@/assets/ResizeHandle.svg';
import Refresh from '@/assets/Refresh.svg';
import React, {
  useRef,
  useLayoutEffect
} from 'react';

import { RunStatus } from "./module/RunStatus";
import { CpuRank } from "./module/CpuRank";
import { MemRank } from "./module/MemRank";
import { ServiceList } from "./module/ServiceList";
import {Box} from "@mui/system";


export default function IndustryOverview() {

  let grid = null
  const refs = useRef({});
  const gridRef = useRef(null);

  const initalItems = [
    { id: "RunStatus", component: <RunStatus />, x:0, y:0, w:12, h:1, minW:8, minH:1, maxW:12, maxH:1 },
    { id: "CpuRank", component: <CpuRank />, x:0, y:1, w:6, h:4, minW:4, minH:4, maxW:8, maxH:6 },
    { id: "MemRank", component: <MemRank />, x:6, y:1, w:6, h:4, minW:4, minH:4, maxW:8, maxH:6 },
    { id: "ServiceList", component: <ServiceList />, x:0, y:5, w:12, h:5, minW:12, minH:4, maxW:12, maxH:8 }
  ]

  const position_memory = localStorage.getItem('industry_overview_position_memory');
  if(position_memory && position_memory !== 'null'){
    const position = JSON.parse(position_memory);
    // 需要是字典
    try{
      // 修改initalItems中的属性
      initalItems.forEach(item => {
        const mem = position.find(mem => mem.id === item.id);
        if(mem){
          item.x = mem.x;
          item.y = mem.y;
          item.w = mem.w;
          item.h = mem.h;
        }
      });
    } catch(e){
      console.error('Error in parsing position memory:', e);
    }
  }

  const [items, setItems] = React.useState(initalItems);

  useLayoutEffect(() => {
    grid = GridStack.init({
      float: false,
      minRow: 1,
      maxRow: 15,
      cellHeight: "100px",
      margin: 5,
      handle: '.drag-handle',
    });

    grid.on("change", (_, items_) => {
      // 修改items中的属性并且更新localStorage
      const newItems = items.map(item => {
        const node = items_.find(i => i.id === item.id);
        if (!node) return item;
        return {
          ...item,
          x: node.x, y: node.y, w: node.w, h: node.h
        }
      });
      setItems(newItems);
      
      const mem = newItems.map(item => {
        return {
          id: item.id, x: item.x, y: item.y, w: item.w, h: item.h
        }
      });
      localStorage.setItem('industry_overview_position_memory', JSON.stringify(mem));
    });
  });

  return (
      <Box sx={{
        padding: '0 24px 24px 24px',
        height:'100%',
        width:'100%'
      }}>
        <Button 
          sx={{
            left: 'calc(100% - 80px)',
          }}
          onClick={() => {
            // 清除localStorage的position memory
            localStorage.removeItem('industry_overview_position_memory');
            // 刷新页面
            window.location.reload();
          }}>
          <Refresh  style={{ width: '24px', height: '24px', fill: '#222222' }}/>
        </Button>

        <div ref={gridRef} className="grid-stack" style={{ 
            margin: "0px 30px 0px 0px" // 上 右 下 左 
          }} >
            {items.map((item, i) => {
              return (
                <div
                  ref={refs.current[item.id]}
                  key={item.id}
                  className="grid-stack-item"
                  style={{
                  }}
                  gs-id={item.id}
                  gs-w={item.w}
                  gs-h={item.h}
                  gs-x={item.x}
                  gs-y={item.y}
                  gs-max-w={item.maxW}
                  gs-min-w={item.minW}
                  gs-max-h={item.maxH}
                  gs-min-h={item.minH}
                >
                  <Stack className="grid-stack-item-content" sx={{ 
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <div className="drag-handle" style={{
                        width: '13px',
                        height: 'calc(98% - 10px)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid #e8e8e8',
                        borderRadius: '12px',
                        backgroundColor: '#ededed',
                        marginRight: '3px',
                      }}>
                      <Handle style={{ width: '12px', fill: '#222222' }}/>
                    </div>
                    {item.component}
                  </Stack>
                </div>
              );
            })}
        </div>
      </Box>
  )
}