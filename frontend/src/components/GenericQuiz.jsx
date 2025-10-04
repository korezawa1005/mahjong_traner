import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import api from "../libs/api";
import TableStateCard from "./TableStateCard";
import DecisionButtons from "./DecisionButtons";
import CallOptionsSelector from "./CallOptionsSelector";

const GenericQuiz = ({ category }) => {
  const { state } = useLocation();
  const { quizSessionId, quiz: initialQuiz, previous_ids: initialPreviousIds } = state || {};
  const [quiz, setQuiz] = useState(initialQuiz || null);
  const [previousIds] = useState(() =>
    Array.isArray(initialPreviousIds)
      ? initialPreviousIds.filter(id => typeof id === "number" && !isNaN(id))
      : []
  );
  const [selectedCallKeys, setSelectedCallKeys] = useState([]);

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

  const decisionOptions = useMemo(() => {
    if (!Array.isArray(quiz?.decision_options)) return [];
    return quiz.decision_options.filter(Boolean);
  }, [quiz?.decision_options]);
  const isDecisionQuiz = decisionOptions.length > 0;

  const callOptions = useMemo(() => {
    const source = Array.isArray(quiz?.call_options) ? quiz.call_options : [];
    return source
      .map((option, index) => {
        if (typeof option === "string") {
          const key = option;
          return { key, label: option };
        }
        if (Array.isArray(option)) {
          const key = option.join(",");
          return { key, label: option.join(" ") };
        }
        if (option && typeof option === "object") {
          const key = option.key ?? String(index);
          const label = option.label
            ?? (Array.isArray(option.tiles) ? option.tiles.join(" ") : String(option.value ?? key));
          return { key, label };
        }
        return null;
      })
      .filter(Boolean);
  }, [quiz?.call_options]);
  const isCallQuiz = callOptions.length > 0;

  useEffect(() => {
    setSelectedCallKeys([]);
  }, [quiz?.id]);

  if (!quiz) return <div>読み込み中...</div>;

  const handleTileClick = async (selectedUrl) => {
    if (isDecisionQuiz || isCallQuiz) return;
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

  const toggleCallKey = (key) => {
    setSelectedCallKeys((prev) =>
      prev.includes(key)
        ? prev.filter((value) => value !== key)
        : [...prev, key]
    );
  };

  const handleSubmitCalls = () => {
    if (!isCallQuiz) return;
    navigate("/quiz/answer",
      {
        state: {
          quiz,
          quizSessionId,
          selectedCalls: selectedCallKeys,
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
                           ${(isDecisionQuiz || isCallQuiz) ? "cursor-default" : "active:shadow-lg active:border-yellow-400"}`}
                onClick={(!isDecisionQuiz && !isCallQuiz) ? () => handleTileClick(url) : undefined}
              />
            ))}
          </div>
        </div>

        {isDecisionQuiz && (
          <DecisionButtons options={decisionOptions} onSelect={handleDecisionSelect} />
        )}

        {isCallQuiz && (
          <>
            <CallOptionsSelector
              options={callOptions}
              selectedKeys={selectedCallKeys}
              onToggle={toggleCallKey}
            />
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleSubmitCalls}
                disabled={selectedCallKeys.length === 0}
                className="rounded-full bg-amber-500 px-6 py-2 text-white font-semibold shadow transition hover:bg-amber-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                回答する
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default GenericQuiz;
