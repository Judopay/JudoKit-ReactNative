describe('E2E Functional Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should load features list', async () => {
    await expect(element(by.text('Pay with card'))).toBeVisible();
  });
});
