import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/NotoSansArmenian';

const {fontFamily} = loadFont('normal', {
  weights: ['400', '600', '700'],
  subsets: ['armenian'],
});

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Cloud: React.FC<{x: number; y: number; scale?: number; opacity?: number}> = ({
  x,
  y,
  scale = 1,
  opacity = 1,
}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `scale(${scale})`, opacity}}>
    <div style={{position: 'absolute', width: 210, height: 72, borderRadius: 80, background: '#fff'}} />
    <div style={{position: 'absolute', width: 100, height: 100, borderRadius: '50%', left: 35, top: -45, background: '#fff'}} />
    <div style={{position: 'absolute', width: 120, height: 120, borderRadius: '50%', left: 92, top: -52, background: '#fff'}} />
  </div>
);

const Pigeon: React.FC<{wing: number}> = ({wing}) => (
  <svg width="430" height="370" viewBox="0 0 430 370" style={{overflow: 'visible', filter: 'drop-shadow(0 18px 18px rgba(53,38,77,.18))'}}>
    <defs>
      <linearGradient id="body" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#faf8ff"/><stop offset="1" stopColor="#a8a5bf"/></linearGradient>
      <linearGradient id="neck" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8a43a9"/><stop offset=".52" stopColor="#43a79c"/><stop offset="1" stopColor="#697089"/></linearGradient>
    </defs>
    <g transform={`rotate(${wing * 12} 180 180)`}>
      <path d="M200 195 C95 150,35 50,63 24 C121 49,194 88,242 170 C233 201,216 211,200 195Z" fill="#cbc9d9" stroke="#6c6c83" strokeWidth="7"/>
      <path d="M75 40 C111 105,154 151,216 184 M106 55 C133 117,172 157,222 183" fill="none" stroke="#9290a7" strokeWidth="6" strokeLinecap="round"/>
    </g>
    <path d="M165 292 C116 315,80 331,46 330 C89 295,111 267,148 237Z" fill="#74758a" stroke="#5d5e72" strokeWidth="7"/>
    <ellipse cx="212" cy="229" rx="100" ry="78" fill="url(#body)" stroke="#6c6c83" strokeWidth="7"/>
    <path d="M233 210 C299 201,353 159,363 110 C307 118,235 139,187 204 C191 230,213 239,233 210Z" fill="#bbb9cc" stroke="#69697f" strokeWidth="7"/>
    <path d="M348 121 C310 148,270 173,213 216 M331 145 C286 170,257 189,210 219" fill="none" stroke="#8a899e" strokeWidth="6" strokeLinecap="round"/>
    <path d="M226 189 C186 166,183 116,214 83 C233 63,272 66,292 87 C318 114,304 157,272 180Z" fill="url(#neck)" stroke="#606176" strokeWidth="7"/>
    <circle cx="265" cy="98" r="16" fill="#fff"/><circle cx="268" cy="98" r="8" fill="#242333"/><circle cx="271" cy="94" r="3" fill="#fff"/>
    <path d="M294 111 L348 129 L296 139Z" fill="#ef9a44" stroke="#9a5d2c" strokeWidth="5" strokeLinejoin="round"/>
    <path d="M338 127 L375 145 L338 150Z" fill="#d87834"/>
    <rect x="285" y="139" width="112" height="70" rx="5" fill="#fff7e5" stroke="#9b6485" strokeWidth="5" transform="rotate(9 285 139)"/>
    <path d="M290 145 L339 184 L397 156" fill="none" stroke="#d39cb5" strokeWidth="4"/>
    <circle cx="348" cy="178" r="12" fill="#ca2b84"/>
  </svg>
);

export const Invitation: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const birdIn = spring({frame, fps, config: {damping: 16, mass: 1.2}});
  const flyX = interpolate(frame, [0, 145], [-520, 330], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const flyY = interpolate(frame, [0, 145], [480, 770], {...clamp, easing: Easing.inOut(Easing.quad)}) + Math.sin(frame / 7) * 18;
  const wing = Math.sin(frame / 3.4);
  const reveal = spring({frame: frame - 142, fps, config: {damping: 17, stiffness: 80}});
  const letterScale = interpolate(reveal, [0, 1], [0.12, 1]);
  const letterX = interpolate(reveal, [0, 1], [360, 0]);
  const letterY = interpolate(reveal, [0, 1], [80, 0]);
  const birdFade = interpolate(frame, [142, 180], [1, 0], clamp);
  const textOpacity = interpolate(frame, [190, 230], [0, 1], clamp);
  const textY = interpolate(frame, [190, 230], [28, 0], {...clamp, easing: Easing.out(Easing.cubic)});
  const sealPop = spring({frame: frame - 248, fps, config: {damping: 10}});

  return (
    <AbsoluteFill style={{fontFamily, background: 'linear-gradient(180deg, #dff5ff 0%, #f5e7ff 62%, #f7dff0 100%)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 75% 20%, rgba(255,255,255,.95), transparent 32%), radial-gradient(circle at 20% 73%, rgba(255,255,255,.5), transparent 35%)'}} />
      <Cloud x={80 + frame * 0.18} y={300} scale={1.25} opacity={0.75}/>
      <Cloud x={730 - frame * 0.12} y={590} scale={0.75} opacity={0.6}/>
      <Cloud x={-70 + frame * 0.1} y={1320} scale={1.05} opacity={0.45}/>
      {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{position: 'absolute', left: 115 + i * 220, top: 160 + (i % 2) * 90, width: 8, height: 8, borderRadius: '50%', background: '#cb2b83', opacity: .25}}/>)}

      <div style={{position: 'absolute', top: 110, width: '100%', textAlign: 'center', color: '#5a3f68', opacity: interpolate(frame, [15, 40, 125, 150], [0, 1, 1, 0], clamp)}}>
        <div style={{fontSize: 34, fontWeight: 600, letterSpacing: 3}}>ՁԵԶ ՀԱՄԱՐ ՆԱՄԱԿ ԿԱ</div>
        <div style={{width: 74, height: 4, borderRadius: 4, background: '#cb2b83', margin: '22px auto'}}/>
      </div>

      <div style={{position: 'absolute', transform: `translate(${flyX}px, ${flyY}px) scale(${.9 + birdIn * .1})`, opacity: birdFade}}>
        <Pigeon wing={wing}/>
      </div>

      <div style={{position: 'absolute', left: 70, top: 260, width: 940, height: 1320, transform: `translate(${letterX}px, ${letterY}px) scale(${letterScale})`, transformOrigin: '78% 42%', opacity: reveal}}>
        <div style={{position: 'absolute', inset: '24px -8px -20px 18px', borderRadius: 30, background: 'rgba(92,48,99,.2)', filter: 'blur(20px)'}}/>
        <div style={{position: 'absolute', inset: 0, borderRadius: 28, background: '#fffdf7', border: '3px solid rgba(181,137,169,.35)', boxShadow: 'inset 0 0 80px rgba(241,213,229,.36)', overflow: 'hidden'}}>
          <div style={{position: 'absolute', inset: 24, border: '2px solid #d9afc6', borderRadius: 18}}/>
          <div style={{position: 'absolute', top: 66, left: 0, right: 0, textAlign: 'center', color: '#cb2b83', fontSize: 30, fontWeight: 700, letterSpacing: 5}}>WILDBERRIES</div>
          <div style={{position: 'absolute', top: 155, left: 95, right: 95, height: 1, background: '#e4c8d8'}}/>
          <div style={{position: 'absolute', inset: '230px 80px 160px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: '#443648', opacity: textOpacity, transform: `translateY(${textY}px)`}}>
            <div style={{fontSize: 53, fontWeight: 700, lineHeight: 1.28, color: '#6d355e', marginBottom: 48}}>Հարգելի Լիլյա Սուքիասյան,</div>
            <div style={{fontSize: 47, fontWeight: 400, lineHeight: 1.5}}>
              հրավիրում ենք ձեզ<br/>
              <span style={{color: '#cb2b83', fontWeight: 700}}>Wildberries-ի օֆիս</span><br/>
              սուրճ խմելու,<br/>
              <span style={{fontWeight: 600}}>օր ու ժամ ընտրեք դուք</span>
            </div>
          </div>
          <div style={{position: 'absolute', bottom: 75, left: 0, right: 0, textAlign: 'center', fontSize: 28, letterSpacing: 2, color: '#9e8197'}}>ՍԻՐՈՎ ՍՊԱՍՈՒՄ ԵՆՔ</div>
        </div>
        <div style={{position: 'absolute', right: 53, bottom: 80, width: 108, height: 108, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'linear-gradient(145deg,#dc4295,#9f1767)', border: '5px solid #f1a8cd', boxShadow: '0 7px 15px rgba(98,23,69,.3)', color: 'white', fontWeight: 700, fontSize: 38, transform: `scale(${sealPop}) rotate(-9deg)`}}>W</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 74, textAlign: 'center', fontSize: 24, color: '#795b76', opacity: interpolate(frame, [280, 315], [0, .8], clamp), letterSpacing: 2}}>ՄԻ ԲԱԺԱԿ ՍՈՒՐՃ • ՋԵՐՄ ՀԱՆԴԻՊՈՒՄ</div>
    </AbsoluteFill>
  );
};
