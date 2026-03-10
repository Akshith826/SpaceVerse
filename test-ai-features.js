const axios = require('axios');
const tough = require('tough-cookie');
const cookieJar = new tough.CookieJar();

// Create a session-aware client
const client = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

// Add cookie jar to requests
client.interceptors.request.use(config => {
  return new Promise((resolve) => {
    cookieJar.getCookies(config.baseURL, (err, cookies) => {
      if (!err && cookies && cookies.length > 0) {
        config.headers.cookie = cookies.map(cookie => cookie.cookieString()).join('; ');
      }
      resolve(config);
    });
  });
});

// Store cookies from responses
client.interceptors.response.use(response => {
  if (response.headers['set-cookie']) {
    response.headers['set-cookie'].forEach(cookieStr => {
      cookieJar.setCookieSync(cookieStr, response.config.baseURL);
    });
  }
  return response;
});

async function testAuthenticatedFeatures() {
  try {
    // Register a test user
    console.log('Registering test user...');
    try {
      await client.post('/api/register', {
        username: 'testuser_ai',
        email: 'testuser_ai@example.com',
        password: 'testpassword123'
      });
      console.log('User registered successfully');
    } catch (regError) {
      console.log('User may already exist, continuing...');
    }
    
    // Login
    console.log('Logging in...');
    const loginResponse = await client.post('/api/login', {
      username: 'testuser_ai',
      password: 'testpassword123'
    });
    
    console.log('Login successful');
    
    // Test personalized recommendations
    console.log('\n--- Testing Personalized Recommendations ---');
    const recommendationData = {
      currentScenario: {
        eventType: 'launch',
        parameters: {
          altitude: 500,
          inclination: 45,
          velocity: 7.8,
          mass: 1000
        }
      },
      userPreferences: {},
      skillLevel: 'intermediate',
      riskTolerance: 'moderate'
    };
    
    const recommendationResponse = await client.post('/api/simulator/personalized-recommendations', recommendationData);
    console.log('Personalized Recommendations Result:');
    console.log(JSON.stringify(recommendationResponse.data, null, 2));
    
  } catch (error) {
    console.error('Error in test:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testAuthenticatedFeatures();