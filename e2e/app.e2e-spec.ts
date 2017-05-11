import { TimeIsMoneyPage } from './app.po';

describe('time-is-money App', function() {
  let page: TimeIsMoneyPage;

  beforeEach(() => {
    page = new TimeIsMoneyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
