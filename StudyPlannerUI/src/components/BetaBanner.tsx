/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React from 'react';
import styled from 'styled-components';

const REPORT_URL = 'https://github.com/pontussalenbo/study-planner/issues';

const Banner = styled.div`
  background-color: rgba(255, 152, 0);
  color: black;
  padding: 10px;
  text-align: center;
`;

const BannerLink = styled.a`
  color: black;
  text-decoration: underline;
`;

function BetaBanner() {
  return (
    <Banner>
      StudyPlanner is now live and in beta mode! 🎉 Existing features should be somewhat stable,
      with the exception of minor bugs (visual and functional). Please report any bugs or feature
      requests{' '}
      <BannerLink rel='noopener noreferrer' target='_blank' href={REPORT_URL}>
        here
      </BannerLink>
      .
    </Banner>
  );
}

export default BetaBanner;
