import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from 'lodash';
import useTheme from './useTheme';
import { getFromLS } from '../utils/storage';

const ThemedButton = styled.button`
    border: 0;
    display: inline-block;
    padding: 12px 24px;
    font-size: 20px;
    border-radius: 4px;
    margin-top: 15px;
    width: 40%;
    cursor: pointer;
`;

const Wrapper = styled.li`
    padding: 48px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #000;
    list-style: none;
    width:50%;
    margin:15px;
`;

const Container = styled.ul`
    display: flex;
    justify-content: space-between;
    width:100%;
    padding: 15px;
`;



// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const themesFromStore = getFromLS('all-themes');
  const [data, setData] = useState(themesFromStore.data);
  const [themes, setThemes] = useState([]);
  const { setMode, mode } = useTheme();

  const themeSwitcher = selectedTheme => {
    console.log(selectedTheme);
    setMode(selectedTheme);
    props.setter(selectedTheme);
  };


  useEffect(() => {
    setThemes(_.keys(data));
  }, [data]);

  useEffect(() => {
    props.newTheme &&
      updateThemeCard(props.newTheme);
  }, [props.newTheme])

  const updateThemeCard = theme => {
    const key = _.keys(theme)[0];
    const updated = { ...data, [key]: theme[key] };
    setData(updated);
  }

  const ThemeCard = props => {
    return (
      <Wrapper style={{
        backgroundColor: `${data[_.camelCase(props.theme.name)].colors.body}`,
        color: `${data[_.camelCase(props.theme.name)].colors.text}`,
        fontFamily: `${data[_.camelCase(props.theme.name)].font}`
      }}>
        <span style={{
          fontFamily: `${data[_.camelCase(props.theme.name)].font}`,
          fontSize: '18px'
        }}>
          Click on the button to set this theme
        </span>
        <ThemedButton onClick={(theme) => themeSwitcher(props.theme)}
          style={{
            backgroundColor: `${data[_.camelCase(props.theme.name)].colors.button.background}`,
            color: `${data[_.camelCase(props.theme.name)].colors.button.text}`,
            fontFamily: `${data[_.camelCase(props.theme.name)].font}`
          }}>
          {props.theme.name}
        </ThemedButton>
      </Wrapper>
    )
  }

  return (
    <div>

      <Container>
        {
          themes.length > 0 &&
          themes.map(theme => (
            <ThemeCard theme={data[theme]} key={data[theme].id} />
          ))
        }
      </Container>
    </div>
  )
}