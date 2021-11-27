export const saveLocalStorage = function (id: any, value: string) {
  // 将用户搜索的内容存入localstorage
  if (!localStorage.getItem(id)) {
    localStorage.setItem(id, '' + [value]);
  } else {
    let storage: any = localStorage.getItem(id)
    let storage1 = storage.split(",");
    // 如果原先有相同的数据，return
    if (storage1.find((item: string) => item === value)) {
      return
    }
    storage.push(value);
    localStorage.setItem(id, '' + storage);

  }
}
