import { JudoPBBAConfiguration } from '../types/JudoPBBATypes'

test('check JudoPBBAConfiguration model fields', () => {
    const pbbaConfiguration: JudoPBBAConfiguration = {
        mobileNumber: '123-123',
        emailAddress: 'example@mail.com',
        deeplinkScheme: 'sample://',
        deeplinkURL: 'https://www.google.com'
    }

    expect(Object.keys(pbbaConfiguration).length).toBe(4)
})
