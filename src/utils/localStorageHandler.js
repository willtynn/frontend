//含有过期时间设置localstorage
export function setLocalStorage(key, value, expire) {
    let obj = {
      data: value,
      time: Date.now(),
      expire: expire,
    };
    localStorage.setItem(key, JSON.stringify(obj));
  }
  
  //取出相应值，若过期，返回null
  export function getLocalStorage(key) {
    let val = localStorage.getItem(key);
    if (!val) {
      return val;
    }
    val = JSON.parse(val);
    if (Date.now() - val.time > val.expire) {
      localStorage.removeItem(key);
      return null;
    }
    return val.data;
  }
  
  //设置错误登录次数
  export function setFailedLoginNum() {
    let value = 1;
    let oldObj = localStorage.getItem('failedLogin');
    //获取登陆失败次数,设置新值
    if (oldObj) {
      oldObj = JSON.parse(oldObj);
      if (oldObj.data < 3) {
        value = oldObj.data + 1;
      } else {
        value = 3;
      }
    }
    //获取当天12点的时间与当前时间的差值
    const expire =
      new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1) -
      Date.now();
    let obj = {
      data: value,
      time: Date.now(),
      expire: expire,
    };
  
    localStorage.setItem('failedLogin', JSON.stringify(obj));
  }
  
  //登陆成功，清除错误登录次数
  export function removeFailedLogin() {
    let val = localStorage.getItem('failedLogin');
    if (!val) {
      return;
    }
    localStorage.removeItem('failedLogin');
  }
  
  //获取错误登录次数,判断是否需要出验证码
  export function ifCaptcha() {
    let val = localStorage.getItem('failedLogin');
    if (!val) {
      return false;
    }
    val = JSON.parse(val);
    if (val.data < 3) {
      return false;
    } else {
      if (Date.now() - val.time > val.expire) {
        localStorage.removeItem('failedLogin');
        return false;
      }
      return true;
    }
  }