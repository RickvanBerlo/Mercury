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

const scale = keyframes`
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

//box-shadow: inset 0 0 0 ${colors.BLUE};
const Icon = styled.svg`
  opacity: ${props => props.enable ? 1 : 0};
  display: block;
  border-radius: 50px;
  stroke: ${colors.WHITE};
  stroke-width: 5;
  stroke-miterlimit: 10;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  fill: none;
  -webkit-animation: ${fill} 0.4s ease-in-out 0.4s forwards, ${scale} 0.3s ease-in-out 0.9s both;
  -moz-animation: ${fill} 0.4s ease-in-out 0.4s forwards, ${scale} 0.3s ease-in-out 0.9s both;
  -ms-animation: ${fill} 0.4s ease-in-out 0.4s forwards, ${scale} 0.3s ease-in-out 0.9s both;
  -o-animation: ${fill} 0.4s ease-in-out 0.4s forwards, ${scale} 0.3s ease-in-out 0.9s both;
  animation: ${props => props.enable ? css`${fill} 0.4s ease-in-out 0.4s forwards, ${scale} 0.3s ease-in-out 0.9s both` : `none`};
`

const CheckmarkCircle = styled.circle`
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: ${colors.WHITE};
    stroke-miterlimit: 10;
    stroke: ${colors.GREEN};
    fill: none;
    -webkit-animation: ${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
	  -moz-animation: ${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
	  -ms-animation: ${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
	  -o-animation: ${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
    animation: ${props => props.enable ? css`${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards` : `none`};
`

const CheckmarkCheck = styled.path`
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    -webkit-animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
	  -moz-animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
	  -ms-animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
	  -o-animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
    animation: ${props => props.enable ? css`${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards` : `none`}
`

const MemoCheckmark = memo(Checkmark);
export default MemoCheckmark;
