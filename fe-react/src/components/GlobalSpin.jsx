import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const Wrapper = styled.div`
    display: ${({ loading }) => loading ? 'block' : 'none'};
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    padding-top: 40%;
    text-align: center;
`;

const Blur = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: .7;
    filter: blur(.8px);
    top: 0;
`;

export default ({ loading }) => (
    <Wrapper loading={loading}>
        <Blur />
        <Spin />
    </Wrapper>
);
