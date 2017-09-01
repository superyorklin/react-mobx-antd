export default function(time,type){
  let fullDate = new Date(time);
  let year = fullDate.getFullYear();
  let month = Prefix(+fullDate.getMonth() + 1);
  let date = Prefix(fullDate.getDate());
  let hour = Prefix(fullDate.getHours());
  let minute = Prefix(fullDate.getMinutes());
  let second = Prefix(fullDate.getSeconds());
  if(type === 'type1'){
    return `${year}-${month}-${date}`;
  }if(type === 'type2'){
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  }
}
function Prefix(num){
  return (Array(2).join(0) + num).slice(-2);
}