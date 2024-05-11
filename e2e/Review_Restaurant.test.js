/* eslint-disable no-undef */
const assert = require('assert');

const {
  I,
} = inject();

Feature('Review Restaurant');

Before(() => {
  I.amOnPage('/');
});

Scenario('send one review restaurant', async () => {
  const nameInput = 'Testing e2e name';
  const descInput = 'Testing e2e description';

  // Click the first restaurant CTA button
  I.waitForElement('.cta-restaurant', 10);
  I.click(locate('.cta-restaurant').first());

  // Fill in the review form
  I.waitForElement('.form-group', 5);
  I.fillField('name', nameInput);
  I.fillField('description', descInput);
  I.click('.btn-review');

  const lastReview = locate('.review').last();
  I.waitForVisible(lastReview, 10);

  const submittedReviewNameElement = lastReview.find('.review-author');
  const submittedReviewDescElement = lastReview.find('.review-text');

  const submittedReviewName = await I.grabTextFrom(submittedReviewNameElement);
  const submittedReviewDesc = await I.grabTextFrom(submittedReviewDescElement);

  const expectedName = nameInput;
  const expectedDesc = descInput;

  const isNameMatch = submittedReviewName.includes(expectedName);
  const isDescMatch = submittedReviewDesc.includes(expectedDesc);

  assert.strictEqual(isNameMatch, true);
  assert.strictEqual(isDescMatch, true);

  I.saveScreenshot('send_one_review_restaurant.succsess.png');
});
