import { Space } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface IProps {
	children: JSX.Element;
}

export const Container = ({ children }: IProps) => {
	return <StyledContainer>{children}</StyledContainer>;
};

const StyledContainer = styled(Space)`
	padding: 16px 32px;
	& > .ant-space-item {
		width: 100%;
	}
`;
