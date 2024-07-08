import { grey, green, blue, red, orange } from "@ant-design/colors";

export const SKILLS_LIST = [
  { label: "React.JS", value: "REACT.JS" },
  { label: "React Native", value: "REACT NATIVE" },
  { label: "Vue.JS", value: "VUE.JS" },
  { label: "Angular", value: "ANGULAR" },
  { label: "Nest.JS", value: "NEST.JS" },
  { label: "NodeJS", value: "NODEJS" },
  { label: "TypeScript", value: "TYPESCRIPT" },
  { label: "Java", value: "JAVA" },
  { label: "Frontend", value: "FRONTEND" },
  { label: "Backend", value: "BACKEND" },
  { label: "Fullstack", value: "FULLSTACK" },
  { label: "Dot.Net", value: "DOTNET" },
  { label: "Spring Boot", value: "SPRINGBOOT" },
  { label: "IT Support", value: "ITSUPPORT" },
  { label: "Tester", value: "TESTER" },
  { label: "Business Analyst", value: "BA" },
  { label: "English", value: "ENGLISH" },
  { label: "Japanese", value: "JAPANESE" },
  { label: "PHP", value: "PHP" },
  { label: "Laravel", value: "LARAVEL" },
  { label: "Python", value: "PYTHON" },
  { label: "Django", value: "DJANGO" },
  { label: "Unity", value: "UNITY" },
  { label: "MySQL", value: "MySQL" },
  { label: "MongoDB", value: "MONGODB" },
  { label: "Posgresql", value: "POSGRESQL" },
  { label: "SQL Server", value: "SQLSERVER" },
  { label: "C++", value: "CPP" },
  { label: "Kotlin", value: "KOTLIN" },
  { label: "Android", value: "ANDROID" },
  { label: "Swift", value: "SWIFT" },
  { label: "IOS", value: "IOS" },
  { label: "Wordpress", value: "WORDPRESS" },
  { label: "C#", value: "C#" },
];

export const LEVEL_LIST = [
  { label: "Intern", value: "INTERN" },
  { label: "Fresher", value: "FRESHER" },
  { label: "Junior", value: "JUNIOR" },
  { label: "Middle", value: "MIDDLE" },
  { label: "Senior", value: "SENIOR" },
];
export const SALARY_LIST = [
  { label: "0 - 5M", value: "0" },
  { label: "5M - 10M", value: "1" },
  { label: "10M - 15M", value: "2" },
  { label: "15M - 20M", value: "3" },
  { label: "20M - 25M", value: "4" },
  { label: "Other", value: "5" },
];
export const LOCATION_LIST = [
  { label: "Hà Nội", value: "HANOI" },
  { label: "Hồ Chí Minh", value: "HOCHIMINH" },
  { label: "Đà Nẵng", value: "DANANG" },
  { label: "Thanh Hóa", value: "THANHHOA" },
  { label: "Hà Nam", value: "HANAM" },
  { label: "Bắc Ninh", value: "BACNINH" },

  // { label: "Others", value: "OTHER" },
  // { label: "Tất cả thành phố", value: "ALL" },
];

export const nonAccentVietnamese = (str: string) => {
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};

export const convertSlug = (str: string) => {
  str = nonAccentVietnamese(str);
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from =
    "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
  const to =
    "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

export const getLocationName = (value: string) => {
  const locationFilter = LOCATION_LIST.filter((item) => item.value === value);
  if (locationFilter.length) return locationFilter[0].label;
  return "unknown";
};

export function colorMethod(
  method: "POST" | "PUT" | "GET" | "DELETE" | string
) {
  switch (method) {
    case "POST":
      return green[6];
    case "PUT":
      return orange[6];
    case "GET":
      return blue[6];
    case "DELETE":
      return red[6];
    default:
      return grey[10];
  }
}

export function isDate(value: any) {
  return value instanceof Date;
}

export const formatDateFunction = (value: Date | string | undefined) => {
  if (value instanceof Date || typeof value === "string") {
    const date = new Date(value);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }
  return "";
};
