export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "/api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export const PROFILE_ROUTES = "/api/profile";
export const ADD_PROFILE_IMAGE_ROUTE = `${PROFILE_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${PROFILE_ROUTES}/remove-profile-image`;
export const UPDATE_PROFILE_ROUTE = `${PROFILE_ROUTES}/update`;
export const GET_ACTIVE_BOOKING = `${PROFILE_ROUTES}/activeBookings`;

export const BOOKING_ROUTES = "/api/bookings";
export const HISTORY_ROUTE = `${BOOKING_ROUTES}/allhistory`;
export const BOOKING_ROUTE = `${BOOKING_ROUTES}/book`;

export const PARKING_ROUTES = "/api/parking";
export const ALL_PARKINGS = `${PARKING_ROUTES}/getall`;
export const NEAREST_SLOT = `${PARKING_ROUTES}/nearestSlot`;

export const ADMIN_ROUTES = "/api/admin";
export const GET_ALL_PROFILES = `${ADMIN_ROUTES}/getall`;
export const FLAG_USER = `${ADMIN_ROUTES}/flag`;

export const ORGANISATION_ROUTES = "/api/organisations";
export const GET_ALL_ORGANISATIONS = `${ORGANISATION_ROUTES}/all`;
