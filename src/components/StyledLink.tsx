import { Link, LinkProps } from 'react-router-dom';
import styled from '@emotion/styled'


const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default (props: LinkProps) => <StyledLink {...props} />;