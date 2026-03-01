import {test,expect} from '@playwright/test';
import { BASE_URL} from '../config/env';       


test('Get all bookings IDs', async ({ request }) => {

const response =await request.get(`${BASE_URL}/booking`);
const body = await response.json();

// Basic validation
expect(response.status()).toBe(200);
expect(Array.isArray(body)).toBeTruthy(); // ensures body to be array and  is not null or undefined
body.forEach(item => {
  expect(item).toHaveProperty('bookingid');
  expect(typeof item.bookingid).toBe('number');
});
});
   