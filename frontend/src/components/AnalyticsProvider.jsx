import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '../libs/analytics';

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

const AnalyticsProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (measurementId) {
      initAnalytics(measurementId);
    }
  }, [measurementId]);

  useEffect(() => {
    if (measurementId) {
      trackPageView(location.pathname + location.search);
    }
  }, [location, measurementId]);

  return children;
};

export default AnalyticsProvider;
