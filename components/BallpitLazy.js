'use client';

import dynamic from 'next/dynamic';

const Ballpit = dynamic(() => import('./Ballpit'), { ssr: false });

export default Ballpit;
