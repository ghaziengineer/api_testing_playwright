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

const filters_names = [
  { name: 'firstname', value: 'Ghazi' },
  { name: 'lastname', value: 'Abdallah' }
];

for (const filter of filters_names) {
test(`Get bookings filtered by ${filter.name}`, async ({ request }) => {
  const response = await request.get(`${BASE_URL}/booking?${filter.name}=${filter.value}`);
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
});
}
const filters_check = [
  { name: 'checkin', value: '2026-03-01' },
  { name: 'checkout', value: '2024-03-02' }
];

for (const filter of filters_check) {
test(`Get bookings filtered by ${filter.name}`, async ({ request }) => {
  const response = await request.get(`${BASE_URL}/booking?${filter.name}=${filter.value}`);
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
});
}
