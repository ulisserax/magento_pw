import { test, expect } from "@playwright/test";

let tokenValue: string;
test.beforeAll("Retrieving token", async ({ request }) => {
  const response = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      data: {
        username: "admin",
        password: "password123",
      },
    }
  );
  tokenValue = (await response.json()).token;
});

test("PUT /booking using cookies", async ({ request }) => {
  const response = await request.put(
    "https://restful-booker.herokuapp.com/booking/2",
    {
      headers: {
        Cookie: `token=${tokenValue}`,
      },
      data: {
        firstname: "Michaella",
        lastname: "Doex",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: "2023-10-01",
          checkout: "2023-10-10",
        },
        additionalneeds: "Breakfast",
      },
    }
  );
  expect(response.status()).toBe(200);
});

test("DELETE /booking using cookies", async ({ request }) => {
  const response = await request.delete(
    "https://restful-booker.herokuapp.com/booking/2",
    {
      headers: {
        Cookie: `token=${tokenValue}`,
      },
    }
  );
  expect(response.status()).toBe(201);
});
