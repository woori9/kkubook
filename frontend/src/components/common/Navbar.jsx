import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import Svg from './Svg';

const Nav = styled.nav`
  ${tw`fixed bottom-0 bg-[#fff] rounded-t-[10px] z-[2]`}
  width: 100%;
  max-width: 500px;
  height: 62px;
  filter: drop-shadow(0 -1px 4px rgba(0, 0, 0, 0.25));
`;

const Ul = styled.ul`
  ${tw`flex justify-around h-full pl-0 list-none`}
`;

const Li = styled.li`
  .dot-wrapper {
    display: flex;
    justify-content: center;
  }
  ${props =>
    props.selected &&
    css`
      .dot-wrapper:before {
        content: '•';
        display: block;
        position: absolute;
        color: #61b864;
        top: -0.2rem;
      }
    `}
`;

const StyledLink = styled(Link)`
  ${tw`flex flex-col justify-center items-center text-xs no-underline`}
  height: 100%;
  color: ${props => (props.selected ? '#61B864' : '#A1A1A1')};

  & svg {
    margin-bottom: 2px;
  }
`;

function Navbar() {
  const { pathname } = useLocation();
  const links = [
    {
      name: '홈',
      path: '/',
      d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      name: '서재',
      path: '/bookshelf',
      d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    },
    {
      name: '메모',
      path: '/memo',
      d: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
    },
    {
      name: '추천',
      path: '/recommendation',
      d: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    },
    {
      name: '내 정보',
      path: '/myinfo',
      d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
  ];

  return (
    <Nav>
      <Ul>
        {links.map(link => (
          <Li
            key={link.path}
            selected={
              `/${pathname.split('/')[1]}` === `/${link.path.split('/')[1]}`
            }
          >
            <div className="dot-wrapper" />
            <StyledLink
              to={link.path}
              selected={
                `/${pathname.split('/')[1]}` === `/${link.path.split('/')[1]}`
              }
            >
              <Svg stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={link.d}
                />
              </Svg>
              {link.name}
            </StyledLink>
          </Li>
        ))}
      </Ul>
    </Nav>
  );
}

export default memo(Navbar);
