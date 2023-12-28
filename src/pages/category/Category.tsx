import styled from "styled-components";
import React, { useState, useEffect } from "react";
import * as Images from "assets/image";
import Question from "assets/icon/question_icon.svg";
import Button from "assets/icon/main_button_icon.svg";
import RightArrow from "assets/icon/arrow_right_icon.svg";
import LeftArrow from "assets/icon/arrow_left_icon.svg";
import { useNavigate } from "react-router-dom";
import * as VM from "./CategoryViewModel";
import * as Components from "pages/components/index";
import * as Interface from "interface";

const Category: React.FC = () => {
  const isWeb = window.navigator.userAgent.toLowerCase().includes("web");
  const navigate = useNavigate();
  const [openError, setOpenError] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<Interface.Category[]>([]);
  const [categoryId, setCategoryId] = useState<number>(1);

  const fetchCategories = () => {
    VM.getCategories()
      .then((res) => {
        setCategoryList(res);
        setCategoryId(res[0].categoryId);
      })
      .catch((err) => {
        setOpenError(true);
      });
  };

  const getNowTime = () => {
    const today = new Date();
    const hours = today.getHours();
    const ampm = today.getHours() >= 12 ? "PM" : "AM";
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();

    return `${hours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryViewLayout>
      <ContentLayout>
        <MenualLayout>
          <Menual onClick={() => navigate("/menual")}>
            <Question />
            <MenualText>게임 메뉴얼</MenualText>
          </Menual>
        </MenualLayout>

        <Content>
          <ContentText>원하는 테스트를 선택해주세요.</ContentText>

          <CategoryContentLayout>
            {categoryList.length > 0 &&
              categoryList.map((c) => (
                <CategoryContent
                  key={c.categoryId.toString()}
                  categoryId={c.categoryId}
                  onClick={() => setCategoryId(c.categoryId)}
                >
                  {c.categoryId === 2 && (
                    <ComingSoonText>Coming Soon</ComingSoonText>
                  )}
                  {c.categoryId === categoryId && <RightArrow />}
                  <DiscatIcon
                    categoryId={c.categoryId}
                    isOpacity={c.categoryId === categoryId}
                  />
                  {c.categoryId === categoryId && <LeftArrow />}
                </CategoryContent>
              ))}
          </CategoryContentLayout>
          <ButtonIconLayout
            onClick={() => {
              categoryId === 1 && navigate(`/category/${categoryId}/question`);
            }}
          >
            <ButtonText>OK</ButtonText>
            <Button />
          </ButtonIconLayout>
        </Content>
        {isWeb && (
          <BottomLineLayout>
            <BottomLineRight>
              <BottomDefaultBtn>start</BottomDefaultBtn>
              <Border />
              <BottomBtn>카테고리 선택</BottomBtn>
            </BottomLineRight>

            <BottomBtn>{getNowTime()}</BottomBtn>
          </BottomLineLayout>
        )}
        {openError && (
          <Components.ErrorPopup cancelButton={() => setOpenError(false)} />
        )}
      </ContentLayout>
    </CategoryViewLayout>
  );
};

export default Category;

const CategoryContentLayout = styled.div`
  height: calc(100% - 270px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CategoryViewLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentLayout = styled.div`
  width: 740px;
  height: 100%;
  background: #171a5f;
  padding: 21px 0;
`;

const MenualLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 0 20px;
`;

const Menual = styled.div`
  display: flex;
  align-items: center;
`;

const MenualText = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  margin-left: 8px;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  padding: 114px 0 44px;
  text-align: center;
`;

const ContentText = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

const CategoryContent = styled.div<{ categoryId: number }>`
  position: ${({ categoryId }) => {
    switch (categoryId) {
      case 1:
        return "relative";
      case 2:
        return "inherit";

      default:
        return "inherit";
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
`;

const ComingSoonText = styled.div`
  z-index: 1;
  position: absolute;
  color: white;
  font-size: 24px;
  font-weight: 700;
`;

const DiscatIcon = styled.div<{ categoryId: number; isOpacity: boolean }>`
  width: 126px;
  height: 126px;
  margin: 0 20px;
  opacity: ${({ isOpacity }) => (isOpacity ? "1" : "0.3")};
  background-size: contain;
  background-image: ${({ categoryId }) => {
    switch (categoryId) {
      case 1:
        return `url(${Images.CoupleDiscat})`;
      case 2:
        return `url(${Images.MarryDiscat})`;
      default:
        return `url(${Images.CoupleDiscat})`;
    }
  }};
`;

const ButtonIconLayout = styled.div`
  position: relative;
  margin-top: 124px;
`;

const ButtonText = styled.div`
  font-size: 16px;
  font-weight: 700;
  position: absolute;
  right: 50%;
  top: calc(50% - 15px);
`;

const BottomLineLayout = styled.div`
  border-top: 8px solid #5f63c6;
  height: 42px;
  background: #4a4ea0;
  color: white;
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  align-items: center;
  padding: 0 20px;
`;

const BottomLineRight = styled.div`
  display: flex;
`;

const Border = styled.div`
  width: 2px;
  height: 20px;
  background: #585bb7;
  margin: 0 12px;
`;

const BottomDefaultBtn = styled.div`
  border-top: 2px solid #8689e3;
  padding: 0 12px;
  height: 20px;
  background: #5f63c6;
  display: flex;
  align-items: center;
`;

const BottomBtn = styled.div`
  border-top: 2px solid #40438e;
  border-left: 2px solid #40438e;
  width: 64px;
  height: 20px;
  background: #5356a4;
  display: flex;
  align-items: center;
  justify-content: center;
`;
