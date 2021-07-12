import React from 'react'
import styled from 'styled-components'

const SimpleButton = ({...props, api}) => {
    return (
        <div {...props}>
            <button onClick={api.calculatePartials}/>
        </div>
    )
}

const SimpleButtonWrapper = styled(SimpleButton)`
    border: none;
    font-size: 14px;

    margin-left: 5px;
    padding: 0px;

    color: #05F22C;
    background-color: #fff;

    :hover {
      cursor: pointer;
    }

    :focus {
      outline: 0;
    }
`;


export default SimpleButtonWrapper