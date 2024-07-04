import dayjs from 'dayjs';
const listVulgarWord = [
  'đéo',
  'ngu',
  'đốt',
  'vãi',
  'cặc',
  'lồn',
  'buồi',
  'chó',
  'đụ',
  'mẹ mày',
  'bố mày',
  'đéo mẹ',
  'địt',
  'con mẹ nó',
  'đụ mẹ',
  'vcl',
  'vcl đ',
  'đm',
  'dm',
  'cc',
  'cl',
  'vl',
  'vler',
  'vl thật',
  'vl vãi',
  'vãi lồn',
  'đờ mờ',
  'đếch',
  'cmm',
  'vãi đái',
  'đmcl',
  'đkm',
  'ccmm',
  'mmd',
  'vcd',
  'con cặc',
  'thằng chó',
  'thằng ngu',
  'con đĩ',
  'đéo đùa',
  'dái',
  'cứt',
  'fuck',
  'shit',
  'bitch',
];
const listFilter = [
  { name: 'Phim bộ', path: 'series' },
  { name: 'Phim lẻ', path: 'single' },
  { name: 'Đang diễn ra', path: 'ongoing' },
  { name: 'Hoàn Thành', path: 'completed' },
  { name: 'Thuyết Minh', path: 'Thuy%E1%BA%BFt%20Minh' },
  { name: 'Lồng Tiếng', path: 'L%E1%BB%93ng%20Ti%E1%BA%BFng' },
];
export const filterNameMovie = (text: string) => {
  return listFilter.find(({ path }) => path === text)?.name || text;
};
// get ID video form URl
export const getIdVideo = (url: string) => {
  const path = url.split('v=');
  const data = path[path.length - 1];
  const findIndex = data.indexOf('&');
  if (findIndex === -1) {
    return data; // idVideo
  } else {
    return data.substring(0, findIndex); // idVideo
  }
};
// export function getIdVideo(trailerUrl: string) {
//   const urlParams = new URLSearchParams(new URL(trailerUrl).search);
//   const videoId = urlParams.get('v');
//   return videoId; // Trả về ID của video
// }

//  chuyển đổi ngày giờ và hiện thị các thứ trong tuần
export const formatViToEN = (date: string) => {
  const formatMoment = dayjs(date).format('dddd, DD/MM/YYYY - HH:mm');
  const dateData = formatMoment.split(',');
  // const firstDate = dateData[0];
  const lastDate = dateData[dateData.length - 1];
  // const tableDate = [
  //   { text: 'Monday', renderText: 'Thứ 2' },
  //   { text: 'Tuesday', renderText: 'Thứ 3' },
  //   { text: 'Wednesday', renderText: 'Thứ 4' },
  //   { text: 'Thursday', renderText: 'Thứ 5' },
  //   { text: 'Friday', renderText: 'Thứ 6' },
  //   { text: 'Saturday', renderText: 'Thứ 7' },
  //   { text: 'Sunday', renderText: 'Chủ Nhật' },
  // ];
  // const findDate: any = tableDate.find(({ text }) => text === firstDate);
  return lastDate;
};
export const formatDate = (date: string) => {
  const formatMoment = dayjs(date).format('dddd, DD/MM/YYYY - HH:mm');
  const dateData = formatMoment.split(',');
  const firstDate = dateData[0];
  const lastDate = dateData[dateData.length - 1];
  const tableDate = [
    { text: 'Monday', renderText: 'Thứ 2' },
    { text: 'Tuesday', renderText: 'Thứ 3' },
    { text: 'Wednesday', renderText: 'Thứ 4' },
    { text: 'Thursday', renderText: 'Thứ 5' },
    { text: 'Friday', renderText: 'Thứ 6' },
    { text: 'Saturday', renderText: 'Thứ 7' },
    { text: 'Sunday', renderText: 'Chủ Nhật' },
  ];
  const findDate: any = tableDate.find(({ text }) => text === firstDate);
  return { ...findDate, lastDate: lastDate };
};
export const convertJson = (value: any) => {
  var parsedJSON = JSON?.parse(value);
  return parsedJSON;
};

export const checkVulgarWord = (text: string) => {
  const arrayText = text.split(' ');
  const isCheckValue = listVulgarWord.some((item) => arrayText.some((it) => it === item));
  return isCheckValue;
};
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
}
export const extractNumber = (currencyString: string) => {
  // Remove non-numeric characters except the dot
  const numericString = currencyString.replace(/[^\d.]/g, '');

  // Convert the cleaned string to a number
  const number = parseFloat(numericString.replace(/\./g, ''));

  return number;
};
export const formatNumber = (num: number) => {
  return num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '0';
};
