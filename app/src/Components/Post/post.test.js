import Post from './Post'

it("renders correctly", () => {
    const wrapper = shallow(
        <Post />
    );
    expect(wrapper).toMatchSnapshot()
});

