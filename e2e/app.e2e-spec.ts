import { FileBrowser6Page } from './app.po';

describe('file-browser6 App', () => {
  let page: FileBrowser6Page;

  beforeEach(() => {
    page = new FileBrowser6Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
