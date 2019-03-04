import React from 'react';
import {render} from 'react-testing-library'
import UserLogin from './userLogin'

it('renders', ()=> {
    const Wrapper = render(<UserLogin/>)
    expect(Wrapper)
})

it('renders proper html', () => {
    const {getByText} = render(<UserLogin/>)
    expect(getByText('Username')).toBeInTheDom,
    expect(getByText('Password')).toBeInTheDom
})

