const axios = require('axios');
require('dotenv').config();

// Кеш для збереження токена та інформації про користувача
let authCache = {
  user_token: null,
  user_id: null,
  expires_at: null,
  user_info: null
};

// Час життя токена в мілісекундах (24 години)
const TOKEN_LIFETIME = 24 * 60 * 60 * 1000;

/**
 * Отримує user token від Altegio API та кешує його
 * @returns {Promise<Object>} Об'єкт з user_token та user_id
 */
async function authenticateUser() {
  try {
    console.log('Authenticating with Altegio API...');
    
    const response = await axios.post(
      'https://api.alteg.io/api/v1/auth',
      {
        login: process.env.ALTEGIO_USER_LOGIN,
        password: process.env.ALTEGIO_USER_PASSWORD
      },
      {
        headers: {
          'Accept': 'application/vnd.api.v2+json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ALTEGIO_COMPANY_TOKEN}`
        }
      }
    );
    if (response.status === 201 && response.data) {
      const userData = response.data.data;
      
      // Кешуємо отримані дані
      authCache = {
        user_token: userData.user_token,
        user_id: userData.id,
        expires_at: Date.now() + TOKEN_LIFETIME,
        user_info: {
          name: userData.name,
          phone: userData.phone,
          login: userData.login,
          email: userData.email,
          avatar: userData.avatar,
          is_approved: userData.is_approved
        }
      };

      console.log(`Successfully authenticated user: (ID: ${userData.id})`);
      
      return {
        user_token: userData.user_token,
        user_id: userData.id,
        user_info: authCache.user_info
      };
    } else {
      throw new Error('Invalid response from Altegio API');
    }
  } catch (error) {
    console.error('Error authenticating with Altegio:', error.response?.data || error.message);
    throw new Error(`Authentication failed: ${error.response?.data?.message || error.message}`);
  }
}

/**
 * Перевіряє чи токен ще дійсний
 * @returns {boolean} true якщо токен дійсний, false якщо потрібно оновити
 */
function isTokenValid() {
  return authCache.user_token && 
         authCache.expires_at && 
         Date.now() < authCache.expires_at;
}

/**
 * Отримує дійсний user token з кеша або оновлює його
 * @returns {Promise<string>} Дійсний user token
 */
async function getValidUserToken() {
  if (isTokenValid()) {
    console.log('Using cached user token');
    return authCache.user_token;
  }

  console.log('Token expired or not found, refreshing...');
  const authData = await authenticateUser();
  return authData.user_token;
}

/**
 * Отримує user ID з кеша або оновлює дані
 * @returns {Promise<number>} User ID
 */
async function getValidUserId() {
  if (isTokenValid()) {
    return authCache.user_id;
  }

  const authData = await authenticateUser();
  return authData.user_id;
}

/**
 * Отримує повну інформацію про користувача з кеша
 * @returns {Promise<Object>} Об'єкт з повною інформацією про користувача
 */
async function getUserInfo() {
  if (isTokenValid()) {
    return {
      user_token: authCache.user_token,
      user_id: authCache.user_id,
      user_info: authCache.user_info
    };
  }

  const authData = await authenticateUser();
  return authData;
}

/**
 * Очищає кеш (для тестування або примусового оновлення)
 */
function clearCache() {
  authCache = {
    user_token: null,
    user_id: null,
    expires_at: null,
    user_info: null
  };
  console.log('Auth cache cleared');
}

/**
 * Отримує статус кеша (для діагностики)
 * @returns {Object} Статус кеша
 */
function getCacheStatus() {
  return {
    hasToken: !!authCache.user_token,
    isValid: isTokenValid(),
    expiresAt: authCache.expires_at ? new Date(authCache.expires_at).toISOString() : null,
    timeUntilExpiry: authCache.expires_at ? authCache.expires_at - Date.now() : null,
    userName: authCache.user_info?.name || null
  };
}

/**
 * Виконує HTTP запит з автоматичним оновленням токена при 401 помилці
 * @param {Function} requestFunction - Функція яка виконує HTTP запит
 * @param {Object} options - Опції запиту
 * @returns {Promise<Object>} Результат запиту
 */
async function executeWithTokenRefresh(requestFunction, options = {}) {
  const maxRetries = 2;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      // Отримуємо актуальний токен
      const userToken = await getValidUserToken();
      const userId = await getValidUserId();
      
      // Виконуємо запит з актуальним токеном
      const result = await requestFunction(userToken, userId);
      return result;
      
    } catch (error) {
      attempt++;
      
      // Якщо це 401 помилка і не останна спроба
      if (error.response?.status === 401 && attempt < maxRetries) {
        console.log(`Received 401 error, refreshing token (attempt ${attempt}/${maxRetries})`);
        
        // Очищаємо кеш і примусово оновлюємо токен
        clearCache();
        
        // Спробуємо ще раз з новим токеном
        continue;
      }
      
      // Якщо це не 401 або вже остання спроба - перекидаємо помилку
      throw error;
    }
  }
  
  throw new Error('Failed to execute request after token refresh attempts');
}

/**
 * Створює axios request config з правильною авторизацією
 * @param {string} userToken - User token
 * @param {number} userId - User ID (опціонально)
 * @returns {Object} Axios config object
 */
function createAuthHeaders(userToken, userId = null) {
  const headers = {
    'Accept': 'application/vnd.api.v2+json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.ALTEGIO_COMPANY_TOKEN}, User ${userToken}`
  };
  
  return { headers };
}

/**
 * Wrapper для axios.get з автоматичним оновленням токена
 * @param {string} url - URL для запиту
 * @param {Object} config - Axios config (params, тощо)
 * @returns {Promise<Object>} Результат запиту
 */
async function altegioGet(url, config = {}) {
  return executeWithTokenRefresh(async (userToken, userId) => {
    const authHeaders = createAuthHeaders(userToken, userId);
    const fullConfig = {
      ...config,
      ...authHeaders,
      params: {
        ...config.params,
        // Додаємо user_id до параметрів якщо потрібно
        ...(config.includeUserId ? { user_id: userId } : {})
      }
    };
    
    const axios = require('axios');
    return await axios.get(url, fullConfig);
  });
}

/**
 * Wrapper для axios.post з автоматичним оновленням токена
 * @param {string} url - URL для запиту
 * @param {Object} data - Дані для POST запиту
 * @param {Object} config - Axios config
 * @returns {Promise<Object>} Результат запиту
 */
async function altegioPost(url, data = {}, config = {}) {
  return executeWithTokenRefresh(async (userToken, userId) => {
    const authHeaders = createAuthHeaders(userToken, userId);
    const fullConfig = {
      ...config,
      ...authHeaders
    };
    
    const axios = require('axios');
    return await axios.post(url, data, fullConfig);
  });
}

/**
 * Wrapper для axios.put з автоматичним оновленням токена
 * @param {string} url - URL для запиту
 * @param {Object} data - Дані для PUT запиту
 * @param {Object} config - Axios config
 * @returns {Promise<Object>} Результат запиту
 */
async function altegioPut(url, data = {}, config = {}) {
  return executeWithTokenRefresh(async (userToken, userId) => {
    const authHeaders = createAuthHeaders(userToken, userId);
    const fullConfig = {
      ...config,
      ...authHeaders
    };
    
    const axios = require('axios');
    return await axios.put(url, data, fullConfig);
  });
}

module.exports = {
  authenticateUser,
  getValidUserToken,
  getValidUserId,
  getUserInfo,
  isTokenValid,
  clearCache,
  getCacheStatus,
  executeWithTokenRefresh,
  createAuthHeaders,
  altegioGet,
  altegioPost,
  altegioPut
};
