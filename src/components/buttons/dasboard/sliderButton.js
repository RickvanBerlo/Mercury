import React, {useState} from "react";
import { connect } from "react-redux";
import styled from 'styled-components';

const SliderButton = ({colors, size = 40, checked = false, onChange = () => {console.log("no function provided")}}) => {
    const [bool, setBool] = useState(checked);

    const change = (e) => {
        onChange(!bool);
        setBool(!bool);
    }

    return (
        <Switch size={size}>
            <Checkbox type="checkbox" onClick={change}/>
            <SliderRound color={colors.MAIN} bool={bool} size={size}></SliderRound>
        </Switch>
    )
}

const Switch = styled.label`
    position: relative;
    display: inline-block;
    margin: auto;
    width: ${props => props.size}px;
    height: ${props => props.size/2}px;
`

const Checkbox = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`

const SliderRound = styled.span`
    border-radius: ${props => props.size}px;
    background-color: ${props => props.bool ? props.color : "#8c8c8c"};
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: .4s;
    &:before{
        position: absolute;
        content: "";
        height: ${props => (props.size / 2) - 4}px;
        width: ${props => (props.size / 2) - 4}px;
        left: ${props => (props.size / 10)}px;
        top: ${props => (props.size / 20)}px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
        transform: translateX(${props => props.bool ? (props.size / 2.5) : "0"}px);
    }
`

const mapStateToProps = state => {
    return {
        colors: state.preferencesReducer.colors
    };
};

export default connect(mapStateToProps, undefined)(SliderButton);