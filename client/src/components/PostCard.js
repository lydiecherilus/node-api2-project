import React from 'react'
import styled from 'styled-components';

const Postcard = styled.div`
display:flex;
flex-direction:column;
align-items:center;
border-radius:30px;
margin: auto;
margin-top: 2%;
width:45%;
background-color: #32527B;
padding: 1%
`;
const Cardkeys = styled.p`
margin-bottom:1%;
color:white;
`;

const PostCard = props => {
    return (
        <Postcard>
            <Cardkeys>{props.post.title}</Cardkeys>
            <Cardkeys>{props.post.contents}</Cardkeys>
            <Cardkeys><span className='created'>Created Date: {props.post.created_at}</span></Cardkeys>
            <Cardkeys><span className='created'>Updated Date: {props.post.updated_at}</span></Cardkeys>
        </Postcard>
    )
}
export default PostCard;