export default {
  name: obj => obj,
  memorableDates: obj => obj.birthday ?
    [{ date: obj.birthday, type: "BIRTHDAY" }] :
    []
};