export const updateobject = (oldobject, updatedproperty) => {
  return {
    ...oldobject,
    ...updatedproperty,
  };
};
