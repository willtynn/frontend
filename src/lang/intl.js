import { messages as enMessages } from './en';
import { messages as cnMessages } from './cn';

// 将嵌套的扁平化，例如嵌套在sideBar中的si，会转换为sideBar.si
function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

export const messages = {
  en: flattenMessages(enMessages),
  'zh-CN': flattenMessages(cnMessages),
};
