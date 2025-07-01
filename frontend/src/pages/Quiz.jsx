import QuizEfficiency from "../components/QuizEfficiency";
import { useSearchParams } from "react-router-dom";

const Quiz = ({ ...props }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  switch (category) {
    case "牌効率":
      return <QuizEfficiency {...props} category={category} />;
    case "押し引き":
      return <QuizPushPull {...props} category={category} />;
    case "リーチ判断":
      return <QuizReachDecision {...props} category={category} />;
    case "仕掛け判断":
      return <QuizCallDecision {...props} category={category} />;
    case "手役/構成力":
      return <QuizHandMaking {...props} category={category} />;
    default:
      return <div>カテゴリが不明です</div>;
  }
};

export default Quiz;