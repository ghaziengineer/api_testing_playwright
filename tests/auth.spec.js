import { test, expect } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from '../config/env';

test('Generate auth token successfully', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/auth`, {
    data: {
      username: USERNAME,
      password: PASSWORD
    }
  });

  console.log("STATUS:", response.status());

  const body = await response.json();
  console.log("BODY:", body);
console.log("USERNAME:", USERNAME);
console.log("PASSWORD:", PASSWORD);
  expect(response.status()).toBe(200);
  expect(body.token).toBeTruthy();
});