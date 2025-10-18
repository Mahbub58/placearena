import { analytics } from "@/app/firebase/firebase";
import { logEvent as firebaseLogEvent, setUserId, setUserProperties } from "firebase/analytics";

/**
 * Log a custom event to Firebase Analytics
 * @param eventName - Name of the event
 * @param eventParams - Optional parameters for the event
 */
export const logEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  if (analytics) {
    try {
      firebaseLogEvent(analytics, eventName, eventParams);
      console.log(`📊 Analytics Event: ${eventName}`, eventParams);
    } catch (error) {
      console.warn(`Analytics event "${eventName}" failed (blocked by ad blocker):`, error);
    }
  } else {
    console.warn(`Analytics not initialized. Event "${eventName}" not logged.`);
  }
};

/**
 * Log page view event
 * @param pagePath - Path of the page
 * @param pageTitle - Title of the page
 */
export const logPageView = (pagePath: string, pageTitle: string) => {
  logEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

/**
 * Log user login event
 * @param method - Login method (e.g., 'google', 'email')
 */
export const logLogin = (method: string) => {
  logEvent("login", { method });
};

/**
 * Log user signup event
 * @param method - Signup method (e.g., 'google', 'email')
 */
export const logSignUp = (method: string) => {
  logEvent("sign_up", { method });
};

/**
 * Log property search event
 * @param searchTerm - Search term used
 */
export const logSearch = (searchTerm: string) => {
  logEvent("search", {
    search_term: searchTerm,
  });
};

/**
 * Log property view event
 * @param propertyId - ID of the property viewed
 * @param propertyName - Name of the property
 */
export const logPropertyView = (propertyId: string, propertyName: string) => {
  logEvent("view_item", {
    item_id: propertyId,
    item_name: propertyName,
    content_type: "property",
  });
};

/**
 * Log property save/favorite event
 * @param propertyId - ID of the property saved
 */
export const logPropertySave = (propertyId: string) => {
  logEvent("add_to_wishlist", {
    item_id: propertyId,
    content_type: "property",
  });
};

/**
 * Log property inquiry/contact event
 * @param propertyId - ID of the property
 * @param contactMethod - Method of contact (e.g., 'phone', 'email')
 */
export const logPropertyInquiry = (propertyId: string, contactMethod: string) => {
  logEvent("contact_property", {
    item_id: propertyId,
    contact_method: contactMethod,
  });
};

/**
 * Set the user ID for analytics
 * @param userId - Unique user identifier
 */
export const setAnalyticsUserId = (userId: string) => {
  if (analytics) {
    try {
      setUserId(analytics, userId);
      console.log(`📊 Analytics User ID set: ${userId}`);
    } catch (error) {
      console.warn('Failed to set analytics user ID:', error);
    }
  }
};

/**
 * Set user properties for analytics
 * @param properties - User properties object
 */
export const setAnalyticsUserProperties = (properties: Record<string, unknown>) => {
  if (analytics) {
    try {
      setUserProperties(analytics, properties);
      console.log('📊 Analytics User Properties set:', properties);
    } catch (error) {
      console.warn('Failed to set analytics user properties:', error);
    }
  }
};

/**
 * Log filter usage event
 * @param filters - Applied filters
 */
export const logFilterUsage = (filters: Record<string, unknown>) => {
  logEvent("filter_properties", filters);
};

/**
 * Log share event
 * @param contentType - Type of content shared
 * @param itemId - ID of the item shared
 * @param method - Share method (e.g., 'facebook', 'twitter', 'link')
 */
export const logShare = (contentType: string, itemId: string, method: string) => {
  logEvent("share", {
    content_type: contentType,
    item_id: itemId,
    method: method,
  });
};
