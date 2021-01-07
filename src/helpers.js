import { getOrdersFromDB, getOrderDetailsFromDB } from "./api";

const filterNumber = (code) => {
  let number = "";
  for (let i = 0; i < code.length; i++)
    if (code[i] >= "0" && code[i] <= "9") number += code[i];
  return parseInt(number);
};
//ex: auto Generate("LS", 123, 8) => code : LS000123
const autoGenerateCode = (quydinh, max, length) => {
  let length_numbers0 = length - quydinh.length - (max + "").length;
  let code = quydinh;
  for (let i = 1; i <= length_numbers0; i++) code += "0";
  code += max + "";
  return code;
};

const autoGenerateOrder = async () => {
  //Loại bỏ chữ cái ở trước
  let flag = 0;
  let _listTemp = [];
  await getOrdersFromDB(_listTemp);
  _listTemp.forEach((item) => {
    let number = filterNumber(item.id);
    if (number > flag) flag = number;
  });
  flag++;
  return autoGenerateCode("PDH", flag, 1);
};

const autoGenerateOrderDetail = async () => {
  let flag = 0;
  let _listTemp = [];
  await getOrderDetailsFromDB(_listTemp);
  _listTemp.forEach((item) => {
    let number = filterNumber(item.id);
    if (number > flag) flag = number;
  });
  flag++;
  return autoGenerateCode("", flag, 1);
};

export { autoGenerateOrder, autoGenerateOrderDetail };
