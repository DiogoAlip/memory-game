export interface TimeState {
  minutes: number;
  seconds: number;
}

export type TimeAction = 
  | { type: "Set Second"; payload: number }
  | { type: "Set Minute"; payload: number }
  | { type: "Set Time"; payload: TimeState };

export const timeReducer = (initialTime: TimeState, action: TimeAction): TimeState => {
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
