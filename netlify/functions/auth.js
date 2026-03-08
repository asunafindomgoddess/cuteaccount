const { TwitterApi } = require('twitter-api-v2');

exports.handler = async (event) => {
  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
  });

  // Cambia esto por tu URL real de Netlify después de deploy
  const callbackUrl = 'https:cuteaccount.netlify.app/.netlify/functions/callback';

  try {
    const { oauth_token, oauth_token_secret, url } = await client.generateAuthLink(callbackUrl, { linkMode: 'authenticate' });

    // Pasamos el secret por query (solo para demo simple – inseguro en prod real)
    const redirectUrl = `${url}&state=${encodeURIComponent(oauth_token_secret)}`;

    return {
      statusCode: 302,
      headers: { Location: redirectUrl },
      body: '',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Error al iniciar OAuth' }),
    };
  }
};
