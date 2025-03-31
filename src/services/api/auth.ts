import axios from "axios";

/*get all options*/
export async function signin(payload) {
  try {
    //const {data} = await axios.post(`login`, payload);
    return payload;
  } catch (error) {
    throw new Error();
  }
}