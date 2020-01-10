import axios from 'axios'
export async function  getParams(url,data){
  return await axios.get(url, {
    params:data
  })
  .then(res=>res.data)
  .catch((e)=>{
    throw e
  });
}
export async function postParams(url,data){
  return await axios.post(url, data)
  .then(res=>res.data)
  .catch((e)=>{
    throw e
  });
}