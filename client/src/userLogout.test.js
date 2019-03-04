import React from 'react';
import {render} from 'react-testing-library'
import UserLogout from './userLogout'

it('renders', ()=> {
    const Wrapper = render(<UserLogout/>)
    expect(Wrapper)
})

it('renders proper html', () => {
    const wrap = render(<UserLogout/>)
    expect(wrap).toMatchSnapshot();
})

