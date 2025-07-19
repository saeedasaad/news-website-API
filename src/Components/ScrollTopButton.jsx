import React, { useEffect, useState } from 'react';

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 bg-[#fd5168] text-white text-2xl px-5 py-3 rounded-md  shadow-xl transition-opacity duration-300 cursor-pointer ${
        visible ? 'opacity-100' : 'opacity-0'
      } `}
      aria-label="Scroll to top"
    >
<i className="fa-sharp-duotone fa-solid fa-angle-up "></i>
    </button>
  );
}