export const saveLocalStorage = function (id, value) {
  // 将用户搜索的内容存入localstorage
  if (!localStorage.getItem(id)) {
    localStorage.setItem(id, [value]);
  } else {
    let storage = localStorage.getItem(id).split(",");
    // 如果原先有相同的数据，return
    if (storage.find(item => item === value)) {
      return
    }
    storage.push(value);
    localStorage.setItem(id, storage);

  }
}
