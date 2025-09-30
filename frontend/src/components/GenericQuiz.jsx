import { useEffect, useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import api from "../libs/api";
import TableStateCard from "./TableStateCard";
import DecisionButtons from "./DecisionButtons";

const GenericQuiz = ({ category }) => {
  const { state } = useLocation();
  const { quizSessionId, quiz: initialQuiz, previous_ids: initialPreviousIds } = state || {};
  const [quiz, setQuiz] = useState(initialQuiz || null);
  const [previousIds] = useState(() =>
    Array.isArray(initialPreviousIds)
      ? initialPreviousIds.filter(id => typeof id === "number" && !isNaN(id))
      : []
  );
  
  const navigate = useNavigate(); 
  const currentCorrectCount = state?.correctCount || 0;
  useEffect(() => {
    if (initialQuiz) return;

    api.get("/api/v1/quizzes", {
      params: { category },
    }).then((res) => {
      setQuiz(res.data);
    }).catch((err) => {
      console.error("クイズ取得失敗:", err);
    });
  },[]);

  if (!quiz) return <div>読み込み中...</div>;

  const decisionOptions = Array.isArray(quiz.decision_options)
    ? quiz.decision_options.filter(Boolean)
    : [];
  const isDecisionQuiz = decisionOptions.length > 0;

  const handleTileClick = async (selectedUrl) => {
    if (isDecisionQuiz) return;
    const selectedTileObj = quiz.hand_tiles.find(tile => tile.image_url === selectedUrl);
    const selectedTileId = selectedTileObj?.id;

    if (!selectedTileId) {
      alert("牌IDが見つかりませんでした");
      return;
    }
    
    navigate("/quiz/answer",
      {
        state: {
          quiz,
          quizSessionId,
          selectedTileId,
          selectedTileUrl: selectedUrl,
          previous_ids: [...previousIds, quiz.id],
          correctCount: currentCorrectCount,
        }
      });
  };

  const handleDecisionSelect = (decisionKey) => {
    if (!decisionKey) return;
    navigate("/quiz/answer",
      {
        state: {
          quiz,
          quizSessionId,
          selectedDecision: decisionKey,
          selectedTileId: null,
          selectedTileUrl: null,
          previous_ids: [...previousIds, quiz.id],
          correctCount: currentCorrectCount,
        }
      });
  };

  return (    
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-black">
      <main className="flex-1 w-full mx-auto px-4 pt-10 lg:pt-12 lg:pl-8 pb-24">
        <div className="max-w-[1200px] mx-auto
                        grid grid-cols-[1fr_auto] items-center
                        gap-x-6 sm:gap-x-8 lg:gap-x-10
                        mt-16 mb-16">

          <div>
            <div className="text-3xl lg:text-6xl font-bold mb-1">{quiz.category}</div>
            <div className="text-2xl lg:text-5xl text-gray-800">{quiz.round_info}</div>
            <TableStateCard text={quiz.table_state} className="mt-6" />
          </div>

          <div className="justify-self-start p-2 lg:p-3 rounded-md bg-white shadow border w-fit">
            <div className="flex items-center">
              {[...Array(2)].map((_, i) => (
                <img key={`back-left-${i}`} src="/images/Back.png" alt="裏"
                     className="w-12 h-16 sm:w-14 sm:h-18 lg:w-16 lg:h-20 rounded-sm" />
              ))}
              {quiz.discard_tile_urls.map((url, i) => (
                <img key={`dora-${url}-${i}`} src={url} alt="ドラ"
                     className="w-12 h-16 sm:w-14 sm:h-18 lg:w-16 lg:h-20 border border-gray-400 rounded-sm" />
              ))}
              {[...Array(4)].map((_, i) => (
                <img key={`back-right-${i}`} src="/images/Back.png" alt="裏"
                     className="w-12 h-16 sm:w-14 sm:h-18 lg:w-16 lg:h-20 rounded-sm" />
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 bg-white rounded-md shadow border w-fit mx-auto mt-5 lg:mt-36">
          <div className="flex justify-center gap-1 sm:gap-1.5 lg:gap-2">
            {quiz.hand_tile_urls.map((url, i) => (
              <img
                key={`${url}-${i}`}
                src={url}
                className={`w-12 h-16 sm:w-14 sm:h-18 lg:w-20 lg:h-28 
                           border border-gray-400 rounded-sm transition duration-150
                           ${isDecisionQuiz ? "cursor-default" : "active:shadow-lg active:border-yellow-400"}`}
                onClick={!isDecisionQuiz ? () => handleTileClick(url) : undefined}
              />
            ))}
          </div>
        </div>

        {isDecisionQuiz && (
          <DecisionButtons options={decisionOptions} onSelect={handleDecisionSelect} />
        )}
      </main>
    </div>
  );
};

export default GenericQuiz;
