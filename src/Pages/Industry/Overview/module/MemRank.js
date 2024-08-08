import { Stack } from "@mui/material";
import SummaryBox, { SUMMARY_TYPE } from "../../components/SummaryBox";
import BarChart from "../../components/ECharts/BarChar";
import { useSelector } from "react-redux";

import { useIntl } from 'react-intl';

function retain(value, n) {
  if(n === 'null' || n === 'undefined' || n === 0) return parseInt(value);
  let tran = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
  let tranV = tran.toString();
  let newVal = tranV.indexOf('.');
  if(newVal < 0) {
    tranV += '.';
  };
  for(let i = tranV.length - tranV.indexOf('.'); i <= n; i++) {
    tranV += '0';
  };
  return tranV;
}

function getUnit(value){
  if (value < 1000) {
    return 1;
  } else if (value < 1000_000) {
    return 1000_000;
  } else if (value < 1000_000_000) {
    return 1000_000_000;
  } else if (value < 1000_000_000_000) {
    return 1000_000_000_000;
  }
  return -1;
}

function findMostFrequent(arr) {
  // 使用 Map 来存储每个元素的出现次数
  const frequencyMap = arr.reduce((map, item) => {
      map.set(item, (map.get(item) || 0) + 1);
      return map;
  }, new Map());

  // 找出出现次数最多的元素
  let mostFrequentElements = [];
  let maxCount = 0;

  for (const [element, count] of frequencyMap) {
      if (count > maxCount) {
          maxCount = count;
          mostFrequentElements = [element];
      } else if (count === maxCount) {
          mostFrequentElements.push(element);
      }
  }
  return mostFrequentElements;
}

function findMedian(arr) {
  if (arr.length === 0) return null; // 处理空数组的情况
  // 对数组进行排序
  const sortedArr = [...arr].sort((a, b) => a - b);
  const midIndex = Math.floor((sortedArr.length - 1) / 2);
  // 判断数组长度是奇数还是偶数
  return sortedArr[midIndex];
}

function processData(data){
  const unit = data.map(num => getUnit(num));
  const mostFrequent = findMostFrequent(unit);
  const mid = findMedian(mostFrequent);
  let unitStr;
  switch(mid){
    case 1_000:
      unitStr = "KB";
      break;
    case 1_000_000:
      unitStr = "MB";
      break;
    case 1_000_000_000:
      unitStr = "GB";
      break;
  }
  return [data.map(num => retain(num / mid, 3)), unitStr];
}

export function MemRank() {
  const { serviceList } = useSelector(state => state.Industry);
  if (serviceList){
    var services = serviceList.map(item => item.name);
    var memUsed = serviceList.map(item => item.mem);
  } else {
    var services = [];
    var memUsed = [];
  }
  const dataLength = services.length;
  const [data, unit] = processData(memUsed);

  const intl = useIntl();
  
  return (
    <Stack sx={{
      width: '100%',
      height: '100%',
      flexGrow:7,
    }}>
      <SummaryBox title={intl.messages['industry.overviews.memCard']} type={SUMMARY_TYPE.GRAPH} children={
        <BarChart label={services} value={data} num={dataLength} unit={unit} />
      }/>
    </Stack>
  )
}