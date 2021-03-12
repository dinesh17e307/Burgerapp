import React from "react";
import Navigationitems from "./Navigationitems";
import { configure, shallow } from "enzyme";
import NavigationItem from "../Navigationitem/Navigationitem";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
describe("<Navigationitems/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Navigationitems />);
  });
  it("it should render two link navigations while not authenticating", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it("it should render two link navigations while  authenticating", () => {
    // wrapper = shallow(<Navigationitems isauth />);
    wrapper.setProps({ isauth: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it("it should render two link navigations while logout authenticating", () => {
    // wrapper = shallow(<Navigationitems isauth />);
    wrapper.setProps({ isauth: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">logout</NavigationItem>)
    ).toEqual(true);
  });
});
