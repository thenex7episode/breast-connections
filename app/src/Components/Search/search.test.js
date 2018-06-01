import Search from './Search'

it("renders correctly", () => {
    const wrapper = shallow(
        <Search />
    );
    expect(wrapper).toMatchSnapshot()
});

it("renders correctly", () => {
    const wrapper = mount(
        <Search />
    );
    const text = wrapper.find('h1').first().text()
    expect(text).toEqual('Search for Doctors and see rankings by BC Users')
});