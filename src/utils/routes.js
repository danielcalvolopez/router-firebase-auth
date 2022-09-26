import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Signup from "../pages/Signup/Signup";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";

export const allRoutes = {
  profile: {
    path: "/",
    Element: Profile,
  },
  login: {
    path: "/login",
    Element: Login,
  },
  signup: {
    path: "/signup",
    Element: Signup,
  },
  updateProfile: {
    path: "/update-profile",
    Element: UpdateProfile,
  },
  resetPassword: {
    path: "/reset-password",
    Element: ResetPassword,
  },
};

export const privateRoutesPaths = [
  allRoutes.profile.path,
  allRoutes.updateProfile.path,
];
