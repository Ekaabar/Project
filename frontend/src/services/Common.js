// return the admin data from the session storage
export const getAdmin = () => {
  const adminStr = sessionStorage.getItem('admin');
  if (adminStr) return JSON.parse(adminStr);
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

// remove the token and admin from the session storage
export const removeAdminSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('admin');
}

// set the token and admin from the session storage
export const setAdminSession = (token, admin) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('admin', JSON.stringify(admin));
}

//******************* User ******************************* */
// set the token and admin from the session storage
export const setCartSession = (cart) => {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

export const getCartSession = () => {
  const cartStr = sessionStorage.getItem('cart');
  if (cartStr) return JSON.parse(cartStr);
  else return [];
}

export const removeCartSession = () => {
  sessionStorage.removeItem('cart');
}

export const getInfoCartSession = () => {
  const cartStr = sessionStorage.getItem('cart');
  const array = JSON.parse(cartStr);
  const info = {
    products: [],
    totalPriceProducts: 0,
    totaleProducts: 0
  };
  const products = [];
  const map = new Map();
  if (array) {


    for (const item of array) {

      if (!map.has(item._id)) {

        map.set(item._id, true);    // set any value to Map
        products.push({
          id: item._id,
          title: item.title,
          price: item.price,
          imageUrl: item.imageUrl,
          totalPriceProduct: item.price,
          count: 1,
        });
      } else {
        const index = products.findIndex((el) => el.id === item._id);
        products[index] = {
          id: item._id,
          title: item.title,
          count: products[index].count + 1,
          totalPriceProduct: products[index].totalPriceProduct + item.price
        };
      }

      info.totalPriceProducts += item.price;
    }
    info.products = products;
    info.totaleProducts = products.length;
  }
  if (info.products) return info
  else return null;

}
// remove the token and admin from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('tokenUser');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('userQuiz');
}

// set the token and admin from the session storage
export const setUserSession = (tokenUser, user) => {
  sessionStorage.setItem('tokenUser', tokenUser);
  sessionStorage.setItem('user', JSON.stringify(user));
}
export const setUserInfoSession = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user));
}

export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the token from the session storage
export const getUserToken = () => {
  return sessionStorage.getItem('tokenUser') || null;
}

export const getUserLevels = () => {
  const userLevelsStr = sessionStorage.getItem('userLevels');
  if (userLevelsStr) return JSON.parse(userLevelsStr);
  else return null;
}

export const getUserLevelsOptions = () => {
  const userLevelsObj = JSON.parse(sessionStorage.getItem('userLevels'));

  if (userLevelsObj) {
    const options = userLevelsObj.map(d => ({
      value: d._id,
      label: d.name
    }));

    return options;
  }
  else return null;
}

// set the token and admin from the session storage
export const setUserLevels = (levels) => {
  sessionStorage.setItem('userLevels', JSON.stringify(levels));
}

export const setUserQuizSession = (userQuiz) => {
  sessionStorage.setItem('userQuiz', JSON.stringify(userQuiz));
}

export const getUserQuizSession = () => {
  const userQuiz = sessionStorage.getItem('userQuiz');
  if (userQuiz) return JSON.parse(userQuiz);
  else return null;
}

export const getQuizId = () => {
  return "622d1901e8b07a5054a62065";
}


