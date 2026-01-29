import { test, expect } from "@playwright/test";
import { request } from "node:http";
import { getAllProducts } from "../../pages/api_pages/ApiHelperPage";

test('Validate products api',async({request}) =>{

    const {response,responseBody} = await getAllProducts(request);
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.products.length).toBeGreaterThan(0);
});

test('GET productsList verify response', async ({ request }) => {

  const {response,responseBody} = await getAllProducts(request);

  // Validate HTTP status
  expect(response.status()).toBe(200);

  // Basic body checks
  expect(responseBody).toHaveProperty('responseCode');
  expect(responseBody.responseCode).toBe(200);

  expect(responseBody).toHaveProperty('products');
  expect(Array.isArray(responseBody.products)).toBeTruthy();

  console.log('Products count:', responseBody.products.length);
});

test('Validate structure of products', async ({ request }) => {

  const {response,responseBody} = await getAllProducts(request);
  expect(response.status()).toBe(200);

  const { products } = await response.json();

  for (const product of products) {
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('brand');
    expect(product).toHaveProperty('category');

    expect(product.category).toHaveProperty('category');
    expect(product.category.usertype).toHaveProperty('usertype');
  }

});

test('Validate specific product details of Blue Top', async ({ request }) => {

  const {response,responseBody} = await getAllProducts(request);
  expect(response.status()).toBe(200);

  const { products } = await response.json();

  const blueTop = products.find((p: any) => p.name === 'Blue Top');
  expect(blueTop).toBeDefined();
  expect(blueTop?.price).toBe('Rs. 500');
  console.log("Blue Top Product Details " + blueTop?.price);
  expect(blueTop?.brand).toBe('Polo');
  console.log("Blue Top Product Details " + blueTop?.brand);
  expect(blueTop?.category.category).toBe('Tops');
  console.log("Blue Top Product Details " + blueTop?.category.category);
  expect(blueTop?.category.usertype.usertype).toBe('Women');
})


