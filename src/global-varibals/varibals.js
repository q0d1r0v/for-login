const modules = () => {
  return {
    grant_type: process.env.VUE_APP_GRANT_TYPE,
    client_id: process.env.VUE_APP_CLIENT_ID,
    client_secret: process.env.VUE_APP_CLIENT_SECRET_KEY,
  };
};

export default modules();
