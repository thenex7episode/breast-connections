import Navbar from './Navbar'

it("renders correctly", () => {
    const wrapper = shallow(
        <Navbar />
    );
    expect(wrapper).toMatchSnapshot()
});

