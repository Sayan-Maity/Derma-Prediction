import { useEffect, useRef, useState, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import PageLoader from './PageLoader';

const PageTransitionWrapper = ({ children }) => {
    const location = useLocation();
    const wrapperRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(true);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsTransitioning(false)
        });

        tl.to(wrapperRef.current, { autoAlpha: 0.4, duration: 0.1, ease: 'power1.inOut' })
            .to(wrapperRef.current, { autoAlpha: 1, duration: 0.1, ease: 'power1.inOut', delay: 0.1 });
        setIsTransitioning(true);

    }, [location]);

    return (
        <Suspense fallback={<PageLoader />}>
            <div ref={wrapperRef} style={{ width: '100%', background: '#f4f4f4' }}>
                {!isTransitioning && children}
            </div>
        </Suspense>
    );
};

export default PageTransitionWrapper;