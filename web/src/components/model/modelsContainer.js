import React, { memo } from "react";
import { connect } from "react-redux";

const ModelsContainer = ({ models }) => {
    const array = [];

    for (const key in models) {
        array.push(models[key]);
    }

    return (
        <div>
            {array}
        </div>
    )
}

const mapStateToProps = state => {
    return { models: state.modelReducer.models };
};

const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoModelsContainer = memo(connect(mapStateToProps, null)(ModelsContainer), areEqual)
export default MemoModelsContainer;
