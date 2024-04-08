export const dataValidation = (login, password) => {
  let reg = /^([A-Za-z0-9_\-.+%])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  let passVal = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{3,128}/g;
  if (!reg.test(login) || !passVal.test(password)) {
    return false;
  } else {
    return true;
  }
};
