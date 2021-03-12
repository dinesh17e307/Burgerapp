import React from "react";
import Navigationitems from "./Navigationitems";
import { configure, shallow } from "enzyme";
import NavigationItem from "../Navigationitem/Navigationitem";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
describe("<Navigationitems/>", () => {
  it("it should render two link navigations while not authenticating", () => {
    const wrapper = shallow(<Navigationitems />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});
