import {useCallback, useMemo, useRef, useState} from 'react';

import {answerState} from './constant';
import {AnswerStateType, MeasureType, TranslationData} from '@types';

export const usePlayScreenMeasures = (data: TranslationData) => {
  const prevSelection = useRef<MeasureType[]>([]);
  const [selectionMeasures, setSelectionMeasures] = useState<MeasureType[]>([]);
  const [blankMeasure, setBlankMeasure] = useState<MeasureType | null>(null);

  const getBlankMeasure = useCallback((measure: MeasureType) => {
    setBlankMeasure(measure);
  }, []);

  const getSelectionMeasures = useCallback(
    (measure: MeasureType) => {
      prevSelection.current = [...prevSelection.current, measure];
      if (prevSelection.current.length === data.translation.options?.length) {
        setSelectionMeasures(prevSelection.current ?? []);
      }
    },
    [data.translation.options?.length],
  );

  return {
    blankMeasure,
    getBlankMeasure,
    getSelectionMeasures,
    selectionMeasures,
  };
};

const initialSelected = {answer: '', index: -1};

export const usePlayScreenAnswer = (data: TranslationData) => {
  const [selectedAnswer, setSelectedAnswer] =
    useState<typeof initialSelected>(initialSelected);

  const [answerStatus, setAnswerStatus] =
    useState<keyof AnswerStateType>('idle');

  const onItemPress = useCallback((answer, index) => {
    setSelectedAnswer({answer, index});
    setAnswerStatus(answer !== '' ? 'selected' : 'idle');
  }, []);

  const onButtonPress = useCallback(() => {
    if (answerStatus === 'selected') {
      const status: keyof AnswerStateType =
        selectedAnswer.answer === data.translation.word
          ? 'correct'
          : data.translation.word !== selectedAnswer.answer
          ? 'error'
          : 'idle';

      setAnswerStatus(status);
    }
  }, [selectedAnswer, data.translation.word, answerStatus]);

  const statusData = useMemo(() => answerState[answerStatus], [answerStatus]);

  return {
    answerStatus,
    onButtonPress,
    onItemPress,
    selectedAnswer,
    statusData,
  };
};
