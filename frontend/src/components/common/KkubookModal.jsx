import React from 'react';
import tw, { styled } from 'twin.macro';
import CenteredModalBase from './CenteredModalBase';
import { onKkubookMode } from '../../api/user';
import happyKkubook from '../../assets/happy-kkubook.png';
import bizmessage from '../../assets/bizmessage.png';
import kkubookMode from '../../assets/kkubook-mode.png';
import useStore from '../../stores/user';

const HeaderP = styled.p`
  ${tw`font-medium`}
`;

const H4 = styled.h4`
  ${tw`mb-2`}
`;

const P = styled.p`
  font-size: 15px;
  word-break: keep-all;
`;

const KkubookImg = styled.img`
  ${tw`block mx-auto my-7`}
  width: auto;
  max-width: 100%;
  height: 150px;
`;

const BtnDiv = styled.div`
  ${tw`flex justify-around absolute inset-x-0 bottom-0`}
`;

const PrevBtn = styled.button`
  ${tw`text-base font-medium bg-transparent pt-2 pb-4 px-10 border-none cursor-pointer`}
`;

const NextBtn = styled.button`
  ${tw`text-[#2860e1] text-base font-medium bg-transparent pt-2 pb-4 px-10 border-none cursor-pointer`}
`;

function KkubookModal({ open, close }) {
  const updateUserInfo = useStore(state => state.updateUserInfo);
  const [page, setPage] = React.useState(0);

  function startKkubook() {
    onKkubookMode(
      response => {
        const { user, level, kkubook_days, notcommit_days } = response.data;
        updateUserInfo({
          userId: user,
          kkubookDays: kkubook_days,
          notcommitDays: notcommit_days,
          level,
          isKkubook: true,
        });
        window.open('https://pf.kakao.com/_xcsqNb/friend', '_blank');
      },
      () => {
        alert('이미 꾸북모드가 켜져 있어요.');
      },
    );
  }

  const data = [
    {
      id: 1,
      img: happyKkubook,
      title: '꾸북 모드란?',
      content: '꾸북 사용자들을 위한 독서 습관 만들기 챌린지에요.',
      prevValue: '취소',
      prevAction: () => {
        close();
      },
      netxValue: '다음',
      nextAction: () => {
        setPage(prev => prev + 1);
      },
    },
    {
      id: 2,
      img: bizmessage,
      title: '꾸북 모드를 시작하면 좋은 점',
      content:
        '매일 오후 8시에 카카오톡 알림을 보내드려요. 매일 같은 시간에 책을 읽는 것은 습관을 만드는 데에 도움이 돼요.',
      prevValue: '이전',
      prevAction: () => {
        setPage(prev => prev - 1);
      },
      netxValue: '다음',
      nextAction: () => {
        setPage(prev => prev + 1);
      },
    },
    {
      id: 3,
      img: kkubookMode,
      title: '꾸북 모드를 시작하면 좋은 점',
      content:
        '마이 페이지 상단에서 챌린지 진행 상황을 확인할 수 있어요. 100일 동안 책 읽기에 성공할 경우 뱃지를 드려요.',
      prevValue: '이전',
      prevAction: () => {
        setPage(prev => prev - 1);
      },
      netxValue: '시작하기',
      nextAction: () => {
        startKkubook();
        close();
      },
    },
  ];

  React.useEffect(() => {
    setPage(0);
  }, [open]);

  return (
    <CenteredModalBase open={open} close={close}>
      <HeaderP>습관 만들기를 시작해볼까요?</HeaderP>
      <KkubookImg src={data[page].img} alt="kkubook character" />
      <H4>{data[page].title}</H4>
      <P>{data[page].content}</P>
      <BtnDiv>
        <PrevBtn onClick={() => data[page].prevAction()}>
          {data[page].prevValue}
        </PrevBtn>
        <NextBtn onClick={() => data[page].nextAction()}>
          {data[page].netxValue}
        </NextBtn>
      </BtnDiv>
    </CenteredModalBase>
  );
}

export default KkubookModal;
