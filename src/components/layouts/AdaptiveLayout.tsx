// AdaptiveLayout.tsx
import { useMediaQuery } from 'react-responsive';
import { useContext } from 'react';
import { AuthContext } from '@/hook/contexts/auth.context';

import { PublicMobileLayout } from '@/components/layouts/PublicMobileLayout';
import { PublicPcLayout } from '@/components/layouts/PublicPcLayout';
import { PrivateMobileLayout } from '@/components/layouts/PrivateMobileLayout';
import { PrivatePcLayout } from '@/components/layouts/PrivatePcLayout';

const AdaptiveLayout = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return isMobile ? <PrivateMobileLayout /> : <PrivatePcLayout />;
    } else {
        return isMobile ? <PublicMobileLayout /> : <PublicPcLayout />;
    }
};

export default AdaptiveLayout;
