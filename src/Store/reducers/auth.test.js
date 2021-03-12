import * as actiontypes from "./../actions/actionTypes";
import reducer from "./auth";
describe("test auth reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      error: null,
      tokenid: null,
      userid: null,
      loading: false,
      redirectpath: "/",
    });
  });
  it("should return token store", () => {
    expect(
      reducer(
        {
          error: null,
          tokenid: null,
          userid: null,
          loading: false,
          redirectpath: "/",
        },
        {
          type: actiontypes.AUTH_SUCCESS,
          tokenid: "some value",
          userid: "somvalue",
        }
      )
    ).toEqual({
      error: null,
      tokenid: "some value",
      userid: "somvalue",
      loading: false,
      redirectpath: "/",
    });
  });
});
