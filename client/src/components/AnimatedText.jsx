// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { Text } from '@chakra-ui/react'; // Assuming you're using Chakra UI

// const AnimatedText = ({ text, color, fontSize }) => {
//     const textRef = useRef([]);
//     useEffect(() => {
//         textRef.current.forEach((letter, index) => {
//             gsap.fromTo(letter,
//                 { y: -50, opacity: 0 },
//                 { y: 0, opacity: 1, duration: 0.5, delay: index * 0.05 }
//             );
//         });
//     }, []);


//     return (
//         <Text color={color} fontSize={fontSize}>
//             {text.split('').map((letter, index) => (
//                 <span
//                     key={index}
//                     ref={el => textRef.current[index] = el}
//                     style={{ display: 'inline-block' }}
//                 >
//                     {letter}
//                 </span>
//             ))}
//         </Text>
//     );
// };

// export default AnimatedText;

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Text } from '@chakra-ui/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({ text, color, fontSize, ...props }) => {
    const textRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            textRef.current,
            {
                clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                opacity: 0,
            },
            {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 80%',
                    // markers: true, 
                },
            }
        );
    }, [text]);

    return (
        <Text ref={textRef} color={color} fontSize={fontSize} style={{ display: 'inline-block' }} {...props}>
            {text}
        </Text>
    );
};

export default AnimatedText;