export const updateobject = (oldobject, updatedproperty) => {
  return {
    ...oldobject,
    ...updatedproperty,
  };
};
export const checkvalid = (value, rules) => {
  let isvalid = true;
  if (rules.required) {
    isvalid = value.trim() !== "" && isvalid;
  }
  if (rules.minlength) {
    isvalid = value.length >= rules.minlength && isvalid;
  }
  if (rules.maxlength) {
    isvalid = value.length <= rules.maxlength && isvalid;
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isvalid = pattern.test(value) && isvalid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isvalid = pattern.test(value) && isvalid;
  }
  return isvalid;
};
