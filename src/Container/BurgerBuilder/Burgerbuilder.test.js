import { Burgerbuilder } from "./Burgerbuilder";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Buildcontrols from "./../../Components/Layout/Burger/Buildcontrols/Buildcontrols";
configure({ adapter: new Adapter() });
describe("<Burgerbuilder/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Burgerbuilder initingredient={() => {}} />);
  });
  it("burgerbuilder check", () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(Buildcontrols)).toHaveLength(1);
  });
});
