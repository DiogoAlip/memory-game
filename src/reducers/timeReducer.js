  export const timeReducer = (initialTime, action) => {
  switch (action.type) {
    case "Set Second":
      return { ...initialTime, seconds: action.payload };
    case "Set Minute":
      return { ...initialTime, minutes: action.payload };
    case "Set Time":
      return { ...action.payload };
    default:
      return initialTime;
  }
};
