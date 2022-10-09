export default {
  secret_token: process.env.SECRET_TOKEN,
  expires_in_token: '365d',
  expires_in_refresh_token: '365d',
  secret_refresh_token: process.env.REFRESH_TOKEN,
  expires_refresh_token_days: 365,
};
