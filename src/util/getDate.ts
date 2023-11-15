/**
 * 현재시간 가져오기 예: "2023-11-09 17:47:47"
 * @returns
 */
export const getNow = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
/**
 * 현재시간과의 차이를 계산
 * 1분미만=>방금 전, 1시간 미만=> N분전, 1일 미만=>N시간 전, 이후 N일 전
 * @param inputTime
 * @returns
 */
export const getTimeDifference = (inputTime: string): string => {
  const currentTime = new Date();
  const inputDate = new Date(inputTime);
  const diffInSeconds = Math.floor((currentTime.getTime() - inputDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}분 전`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  } else {
    return `${Math.floor(diffInSeconds / 86400)}일 전`;
  }
};
