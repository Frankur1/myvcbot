import React from 'react';
import {Composition} from 'remotion';
import {Invitation} from './Invitation';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="WildberriesInvitation"
    component={Invitation}
    durationInFrames={360}
    fps={30}
    width={1080}
    height={1920}
  />
);
