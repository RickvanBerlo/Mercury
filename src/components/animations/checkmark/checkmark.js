/**
 * Software distributed under the Apache License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the
 * specific language governing rights and limitations under the License.
 */

import React, { memo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import colors from '../../../constants/colors';

const Checkmark = ({ size = 52, enable, setEnable, timeInMiliseconds = 0 }) => {
  if (timeInMiliseconds > 0) setTimeout(() => { setEnable(false) }, timeInMiliseconds);

  return (
    <Icon
      enable={enable}
      size={size}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 52 52'
    >
      <CheckmarkCircle enable={enable} cx='26' cy='26' r='25' />
      <CheckmarkCheck enable={enable} d='M14.1 27.2l7.1 7.2 16.7-16.8' />
    </Icon>
  );
};

const stroke = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`

const enlarge = keyframes`
  from { 
    transform: scale3d(1, 1, 1);
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
`

const fill = keyframes`
  to { 
    box-shadow: inset 0 0 0 100vh ${colors.GREEN};
  }
`

const empty = keyframes`
  to{
    box-shadow: inset 0 0 0 100vh ${colors.TRANSPARENT};
  }
`

const shrink = keyframes`
  from { 
    transform: scale3d(1.05, 1.05, 1.05);
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
  to {
    transform: scale3d(0, 0, 0);
  }
`


// -webkit-animation: ${fill} 0.4s ease-in-out 0.4s forwards, ${scale} 0.3s ease-in-out 0.9s both;
// -moz-animation: ${fill} 0.4s ease-in-out 0.4s forwards, ${scale} 0.3s ease-in-out 0.9s both;
// -ms-animation: ${fill} 0.4s ease-in-out 0.4s forwards, ${scale} 0.3s ease-in-out 0.9s both;
// -o-animation: ${fill} 0.4s ease-in-out 0.4s forwards, ${scale} 0.3s ease-in-out 0.9s both;

//box-shadow: inset 0 0 0 ${colors.BLUE};
const Icon = styled.svg`
  display: block;
  border-radius: 50px;
  stroke: ${colors.WHITE};
  stroke-width: 5;
  stroke-miterlimit: 10;
  fill: ${props => props.enable ? "none" : colors.GREEN}
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  animation: ${props => props.enable ? fill : empty} 0.4s ease-in-out 0.4s forwards, ${props => props.enable ? enlarge : shrink} 0.3s ease-in-out 0.9s both};
`

const CheckmarkCircle = styled.circle`
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 5;
    stroke-miterlimit: 10;
    stroke: ${colors.GREEN};
    fill: ${props => props.enable ? "none" : colors.GREEN}
    animation: ${props => props.enable && css`${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards`};
`

const CheckmarkCheck = styled.path`
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-width: 5;
    stroke-dashoffset: ${props => props.enable ? "48" : "15"};
    animation: ${props => props.enable && css`${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards`}
    
`

const MemoCheckmark = memo(Checkmark);
export default MemoCheckmark;
