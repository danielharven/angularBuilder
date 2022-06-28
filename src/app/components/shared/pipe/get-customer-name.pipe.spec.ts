import { GetCustomerNamePipe } from './get-customer-name.pipe';

describe('GetCustomerNamePipe', () => {
  it('create an instance', () => {
    const pipe = new GetCustomerNamePipe();
    expect(pipe).toBeTruthy();
  });
});
