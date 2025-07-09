const jwt = require('jsonwebtoken');
require('dotenv').config();


//***************************************************************************************************************************************************************/  
//******************************************************** Authenticate bearer token ****************************************************************************/  
//***************************************************************************************************************************************************************/  
async function authenticateToken(req, res) {

  const token = req.headers['auth_token'];

  console.log(`RequestedAuthToken: ${token}`)

  if (!token) {
    res.status(401).json({
      isSuccessful: false,
      message: 'Unauthorized - Bearer token missing'
    });
    return false;
  }


  let userId ;


  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({
        isSuccessful: false,
        message: 'Unauthorized - Invalid token',
        errorMessage: err
      });

      return false;
    } else {
      userId = decoded.userId;
    }
  });

  if(!userId || userId.toString().trim() === ''){
    res.status(401).json({
        isSuccessful: false,
        message: 'Unauthorized - Token userId missing (Internal)'
      });
    return false;
  }

  return userId;
}

module.exports = { authenticateToken: authenticateToken}