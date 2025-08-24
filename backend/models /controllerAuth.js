//This folder makes the code easier to understand

export const signup = async (req, res) => {
  res.json({
    data: "You get the signup access endpoint",
  });
};

export const login = async (req, res) => {
  res.json({
    data: "You get the login access endpoint",
  });
};

export const logout = async (req, res) => {
  res.json({
    data: "You get the logout  access endpoint",
  });
};
