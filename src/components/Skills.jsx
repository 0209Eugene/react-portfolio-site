import { requestStates } from "../constants";
import { useSkills } from "../customeHooks/useSkills";
import { Circle } from "react-circle";

export const Skills = () => {
  const [sortedLanguageList, fetchRequestState, converseCountTopPercentage] = useSkills();
  
  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
          {
            fetchRequestState === requestStates.loading && (
              <p className="description">取得中...</p>
            )
          }
          {
            fetchRequestState === requestStates.success && (
              sortedLanguageList().map((item, index) => (
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
            fetchRequestState === requestStates.error && (
              <p className="description">エラーが発生しました</p>
            )
          }
        </div>
      </div>
    </div>
  );
};