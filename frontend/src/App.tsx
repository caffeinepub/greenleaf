import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CareGuide from './pages/CareGuide';
import Checkout from './pages/Checkout';
import PageTransition from './components/PageTransition';
import LoadingLandingPage from './components/LoadingLandingPage';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <PageTransition><Home /></PageTransition>,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shop',
  component: () => <PageTransition><Shop /></PageTransition>,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: () => <PageTransition><ProductDetail /></PageTransition>,
});

const careGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/care-guide',
  component: () => <PageTransition><CareGuide /></PageTransition>,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: () => <PageTransition><Checkout /></PageTransition>,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  productRoute,
  careGuideRoute,
  checkoutRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  // Check sessionStorage synchronously so the initial render already knows
  // whether to show the loading page — no flicker of the home page.
  const [showLoading] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem('greenleaf-loaded');
    } catch {
      return false;
    }
  });

  // appReady flips to true once the loading animation calls onComplete
  const [appReady, setAppReady] = useState<boolean>(!showLoading);

  const handleLoadingComplete = () => {
    try {
      sessionStorage.setItem('greenleaf-loaded', 'true');
    } catch {
      // ignore
    }
    setAppReady(true);
  };

  // Lock body scroll while the loading page is visible
  useEffect(() => {
    if (!appReady) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [appReady]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CartProvider>
        <WishlistProvider>
          {/* Show loading page first; only mount the router after it completes */}
          {!appReady && (
            <LoadingLandingPage onComplete={handleLoadingComplete} />
          )}
          {appReady && (
            <RouterProvider router={router} />
          )}
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
