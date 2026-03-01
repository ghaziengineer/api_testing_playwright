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

test('Get bookings using real existing IDs', async ({ request }) => {

  // Step 1: Get all booking IDs (this to avoid flaky tests due to non-existing IDs)
  const listResponse = await request.get(`${BASE_URL}/booking`);
  expect(listResponse.status()).toBe(200);

  const listBody = await listResponse.json();

  // Step 2: Loop only over existing IDs (e.g., first 5)
  for (let i = 0; i < 4; i++) {
    const bookingId = listBody[i].bookingid;

    const response = await request.get(`${BASE_URL}/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('firstname');
    expect(typeof body.firstname).toBe('string');

    expect(body).toHaveProperty('lastname');
    expect(typeof body.lastname).toBe('string');

    expect(body).toHaveProperty('totalprice');
    expect(typeof body.totalprice).toBe('number');

    expect(body).toHaveProperty('depositpaid');
    expect(typeof body.depositpaid).toBe('boolean');

    expect(body).toHaveProperty('bookingdates');
    expect(typeof body.bookingdates).toBe('object');

    expect(body).toHaveProperty('additionalneeds');
    expect(typeof body.additionalneeds).toBe('string');

    expect(body.bookingdates).toHaveProperty('checkin');
    expect(body.bookingdates.checkin).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    expect(body.bookingdates).toHaveProperty('checkout');   
    expect(body.bookingdates.checkout).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  }
});
