import UserHome from './UserHome'

it("renders correctly", () => {
    const wrapper = shallow(
        <UserHome />
    );
    expect(wrapper).toMatchSnapshot()
});

it("was clicked", () => {
    const spy = sinon.spy()
    const wrapper = mount(
        <UserHome />
    );
    const text = wrapper.find('div')
    .first()
    .simulate('click')
    expect(spy.calledOnce).toBe(false)
});