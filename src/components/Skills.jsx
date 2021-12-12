import { useEffect, useReducer } from "react";
import axios from "axios";
import { skillReducer, actionTypes, initialState } from "../reducers/skillReducer";
import { requestStates } from "../constants";
import { Circle } from "react-circle";

export const Skills = () => {
  const [state, dispatch] = useReducer(skillReducer, initialState);
  useEffect(() => {
    dispatch({ type: actionTypes.fetch });
    axios.get('https://api.github.com/users/0209Eugene/repos')
      .then((response) => {
        const languageList = response.data.map(res => res.language);
        const countedLanguageList = generateLanguageCountObj(languageList);
        dispatch({ type: actionTypes.success, payload: { languageList: countedLanguageList } });
      })
      .catch(() => {
        dispatch({ type: actionTypes.error });
      });
  }, []);

  const generateLanguageCountObj = (allLanguageList) => {
    const notNullLanguageList = allLanguageList.filter(language => language !== null);
    const uniqueLanguageList = [...new Set(notNullLanguageList)];

    return uniqueLanguageList.map(item => {
      return {
        language: item,
        count: allLanguageList.filter(language => language === item).length
      }
    });
  }

  const storedLanguageList = () => {
    return state.languageList.sort((firstLanguage, nextLanguage) => nextLanguage.count - firstLanguage.count);
  }

  const converseCountTopPercentage = (count) => {
    if (count > 10) { return 100; }
    return count * 10;
  }
  
  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
          {
            state.requestState === requestStates.loading && (
              <p className="description">取得中...</p>
            )
          }
          {
            state.requestState === requestStates.success && (
              storedLanguageList().map((item, index) => (
                <div className="skill-item" key={index}>
                  <p className="description">
                    <strong>{item.language}</strong>
                    <Circle
                      animate
                      progress={converseCountTopPercentage(item.count)}
                    />
                  </p>
                </div>
              ))
            )
          }
          {
            state.requestState === requestStates.error && (
              <p className="description">エラーが発生しました</p>
            )
          }
        </div>
      </div>
    </div>
  );
};