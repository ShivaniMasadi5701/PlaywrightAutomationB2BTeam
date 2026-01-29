import{APIRequestContext , expect } from '@playwright/test';

export async function getAllProducts(request:APIRequestContext){
    const response = await request.get('https://automationexercise.com/api/productsList');
    expect(response.status()).toBe(200);
   const responseBody = await response.json();
    return { response , responseBody };
}