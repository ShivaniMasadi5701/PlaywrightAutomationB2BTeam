function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Environment variable ${name} is not set`);
  }
  return value;
}

export const env = {
  loginEmail: required('LOGIN_EMAIL_ADDRESS'),
  loginPassword: required('LOGIN_PASSWORD'),
};
