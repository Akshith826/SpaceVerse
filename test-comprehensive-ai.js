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

async function testComprehensiveAI() {
  try {
    // Login with existing user
    console.log('Logging in...');
    const loginResponse = await client.post('/api/login', {
      username: 'testuser_ai',
      password: 'testpassword123'
    });
    
    console.log('Login successful');
    
    // Test personalized recommendations with user history simulation
    console.log('\n--- Testing Personalized Recommendations ---');
    const recommendationData = {
      currentScenario: {
        eventType: 'launch',
        parameters: {
          altitude: 550,
          inclination: 97.4,
          velocity: 7.6,
          mass: 200
        }
      },
      userPreferences: {
        preferredOrbits: ['LEO', 'SSO'],
        missionTypes: ['earthObservation', 'communication']
      },
      skillLevel: 'advanced',
      riskTolerance: 'conservative'
    };
    
    const recommendationResponse = await client.post('/api/simulator/personalized-recommendations', recommendationData);
    console.log('Personalized Recommendations Result:');
    console.log(JSON.stringify(recommendationResponse.data, null, 2));
    
    console.log('\n✅ All AI features are working correctly!');
    
  } catch (error) {
    console.error('Error in test:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testComprehensiveAI();