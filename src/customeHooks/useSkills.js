import { useEffect, useReducer } from "react";
import axios from "axios";
import { skillReducer, actionTypes, initialState } from "../reducers/skillReducer";

export const useSkills = () => {
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

  const sortedLanguageList = () => {
    return state.languageList.sort((firstLanguage, nextLanguage) => nextLanguage.count - firstLanguage.count);
  }

  const converseCountTopPercentage = (count) => {
    if (count > 10) { return 100; }
    return count * 10;
  }

  return [sortedLanguageList, state.requestState, converseCountTopPercentage];
}