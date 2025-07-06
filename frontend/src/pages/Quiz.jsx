import GenericQuiz from "../components/GenericQuiz";
import { useSearchParams } from "react-router-dom";

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  return <GenericQuiz category={category} />;
};

export default Quiz;