

const Core = require('./../lib/core');


describe('Core tests', () => {


  test('Test constructor options. Positive test', () => {
    const options = { username: 'testUsername', password: 'testPassword' };
    const core = new Core(options);

    expect(core.config.apacheFineract.username).toBe(options.username);
    expect(core.config.apacheFineract.password).toBe(options.password);
  });


  test('Test constructor options. Negative test', () => {
    const options = { username: 'username', password: 'password' };
    const core = new Core();

    expect(core.config.apacheFineract.username).not.toBe(options.username);
    expect(core.config.apacheFineract.password).not.toBe(options.password);
  });


  test('Test __initConfigOptions method. Positive test', () => {
    const options = { username: 'newUserName', password: 'newPassword' };
    const core = new Core();

    core.__initConfigOptions(options);

    expect(core.config.apacheFineract.username).toBe(options.username);
    expect(core.config.apacheFineract.password).toBe(options.password);
  });


  test('Test __initConfigOptions method. Negative test', () => {
    const options = { username: 'testUsername', password: 'testPassword' };
    const core = new Core();

    core.__initConfigOptions();

    expect(core.config.apacheFineract.username).not.toBe(options.username);
    expect(core.config.apacheFineract.password).not.toBe(options.password);
  });
});
